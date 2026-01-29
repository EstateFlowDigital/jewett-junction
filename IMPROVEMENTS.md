# Jewett Junction - Improvements Plan

This document tracks all planned improvements and their implementation status.

---

## Phase 1: User Profile & Account Pages

### 1.1 My Profile Page
**Status:** To Do
**Priority:** High
**Files to Create:**
- `src/pages/profile/index.astro`
- `src/components/profile/ProfileContent.tsx`

**Implementation:**
- Display user info (name, email, department, role)
- Show profile photo with upload capability
- Contact information
- Bio/about section
- Start date and tenure
- Skills and certifications

### 1.2 My Badges Page
**Status:** To Do
**Priority:** High
**Files to Create:**
- `src/pages/profile/badges.astro`
- `src/components/profile/BadgesContent.tsx`

**Implementation:**
- Grid of all available badges
- Earned badges highlighted with dates earned
- Locked badges shown with requirements
- Badge details modal (description, how to earn, rarity)
- Progress indicators for partially completed badges

### 1.3 Points History Page
**Status:** To Do
**Priority:** High
**Files to Create:**
- `src/pages/profile/points.astro`
- `src/components/profile/PointsHistoryContent.tsx`

**Implementation:**
- Current points total with level indicator
- Points breakdown by category
- Transaction history (earned/spent)
- Leaderboard preview
- Rewards/redemption section (if applicable)

---

## Phase 2: Notifications System

### 2.1 Notifications Center Page
**Status:** To Do
**Priority:** High
**Files to Create:**
- `src/pages/notifications/index.astro`
- `src/components/notifications/NotificationsContent.tsx`
- `src/components/notifications/NotificationItem.tsx`

**Implementation:**
- List of all notifications (read/unread)
- Filter by type (announcements, events, badges, system)
- Mark as read/unread
- Mark all as read
- Delete notifications
- Notification preferences link

### 2.2 Real-time Notification Bell
**Status:** To Do
**Priority:** Medium
**Files to Modify:**
- `src/components/layout/TopNav.tsx`
- `src/components/layout/Header.tsx`

**Implementation:**
- Dropdown preview of recent notifications
- Unread count badge
- Quick actions (mark as read)
- Link to full notifications page

---

## Phase 3: Loading States & Skeletons

### 3.1 Directory Loading Skeleton
**Status:** To Do
**Priority:** Medium
**Files to Modify:**
- `src/components/pages/DirectoryContent.tsx`

**Implementation:**
- Skeleton cards matching employee card layout
- Animate while loading
- Smooth transition to content

### 3.2 Events Loading Skeleton
**Status:** To Do
**Priority:** Medium
**Files to Modify:**
- `src/components/pages/EventsContent.tsx`

**Implementation:**
- Calendar skeleton
- Event list skeleton
- Filter skeleton

### 3.3 Resources Loading Skeleton
**Status:** To Do
**Priority:** Medium
**Files to Modify:**
- `src/components/pages/ResourcesContent.tsx`

**Implementation:**
- Category tabs skeleton
- Resource card skeletons
- Search skeleton

---

## Phase 4: Email Integration

### 4.1 Email Service Setup
**Status:** To Do
**Priority:** High
**Files to Create:**
- `src/lib/email.ts`

**Implementation:**
- Abstract email service interface
- Support for Resend, SendGrid, or Mailgun
- Template system for different email types
- Error handling and logging

### 4.2 Job Application Emails
**Status:** To Do
**Priority:** High
**Files to Modify:**
- `src/pages/api/apply.ts`

**Implementation:**
- Send confirmation email to applicant
- Send notification email to HR
- Include application details
- Attach resume (if uploaded)

### 4.3 Idea Submission Emails
**Status:** To Do
**Priority:** Medium
**Files to Modify:**
- `src/pages/api/submit-idea.ts`

**Implementation:**
- Send confirmation to submitter
- Notify admin of new idea

### 4.4 Signage Request Emails
**Status:** To Do
**Priority:** Medium
**Files to Modify:**
- `src/pages/api/signage-request.ts`

**Implementation:**
- Send confirmation to requester
- Notify marketing team

---

## Phase 5: Form Validation

