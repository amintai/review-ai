#!/bin/bash

# Database Migration Script for Product Metadata Fields
# This script runs the migration to add new product data fields

set -e

echo "🚀 ReviewAI Database Migration"
echo "Adding product metadata fields..."
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found"
    echo "Please create .env.local with your Supabase credentials"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run the migration script
echo "🔧 Running migration..."
node scripts/run-migration.js

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Migration completed successfully!"
    echo ""
    echo "🎯 Next steps:"
    echo "1. Test the API to verify new fields are working"
    echo "2. Update your frontend to display the new product data"
    echo "3. Test persona analysis with enhanced product context"
    echo ""
    echo "🧪 Test command:"
    echo "curl -X POST http://localhost:3000/api/amazon/analyze \\"
    echo "  -H \"Content-Type: application/json\" \\"
    echo "  -d '{\"url\": \"https://www.amazon.in/dp/B08C7MG5PH\"}' | jq"
else
    echo ""
    echo "❌ Migration failed"
    echo ""
    echo "📋 Manual migration steps:"
    echo "1. Go to your Supabase dashboard"
    echo "2. Navigate to SQL Editor"
    echo "3. Copy and run the SQL from: supabase/run_migration.sql"
    exit 1
fi