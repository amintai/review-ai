# Waitlist Signup Feature - Requirements

## Overview
Create a waitlist signup system to capture early user interest.

## User Stories

### US-1: Email Capture
**As a** potential user  
**I want to** sign up for the waitlist  
**So that** I can be notified when ReviewAI launches

**Acceptance Criteria:**
- User can enter email
- Email validation performed
- Duplicate emails handled
- Success message shown
- Email stored in database

## Functional Requirements

### FR-1: Database Schema
Create `waitlist` table:
- id (UUID, primary key)
- email (text, unique, not null)
- created_at (timestamp)
- notified (boolean, default false)
- source (text, optional)

### FR-2: API Endpoint
- POST /api/waitlist endpoint
- Email validation
- Duplicate checking
- Database insertion

### FR-3: Waitlist Component
- React component
- Email input with validation
- Submit button with loading
- Error/success messages