### 5.1 Phone Number Validation
**Status:** To Do
**Priority:** Medium
**Files to Modify:**
- `src/components/pages/CareersContent.tsx`
- `src/components/forms/SignageRequestForm.tsx`

**Implementation:**
- Regex validation for phone format
- Auto-formatting (optional)
- Clear error messages

### 5.2 File Upload Validation
**Status:** To Do
**Priority:** High
**Files to Create:**
- `src/lib/validation.ts`

**Files to Modify:**
- `src/components/pages/CareersContent.tsx`

**Implementation:**
- File type validation (PDF, DOC, DOCX)
- File size limits (max 5MB)
- Clear error messages
- Progress indicator

### 5.3 Date Validation
**Status:** To Do
**Priority:** Low
**Files to Modify:**
- `src/components/forms/SignageRequestForm.tsx`

**Implementation:**
- Maximum date range (e.g., 1 year out)
- Business days only option
- Lead time requirements

---

## Phase 6: Error Handling

### 6.1 Error Boundary Component
**Status:** To Do
**Priority:** Medium
**Files to Create:**
- `src/components/ErrorBoundary.tsx`

**Implementation:**
- Catch React component errors
- Display user-friendly error message
- Option to retry
- Log errors for debugging

### 6.2 API Error Handling
**Status:** To Do
**Priority:** Medium
**Files to Modify:**
- `src/pages/api/search.ts`
- Various content components

**Implementation:**
- Consistent error response format
- User-friendly error messages
- Retry mechanisms
- Fallback content

---

## Phase 7: Mobile Improvements

### 7.1 Mobile Navigation Width
**Status:** To Do
**Priority:** Medium
**Files to Modify:**
- `src/components/layout/MobileNav.tsx`

**Implementation:**
- Increase width on small phones
- Better touch targets
- Improved scrolling

### 7.2 Mobile Form Layouts
**Status:** To Do
**Priority:** Low
**Files to Modify:**
- Various form components

**Implementation:**
- Stack form fields vertically
- Larger input fields
- Better error message positioning

---

## Phase 8: Search Enhancements

### 8.1 Debounced Search
**Status:** To Do
**Priority:** Medium
**Files to Modify:**
- `src/components/layout/GlobalSearch.tsx`

**Implementation:**
- Debounce search input (300ms)
- Loading indicator
- Cancel pending requests

### 8.2 Fuzzy Search
**Status:** To Do
**Priority:** Low
**Files to Modify:**
- `src/pages/api/search.ts`

**Implementation:**
- Fuzzy matching algorithm
- Typo tolerance
- Relevance scoring

### 8.3 Recent Searches
**Status:** To Do
**Priority:** Low
**Files to Modify:**
- `src/components/layout/GlobalSearch.tsx`

**Implementation:**
- Store recent searches in localStorage
- Display when search is empty
- Clear history option

---

## Implementation Order

1. **Phase 1** - User Profile Pages (high user value)
2. **Phase 2** - Notifications System (high user value)
3. **Phase 3** - Loading Skeletons (UX polish)
4. **Phase 4** - Email Integration (critical for forms)
5. **Phase 5** - Form Validation (data quality)
6. **Phase 6** - Error Handling (reliability)
7. **Phase 7** - Mobile Improvements (accessibility)
8. **Phase 8** - Search Enhancements (nice to have)

---

## Completed Improvements

### Admin Dashboard Fixes (Completed)
- [x] Move Quick Actions to top of admin dashboard
- [x] Fix content width - remove max-w-6xl constraint
- [x] Fix React error #130 - icon serialization for Astro/React boundary

### Previous Phases (Completed)
- [x] CMS integration with all 11 collections
- [x] Server-side data fetching on all pages
- [x] Calendar feature with full functionality
- [x] Publish button working
- [x] Admin dashboard with collection management
- [x] Global search (Cmd+K)
- [x] Signage request form
- [x] Accessibility fixes on detail pages
- [x] Skeleton loading for HRContent, SafetyContent, ITHelpdeskContent, MarketingContent

---

## Notes

- All new pages should follow existing patterns for consistency
- Use existing UI components from `src/components/ui/`
- Maintain accessibility standards (WCAG AA)
- Test on mobile devices before marking complete
- Update this document as features are completed
