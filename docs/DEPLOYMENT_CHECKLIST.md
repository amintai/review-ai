# Deployment Checklist - Dashboard Sync & Auth Gate

## Pre-Deployment Verification

### ✅ Code Changes
- [x] Middleware created (`src/middleware.ts`)
- [x] Report page updated with auth check
- [x] Login page enhanced with report access notice
- [x] Extension overlay updated
- [x] All files compile without errors
- [x] Extension builds successfully

### ✅ Documentation
- [x] Security documentation created
- [x] Implementation guide written
- [x] Flow diagrams documented
- [x] Summary document completed

## Environment Setup

### Vercel Environment Variables
```bash
# Required for authentication
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Required for email
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_contact_email

# Optional
BYTEZ_API_KEY=your_bytez_key
OPENAI_API_KEY=your_openai_key
```

### Supabase Configuration

#### 1. Authentication Providers
- [ ] Enable Google OAuth
  - Go to: Authentication > Providers > Google
  - Add Client ID and Secret
  - Save changes

- [ ] Enable Email (Magic Links)
  - Go to: Authentication > Providers > Email
  - Enable "Enable Email provider"
  - Configure email templates

#### 2. Redirect URLs
Add these URLs to: Authentication > URL Configuration

**Production:**
- [ ] `https://reviewai.pro/auth/callback`
- [ ] `https://reviewai.pro/*` (wildcard)

**Development:**
- [ ] `http://localhost:3000/auth/callback`
- [ ] `http://localhost:3000/*` (wildcard)

#### 3. Database RLS Policies

Run these SQL commands in Supabase SQL Editor:

```sql
-- Enable RLS on product_analyses table
ALTER TABLE product_analyses ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own analyses or public ones
CREATE POLICY "Users can view own analyses or public"
ON product_analyses
FOR SELECT
USING (
    auth.uid() = user_id 
    OR is_public = true
);

-- Policy: Authenticated users can create analyses
CREATE POLICY "Authenticated users can create analyses"
ON product_analyses
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own analyses
CREATE POLICY "Users can update own analyses"
ON product_analyses
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

Verify policies:
```sql
SELECT * FROM pg_policies WHERE tablename = 'product_analyses';
```

## Deployment Steps

### 1. Backend Deployment (Vercel)

```bash
# Ensure you're on main branch
git checkout main

# Pull latest changes
git pull origin main

# Verify build locally
npm run build

# Push to trigger deployment
git push origin main
```

- [ ] Deployment triggered on Vercel
- [ ] Build completes successfully
- [ ] No errors in deployment logs

### 2. Extension Deployment

```bash
# Build extension
npm run build --prefix extension

# Verify build output
ls -la extension/dist/
```

- [ ] Extension builds without errors
- [ ] All assets present in dist folder
- [ ] manifest.json includes icon references

**For Chrome Web Store:**
1. [ ] Zip the `extension/dist` folder
2. [ ] Upload to Chrome Web Store Developer Dashboard
3. [ ] Update version number if needed
4. [ ] Submit for review

**For Testing:**
1. [ ] Open `chrome://extensions/`
2. [ ] Enable Developer mode
3. [ ] Click "Load unpacked"
4. [ ] Select `extension/dist` folder

## Post-Deployment Testing

### Test 1: Unauthenticated Access
- [ ] Open incognito window
- [ ] Navigate to `https://reviewai.pro/report/any-id`
- [ ] **Expected:** Redirected to login page
- [ ] **Expected:** See "Report Access Required" notice

### Test 2: Login Flow
- [ ] From login page, click "Continue with Google"
- [ ] Complete Google OAuth flow
- [ ] **Expected:** Redirected back to report page
- [ ] **Expected:** See welcome banner with user info

### Test 3: Authenticated Access
- [ ] While logged in, navigate to a report
- [ ] **Expected:** Report loads immediately
- [ ] **Expected:** Welcome banner shows
- [ ] **Expected:** Dashboard link works

### Test 4: Extension Flow
- [ ] Install extension in Chrome
- [ ] Navigate to Amazon product page
- [ ] Click "Get AI Verdict" badge
- [ ] Wait for analysis
- [ ] Click "View Full Report"
- [ ] **Expected:** Opens in new tab
- [ ] **Expected:** If not logged in, redirected to login
- [ ] **Expected:** After login, see report

