import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "./supabase.js";

// Hook returning { session, ready }. `ready` flips to true once Supabase has
// finished restoring the persisted session from localStorage on mount, so the
// UI can avoid a "signed out" flash on cold start.
export function useSession() {
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(!isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) return;
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!mounted) return;
      setSession(s ?? null);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  return { session, ready };
}

export async function sendMagicLink(email) {
  if (!supabase) return { ok: false, reason: "not-configured" };
  const trimmed = (email || "").trim();
  if (!trimmed || !trimmed.includes("@")) {
    return { ok: false, reason: "invalid-email" };
  }
  const { error } = await supabase.auth.signInWithOtp({
    email: trimmed,
    options: {
      emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
    },
  });
  if (error) return { ok: false, reason: "error", message: error.message };
  return { ok: true };
}

export async function signOut() {
  if (!supabase) return { ok: false, reason: "not-configured" };
  const { error } = await supabase.auth.signOut();
  if (error) return { ok: false, reason: "error", message: error.message };
  return { ok: true };
}
