# Database Migrations

This directory contains SQL migration files for the ReviewAI database.

## Running Migrations

### Option 1: Using Supabase Dashboard (Recommended for Production)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of the migration file you want to run
4. Paste into the SQL editor
5. Click **Run** to execute the migration

### Option 2: Using Supabase CLI (For Development)

If you have Supabase CLI installed:

```bash
# Link your project (first time only)
supabase link --project-ref your-project-ref

# Run all pending migrations
supabase db push
```

### Option 3: Manual Execution

You can also run migrations manually using any PostgreSQL client:

```bash
psql -h your-db-host -U postgres -d postgres -f supabase/migrations/20240221_create_waitlist_table.sql
```

## Available Migrations

### 20240221_create_waitlist_table.sql

Creates the `waitlist` table for capturing early user signups.

**What it does:**
- Creates `waitlist` table with columns: id, email, created_at, notified, source
- Adds unique constraint on email column
- Creates indexes for efficient querying
- Adds table and column comments for documentation

**To run this migration:**
1. Open Supabase Dashboard > SQL Editor
2. Copy contents of `supabase/migrations/20240221_create_waitlist_table.sql`
3. Paste and run

## Verifying Migrations

After running a migration, verify it was successful:

```sql
-- Check if waitlist table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'waitlist';

-- Check table structure
\d waitlist

-- Or in SQL Editor:
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'waitlist'
ORDER BY ordinal_position;
```

## Rollback

If you need to rollback the waitlist table migration:

```sql
DROP TABLE IF EXISTS waitlist CASCADE;
```

**Warning:** This will permanently delete all waitlist data!

## Environment Variables

Make sure these environment variables are set:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (for admin operations)

See `.env.local.example` for the complete list.
