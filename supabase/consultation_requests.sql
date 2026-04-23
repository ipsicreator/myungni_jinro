-- Table for storing consultation requests submitted via report QR codes
create table if not exists public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  report_id text not null,
  parent_name text not null,
  phone text not null,
  question text not null,
  preferred_date timestamptz not null,
  status text not null default 'pending', -- pending, confirmed, completed
  created_at timestamptz not null default now()
);

-- Index for quick lookup by report_id
create index if not exists idx_consultation_requests_report_id on public.consultation_requests(report_id);
create index if not exists idx_consultation_requests_created_at on public.consultation_requests(created_at desc);

-- RLS (Row Level Security) - Only service_role or authenticated admins should see this
alter table public.consultation_requests enable row level security;

-- Simple policy for service role (admin/backend)
create policy "service-role-all" on public.consultation_requests
  for all
  to service_role
  using (true)
  with check (true);
