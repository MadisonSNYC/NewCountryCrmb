-- Enable Row Level Security
alter table auth.users enable row level security;

-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  business_name text,
  business_type text,
  contact_email text,
  phone text,
  address text,
  website text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Products table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles on delete cascade not null,
  name text not null,
  description text,
  price decimal(10,2) not null,
  category text,
  inventory_count integer default 0,
  is_available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Customers table
create table public.customers (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles on delete cascade not null,
  name text not null,
  email text,
  phone text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles on delete cascade not null,
  customer_id uuid references public.customers on delete set null,
  status text not null default 'new',
  total_amount decimal(10,2) not null,
  payment_status text default 'pending',
  pickup_date timestamp with time zone,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order Items table
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders on delete cascade not null,
  product_id uuid references public.products on delete restrict not null,
  quantity integer not null,
  price_per_unit decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS policies
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- RLS Policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can view own products"
  on public.products for select
  using (auth.uid() = profile_id);

create policy "Users can insert own products"
  on public.products for insert
  with check (auth.uid() = profile_id);

create policy "Users can update own products"
  on public.products for update
  using (auth.uid() = profile_id);

create policy "Users can delete own products"
  on public.products for delete
  using (auth.uid() = profile_id);

-- Similar policies for customers, orders, and order_items
-- Add indexes for better query performance
create index products_profile_id_idx on public.products(profile_id);
create index customers_profile_id_idx on public.customers(profile_id);
create index orders_profile_id_idx on public.orders(profile_id);
create index orders_customer_id_idx on public.orders(customer_id);
create index order_items_order_id_idx on public.order_items(order_id);
create index order_items_product_id_idx on public.order_items(product_id);
