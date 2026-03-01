-- Add enhanced product metadata fields to support richer product data
-- Migration: Add product metadata fields for enhanced Amazon product intelligence

-- First, let's check if we're using 'analyses' or 'product_analyses' table
-- Based on the API code, it seems we're using 'product_analyses', so let's create/update that

-- Create product_analyses table if it doesn't exist (migration from analyses table)
CREATE TABLE IF NOT EXISTS public.product_analyses (
  id uuid not null default gen_random_uuid(),
  user_id uuid references auth.users(id), -- Nullable for anonymous analyses
  asin text not null,
  product_name text not null,
  price text,
  analysis_result jsonb not null, -- The AI analysis JSON
  is_public boolean default true,
  marketplace text default 'amazon.in',
  persona_used text, -- PersonaId enum value
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (id)
);

-- Add new product metadata fields
ALTER TABLE public.product_analyses ADD COLUMN IF NOT EXISTS currency text;
ALTER TABLE public.product_analyses ADD COLUMN IF NOT EXISTS rating text;
ALTER TABLE public.product_analyses ADD COLUMN IF NOT EXISTS review_count text;
ALTER TABLE public.product_analyses ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE public.product_analyses ADD COLUMN IF NOT EXISTS brand text;
ALTER TABLE public.product_analyses ADD COLUMN IF NOT EXISTS availability text;
ALTER TABLE public.product_analyses ADD COLUMN IF NOT EXISTS category text;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_product_analyses_asin ON public.product_analyses(asin);
CREATE INDEX IF NOT EXISTS idx_product_analyses_user_id ON public.product_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_product_analyses_created_at ON public.product_analyses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_product_analyses_persona ON public.product_analyses(persona_used);
CREATE INDEX IF NOT EXISTS idx_product_analyses_public ON public.product_analyses(is_public) WHERE is_public = true;

-- Enable RLS
ALTER TABLE public.product_analyses ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Policy: Everyone can read public analyses
DROP POLICY IF EXISTS "Anyone can read public analyses" ON public.product_analyses;
CREATE POLICY "Anyone can read public analyses"
  ON public.product_analyses FOR SELECT
  USING (is_public = true);

-- Policy: Users can read their own analyses (including private ones)
DROP POLICY IF EXISTS "Users can read own analyses" ON public.product_analyses;
CREATE POLICY "Users can read own analyses"
  ON public.product_analyses FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Authenticated users can insert their own analyses
DROP POLICY IF EXISTS "Users can insert analyses" ON public.product_analyses;
CREATE POLICY "Users can insert analyses"
  ON public.product_analyses FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL); -- Allow anonymous inserts

-- Policy: Users can update their own analyses
DROP POLICY IF EXISTS "Users can update own analyses" ON public.product_analyses;
CREATE POLICY "Users can update own analyses"
  ON public.product_analyses FOR UPDATE
  USING (auth.uid() = user_id);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_product_analyses_updated_at ON public.product_analyses;
CREATE TRIGGER update_product_analyses_updated_at
    BEFORE UPDATE ON public.product_analyses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Update profiles table to include persona and pro status if not already present
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS default_persona text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_pro boolean DEFAULT false;

-- Add index on profiles for persona queries
CREATE INDEX IF NOT EXISTS idx_profiles_default_persona ON public.profiles(default_persona);

-- Comments for documentation
COMMENT ON TABLE public.product_analyses IS 'Amazon product intelligence analyses with enhanced metadata';
COMMENT ON COLUMN public.product_analyses.currency IS 'Product currency symbol (₹, $, etc.)';
COMMENT ON COLUMN public.product_analyses.rating IS 'Product rating text (e.g., "4.3 out of 5 stars")';
COMMENT ON COLUMN public.product_analyses.review_count IS 'Number of reviews text (e.g., "2,847 customer reviews")';
COMMENT ON COLUMN public.product_analyses.image_url IS 'Main product image URL from Amazon';
COMMENT ON COLUMN public.product_analyses.brand IS 'Product brand name (Apple, Samsung, etc.)';
COMMENT ON COLUMN public.product_analyses.availability IS 'Stock status (In stock, Currently unavailable, etc.)';
COMMENT ON COLUMN public.product_analyses.category IS 'Product category from Amazon breadcrumbs';
COMMENT ON COLUMN public.product_analyses.persona_used IS 'PersonaId used for analysis (budget_buyer, durability_focused, etc.)';
COMMENT ON COLUMN public.profiles.default_persona IS 'User default persona preference';
COMMENT ON COLUMN public.profiles.is_pro IS 'Whether user has Pro subscription';