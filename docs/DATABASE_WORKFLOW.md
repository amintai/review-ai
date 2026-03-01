# Database Workflow - Agent Collaboration

This document outlines the workflow for database changes using agent collaboration with Supabase MCP.

---

## 🔄 **Workflow Process**

### **Step 1: Analysis & Planning (This Agent)**
- Analyze requirements for database changes
- Design schema modifications
- Create detailed migration specifications
- Document the changes needed

### **Step 2: MCP Execution (Database Agent)**
- Connect to Supabase via MCP
- Execute the planned database changes
- Verify migrations applied correctly
- Confirm schema updates

### **Step 3: Verification & Documentation**
- Update documentation with applied changes
- Test API endpoints with new schema
- Update type definitions if needed

---

## 📋 **Database Change Request Template**

When requesting database changes, provide:

### **Change Summary:**
- Brief description of what needs to be changed
- Reason for the change (feature, bug fix, optimization)

### **Schema Changes:**
- Tables to modify/create
- Columns to add/remove/modify
- Indexes to add/remove
- Constraints to add/remove

### **Migration SQL:**
- Complete SQL statements
- Rollback SQL (if needed)
- Data migration scripts (if applicable)

### **Verification Steps:**
- How to verify the changes worked
- Test queries to run
- Expected results

---

## ✅ **Current Status: Product Metadata Migration**

**Status**: ✅ **COMPLETED**
**Date**: December 1, 2024
**Migration**: `20241201_add_product_metadata_fields.sql`

### **Changes Applied:**
- Added product metadata fields to `product_analyses` table:
  - `currency` (text)
  - `rating` (text) 
  - `review_count` (text)
  - `image_url` (text)
  - `brand` (text)
  - `availability` (text)
  - `category` (text)

- Updated `profiles` table:
  - `default_persona` (text)
  - `is_pro` (boolean)

- Added performance indexes
- Updated RLS policies

### **Verification Completed:**
- ✅ Schema changes applied
- ✅ API returning new fields
- ✅ Enhanced product data extraction working

---

## 🎯 **Future Database Change Requests**

### **Template for Next Changes:**

```markdown
## Database Change Request

**Summary**: [Brief description]
**Priority**: High/Medium/Low
**Affects**: [Tables/APIs affected]

### Schema Changes:
```sql
-- SQL statements here
```

### Verification:
- [ ] Test query 1
- [ ] Test query 2
- [ ] API endpoint test

### Rollback (if needed):
```sql
-- Rollback SQL here
```
```

---

## 📚 **Documentation Updates After DB Changes**

After database changes are applied:

1. **Update API Documentation** - Reflect new fields in API responses
2. **Update Type Definitions** - Add TypeScript interfaces for new fields
3. **Update Developer Guide** - Document new database patterns
4. **Update Migration History** - Record what was changed and when

---

## 🔧 **Common Database Operations**

### **Adding New Fields:**
- Always use `ADD COLUMN IF NOT EXISTS` for safety
- Include appropriate data types and constraints
- Add indexes for frequently queried fields
- Update RLS policies if needed

### **Modifying Existing Fields:**
- Consider backward compatibility
- Plan data migration if changing types
- Test with existing data first

### **Performance Optimization:**
- Add indexes for new query patterns
- Remove unused indexes
- Analyze query performance after changes

---

## 🚨 **Emergency Rollback Process**

If a database change causes issues:

1. **Immediate**: Provide rollback SQL to database agent
2. **Execute**: Database agent runs rollback via MCP
3. **Verify**: Confirm system is back to working state
4. **Analyze**: Determine what went wrong
5. **Fix**: Create corrected migration
6. **Re-apply**: Execute fixed migration

---

This workflow ensures smooth database evolution with proper agent collaboration and MCP integration!