import { NextResponse } from 'next/server';
import { getStripe } from '../../../../lib/stripe';

// Stripe needs the raw body for signature verification.
export const dynamic = 'force-dynamic';

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
      console.log('Payment successful:', session.id, 'plan:', session.metadata?.plan);
      // TODO: persist subscription/plan for session.customer_email in Supabase.
      break;
    }
    case 'customer.subscription.deleted':
      console.log('Subscription cancelled:', event.data.object.id);
      // TODO: downgrade the user's plan in Supabase.
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
