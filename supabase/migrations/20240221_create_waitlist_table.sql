-- Create waitlist table for capturing early user signups
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notified BOOLEAN NOT NULL DEFAULT FALSE,
  source TEXT
);

-- Create index for efficient duplicate checking
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create index for querying unnotified users
CREATE INDEX IF NOT EXISTS idx_waitlist_notified ON waitlist(notified) WHERE notified = FALSE;

-- Add comment to table
COMMENT ON TABLE waitlist IS 'Stores email addresses of users interested in ReviewAI launch notifications';

-- Add comments to columns
COMMENT ON COLUMN waitlist.id IS 'Unique identifier for each waitlist entry';
COMMENT ON COLUMN waitlist.email IS 'User email address (unique constraint enforced)';
COMMENT ON COLUMN waitlist.created_at IS 'Timestamp when the entry was created';
COMMENT ON COLUMN waitlist.notified IS 'Flag indicating if user has been notified about launch';
COMMENT ON COLUMN waitlist.source IS 'Optional tracking field for signup source (e.g., homepage, blog)';
