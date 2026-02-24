# ReviewAI Migration Plan: Business Reviews → Amazon Product Intelligence

## Executive Summary

This document outlines the migration from a Google/Yelp business review management platform to an Amazon product review intelligence system.

**Current State:** Business owners managing review responses  
**New Direction:** Amazon shoppers making informed purchase decisions  
**Timeline:** 4-6 weeks across 4 phases  
**Risk Level:** Medium (scraping challenges, API dependencies)

---

## Phase 1: Cleanup & Foundation (Week 1)

### Objective
Remove legacy Google/Yelp code and prepare infrastructure for Amazon features.

### Tasks

#### 1.1 Remove Google/Yelp Integration Code
- [ ] Delete `/src/app/api/auth/google/` directory
- [ ] Delete `/src/app/api/google/` directory (locations, reviews, reply endpoints)
- [ ] Remove Google OAuth business integration logic
- [ ] Remove `/src/app/api/generate/route.ts` (business review generation)
- [ ] Search and remove any Yelp-related code

#### 1.2 Clean Up Dashboard Pages
- [ ] Remove `/src/app/dashboard/reviews/` (business review management)
- [ ] Update `/src/app/dashboard/page.tsx` for Amazon analysis history
- [ ] Remove business-specific settings from `/src/app/dashboard/settings/`
- [ ] Keep `/src/app/dashboard/history/` but repurpose for product analyses

#### 1.3 Archive Business Content
- [ ] Move all blog posts from `/src/_posts/` to `/docs/archived-blog/`
- [ ] Create placeholder blog structure for Amazon content
- [ ] Document which posts to keep vs. archive

#### 1.4 Update Environment Variables
- [ ] Remove Google Business API credentials from `.env.local`
- [ ] Keep Supabase, OpenAI, Resend credentials
- [ ] Add placeholder for `AMAZON_AFFILIATE_TAG` (Phase 4)
- [ ] Update `.env.local.example` with new structure

#### 1.5 Database Schema Preparation
- [ ] Create Supabase migration file for new tables
- [ ] Define `product_analyses` table schema
- [ ] Define `products` table schema
- [ ] Define `recommendations` table schema (Phase 4)
- [ ] Plan migration for existing `profiles` and `generations` tables

**Success Criteria:**
- ✅ No Google/Yelp code remains in codebase
- ✅ Site builds and deploys without errors
- ✅ Database migration ready to execut