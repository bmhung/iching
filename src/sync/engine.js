// Pull-merge-push sync engine.
//
// Strategy:
//   1. On sign-in (or cold start when already signed in): pull every row from
//      Supabase whose updated_at is >= our local lastSyncAt. Merge with
//      upsertFromRemote (last-write-wins by updatedAt). Then push all dirty
//      local entries.
//   2. After each local write: push dirty entries. No pull needed within a
//      session because no other client wrote to our store mid-session
//      (best-effort assumption — a stale row will be reconciled on next
//      cold start anyway).
//
// All operations are best-effort and do not block the UI. Failures are logged
// and retried on the next trigger.

import { useEffect, useRef, useState } from "react";
import { supabase, isSupabaseConfigured } from "./supabase.js";
import { useSession } from "./auth.js";
import {
  getDirtyEntries,
  markClean,
  upsertFromRemote,
  getLastSyncAt,
  setLastSyncAt,
} from "../storage/local.js";

const TABLE = "readings";

// Convert a local entry to the row shape Supabase expects.
function _localToRow(entry, userId) {
  return {
    id: entry.id,
    user_id: userId,
    data: entry.data,
    created_at: entry.createdAt,
    updated_at: entry.updatedAt,
    deleted_at: entry.deletedAt ?? null,
  };
}

// Convert a Supabase row to the local entry shape.
function _rowToLocal(row) {
  return {
    id: row.id,
    data: row.data,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at ?? null,
    dirty: false,
  };
}

export async function pullRemote(userId) {
  if (!supabase || !userId) return { ok: false, reason: "not-configured" };
  const since = getLastSyncAt();
  let q = supabase.from(TABLE).select("*").eq("user_id", userId);
  if (since) q = q.gte("updated_at", since);
  const { data, error } = await q;
  if (error) return { ok: false, reason: "error", message: error.message };
  let maxUpdated = since || "";
  for (const row of data || []) {
    await upsertFromRemote(_rowToLocal(row));
    if ((row.updated_at || "") > maxUpdated) maxUpdated = row.updated_at;
  }
  setLastSyncAt(maxUpdated || new Date().toISOString());
  return { ok: true, count: (data || []).length };
}

export async function pushDirty(userId) {
  if (!supabase || !userId) return { ok: false, reason: "not-configured" };
  const dirty = await getDirtyEntries();
  if (dirty.length === 0) return { ok: true, count: 0 };
  let pushed = 0;
  for (const entry of dirty) {
    const row = _localToRow(entry, userId);
    const { error } = await supabase.from(TABLE).upsert(row, { onConflict: "id" });
    if (error) {
      console.warn("sync push failed for", entry.id, error.message);
      continue;
    }
    await markClean(entry.id);
    pushed++;
  }
  return { ok: true, count: pushed };
}

export async function runSync(userId) {
  const pull = await pullRemote(userId);
  if (!pull.ok) return pull;
  const push = await pushDirty(userId);
  return { ok: true, pulled: pull.count || 0, pushed: push.count || 0 };
}

// Free function for storage call sites to trigger a background push after a
// local write. No-op if the engine hook isn't mounted or the user isn't
// signed in. Set by useSyncEngine on mount.
let _pushHandler = null;
export function notifyLocalWrite() {
  if (_pushHandler) _pushHandler();
}

// Hook: wires sync to the current session. Returns { status, lastSync, push }.
//   status: 'idle' | 'syncing' | 'synced' | 'error' | 'offline' | 'unconfigured'
//   push:   call after a local write to push dirty entries in the background
export function useSyncEngine() {
  const { session, ready } = useSession();
  const [status, setStatus] = useState("idle");
  const [lastSync, setLastSync] = useState(getLastSyncAt());
  const userIdRef = useRef(null);

  const userId = session?.user?.id || null;
  userIdRef.current = userId;

  useEffect(() => {
    if (!isSupabaseConfigured) { setStatus("unconfigured"); return; }
    if (!ready) return;
    if (!userId) { setStatus("idle"); return; }
    let cancelled = false;
    (async () => {
      setStatus("syncing");
      const res = await runSync(userId);
      if (cancelled) return;
      if (res.ok) {
        setStatus("synced");
        setLastSync(getLastSyncAt());
      } else {
        setStatus("error");
      }
    })();
    return () => { cancelled = true; };
  }, [userId, ready]);

  // Online/offline awareness
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onOff = () => setStatus(navigator.onLine ? "idle" : "offline");
    window.addEventListener("online", onOff);
    window.addEventListener("offline", onOff);
    if (!navigator.onLine) setStatus("offline");
    return () => {
      window.removeEventListener("online", onOff);
      window.removeEventListener("offline", onOff);
    };
  }, []);

  async function push() {
    const uid = userIdRef.current;
    if (!uid) return;
    setStatus("syncing");
    const res = await pushDirty(uid);
    if (res.ok) {
      setStatus("synced");
      setLastSync(getLastSyncAt());
    } else {
      setStatus("error");
    }
  }

  // Register the push handler so storage call sites can trigger sync without
  // prop-drilling.
  useEffect(() => {
    _pushHandler = push;
    return () => { if (_pushHandler === push) _pushHandler = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return { status, lastSync, push, session, ready, signedIn: !!userId };
}