### Test 5: Session Persistence
- [ ] Log in to ReviewAI
- [ ] Close browser
- [ ] Reopen browser
- [ ] Navigate to a report
- [ ] **Expected:** Still logged in (if within session duration)

### Test 6: Session Expiry
- [ ] Log in to ReviewAI
- [ ] Wait for session to expire (or clear cookies)
- [ ] Try to access a report
- [ ] **Expected:** Redirected to login

### Test 7: Dashboard Sync
- [ ] Analyze a product in extension
- [ ] Click "View Full Report"
- [ ] Log in if needed
- [ ] Navigate to Dashboard > History
- [ ] **Expected:** Report appears in history

## Monitoring Setup

### Vercel Analytics
- [ ] Enable Vercel Analytics
- [ ] Monitor page load times
- [ ] Track error rates

### Supabase Monitoring
- [ ] Check Auth logs for failed attempts
- [ ] Monitor database query performance
- [ ] Track RLS policy hits

### Custom Metrics
Track these in your analytics:
- [ ] Login conversion rate
- [ ] Report access attempts (auth vs unauth)
- [ ] Session duration
- [ ] Dashboard engagement

## Rollback Plan

If issues occur:

### Quick Rollback
```bash
# Revert to previous deployment in Vercel
# Go to Vercel Dashboard > Deployments
# Click on previous successful deployment
# Click "Promote to Production"
```

### Code Rollback
```bash
# Revert the commit
git revert HEAD

# Push to trigger new deployment
git push origin main
```

### Database Rollback
```sql
-- Disable RLS if causing issues
ALTER TABLE product_analyses DISABLE ROW LEVEL SECURITY;

-- Drop policies if needed
DROP POLICY "Users can view own analyses or public" ON product_analyses;
```

## Common Issues & Solutions

### Issue: Infinite Redirect Loop
**Symptom:** Page keeps redirecting between report and login

**Solution:**
1. Check middleware is properly detecting session
2. Verify Supabase environment variables
3. Check browser cookies are enabled

### Issue: "Not Found" on Report Page
**Symptom:** 404 error when accessing report

**Solution:**
1. Verify report ID exists in database
2. Check RLS policies allow access
3. Verify user is authenticated

### Issue: Login Doesn't Redirect Back
**Symptom:** After login, user goes to dashboard instead of report

**Solution:**
1. Check `next` parameter is preserved
2. Verify auth callback route handles `next` param
3. Check URL encoding is correct

### Issue: Extension Shows Error
**Symptom:** Extension overlay shows error after analysis

**Solution:**
1. Check backend API is responding
2. Verify extension has correct API URL
3. Check CORS settings

## Success Criteria

### Functional Requirements
- [x] Reports require authentication
- [x] Unauthenticated users redirected to login
- [x] Login preserves return URL
- [x] Authenticated users see reports immediately
- [x] Reports saved to dashboard
- [x] Extension integration works

### Security Requirements
- [x] Cannot bypass authentication
- [x] Server-side validation
- [x] Database RLS enforced
- [x] Secure session management

### Performance Requirements
- [ ] Page load < 500ms (authenticated)
- [ ] Middleware overhead < 50ms
- [ ] No impact on extension performance

### User Experience Requirements
- [x] Clear messaging throughout
- [x] Smooth authentication flow
- [x] Welcome banner shows user info
- [x] Dashboard link accessible

## Final Verification

Before marking as complete:

- [ ] All tests pass
- [ ] No errors in logs
- [ ] Performance metrics acceptable
- [ ] User feedback positive
- [ ] Documentation complete
- [ ] Team trained on new flow

## Sign-Off

- [ ] Developer: Code reviewed and tested
- [ ] QA: All test cases pass
- [ ] Product: UX meets requirements
- [ ] Security: Security review complete
- [ ] DevOps: Monitoring configured

## Notes

Add any deployment-specific notes here:

---

**Deployment Date:** _____________

**Deployed By:** _____________

**Version:** 1.1.0

**Status:** ☐ Success  ☐ Issues  ☐ Rolled Back
