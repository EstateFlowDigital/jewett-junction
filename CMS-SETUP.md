# Webflow CMS Setup for Jewett Junction

This guide explains how to set up Webflow CMS collections so the client can edit content directly in Webflow.

## Step 1: Create CMS Collections in Webflow

Go to Webflow Designer > CMS > Create Collection for each of these:

### 1. Employees
| Field Name | Field Type | Required |
|------------|------------|----------|
| Name | Plain Text | Yes |
| Slug | Auto-generated | Yes |
| Role | Plain Text | Yes |
| Department | Plain Text | Yes |
| Email | Email | No |
| Phone | Phone | No |
| Photo | Image | No |
| Bio | Rich Text | No |
| Start Date | Date | No |
| Is Featured | Switch | No |

### 2. Announcements
| Field Name | Field Type | Required |
|------------|------------|----------|
| Name | Plain Text | Yes |
| Slug | Auto-generated | Yes |
| Content | Rich Text | Yes |
| Priority | Option (high/normal/low) | Yes |
| Published Date | Date | Yes |
| Author | Plain Text | No |
| Is Pinned | Switch | No |

### 3. Events
| Field Name | Field Type | Required |
|------------|------------|----------|
| Name | Plain Text | Yes |
| Slug | Auto-generated | Yes |
| Description | Rich Text | No |
| Event Date | Date/Time | Yes |
| End Date | Date/Time | No |
| Location | Plain Text | No |
| Category | Option (company/training/social/safety) | Yes |
| Registration Link | Link | No |

### 4. Job Postings
| Field Name | Field Type | Required |
|------------|------------|----------|
| Name | Plain Text | Yes |
| Slug | Auto-generated | Yes |
| Department | Plain Text | Yes |
| Location | Plain Text | Yes |
| Description | Rich Text | Yes |
| Requirements | Rich Text | No |
| Referral Bonus | Number | No |
| Apply Link | Link | No |
| Is Active | Switch | No |

### 5. Culture Stories
| Field Name | Field Type | Required |
|------------|------------|----------|
| Name | Plain Text | Yes |
| Slug | Auto-generated | Yes |
| Excerpt | Plain Text | Yes |
| Content | Rich Text | Yes |
| Image | Image | No |
| Author | Plain Text | No |
| Published Date | Date | Yes |
| Category | Option (wellness/community/recognition/milestone) | Yes |

### 6. Resources
| Field Name | Field Type | Required |
|------------|------------|----------|
| Name | Plain Text | Yes |
| Slug | Auto-generated | Yes |
| Description | Plain Text | No |
| Category | Plain Text | Yes |
| File | File | No |
| External Link | Link | No |
| Icon | Plain Text | No |

## Step 2: Get Collection IDs

After creating each collection, get its ID:
1. In Webflow Designer, go to CMS
2. Click on a collection
3. Look at the URL: `https://webflow.com/design/site/collections/[COLLECTION_ID]`

## Step 3: Update Collection IDs in Code

Edit `src/lib/webflow-cms.ts` and update the `COLLECTIONS` object:

```typescript
export const COLLECTIONS = {
  employees: 'your-employees-collection-id',
  announcements: 'your-announcements-collection-id',
  events: 'your-events-collection-id',
  jobPostings: 'your-job-postings-collection-id',
  cultureStories: 'your-culture-stories-collection-id',
  resources: 'your-resources-collection-id',
} as const;
```

## Step 4: Generate API Token

1. In Webflow: Site Settings > Apps & Integrations
2. Scroll to "Site API Access"
3. Click "Generate API Token"
4. Copy the token (you won't see it again)

## Step 5: Add Token to Webflow Cloud

1. In Webflow Cloud dashboard for this app
2. Go to Settings > Environment Variables
3. Add: `WEBFLOW_API_TOKEN` = your token

## Step 6: Sync DevLink Components (Optional)

If you want to use Webflow-designed components:

```bash
# Set environment variables
export WEBFLOW_SITE_API_TOKEN=your_token
export WEBFLOW_SITE_ID=67a464bc7184fcb8aacb0e8d

# Sync components
npx @webflow/webflow-cli devlink sync
```

## Using CMS Data in Pages

```astro
---
import { getAnnouncements, getEvents, getEmployees } from '../lib/webflow-cms';

const { items: announcements } = await getAnnouncements({ limit: 5 });
const { items: events } = await getEvents({ upcoming: true, limit: 3 });
const { items: featured } = await getEmployees({ featured: true });
---

<div>
  {announcements.map(a => (
    <div>
      <h3>{a.name}</h3>
      <p>{a.content}</p>
    </div>
  ))}
</div>
```

## Content Editing Workflow

1. Client logs into Webflow
2. Goes to CMS panel
3. Adds/edits items in collections
4. Publishes changes
5. App automatically shows updated content (no redeploy needed)
