#!/bin/bash

# Quick Persona Testing Script for ReviewAI
# Tests the same product with different personas to verify AI response changes

set -e

# Configuration
BASE_URL="${BASE_URL:-http://localhost:3000}"
PRODUCT_URL="https://www.amazon.in/dp/B08C7MG5PH"
PRODUCT_TITLE="Echo Dot (4th Gen) - Smart speaker with Alexa"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧪 ReviewAI Persona Testing${NC}"
echo -e "${BLUE}🌐 Testing against: $BASE_URL${NC}"
echo -e "${BLUE}📦 Product: $PRODUCT_TITLE${NC}"
echo ""

# Check if server is running
echo -e "${YELLOW}🔍 Checking if server is accessible...${NC}"
if ! curl -s "$BASE_URL/api/health" > /dev/null 2>&1; then
    if ! curl -s "$BASE_URL" > /dev/null 2>&1; then
        echo -e "${RED}❌ Server not accessible at $BASE_URL${NC}"
        echo -e "${YELLOW}💡 Make sure to run 'npm run dev' first${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}✅ Server is accessible${NC}"
echo ""

# Test function
test_persona() {
    local persona=$1
    local persona_name=$2
    local emoji=$3
    
    echo -e "${PURPLE}$emoji Testing $persona_name...${NC}"
    
    local payload
    if [ "$persona" = "baseline" ]; then
        payload="{\"url\":\"$PRODUCT_URL\"}"
    else
        payload="{\"url\":\"$PRODUCT_URL\",\"persona\":\"$persona\"}"
    fi
    
    local response=$(curl -s -X POST "$BASE_URL/api/amazon/analyze" \
        -H "Content-Type: application/json" \
        -d "$payload")
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}  ❌ Request failed${NC}"
        return 1
    fi
    
    # Check if response contains error
    if echo "$response" | grep -q '"error"'; then
        local error=$(echo "$response" | jq -r '.error // "Unknown error"')
        echo -e "${RED}  ❌ API Error: $error${NC}"
        return 1
    fi
    
    # Extract key fields
    local verdict=$(echo "$response" | jq -r '.verdict // "N/A"')
    local confidence=$(echo "$response" | jq -r '.confidence_score // "N/A"')
    local summary=$(echo "$response" | jq -r '.summary // "N/A"' | cut -c1-100)
    
    # Display results
    local verdict_emoji
    case $verdict in
        "BUY") verdict_emoji="✅" ;;
        "SKIP") verdict_emoji="❌" ;;
        "CAUTION") verdict_emoji="⚠️" ;;
        *) verdict_emoji="❓" ;;
    esac
    
    echo -e "  ${verdict_emoji} Verdict: ${GREEN}$verdict${NC} (${confidence}% confidence)"
    echo -e "  📝 Summary: $summary..."
    echo ""
    
    # Store for comparison
    echo "$persona_name|$verdict|$confidence|$summary" >> /tmp/persona_results.txt
}

# Clear previous results
rm -f /tmp/persona_results.txt

# Test baseline (no persona)
test_persona "baseline" "Baseline (No Persona)" "🤖"

# Test all personas
test_persona "budget_buyer" "Budget Buyer" "💰"
test_persona "durability_focused" "Durability Focused" "🔧"
test_persona "risk_averse" "Risk-Averse" "🛡️"
test_persona "tech_enthusiast" "Tech Enthusiast" "⚡"
test_persona "gift_buyer" "Gift Buyer" "🎁"

# Analysis
echo -e "${BLUE}📊 ANALYSIS${NC}"
echo "============================================"

if [ -f /tmp/persona_results.txt ]; then
    # Count unique verdicts
    unique_verdicts=$(cut -d'|' -f2 /tmp/persona_results.txt | sort | uniq | wc -l)
    all_verdicts=$(cut -d'|' -f2 /tmp/persona_results.txt | sort | uniq | tr '\n' ', ' | sed 's/,$//')
    
    if [ "$unique_verdicts" -gt 1 ]; then
        echo -e "${GREEN}✅ SUCCESS: Found $unique_verdicts different verdicts!${NC}"
        echo -e "${GREEN}   Verdicts: $all_verdicts${NC}"
    else
        echo -e "${YELLOW}⚠️  All personas gave the same verdict${NC}"
        echo -e "${YELLOW}   This might indicate the product is very clear-cut${NC}"
    fi
    
    echo ""
    echo -e "${BLUE}📋 SUMMARY TABLE:${NC}"
    printf "%-20s %-10s %-12s %s\n" "PERSONA" "VERDICT" "CONFIDENCE" "SUMMARY"
    echo "--------------------------------------------------------------------"
    
    while IFS='|' read -r persona verdict confidence summary; do
        printf "%-20s %-10s %-12s %s\n" "$persona" "$verdict" "$confidence%" "${summary:0:30}..."
    done < /tmp/persona_results.txt
    
    # Clean up
    rm -f /tmp/persona_results.txt
else
    echo -e "${RED}❌ No results to analyze${NC}"
fi

echo ""
echo -e "${GREEN}✨ Testing complete!${NC}"
echo ""
echo -e "${YELLOW}💡 What to look for:${NC}"
echo "   • Different verdicts across personas"
echo "   • Persona-specific language in summaries"
echo "   • Budget Buyer: mentions 'price', 'value'"
echo "   • Durability Focused: mentions 'quality', 'longevity'"
echo "   • Risk-Averse: more cautious language"
echo ""
echo -e "${YELLOW}🔧 Try different products:${NC}"
echo "   • Products with mixed reviews work best"
echo "   • Change PRODUCT_URL variable to test others"