# Jewett Junction - Employee Intranet

A modern employee intranet built with Astro, React, and Tailwind CSS, integrated with Webflow CMS for content management.

## Tech Stack

- **Framework:** Astro 4.x with SSR (Cloudflare adapter)
- **UI Components:** React 18 with TypeScript
- **Styling:** Tailwind CSS with shadcn/ui components
- **CMS:** Webflow CMS API integration
- **Deployment:** Cloudflare Pages

## Project Structure

```
src/
├── components/
│   ├── admin/           # Admin dashboard components
│   │   ├── AdminLayout.tsx
│   │   ├── AdminOverview.tsx
│   │   ├── CollectionEditor.tsx
│   │   ├── RichTextEditor.tsx
│   │   └── collections.ts
│   ├── forms/           # Form components
│   │   └── SignageRequestForm.tsx
│   ├── gamification/    # Points & badges system
│   │   ├── BadgeCollection.tsx
│   │   └── PointsDisplay.tsx
│   ├── layout/          # Layout components
│   │   ├── AppShell.tsx
│   │   ├── GlobalSearch.tsx
│   │   ├── Header.tsx
│   │   ├── MobileNav.tsx
│   │   ├── Sidebar.tsx
│   │   └── TopNav.tsx
│   ├── pages/           # Page content components
│   │   ├── CareersContent.tsx
│   │   ├── CultureContent.tsx
│   │   ├── DirectoryContent.tsx
│   │   ├── EventsContent.tsx
│   │   ├── HRContent.tsx
│   │   ├── ITHelpdeskContent.tsx
│   │   ├── MarketingContent.tsx
│   │   ├── ResourcesContent.tsx
│   │   └── SafetyContent.tsx
│   └── ui/              # shadcn/ui components
├── layouts/
│   ├── Layout.astro
│   └── admin-base.astro
├── lib/
│   ├── utils.ts
│   └── webflow-cms.ts   # CMS integration
├── pages/
│   ├── api/             # API routes
│   │   ├── admin/       # Admin API endpoints
│   │   ├── apply.ts
│   │   ├── search.ts
│   │   ├── signage-request.ts
│   │   └── submit-idea.ts
│   ├── admin/           # Admin pages
│   ├── announcements/
│   ├── careers/
│   ├── culture/
│   ├── directory/
│   ├── events/
│   ├── hr/
│   ├── it-helpdesk/
│   ├── marketing/
│   ├── resources/
│   ├── safety/
│   └── settings/
└── styles/
    └── globals.css
```

## Features

### Implemented

- **Dashboard** - Overview with announcements, events, quick links
- **Employee Directory** - Searchable employee profiles with contact info
- **Events Calendar** - Full calendar with event details and filtering
- **Careers Portal** - Job listings with application forms
- **Resources Hub** - Document and resource library by category
- **Department Pages** - HR, Safety, IT Helpdesk, Marketing sections
- **Culture Stories** - Employee spotlights and company culture content
- **Admin Dashboard** - Full CMS management with CRUD operations
- **Global Search** - Command palette (Cmd+K) searching all collections
- **Signage Request Form** - Marketing signage request submission
- **Idea Submission** - Employee suggestion box

### In Progress (see IMPROVEMENTS.md)

- User profile pages (My Profile, My Badges, Points History)
- Notifications center
- Loading skeleton states
- Email integration for form submissions
- Enhanced form validation
- Error boundaries
- Mobile navigation improvements
- Search enhancements

## Environment Variables

Create a `.dev.vars` file for local development:

```env
WEBFLOW_API_TOKEN=your_webflow_api_token
WEBFLOW_SITE_ID=your_site_id
ADMIN_PASSWORD=your_admin_password
```

## Commands

| Command           | Action                                    |
|:------------------|:------------------------------------------|
| `npm install`     | Install dependencies                      |
| `npm run dev`     | Start dev server at `localhost:4321`      |
| `npm run build`   | Build for production                      |
| `npm run preview` | Preview production build locally          |

## CMS Collections

The app integrates with these Webflow CMS collections:

1. **Announcements** - Company news and updates
2. **Events** - Calendar events and meetings
3. **Job Postings** - Career opportunities
4. **Culture Stories** - Employee spotlights
5. **Employees** - Directory profiles
6. **Resources** - Documents and links
7. **HR Content** - Policies and benefits
8. **Safety Content** - Protocols and training
9. **IT Knowledge Base** - Help articles
10. **Marketing Assets** - Brand materials
11. **Submitted Ideas** - Employee suggestions

## Admin Access

Navigate to `/jewett-junction/admin` and enter the admin password to access the CMS management interface.

## Deployment

Configured for Cloudflare Pages with the `@astrojs/cloudflare` adapter. Push to main branch to trigger automatic deployment.
