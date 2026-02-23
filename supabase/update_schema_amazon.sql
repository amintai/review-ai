-- Make user_id nullable to support anonymous generations
ALTER TABLE generations ALTER COLUMN user_id DROP NOT NULL;

-- Add Amazon-specific columns
ALTER TABLE generations ADD COLUMN IF NOT EXISTS asin text;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS product_name text;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS price text;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS analysis_result jsonb;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS is_public boolean DEFAULT false;

-- Add RLS policy for public reports
CREATE POLICY "Public can view public reports" ON generations
    FOR SELECT
    USING (is_public = true);
