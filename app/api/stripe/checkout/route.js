import { NextResponse } from 'next/server';
import { getStripe } from '../../../../lib/stripe';

const priceMap = {
  starter: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID,
  pro: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
  business: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PRICE_ID,
};

export async function POST(req) {
  try {
    const { plan, email } = await req.json();

    if (!plan || !(plan in priceMap)) {
      return NextResponse.json({ error: 'Unknown plan selected.' }, { status: 400 });
    }

    const priceId = priceMap[plan];
    if (!priceId) {
      // Price ID env var missing -> misconfiguration, not user error.
      return NextResponse.json(
        { error: `Price for the "${plan}" plan is not configured. Set NEXT_PUBLIC_STRIPE_${plan.toUpperCase()}_PRICE_ID.` },
        { status: 500 }
      );
    }

    // Derive base URL from the incoming request origin, falling back to the
    // configured site URL. This keeps redirects correct across preview/prod.
    const origin =
      req.headers.get('origin') ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      new URL(req.url).origin;

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      ...(email ? { customer_email: email } : {}),
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard?canceled=true`,
      metadata: { plan },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session.' },
      { status: 500 }
    );
  }
}
