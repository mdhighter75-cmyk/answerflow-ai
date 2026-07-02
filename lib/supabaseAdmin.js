import { createClient } from '@supabase/supabase-js';

// Server-only Supabase client using the service role key. This bypasses RLS
// and must NEVER be imported into client components.
let _admin = null;

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error('Supabase admin is not configured (need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)');
  }
  if (!_admin) {
    _admin = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return _admin;
}
