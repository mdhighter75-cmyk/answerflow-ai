# AnswerFlow AI — PRD / Working Memory

## Overview
Next.js 14 (App Router) SaaS: AI phone/chat receptionist for small businesses.
Stack: Next.js + Supabase (auth + DB) + Stripe (subscriptions) + OpenAI + Twilio. Deployed on **Vercel**.

## Original request
"Upgrade button not working + scan for bugs." Then: wire webhook → Supabase and persist Business Settings.

## Implemented (2026-06)
- Fixed the Upgrade button (Stripe checkout), subscription persistence (webhook → Supabase), and Business Settings persistence.
- **Full visual redesign** ("Old Money Tech" premium light theme): Alabaster bg + deep forest green accents, Bricolage Grotesque + DM Sans fonts, lucide-react icons (emojis removed), flat bordered cards, editorial asymmetric hero with a live-call mock, micro-animations. Applied across landing, pricing, login, signup, dashboard, receptionist demo. Design system lives in `app/globals.css` (CSS variables + component classes). Blueprint: `design_guidelines.json`.

## Required config (set in Vercel env + run schema.sql)
STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_STRIPE_{STARTER,PRO,BUSINESS}_PRICE_ID,
NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY,
NEXT_PUBLIC_SITE_URL, OPENAI_API_KEY (optional).

## Not verified end-to-end
No live Supabase/Stripe configured in this workspace; verified via production `next build` (compiles clean).
Real checkout + webhook + settings persistence require the env vars above + the Supabase schema applied.

## Backlog / next
- P1: Wire real dashboard stats (calls/appointments/messages) from Supabase.
- P2: Persist call history via Twilio; upgrade OpenAI model from gpt-3.5-turbo.
- P2: Stripe customer portal for managing/cancelling subscriptions.
