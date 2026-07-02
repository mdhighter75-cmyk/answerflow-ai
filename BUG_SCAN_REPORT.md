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

## Known gaps (remaining next steps)

- **Dashboard stats are hardcoded** (0 calls, appointments, messages) — not yet wired to real data.
- **OpenAI model** is `gpt-3.5-turbo` (legacy); consider upgrading.
- Webhook → Supabase and Business Settings persistence are now implemented (see below).

## Follow-up work added (webhook + settings persistence)

- **Stripe webhook now updates plans in Supabase.** On `checkout.session.completed` it upserts
  the user's `plan`/`status` into a new `subscriptions` table (keyed by email); on
  `customer.subscription.deleted` it marks the subscription `canceled`.
- **Business Settings persist to Supabase.** The dashboard loads the user's saved
  `businesses` row on mount and upserts on Save (with saving/error states).
- **Plan shown live in the dashboard** — Overview "Plan Status" card and Billing tab reflect
  the active plan; the current plan's button shows "Current Plan" instead of "Upgrade".
- New files: `lib/supabaseAdmin.js` (service-role client, server-only), updated `supabase/schema.sql`
  (adds `subscriptions` table + RLS, unique constraint on `businesses.user_id`).
- **New env var required:** `SUPABASE_SERVICE_ROLE_KEY` (server-only, for the webhook).
- **Run the updated `supabase/schema.sql`** in the Supabase SQL editor before going live.

## Setup required to go live (on Vercel)

Add these in Vercel → Project → Settings → Environment Variables:
`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID`,
`NEXT_PUBLIC_STRIPE_PRO_PRICE_ID`, `NEXT_PUBLIC_STRIPE_BUSINESS_PRICE_ID`,
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`
(and optionally `OPENAI_API_KEY`).
