// Supabase client singleton. Configured via Vite env vars (VITE_SUPABASE_URL
// and VITE_SUPABASE_ANON_KEY). When env vars are missing — e.g. local dev
// before the user has set up a project — the module exports null and the
// auth/sync layers gracefully no-op.

import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Build-time probe — if env vars are missing in the build environment, log
// it so we can see in the deployed bundle. This print is intentional and
// gets shaken out only if both are present.
if (typeof window !== "undefined" && (!url || !anonKey)) {
  console.warn("[supabase] env vars missing at build time:",
    { hasUrl: !!url, hasKey: !!anonKey });
}

export const supabase = (url && anonKey)
  ? createClient(url, anonKey, {
      auth: {
        // Persist session in localStorage so the user stays signed in across
        // reloads and PWA cold-starts.
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export const isSupabaseConfigured = !!supabase;
