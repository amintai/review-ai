#!/usr/bin/env node

/**
 * Persona Testing Script for ReviewAI
 * 
 * This script tests the same Amazon product with different personas
 * to verify that the AI responses change based on persona context.
 */

const testProduct = {
  url: "https://www.amazon.in/dp/B08C7MG5PH", // Echo Dot India - good for testing
  product_title: "Echo Dot (4th Gen) Smart speaker with Alexa",
  price: "₹4,499",
  reviews: [
    "Great sound quality for the price, but build feels a bit cheap",
    "Broke after 6 months of normal use, very disappointed with durability", 
    "Perfect for my daily music, excellent value for money",
    "Sound is amazing but had some connectivity issues initially",
    "Returned due to poor build quality, but Alexa features worked well",
    "Good starter smart speaker, does what it promises",
    "Not as durable as expected, plastic feels flimsy"
  ]
};

const personas = [
  'budget_buyer',
  'durability_focused', 
  'risk_averse',
  'tech_enthusiast',
  'gift_buyer'
];

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function testPersona(persona) {
  try {
    console.log(`\n🎭 Testing ${persona}...`);
    
    const response = await fetch(`${BASE_URL}/api/amazon/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...testProduct,
        persona: persona
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    return {
      persona,
      verdict: result.verdict,
      confidence: result.confidence_score,
      trust: result.trust_score,
      summary: result.summary,
      perfect_for: result.perfect_for,
      deal_breakers: result.deal_breakers,
      buyer_psychology: result.buyer_psychology
    };
  } catch (error) {
    console.error(`❌ Error testing ${persona}:`, error.message);
    return null;
  }
}

async function testBaseline() {
  try {
    console.log(`\n🤖 Testing baseline (no persona)...`);
    
    const response = await fetch(`${BASE_URL}/api/amazon/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testProduct) // No persona
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    return {
      persona: 'baseline',
      verdict: result.verdict,
      confidence: result.confidence_score,
      trust: result.trust_score,
      summary: result.summary,
      perfect_for: result.perfect_for,
      deal_breakers: result.deal_breakers,
      buyer_psychology: result.buyer_psychology
    };
  } catch (error) {
    console.error(`❌ Error testing baseline:`, error.message);
    return null;
  }
}

function displayResults(results) {
  console.log('\n📊 PERSONA COMPARISON RESULTS');
  console.log('='.repeat(80));
  
  // Verdict comparison
  console.log('\n🎯 VERDICTS:');
  results.forEach(r => {
    if (r) {
      const emoji = r.verdict === 'BUY' ? '✅' : r.verdict === 'SKIP' ? '❌' : '⚠️';
      console.log(`  ${emoji} ${r.persona.padEnd(20)} → ${r.verdict} (${r.confidence}% confidence)`);
    }
  });
  
  // Summary comparison
  console.log('\n📝 SUMMARIES:');
  results.forEach(r => {
    if (r) {
      console.log(`\n${r.persona.toUpperCase()}:`);
      console.log(`  "${r.summary}"`);
    }
  });
  
  // Perfect for comparison
  console.log('\n👥 PERFECT FOR:');
  results.forEach(r => {
    if (r && r.perfect_for) {
      console.log(`\n${r.persona.toUpperCase()}:`);
      r.perfect_for.forEach(item => console.log(`  • ${item}`));
    }
  });
  
  // Deal breakers comparison
  console.log('\n🚫 DEAL BREAKERS:');
  results.forEach(r => {
    if (r && r.deal_breakers) {
      console.log(`\n${r.persona.toUpperCase()}:`);
      r.deal_breakers.forEach(item => console.log(`  • ${item}`));
    }
  });
}

function analyzePersonaDifferences(results) {
  console.log('\n🔍 PERSONA ANALYSIS:');
  console.log('='.repeat(50));
  
  const validResults = results.filter(r => r !== null);
  const verdicts = validResults.map(r => r.verdict);
  const uniqueVerdicts = [...new Set(verdicts)];
  
  if (uniqueVerdicts.length > 1) {
    console.log('✅ SUCCESS: Personas are producing different verdicts!');
    console.log(`   Found ${uniqueVerdicts.length} different verdicts: ${uniqueVerdicts.join(', ')}`);
  } else {
    console.log('⚠️  WARNING: All personas produced the same verdict');
    console.log('   This might indicate personas aren\'t working or the product is very clear-cut');
  }
  
  // Check for persona-specific language
  const budgetResult = validResults.find(r => r.persona === 'budget_buyer');
  const durabilityResult = validResults.find(r => r.persona === 'durability_focused');
  const riskResult = validResults.find(r => r.persona === 'risk_averse');
  
  console.log('\n🔤 LANGUAGE ANALYSIS:');
  
  if (budgetResult && (budgetResult.summary.includes('price') || budgetResult.summary.includes('value'))) {
    console.log('✅ Budget Buyer: Uses price/value language');
  }
  
  if (durabilityResult && (durabilityResult.summary.includes('durability') || durabilityResult.summary.includes('quality'))) {
    console.log('✅ Durability Focused: Uses durability/quality language');
  }
  
  if (riskResult && (riskResult.summary.includes('caution') || riskResult.summary.includes('risk'))) {
    console.log('✅ Risk-Averse: Uses caution/risk language');
  }
}

async function main() {
  console.log('🧪 ReviewAI Persona Testing Script');
  console.log(`🌐 Testing against: ${BASE_URL}`);
  console.log(`📦 Test Product: ${testProduct.product_title}`);
  
  // Test baseline first
  const baselineResult = await testBaseline();
  
  // Test all personas
  const personaResults = [];
  for (const persona of personas) {
    const result = await testPersona(persona);
    personaResults.push(result);
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Combine results
  const allResults = [baselineResult, ...personaResults].filter(r => r !== null);
  
  if (allResults.length === 0) {
    console.log('❌ No successful tests. Check if the server is running and accessible.');
    process.exit(1);
  }
  
  // Display results
  displayResults(allResults);
  analyzePersonaDifferences(allResults);
  
  console.log('\n✨ Testing complete!');
  console.log('\n💡 Tips:');
  console.log('   • Look for different verdicts across personas');
  console.log('   • Check if summaries use persona-specific language');
  console.log('   • Verify deal_breakers reflect persona priorities');
  console.log('   • Try different products for more varied results');
}

// Handle command line usage
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  });
}

module.exports = { testPersona, testBaseline, displayResults, analyzePersonaDifferences };