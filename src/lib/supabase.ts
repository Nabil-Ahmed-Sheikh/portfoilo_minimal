import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

// Supabase renamed keys in newer projects:
//   old: SUPABASE_SERVICE_ROLE_KEY   new: SUPABASE_SECRET_KEY
//   old: NEXT_PUBLIC_SUPABASE_ANON_KEY  new: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
// We check both names so either dashboard version works.
function resolveEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||   // legacy name
    process.env.SUPABASE_SECRET_KEY;            // new dashboard name
  return { url, key };
}

export function getSupabase(): SupabaseClient {
  if (!_client) {
    const { url, key } = resolveEnv();
    if (!url || !key) {
      throw new Error(
        'Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and ' +
        'SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY for older projects). ' +
        'Find the Secret key in: Supabase Dashboard → Settings → API → Secret key.',
      );
    }
    _client = createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return _client;
}

export const isConfigured = (): boolean => {
  const { url, key } = resolveEnv();
  return Boolean(url && key);
};
