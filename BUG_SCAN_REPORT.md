# AnswerFlow AI — Bug Scan Report

Date: 2026-06 · Scope: full codebase (Next.js 14 App Router, Supabase, Stripe, OpenAI, Twilio)

## Root cause: "Upgrade" button not working

The Upgrade button (Dashboard → Billing) calls `POST /api/stripe/checkout`, which
depends on Stripe env vars that **did not exist** — there was no `.env` file in the
project at all. Two compounding bugs made it fail *silently*:

1. **Missing env config.** `STRIPE_SECRET_KEY` and the plan `NEXT_PUBLIC_STRIPE_*_PRICE_ID`
   values were undefined, so the checkout route could not create a Stripe session.
2. **Errors were swallowed on the client.** The old `handleUpgrade` only redirected
   when `data.url` existed and its `catch` only caught network errors — a 400/500 JSON
   error response left the button doing *nothing at all*, so it looked "dead".

## Fixes applied

| # | Severity | File | Fix |
|---|----------|------|-----|
| 1 | Critical | `.env.example`, `.gitignore` | Documented all required env vars; added `.gitignore` so secrets are never committed. |
| 2 | Critical | `app/dashboard/page.jsx` | `handleUpgrade` now checks `res.ok`/`data.url`, shows a visible error, adds a redirecting state, and prevents double-clicks. |
| 3 | High | `app/dashboard/page.jsx` | Removed hardcoded `user@example.com`; uses the logged-in Supabase user's email. Added an auth guard that redirects unauthenticated visitors to `/login`. |
| 4 | High | `lib/stripe.js` | Stripe client is now lazily created via `getStripe()`, so a missing key surfaces as a clear error instead of crashing the route at import. |
| 5 | Medium | `app/api/stripe/checkout/route.js` | Validates plan, returns clear messages for missing price IDs, derives redirect URLs from the request origin (robust across preview/prod), adds `{CHECKOUT_SESSION_ID}` + plan metadata. |
| 6 | Medium | `app/api/webhooks/stripe/route.js` | Guards missing `STRIPE_WEBHOOK_SECRET`, uses `getStripe()`, marks route `force-dynamic`. |

## Known gaps (not blocking, recommend as next steps)

- **Webhook is a no-op beyond logging.** `checkout.session.completed` / `subscription.deleted`
  don't persist plan state to Supabase yet, so a paid user's plan won't update automatically.
- **Business Settings don't persist.** The Save button only updates local React state;
  it should write to the Supabase `businesses` table.
- **Dashboard stats are hardcoded** (0 calls, Trial, etc.) — not yet wired to real data.
- **OpenAI model** is `gpt-3.5-turbo` (legacy); consider upgrading.

## Setup required to go live (on Vercel)

Add these in Vercel → Project → Settings → Environment Variables:
`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID`,
`NEXT_PUBLIC_STRIPE_PRO_PRICE_ID`, `NEXT_PUBLIC_STRIPE_BUSINESS_PRICE_ID`,
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`
(and optionally `OPENAI_API_KEY`).
