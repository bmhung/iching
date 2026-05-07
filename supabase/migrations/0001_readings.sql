-- Readings table: cloud-side mirror of localStorage entries.
-- The local store is the source of truth; this table receives pushed writes
-- and serves cross-device pulls. RLS ensures users only see their own rows.

create table readings (
  id          text primary key,
  user_id     uuid references auth.users not null,
  data        jsonb not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

create index readings_user_updated_idx
  on readings (user_id, updated_at desc);

alter table readings enable row level security;

create policy "users access own readings"
  on readings for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
