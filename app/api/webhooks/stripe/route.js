import { NextResponse } from 'next/server';
import { getStripe } from '../../../../lib/stripe';
import { getSupabaseAdmin } from '../../../../lib/supabaseAdmin';

// Stripe needs the raw body for signature verification.
export const dynamic = 'force-dynamic';

async function upsertSubscription(fields) {
  try {
    const admin = getSupabaseAdmin();
    const { error } = await admin
      .from('subscriptions')
      .upsert({ ...fields, updated_at: new Date().toISOString() }, { onConflict: 'email' });
    if (error) console.error('Supabase subscription upsert error:', error.message);
  } catch (err) {
    console.error('Could not persist subscription:', err.message);
  }
}

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  let event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const email = session.customer_email || session.customer_details?.email || session.metadata?.email;
      if (email) {
        await upsertSubscription({
          email,
          plan: session.metadata?.plan || null,
          status: 'active',
          stripe_customer_id: typeof session.customer === 'string' ? session.customer : null,
          stripe_subscription_id: typeof session.subscription === 'string' ? session.subscription : null,
        });
      }
      console.log('Payment successful:', session.id, 'plan:', session.metadata?.plan);
      break;
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object;
      try {
        const admin = getSupabaseAdmin();
        const { error } = await admin
          .from('subscriptions')
          .update({ status: 'canceled', updated_at: new Date().toISOString() })
          .eq('stripe_subscription_id', sub.id);
        if (error) console.error('Supabase cancel update error:', error.message);
      } catch (err) {
        console.error('Could not update canceled subscription:', err.message);
      }
      console.log('Subscription cancelled:', sub.id);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
