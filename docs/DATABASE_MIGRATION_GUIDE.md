# Database Migration Guide - Product Metadata Fields

This guide explains how to add the new product metadata fields to your Supabase database.

---

## 🎯 What This Migration Adds

### New Columns to `product_analyses` table:
- `currency` (text) - Currency symbol (₹, $, etc.)
- `rating` (text) - Product rating ("4.3 out of 5 stars")
- `review_count` (text) - Number of reviews ("2,847 customer reviews")
- `image_url` (text) - Main product image URL
- `brand` (text) - Product brand name (Apple, Samsung, etc.)
- `availability` (text) - Stock status (In stock, Out of stock)
- `category` (text) - Product category (Electronics, Fashion, etc.)

### Updates to `profiles` table:
- `default_persona` (text) - User's default persona preference
- `is_pro` (boolean) - Pro subscription status

---

## 🚀 Migration Options

### Option 1: Automated Script (Recommended)

```bash
# Make script executable and run
chmod +x scripts/migrate-db.sh
./scripts/migrate-db.sh
```

### Option 2: Node.js Script

```bash
# Run the migration script directly
node scripts/run-migration.js
```

### Option 3: Manual SQL (Supabase Dashboard)

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase/run_migration.sql`
4. Execute the SQL

### Option 4: Supabase CLI (If Available)

```bash
# Apply the migration file
supabase db push --local

# Or apply to remote
supabase db push
```

---

## ✅ Verification Steps

After running the migration, verify it worked:

### 1. Check Table Structure

```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'product_analyses' 
  AND table_schema = 'public'
ORDER BY ordinal_position;
```

### 2. Test API Response

```bash
curl -X POST http://localhost:3000/api/amazon/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.amazon.in/dp/B08C7MG5PH"}' \
  | jq '{productName, price, currency, rating, imageUrl, brand}'
```

### 3. Expected New Fields in Response

```json
{
  "productName": "Apple MacBook Air...",
  "price": "92,900",
  "currency": "₹",
  "rating": "4.3 out of 5 stars",
  "reviewCount": "2,847 customer reviews",
  "imageUrl": "https://m.media-amazon.com/images/...",
  "brand": "Apple",
  "availability": "In stock",
  "category": "Electronics"
}
```

---

## 🔧 Troubleshooting

### Migration Script Fails

**Error**: "Missing Supabase environment variables"
**Solution**: Ensure `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

**Error**: "Migration failed: relation does not exist"
**Solution**: The `product_analyses` table might not exist. Check if you're using `analyses` or `generations` table instead.

### API Still Returns Old Format

**Issue**: New fields not appearing in API response
**Solutions**:
1. Restart your development server (`npm run dev`)
2. Check if the table name in the API matches the migrated table
3. Verify the migration actually ran by checking the database

### Database Connection Issues

**Issue**: Cannot connect to Supabase
**Solutions**:
1. Check your internet connection
2. Verify Supabase project is active
3. Confirm environment variables are correct
4. Try the manual SQL approach via dashboard

---

## 📋 Migration Files Created

- `supabase/migrations/20241201_add_product_metadata_fields.sql` - Full migration with RLS policies
- `supabase/run_migration.sql` - Simple SQL for manual execution
- `scripts/run-migration.js` - Node.js migration script
- `scripts/migrate-db.sh` - Bash script wrapper

---

## 🎉 Post-Migration Benefits

After successful migration, you'll have:

1. **Richer Product Data** - Images, ratings, brand info in API responses
2. **Better Persona Analysis** - AI has more context (price, brand, ratings)
3. **Enhanced UI Potential** - Can display product cards with images and ratings
4. **Improved Database** - Proper indexing and RLS policies

---

## 🔄 Rollback (If Needed)

If you need to rollback the migration:

```sql
-- Remove new columns (CAUTION: This will delete data)
ALTER TABLE public.product_analyses 
DROP COLUMN IF EXISTS currency,
DROP COLUMN IF EXISTS rating,
DROP COLUMN IF EXISTS review_count,
DROP COLUMN IF EXISTS image_url,
DROP COLUMN IF EXISTS brand,
DROP COLUMN IF EXISTS availability,
DROP COLUMN IF EXISTS category;

-- Remove indexes
DROP INDEX IF EXISTS idx_product_analyses_brand;
DROP INDEX IF EXISTS idx_product_analyses_category;
```

---

Run the migration and then test your enhanced product analysis API!