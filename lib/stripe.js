import Stripe from 'stripe';

let _stripe = null;

// Lazily instantiate Stripe so a missing key surfaces as a clear runtime
// error inside the route handler instead of crashing at module import time.
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  if (!_stripe) {
    _stripe = new Stripe(key, { apiVersion: '2023-10-16' });
  }
  return _stripe;
}
