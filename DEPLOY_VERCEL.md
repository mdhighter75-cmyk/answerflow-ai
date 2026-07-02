# Deploying AnswerFlow AI to Vercel

The app is 100% Vercel-ready (production `next build` passes). No code changes needed.

## 1. Push the code to GitHub
Use the **"Save to GitHub"** button in the Emergent chat input to push this repo to your GitHub account.

## 2. Import into Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repo. Vercel auto-detects **Next.js** — leave build settings default:
   - Framework Preset: `Next.js`
   - Build Command: `next build` (default)
   - Output: (default)
3. Don't deploy yet — add the environment variables first (step 3).

## 3. Environment variables (Vercel → Project → Settings → Environment Variables)
Add each of these for the **Production** (and Preview) environment:

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API (secret — never expose to client) |
| `STRIPE_SECRET_KEY` | https://dashboard.stripe.com/apikeys (`sk_live_...` or `sk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Created in step 5 (`whsec_...`) |
| `NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID` | Stripe → Products → Starter plan → recurring price (`price_...`) |
| `NEXT_PUBLIC_STRIPE_PRO_PRICE_ID` | Stripe → Products → Pro plan → recurring price |
| `NEXT_PUBLIC_STRIPE_BUSINESS_PRICE_ID` | Stripe → Products → Business plan → recurring price |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel domain, e.g. `https://answerflow.vercel.app` |
| `OPENAI_API_KEY` | (optional) https://platform.openai.com/api-keys — omit to use canned demo replies |

## 4. Set up the Supabase database
In Supabase → SQL Editor, paste and run the contents of `supabase/schema.sql`.
This creates the `businesses`, `calls`, and `subscriptions` tables with row-level security.

## 5. Set up the Stripe webhook (so plans update after payment)
1. Deploy once so you have a live URL.
2. Stripe Dashboard → Developers → Webhooks → **Add endpoint**.
3. Endpoint URL: `https://<your-vercel-domain>/api/webhooks/stripe`
4. Events to send: `checkout.session.completed`, `customer.subscription.deleted`
5. Copy the **Signing secret** (`whsec_...`) into the `STRIPE_WEBHOOK_SECRET` env var in Vercel, then redeploy.

## 6. Verify
- Visit the site → Sign up → confirm email → Log in → Dashboard.
- Billing tab → click **Upgrade** → complete Stripe checkout (use test card `4242 4242 4242 4242` in test mode).
- After payment you're returned to `/dashboard?success=true`; the webhook writes the plan to `subscriptions`, and the dashboard shows the new plan.

## Notes
- Plan → price ID mapping (in `app/api/stripe/checkout/route.js`):
  `starter → NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID`, `pro → …PRO…`, `business → …BUSINESS…`.
  Make sure each Stripe Price is a **recurring/subscription** price, not one-time.
- Use Stripe **test** keys + test price IDs first, then swap to live keys when ready.
