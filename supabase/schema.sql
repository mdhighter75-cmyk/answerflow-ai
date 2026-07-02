-- AnswerFlow AI Database Schema
-- Run in Supabase SQL editor

CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT, hours TEXT, services TEXT, phone TEXT,
  address TEXT, greeting TEXT, faqs TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- One business profile per user (enables upsert on user_id from the dashboard).
ALTER TABLE businesses DROP CONSTRAINT IF EXISTS businesses_user_id_key;
ALTER TABLE businesses ADD CONSTRAINT businesses_user_id_key UNIQUE (user_id);

CREATE TABLE IF NOT EXISTS calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  caller_number TEXT, summary TEXT, duration INTEGER,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stores the active plan/subscription for each user, keyed by email
-- (the reliable identifier available in Stripe webhooks).
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  plan TEXT,
  status TEXT DEFAULT 'active',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own business" ON businesses;
CREATE POLICY "Users manage own business" ON businesses FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users view own calls" ON calls;
CREATE POLICY "Users view own calls" ON calls FOR SELECT USING (business_id IN (SELECT id FROM businesses WHERE user_id = auth.uid()));

-- Users can read their own subscription; writes happen only via the service
-- role key in the Stripe webhook (which bypasses RLS).
DROP POLICY IF EXISTS "Users view own subscription" ON subscriptions;
CREATE POLICY "Users view own subscription" ON subscriptions FOR SELECT USING (auth.jwt() ->> 'email' = email);
