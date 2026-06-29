-- AnswerFlow AI Database Schema
-- Run in Supabase SQL editor

CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT, hours TEXT, services TEXT, phone TEXT,
  address TEXT, greeting TEXT, faqs TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  caller_number TEXT, summary TEXT, duration INTEGER,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own business" ON businesses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users view own calls" ON calls FOR SELECT USING (business_id IN (SELECT id FROM businesses WHERE user_id = auth.uid()));
