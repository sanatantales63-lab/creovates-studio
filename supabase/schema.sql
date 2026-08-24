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
  gallery text[] not null default '{}',
  live_url text,
  featured boolean not null default false,
  published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.projects enable row level security;
create policy "published projects are public" on public.projects for select using (published = true);
create policy "authenticated users manage projects" on public.projects for all to authenticated using (true) with check (true);
