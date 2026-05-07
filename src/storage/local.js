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

function _readAll() {
  if (!isStorageAvailable()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
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
  all[idx] = { ...all[idx], deletedAt: _now(), updatedAt: _now(), dirty: true };
  return _writeAll(all);
}
