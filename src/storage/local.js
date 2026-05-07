// localStorage-backed reading store (offline-first, source of truth).
// Reading shape: { id, data, createdAt, updatedAt, deletedAt, dirty }
//   - id          string  — crypto.randomUUID()
//   - data        object  — the cast result: { u, l, change, method, inputs, question }
//   - createdAt   string  — ISO timestamp
//   - updatedAt   string  — ISO timestamp
//   - deletedAt   string  — ISO timestamp, or null
//   - dirty       boolean — true = needs to be pushed to remote (used by sync engine)
//
// All accessors are async so the API stays stable when sync layers compose on top.

const KEY = "mhds:readings";
const SYNC_KEY = "mhds:lastSyncAt";

function _now() { return new Date().toISOString(); }

function _newId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback for very old browsers — not cryptographically strong, but unique enough.
  return "r-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
}

export function isStorageAvailable() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    const probe = "__mhds_probe__";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

// Migrate an entry from the legacy reading shape ({u, l, change, inputs.chHour})
// to the current one ({upper, lower, changingLine, inputs.hourBranch}).
// No-op when the entry is already current.
function _migrateEntry(entry) {
  if (!entry || !entry.data) return entry;
  const reading = entry.data;
  const needsHexRename   = reading.u !== undefined && reading.upper === undefined;
  const needsHourRename  = reading.inputs && reading.inputs.chHour !== undefined && reading.inputs.hourBranch === undefined;
  if (!needsHexRename && !needsHourRename) return entry;

  const next = { ...reading };
  if (needsHexRename) {
    next.upper        = reading.u;
    next.lower        = reading.l;
    next.changingLine = reading.change;
    delete next.u; delete next.l; delete next.change;
  }
  if (needsHourRename) {
    next.inputs = { ...reading.inputs, hourBranch: reading.inputs.chHour };
    delete next.inputs.chHour;
  }
  return { ...entry, data: next, dirty: true };
}

function _readAll() {
  if (!isStorageAvailable()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const migrated = parsed.map(_migrateEntry);
    // If anything changed, persist the upgraded entries so subsequent reads
    // skip the migration work.
    const changed = migrated.some((entry, i) => entry !== parsed[i]);
    if (changed) {
      try { window.localStorage.setItem(KEY, JSON.stringify(migrated)); } catch {}
    }
    return migrated;
  } catch {
    return [];
  }
}

function _writeAll(entries) {
  if (!isStorageAvailable()) return false;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(entries));
    return true;
  } catch {
    return false;
  }
}

export async function saveReading(data) {
  if (!isStorageAvailable()) return { ok: false, reason: "no-storage" };
  const id = _newId();
  const ts = _now();
  const entry = {
    id,
    data,
    createdAt: ts,
    updatedAt: ts,
    deletedAt: null,
    dirty: true,
  };
  const all = _readAll();
  all.push(entry);
  return _writeAll(all)
    ? { ok: true, id, entry }
    : { ok: false, reason: "error" };
}

export async function listReadings() {
  const all = _readAll();
  return all
    .filter(e => e && !e.deletedAt)
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
}

export async function deleteReading(id) {
  if (!isStorageAvailable()) return false;
  const all = _readAll();
  const idx = all.findIndex(e => e && e.id === id);
  if (idx < 0) return false;
  const ts = _now();
  all[idx] = { ...all[idx], deletedAt: ts, updatedAt: ts, dirty: true };
  return _writeAll(all);
}

// === Sync-engine affordances ===
// These are the surfaces the sync engine (phase 6) will use. UI code does not
// need them.

// Returns every entry, including soft-deleted ones. The sync engine needs the
// tombstones so it can propagate deletions to the server.
export async function getAllEntries() {
  return _readAll();
}

// Returns entries with dirty=true, including tombstones — the sync engine pushes
// these to the server.
export async function getDirtyEntries() {
  return _readAll().filter(e => e && e.dirty);
}

// Clear the dirty flag on an entry after a successful push.
export async function markClean(id) {
  if (!isStorageAvailable()) return false;
  const all = _readAll();
  const idx = all.findIndex(e => e && e.id === id);
  if (idx < 0) return false;
  all[idx] = { ...all[idx], dirty: false };
  return _writeAll(all);
}

// Insert or merge a row from the server. Last-write-wins by updatedAt — if our
// local copy is newer, we keep ours and ignore the remote. The result is always
// dirty=false because what we just wrote came from the server (i.e. is in sync).
export async function upsertFromRemote(remote) {
  if (!isStorageAvailable() || !remote || !remote.id) return false;
  const all = _readAll();
  const idx = all.findIndex(e => e && e.id === remote.id);
  const incoming = { ...remote, dirty: false };
  if (idx < 0) {
    all.push(incoming);
  } else {
    const local = all[idx];
    if ((local.updatedAt || "") > (remote.updatedAt || "")) {
      // Local wins — keep it, but its dirty flag stays so it'll be pushed.
      return true;
    }
    all[idx] = incoming;
  }
  return _writeAll(all);
}

export function getLastSyncAt() {
  if (!isStorageAvailable()) return null;
  try { return window.localStorage.getItem(SYNC_KEY); }
  catch { return null; }
}

export function setLastSyncAt(iso) {
  if (!isStorageAvailable()) return false;
  try { window.localStorage.setItem(SYNC_KEY, iso || _now()); return true; }
  catch { return false; }
}
