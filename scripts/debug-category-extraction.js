#!/usr/bin/env node

/**
 * Debug Category Extraction
 * 
 * This script helps debug why category extraction might not be working
 * by showing the HTML patterns we're trying to match.
 */

const { scrapeAmazonData } = require('../src/lib/amazon-scraper.ts');

async function debugCategoryExtraction(url) {
    console.log('🔍 Debugging Category Extraction');
    console.log(`URL: ${url}`);
    console.log('');

    try {
        // Fetch the page HTML directly to inspect
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
            }
        });

        const html = await response.text();
        
        console.log('📋 Looking for category patterns...');
        
        // Check for breadcrumb navigation
        const breadcrumbPatterns = [
            /wayfinding-breadcrumbs/i,
            /a-breadcrumb/i,
            /nav-subnav/i,
            /Department/i
        ];

        breadcrumbPatterns.forEach((pattern, index) => {
            const matches = html.match(pattern);
            console.log(`Pattern ${index + 1} (${pattern}): ${matches ? '✅ Found' : '❌ Not found'}`);
        });

        // Extract some sample breadcrumb HTML if found
        const breadcrumbMatch = html.match(/<nav[^>]*id="wayfinding-breadcrumbs[^>]*>[\s\S]{0,500}/i);
        if (breadcrumbMatch) {
            console.log('\n📄 Sample breadcrumb HTML:');
            console.log(breadcrumbMatch[0].substring(0, 300) + '...');
        }

        // Check for department in product details
        const departmentMatch = html.match(/Department[\s\S]{0,200}/i);
        if (departmentMatch) {
            console.log('\n🏷️ Department section found:');
            console.log(departmentMatch[0]);
        }

        // Try the actual scraper
        console.log('\n🤖 Running actual scraper...');
        const result = await scrapeAmazonData(url);
        
        console.log('\n📊 Scraper Results:');
        console.log(`Product: ${result.productName}`);
        console.log(`Brand: ${result.brand || 'Not found'}`);
        console.log(`Category: ${result.category || 'Not found'}`);
        console.log(`Rating: ${result.rating || 'Not found'}`);
        console.log(`Price: ${result.price || 'Not found'}`);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// Test with MacBook URL
const testUrl = 'https://www.amazon.in/dp/B08C7MG5PH';

if (require.main === module) {
    debugCategoryExtraction(testUrl);
}

module.exports = { debugCategoryExtraction };