import { NextResponse } from 'next/server';
import { stripe } from '../../../../lib/stripe';

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      console.log('Payment successful:', event.data.object);
      break;
    case 'customer.subscription.deleted':
      console.log('Subscription cancelled:', event.data.object);
      break;
  }

  return NextResponse.json({ received: true });
}
