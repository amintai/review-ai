-- Quick migration script to add product metadata fields
-- Run this directly in your Supabase SQL editor or via psql

-- Add new product metadata fields to product_analyses table
ALTER TABLE public.product_analyses ADD COLUMN IF NOT EXISTS currency text;
ALTER TABLE public.product_analyses ADD COLUMN IF NOT EXISTS rating text;
ALTER TABLE public.product_analyses ADD COLUMN IF NOT EXISTS review_count text;
ALTER TABLE public.product_analyses ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE public.product_analyses ADD COLUMN IF NOT EXISTS brand text;
ALTER TABLE public.product_analyses ADD COLUMN IF NOT EXISTS availability text;
ALTER TABLE public.product_analyses ADD COLUMN IF NOT EXISTS category text;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_product_analyses_brand ON public.product_analyses(brand);
CREATE INDEX IF NOT EXISTS idx_product_analyses_category ON public.product_analyses(category);

-- Update profiles table for persona support
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS default_persona text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_pro boolean DEFAULT false;

-- Verify the changes
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'product_analyses' 
  AND table_schema = 'public'
ORDER BY ordinal_position;