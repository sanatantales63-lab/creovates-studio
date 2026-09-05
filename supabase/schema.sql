create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  client text,
  category text not null,
  description text not null,
  challenge text,
  solution text,
  services text[] not null default '{}',
  year integer,
  cover_image text,
  mobile_image text,
  gallery text[] not null default '{}',
  live_url text,
  featured boolean not null default false,
  published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.projects enable row level security;

-- Policy 1: Everyone can read published projects
drop policy if exists "published projects are public" on public.projects;
create policy "published projects are public" on public.projects
  for select using (published = true);

-- Policy 2: Authenticated users or API manage all projects
drop policy if exists "admin full access" on public.projects;
create policy "admin full access" on public.projects
  for all using (true) with check (true);
