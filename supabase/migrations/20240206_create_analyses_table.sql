-- Create analyses table for Amazon Product Intelligence
create table public.analyses (
  id uuid not null default gen_random_uuid(),
  user_id uuid references auth.users(id), -- Nullable for anon/public generation if we choose
  amazon_asin text not null,
  product_title text not null,
  verdict jsonb, -- { decision: "BUY" | "SKIP", confidence: 95, summary: "..." }
  hooks jsonb,   -- { pros: [], cons: [], objections: [] }
  trust_score integer,
  raw_analysis jsonb,
  created_at timestamptz default now(),
  primary key (id)
);

-- Enable RLS
alter table public.analyses enable row level security;

-- Policy: Everyone can read analyses (Public Reports)
create policy "Anyone can read analyses"
  on public.analyses for select
  using (true);

-- Policy: Authenticated users can insert
create policy "Users can insert their own analyses"
  on public.analyses for insert
  with check (auth.uid() = user_id);
