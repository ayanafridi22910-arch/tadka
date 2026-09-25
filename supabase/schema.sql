-- =====================================================================
-- Tadka — DB schema (PRD v1.0, section 7)
-- Run this in Supabase Dashboard → SQL Editor.
-- Auth users live in Supabase `auth.users`; `creators` extends them.
-- =====================================================================

-- ---------- CREATORS ----------
create table if not exists public.creators (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique not null,
  display_name text not null default '',
  bio text default '',
  avatar_url text,
  upi_id text,
  earnings_public boolean not null default false,
  lang text not null default 'hi' check (lang in ('hi', 'en')),
  created_at timestamptz not null default now()
);

-- ---------- PRODUCTS ----------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.creators (id) on delete cascade,
  title text not null,
  description text default '',
  price_inr integer not null check (price_inr >= 0),
  file_url text,
  cover_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  is_drop boolean not null default false,
  drop_starts_at timestamptz,
  drop_ends_at timestamptz,
  max_qty integer,
  sold_qty integer not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- ORDERS ----------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id),
  buyer_name text not null,
  buyer_email text not null,
  amount_inr integer not null,
  razorpay_payment_id text unique,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'failed', 'refunded')),
  referral_code_used text,
  created_at timestamptz not null default now()
);

-- ---------- REFERRALS ----------
create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id),
  referrer_code text not null,
  commission_inr integer not null default 0,
  paid boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- PAYOUTS ----------
create table if not exists public.payouts (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.creators (id) on delete cascade,
  amount_inr integer not null,
  status text not null default 'pending' check (status in ('pending', 'paid')),
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- Row Level Security
-- =====================================================================
alter table public.creators  enable row level security;
alter table public.products  enable row level security;
alter table public.orders    enable row level security;
alter table public.referrals enable row level security;
alter table public.payouts   enable row level security;

-- Creators: public read, own write
create policy "creators_public_read" on public.creators
  for select using (true);
create policy "creators_own_write" on public.creators
  for update using (auth.uid() = id);
create policy "creators_own_insert" on public.creators
  for insert with check (auth.uid() = id);

-- Products: published readable by all; creator manages own
create policy "products_public_read" on public.products
  for select using (status = 'published' or creator_id = auth.uid());
create policy "products_own_write" on public.products
  for all using (creator_id = auth.uid());

-- Orders: creator sees orders for own products (insert happens server-side
-- via service-role after Razorpay webhook — never from the browser)
create policy "orders_creator_read" on public.orders
  for select using (
    exists (
      select 1 from public.products p
      where p.id = orders.product_id and p.creator_id = auth.uid()
    )
  );

-- Referrals/payouts: service-role only (no public policies = locked)

-- =====================================================================
-- Helpful indexes
-- =====================================================================
create index if not exists products_creator_idx on public.products (creator_id);
create index if not exists orders_product_idx on public.orders (product_id);
create index if not exists orders_status_idx on public.orders (status);
