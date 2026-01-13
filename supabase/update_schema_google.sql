-- Add columns to store Google tokens in the profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS google_refresh_token text,
ADD COLUMN IF NOT EXISTS google_location_id text;

-- Optional: Add a check to ensure we don't store plain access tokens if we can avoid it (we mainly need refresh)
-- Ensure RLS allows the user to view their own connection status (but maybe mask the token)
