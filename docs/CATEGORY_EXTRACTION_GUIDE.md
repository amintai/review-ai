# Category Extraction Guide

This guide explains what the category field should capture and how to debug extraction issues.

---

## 🏷️ **What Category Represents**

The category field extracts Amazon's product classification to help personas understand the product context.

### **Category Examples:**

| Product Type | Expected Category |
|--------------|-------------------|
| MacBook, Laptops | "Electronics" or "Computers & Accessories" |
| iPhone, Android | "Electronics" or "Cell Phones & Accessories" |
| Air Fryer, Microwave | "Home & Kitchen" |
| T-Shirts, Jeans | "Fashion" or "Clothing, Shoes & Jewelry" |
| Books | "Books" |
| Headphones | "Electronics" |
| Furniture | "Home & Garden" |
| Supplements | "Health & Personal Care" |

---

## 🔍 **Where Amazon Shows Categories**

### **1. Breadcrumb Navigation**
```html
<nav id="wayfinding-breadcrumbs_feature_div">
  <ol class="a-breadcrumb">
    <li><a href="/electronics">Electronics</a></li>
    <li><a href="/computers">Computers & Accessories</a></li>
    <li><span>Laptops</span></li>
  </ol>
</nav>
```

### **2. Department in Product Details**
```html
<tr>
  <td class="a-span3">
    <span class="a-size-base">Department</span>
  </td>
  <td class="a-span9">
    <span>Electronics</span>
  </td>
</tr>
```

### **3. Navigation Menu**
```html
<div id="nav-subnav">
  <a class="nav-a" href="/electronics">Electronics</a>
</div>
```

---

## 🧪 **Testing Category Extraction**

### **Debug Script**
```bash
# Run the debug script to see what patterns are found
node scripts/debug-category-extraction.js
```

### **Manual Test**
```bash
# Test API and check category field
curl -X POST http://localhost:3000/api/amazon/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.amazon.in/dp/B08C7MG5PH"}' \
  | jq '.category'
```

### **Expected Results:**
- **MacBook**: "Electronics" or "Computers & Accessories"
- **If null**: Category extraction patterns need updating

---

## 🔧 **Why Category Might Be Missing**

### **Common Issues:**

1. **HTML Structure Changes**
   - Amazon frequently updates their HTML
   - Breadcrumb selectors might not match current structure
   - Different layouts for different product types

2. **Regional Differences**
   - Amazon.in might have different HTML than Amazon.com
   - Different CSS classes or IDs
   - Different navigation structure

3. **Product-Specific Layouts**
   - Some products don't show clear categories
   - Digital products vs physical products
   - Different seller types (Amazon vs third-party)

### **Debugging Steps:**

1. **Check HTML Source**
   - View page source of the Amazon product page
   - Search for "breadcrumb", "department", or "category"
   - Look for navigation elements

2. **Test Different Products**
   - Try products from different categories
   - Compare HTML structures
   - See if some work better than others

3. **Update Extraction Patterns**
   - Add new regex patterns based on actual HTML
   - Test with multiple products
   - Ensure patterns are robust

---

## 🎯 **Category Benefits for Personas**

### **Why Category Matters:**

**Budget Buyer:**
- Electronics: Compare with other tech deals
- Fashion: Consider seasonal pricing
- Books: Look for used/digital alternatives

**Durability Focused:**
- Electronics: Check for warranty and repairability
- Home & Kitchen: Look for commercial-grade options
- Fashion: Consider material quality

**Risk-Averse:**
- Electronics: Check return policies for tech
- Fashion: Consider sizing and fit issues
- Books: Lower risk category overall

**Tech Enthusiast:**
- Electronics: Deep dive into specifications
- Other categories: Less technical focus needed

---

## 🔄 **Fallback Strategies**

If category extraction fails:

### **1. Infer from Product Name**
```javascript
// Simple category inference
const inferCategory = (productName) => {
  const name = productName.toLowerCase();
  if (name.includes('laptop') || name.includes('macbook') || name.includes('phone')) {
    return 'Electronics';
  }
  if (name.includes('shirt') || name.includes('shoes') || name.includes('dress')) {
    return 'Fashion';
  }
  // ... more patterns
  return null;
};
```

### **2. Use Brand Context**
```javascript
// Brand-based category hints
const brandCategories = {
  'Apple': 'Electronics',
  'Samsung': 'Electronics', 
  'Nike': 'Fashion',
  'Adidas': 'Fashion'
};
```

### **3. Default to Generic**
- Use "General" or "Other" as fallback
- Still provides some context to personas
- Better than null/undefined

---

## 🚀 **Improving Category Extraction**

### **Next Steps:**

1. **Run Debug Script** - See what HTML patterns exist
2. **Update Regex Patterns** - Add patterns that match Amazon.in
3. **Test Multiple Products** - Verify across different categories
4. **Add Fallback Logic** - Infer from product name/brand if needed
5. **Monitor Success Rate** - Track how often category is extracted

The category field helps personas understand product context and make more informed recommendations!