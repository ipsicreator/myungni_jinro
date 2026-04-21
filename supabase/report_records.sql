create table if not exists public.report_records (
  report_id text primary key,
  student_key text not null,
  student_name text not null,
  school text not null,
  grade text not null,
  source text not null,
  created_at timestamptz not null default now(),
  headline text not null,
  report_json jsonb not null,
  answers_json jsonb not null
);

create index if not exists idx_report_records_student_key on public.report_records(student_key);
create index if not exists idx_report_records_created_at on public.report_records(created_at desc);

-- Optional: lock down with RLS + server key access only.
-- alter table public.report_records enable row level security;
-- create policy "service-role-all" on public.report_records
--   for all
--   to service_role
--   using (true)
--   with check (true);
