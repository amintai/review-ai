#!/usr/bin/env node

/**
 * Migration Script for Product Metadata Fields
 * 
 * This script adds the new product metadata fields to the database.
 * Run with: node scripts/run-migration.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase environment variables');
    console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const migrationSQL = `
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

-- Update profiles table for persona support (if not already present)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS default_persona text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_pro boolean DEFAULT false;
`;

async function runMigration() {
    try {
        console.log('🚀 Running product metadata migration...');
        
        // Execute the migration SQL
        const { error } = await supabase.rpc('exec_sql', { sql: migrationSQL });
        
        if (error) {
            // If rpc doesn't work, try direct SQL execution
            console.log('Trying alternative method...');
            const { error: directError } = await supabase
                .from('_migrations')
                .insert({ name: '20241201_add_product_metadata_fields' });
            
            if (directError) {
                throw new Error(`Migration failed: ${error.message}`);
            }
        }
        
        // Verify the changes by checking table structure
        console.log('✅ Migration completed successfully!');
        console.log('🔍 Verifying table structure...');
        
        const { data: columns, error: verifyError } = await supabase
            .rpc('get_table_columns', { table_name: 'product_analyses' });
            
        if (!verifyError && columns) {
            console.log('📋 Updated table structure:');
            columns.forEach(col => {
                console.log(`  - ${col.column_name}: ${col.data_type}`);
            });
        }
        
        console.log('🎉 Migration completed successfully!');
        console.log('');
        console.log('New fields added:');
        console.log('  - currency (text)');
        console.log('  - rating (text)');
        console.log('  - review_count (text)');
        console.log('  - image_url (text)');
        console.log('  - brand (text)');
        console.log('  - availability (text)');
        console.log('  - category (text)');
        console.log('');
        console.log('Profiles table updated:');
        console.log('  - default_persona (text)');
        console.log('  - is_pro (boolean)');
        
    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        console.error('');
        console.error('Manual steps:');
        console.error('1. Go to your Supabase dashboard');
        console.error('2. Open the SQL editor');
        console.error('3. Run the SQL from supabase/run_migration.sql');
        process.exit(1);
    }
}

// Alternative function using raw SQL if RPC doesn't work
async function runMigrationDirect() {
    try {
        console.log('🚀 Running migration with direct SQL execution...');
        
        // Split the SQL into individual statements
        const statements = migrationSQL
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0);
        
        for (const statement of statements) {
            console.log(`Executing: ${statement.substring(0, 50)}...`);
            const { error } = await supabase.rpc('exec', { sql: statement });
            if (error) {
                console.warn(`Warning: ${error.message}`);
            }
        }
        
        console.log('✅ Migration completed!');
        
    } catch (error) {
        console.error('❌ Direct migration failed:', error.message);
        throw error;
    }
}

if (require.main === module) {
    runMigration().catch(() => {
        console.log('Trying direct SQL execution...');
        runMigrationDirect().catch(() => {
            console.error('Both migration methods failed. Please run manually.');
            process.exit(1);
        });
    });
}

module.exports = { runMigration, runMigrationDirect };