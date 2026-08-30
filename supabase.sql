-- QUICK SERVE DATABASE
-- Run this in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text,
  role text not null check (role in ('customer','provider')),
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists public.providers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references public.profiles(id) on delete cascade,
  name text not null,
  service_category text not null check (service_category in ('Plumbing','Electrical','AC Repair','Cleaning','Carpentry','Appliance Repair')),
  location text not null,
  experience integer default 0 check (experience >= 0),
  price numeric default 0 check (price >= 0),
  rating numeric(2,1) default 5.0 check (rating >= 0 and rating <= 5),
  description text,
  created_at timestamptz default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  ticket_id text unique not null,
  customer_id uuid not null references public.profiles(id) on delete cascade,
  provider_id uuid not null references public.providers(id) on delete restrict,
  service_category text not null,
  date date not null,
  time time not null,
  location text not null,
  description text not null,
  priority text not null default 'normal' check (priority in ('urgent','important','normal','low')),
  status text not null default 'pending' check (status in ('pending','accepted','in_progress','completed','rejected')),
  reviewed boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid unique not null references public.bookings(id) on delete cascade,
  customer_id uuid not null references public.profiles(id) on delete cascade,
  provider_id uuid not null references public.providers(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  review_text text not null,
  created_at timestamptz default now()
);

create index if not exists bookings_customer_idx on public.bookings(customer_id);
create index if not exists bookings_provider_idx on public.bookings(provider_id);
create index if not exists providers_category_idx on public.providers(service_category);

alter table public.profiles enable row level security;
alter table public.providers enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;

-- Profiles
create policy "profiles own select" on public.profiles for select using (auth.uid() = id);
create policy "profiles own insert" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles own update" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

-- Providers are publicly browsable; owners can manage their own profile.
create policy "providers public read" on public.providers for select using (true);
create policy "providers own insert" on public.providers for insert with check (auth.uid() = user_id);
create policy "providers own update" on public.providers for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Bookings: customers see/create their own; providers see assigned bookings.
create policy "customer read own bookings" on public.bookings for select using (auth.uid() = customer_id);
create policy "provider read assigned bookings" on public.bookings for select using (
  exists (select 1 from public.providers p where p.id = provider_id and p.user_id = auth.uid())
);
create policy "customer create booking" on public.bookings for insert with check (auth.uid() = customer_id);
create policy "provider update assigned booking" on public.bookings for update using (
  exists (select 1 from public.providers p where p.id = provider_id and p.user_id = auth.uid())
) with check (
  exists (select 1 from public.providers p where p.id = provider_id and p.user_id = auth.uid())
);

-- Reviews: customer can create/read own; provider can read their reviews.
create policy "customer read own reviews" on public.reviews for select using (auth.uid() = customer_id);
create policy "provider read own reviews" on public.reviews for select using (
  exists (select 1 from public.providers p where p.id = provider_id and p.user_id = auth.uid())
);
create policy "customer create completed review" on public.reviews for insert with check (
  auth.uid() = customer_id
  and exists (
    select 1 from public.bookings b
    where b.id = booking_id
      and b.customer_id = auth.uid()
      and b.status = 'completed'
  )
);

-- Optional: keep provider average rating updated when a review is inserted.
create or replace function public.update_provider_rating()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.providers
  set rating = (select round(avg(rating)::numeric,1) from public.reviews where provider_id = new.provider_id)
  where id = new.provider_id;
  return new;
end $$;

drop trigger if exists trg_update_provider_rating on public.reviews;
create trigger trg_update_provider_rating
after insert on public.reviews
for each row execute function public.update_provider_rating();

-- Demo provider seed:
-- First create real provider accounts through auth.html.
-- Then insert rows using their profile UUIDs, or use the registration form.
