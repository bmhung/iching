# Plum Blossom I Ching → Deployable PWA

A migration plan for taking the Mai Hoa Dịch Số artifact and turning it into a real, installable, offline-first web app with optional cloud sync.

---

## Stack decisions

**Frontend**: Vite + React 18 + Tailwind 3, plain `.jsx` (no TypeScript — the existing code has zero TS in it, so adding it would just be friction).

**PWA**: `vite-plugin-pwa` with Workbox under the hood. Handles manifest, service worker, asset precaching.

**Cloud sync**: Supabase (Postgres + auth + JS client). Generous free tier, simpler than Firebase, real SQL underneath.

**Auth**: Magic-link email only. No passwords, no OAuth needed for v1. The app is fully usable without signing in — auth only unlocks cross-device sync.

**Deploy**: Vercel. Auto-deploy from GitHub, free tier, env vars for Supabase keys.

---

## Storage architecture

```
React state (in-memory)
       │
       ▼
localStorage   ← source of truth, always written first
       │
       ▼ (background, only if signed in)
Supabase       ← cross-device sync layer
```

**Reading shape (local)**:
```js
{
  id: string,            // crypto.randomUUID()
  data: ReadingObject,   // the existing { u, l, change, method, inputs, question }
  createdAt: ISOString,
  updatedAt: ISOString,
  deletedAt: ISOString | null,
  dirty: boolean,        // true = needs to be pushed to Supabase
}
```

**Write flow**: write to localStorage immediately, mark `dirty: true`. If signed in, push to Supabase in the background; on success, clear `dirty`. UI never blocks on the network.

**Delete flow**: soft delete by setting `deletedAt`. UI filters these out. Sync propagates the tombstone. Hard-delete locally after 30 days.

**Sync on sign-in**: pull remote rows updated since `lastSyncAt`. For each: if not present locally, insert; if present, keep whichever has the newer `updatedAt`. Then push every local row that's `dirty` or doesn't exist remotely.

**Conflict resolution**: last-write-wins by `updatedAt`. Fine for personal use; readings are append-mostly anyway.

---

## Supabase schema

```sql
create table readings (
  id text primary key,
  user_id uuid references auth.users not null,
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index readings_user_updated_idx
  on readings (user_id, updated_at desc);

alter table readings enable row level security;

create policy "users access own readings"
  on readings for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

---

## Phases

1. **Bootstrap** — Vite project, Tailwind config, `vite-plugin-pwa`, folder structure
2. **Port the component** — drop in the existing `.jsx`, replace `window.storage` calls with the new local storage module, verify the app still runs
3. **Local storage layer** — `src/storage/local.js` exposing `get/set/list/delete` plus `dirty` tracking; same call sites as before
4. **Supabase setup** — create project, run the schema migration, install client, configure env vars
5. **Auth UI** — small "Sign in to sync" link in the header, magic-link flow, sign-out
6. **Sync engine** — `src/sync/engine.js` handling pull-merge-push; runs on sign-in and after each local write
7. **PWA polish** — manifest, icons (placeholder generated from the `PlumBlossom` SVG component), install prompt, offline indicator
8. **Deploy** — push to GitHub, connect to Vercel, set Supabase env vars, verify the deployed PWA installs and works offline

---

## Decisions to make before you start

- **Supabase project**: do you have one yet, or want Claude Code to walk you through creating it?
- **Domain**: ship on `*.vercel.app` first and add a custom domain later?
- **App icon**: keep auto-generating from the `PlumBlossom` SVG, or design a proper icon at some point?
- **Email sender for magic link**: Supabase's default sender is fine for testing; for production you'd configure custom SMTP.

---

## The prompt to paste into Claude Code

Drop `plum-blossom-iching.jsx` into the working directory first, then paste this:

````
I'm migrating a Claude artifact to a deployable PWA. The existing app is a single React component file (plum-blossom-iching.jsx, in this directory) — a tri-lingual Vietnamese / English / Chinese I Ching divination tool called Mai Hoa Dịch Số (Plum Blossom Oracle). It works; I want to deploy it as a real PWA with offline-first storage and optional cloud sync.

# Target stack

- Vite + React 18 + Tailwind 3, plain .jsx (no TypeScript)
- PWA via vite-plugin-pwa (installable, works offline)
- localStorage as the source of truth (offline-first, instant writes)
- Optional cloud sync via Supabase when user signs in
- Supabase auth: magic-link email only, no passwords/OAuth
- Deploy to Vercel

# Preserve from the existing file — do NOT change

- All casting functions: castTime, castNumber, castSound, castSpont
- The lunar calendar code (Hồ Ngọc Đức algorithm — _jdFromDate, _getNewMoonDay, etc.)
- TRIGRAMS, HEX, HL data tables — these are the heart of the app
- All three-language STR translations (vi, en, zh) including the Vietnamese diacritics and Chinese characters
- Tailwind classes and visual design: stone/rose/amber palette, serif fonts, the plum-blossom motif
- Component structure: HomeView, CastView, ReadingDisplay, RefView, LearnView, HistoryView

You can refactor file organization, but the rendered output and the casting math must be byte-identical to the existing app.

# Storage model

Each reading is stored locally as:

  { id, data, createdAt, updatedAt, deletedAt, dirty }

- IDs: use crypto.randomUUID() (replace existing Date.now() usage)
- Writes go to localStorage first, marked dirty:true, then pushed to Supabase in background if signed in
- Deletes are soft (set deletedAt); UI filters these out
- Sync on sign-in: pull remote, merge by id (newer updatedAt wins), push dirty/local-only rows

# Supabase schema — write this as a migration file

readings table:
- id            text primary key
- user_id       uuid references auth.users not null
- data          jsonb not null
- created_at    timestamptz not null default now()
- updated_at    timestamptz not null default now()
- deleted_at    timestamptz
- index on (user_id, updated_at desc)
- RLS enabled, policy: users can only access rows where auth.uid() = user_id

# How I want you to work

1. Start by reading plum-blossom-iching.jsx end to end
2. Then lay out your plan: folder structure, phase order, decisions you need from me
3. Wait for me to confirm before writing any code
4. Work phase by phase: bootstrap → port → local storage → Supabase → auth UI → sync engine → PWA polish → deploy config
5. After each phase, briefly summarize what changed and what's next
6. For anything hard to undo (deleting files, running schema migrations, deploy config), ask before doing it

# Inputs I'll provide as you ask

- Supabase project URL and anon key (I'll create the project when you say to)
- Vercel deployment preferences
- App icon: placeholder generated from the existing PlumBlossom SVG component is fine for v1

Start by reading the source file, then propose the plan.
````

---

## Notes for after the migration

- Existing readings in the artifact are stranded — they live in Claude's artifact storage and can't be exported. If any matter, screenshot them from the History tab before moving on.
- The casting math has been carefully tuned (especially the lunar conversion). Resist any "improvements" to it during the port.
- The `present-day` `methodNames` keys (`time`, `number`, `sound`, `spont`) are referenced from multiple places — keep those exact strings if Claude Code refactors anything.
- Once it's running locally, an easy first sync test: sign in on desktop, cast a reading, sign in on phone, confirm it appears.
