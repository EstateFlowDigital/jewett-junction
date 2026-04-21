# Dashboard Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the intranet-ready changes discussed with Jewett on 2026-04-21: admin nav grouped by Intranet vs Website, Team Members department fix, IP allowlist for the intranet, editable rotating banner, PDF preview/download, and CSV bulk upload.

**Architecture:** Astro SSR on Cloudflare Workers with React islands. Admin uses `CollectionEditor.tsx` (per-collection pages) and `AdminOverview.tsx` (admin landing). CMS data flows Webflow API → `src/lib/webflow-cms.ts` → Astro pages. Dashboard intranet pages live at root-level routes (`/dashboard`, `/announcements`, etc.); admin at `/admin`; public website pages exist in the same app but outside these routes.

**Tech Stack:** Astro 5, React 19, Tailwind 4, `@astrojs/cloudflare` adapter, Webflow Data API v2, `lucide-react` icons.

**Testing note:** This repo has no test harness. Verification happens via manual browser checks and small throwaway scripts (Node `--test` or inline `console.assert`) for pure logic like CIDR matching. Add verification steps, not Jest/Vitest setup — that's out of scope.

**Group assignments (decided 2026-04-21):**
- **Website group** — Team Members, Blog Posts, Blog Categories, FAQs, Services, Industries, Service Areas, Our Work, Image Galleries
- **Intranet group** — Announcements, Events, Job Postings, Culture Stories, Employees, Resources, HR Content, Safety Content, IT Knowledge, Marketing, Ideas, Banner Messages (new in Task 4)

---

## File Structure

**New files:**
- `src/lib/ip-allowlist.ts` — CIDR matching utility and IP extraction
- `src/lib/ip-allowlist.test.mjs` — Node `--test` harness for the matcher (throwaway verification)
- `src/pages/access-denied.astro` — Page shown to non-allowlisted IPs
- `src/pages/admin/banner.astro` — Admin page for the new Banner Messages collection
- `src/pages/admin/bulk-upload.astro` — Admin UI for CSV bulk upload
- `src/components/admin/BulkUploader.tsx` — React component for CSV parsing + preview + import
- `src/pages/api/admin/bulk-import.ts` — API endpoint that accepts parsed rows and creates items
- `docs/plans/2026-04-21-dashboard-improvements.md` — this file

**Files modified:**
- `src/components/admin/collections.ts` — fix `teamMembers.department` options; add `banner` collection; add `file` type to `FieldConfig`
- `src/components/admin/AdminLayout.tsx` — replace flat `NAV_ITEMS` with grouped nav (Intranet / Website sections with headers and colored badges)
- `src/components/admin/AdminOverview.tsx` — replace flat `COLLECTION_META` with grouped rendering; add Banner Messages entry
- `src/components/admin/CollectionEditor.tsx` — add `file` field rendering (upload + preview + download) next to existing `image` handling
- `src/lib/webflow-cms.ts` — add `banner` collection ID; add `getBannerMessages()` fetcher
- `src/pages/dashboard/index.astro` — fetch `getBannerMessages()` and render instead of hardcoded marquee spans; fall back to existing copy when empty
- `src/pages/api/admin/items.ts` — add `banner` to `VALID_FIELDS`
- `src/pages/api/admin/upload.ts` — accept `application/pdf` in `allowedTypes`; raise size limit for PDFs
- `src/middleware.ts` — IP allowlist check for intranet + admin paths, with bypass for `/api/admin/login` retry loops; respects `ALLOWED_IPS` env var

**Manual prerequisites (user action, before Task 4):**
- Create new Webflow collection "Banner Messages" with fields: `name` (Plain text, required), `message` (Plain text, required), `display-order` (Number), `icon-color` (Option: amber/emerald/pink/cyan/blue/purple), `expiration-date` (Date/Time, optional), `is-active` (Switch, default true). Record its collection ID for Task 4 Step 3.

---

## Task 1: Fix Team Members department options

**Files:**
- Modify: `src/components/admin/collections.ts:420` (the `teamMembers.department` field)

- [ ] **Step 1: Verify the current wrong value**

Open `src/components/admin/collections.ts` and locate the `teamMembers` block. Confirm the `department` field currently has `options: ['Department Name 1']`. This is a placeholder that Webflow created by default — actual departments match the `employees` collection.

- [ ] **Step 2: Replace with the real department list**

Edit `src/components/admin/collections.ts`, in the `teamMembers.fields` array, change:

```ts
{ key: 'department', label: 'Department', type: 'select', options: ['Department Name 1'], icon: 'Building' },
```

to:

```ts
{ key: 'department', label: 'Department', type: 'select', options: ['Commercial', 'Safety', 'Engineering', 'Operations', 'Admin', 'HR', 'IT', 'Finance', 'Marketing', 'Executive'], icon: 'Building' },
```

(Matches the `employees.department` options at `src/components/admin/collections.ts:123`.)

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Navigate to: `http://localhost:4321/admin/team-members`
Click "+ New" → scroll to Department dropdown.
Expected: 10 options (Commercial, Safety, Engineering, Operations, Admin, HR, IT, Finance, Marketing, Executive). No "Department Name 1".

- [ ] **Step 4: Commit**

```bash
git add src/components/admin/collections.ts
git commit -m "fix(admin): populate team-members department options"
```

---

## Task 2: Group admin navigation by Intranet vs Website

**Files:**
- Modify: `src/components/admin/AdminLayout.tsx:14-36` (NAV_ITEMS array + rendering)
- Modify: `src/components/admin/AdminOverview.tsx:40-61` (COLLECTION_META + grid rendering)

- [ ] **Step 1: Introduce a grouped nav structure in AdminLayout.tsx**

Replace the flat `NAV_ITEMS` constant at `src/components/admin/AdminLayout.tsx:14-36` with a grouped structure. Keep Overview as a standalone top item above both groups.

```tsx
interface NavItem {
  key: string;
  name: string;
  icon: any;
  color: string;
  href: string;
}

interface NavGroup {
  label: string;
  scope: 'intranet' | 'website';
  items: NavItem[];
}

const OVERVIEW_ITEM: NavItem = {
  key: 'dashboard', name: 'Overview', icon: LayoutDashboard, color: 'slate', href: '/jewett-junction/admin',
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Intranet',
    scope: 'intranet',
    items: [
      { key: 'announcements', name: 'Announcements', icon: Megaphone, color: 'blue', href: '/jewett-junction/admin/announcements' },
      { key: 'banner', name: 'Banner Messages', icon: Sparkles, color: 'purple', href: '/jewett-junction/admin/banner' },
      { key: 'events', name: 'Events', icon: Calendar, color: 'indigo', href: '/jewett-junction/admin/events' },
      { key: 'jobs', name: 'Job Postings', icon: Briefcase, color: 'emerald', href: '/jewett-junction/admin/jobs' },
      { key: 'culture', name: 'Culture Stories', icon: Heart, color: 'pink', href: '/jewett-junction/admin/culture' },
      { key: 'employees', name: 'Employees', icon: Users, color: 'cyan', href: '/jewett-junction/admin/employees' },
      { key: 'resources', name: 'Resources', icon: FolderOpen, color: 'amber', href: '/jewett-junction/admin/resources' },
      { key: 'hr', name: 'HR Content', icon: HeartHandshake, color: 'violet', href: '/jewett-junction/admin/hr' },
      { key: 'safety', name: 'Safety Content', icon: HardHat, color: 'orange', href: '/jewett-junction/admin/safety' },
      { key: 'it', name: 'IT Knowledge', icon: Monitor, color: 'sky', href: '/jewett-junction/admin/it' },
      { key: 'marketing', name: 'Marketing', icon: Palette, color: 'rose', href: '/jewett-junction/admin/marketing' },
      { key: 'ideas', name: 'Submitted Ideas', icon: Lightbulb, color: 'yellow', href: '/jewett-junction/admin/ideas' },
    ],
  },
  {
    label: 'Website',
    scope: 'website',
    items: [
      { key: 'blog', name: 'Blog Posts', icon: BookOpen, color: 'teal', href: '/jewett-junction/admin/blog' },
      { key: 'blog-categories', name: 'Blog Categories', icon: Tag, color: 'lime', href: '/jewett-junction/admin/blog-categories' },
      { key: 'faqs', name: 'FAQs', icon: CircleHelp, color: 'purple', href: '/jewett-junction/admin/faqs' },
      { key: 'services', name: 'Services', icon: Wrench, color: 'slate', href: '/jewett-junction/admin/services' },
      { key: 'industries', name: 'Industries', icon: Building, color: 'stone', href: '/jewett-junction/admin/industries' },
      { key: 'service-areas', name: 'Service Areas', icon: MapPin, color: 'red', href: '/jewett-junction/admin/service-areas' },
      { key: 'team-members', name: 'Team Members', icon: Users, color: 'blue', href: '/jewett-junction/admin/team-members' },
      { key: 'our-work', name: 'Our Work', icon: Sparkles, color: 'amber', href: '/jewett-junction/admin/our-work' },
      { key: 'galleries', name: 'Image Galleries', icon: Image, color: 'fuchsia', href: '/jewett-junction/admin/galleries' },
    ],
  },
];
```

Note: `banner` is added now; its page file is created in Task 4. The link will 404 until then — acceptable during implementation.

- [ ] **Step 2: Render the groups with visual separation**

Replace the `<ul>...{NAV_ITEMS.map(...)}...</ul>` block in `AdminLayout.tsx` (around line 278-320) with grouped rendering. Keep the existing `colorClasses` map; just move it into a small `renderItem` inner helper so each group reuses it.

```tsx
<nav className="flex-1 p-3 overflow-y-auto" aria-label="Admin sections">
  <ul className="space-y-1 mb-2" role="list">
    {renderItem(OVERVIEW_ITEM, currentPage === OVERVIEW_ITEM.key)}
  </ul>
  {NAV_GROUPS.map((group) => (
    <div key={group.scope} className="mt-4">
      <div
        className={`px-3 py-1.5 mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider rounded-md ${
          group.scope === 'intranet'
            ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
            : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${group.scope === 'intranet' ? 'bg-blue-400' : 'bg-emerald-400'}`} />
        {group.label}
      </div>
      <ul className="space-y-1" role="list">
        {group.items.map((item) => renderItem(item, currentPage === item.key))}
      </ul>
    </div>
  ))}
</nav>
```

Define `renderItem` inside the component, above `return`:

```tsx
const renderItem = (item: NavItem, isActive: boolean) => {
  const Icon = item.icon;
  const colorClasses: Record<string, string> = {
    slate: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    violet: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    sky: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    rose: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    teal: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    lime: 'bg-lime-500/20 text-lime-400 border-lime-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    stone: 'bg-stone-500/20 text-stone-400 border-stone-500/30',
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
    fuchsia: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
  };
  return (
    <li key={item.key}>
      <a
        href={item.href}
        onClick={() => setIsSidebarOpen(false)}
        aria-current={isActive ? 'page' : undefined}
        className={`flex items-center gap-3 px-3 min-h-[44px] rounded-lg transition-all text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
          isActive ? `${colorClasses[item.color]} border` : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span>{item.name}</span>
      </a>
    </li>
  );
};
```

- [ ] **Step 3: Mirror the grouping on AdminOverview.tsx**

Replace the flat `COLLECTION_META` array at `src/components/admin/AdminOverview.tsx:40-61` with a grouped structure:

```tsx
interface CollectionMeta {
  key: string;
  name: string;
  icon: any;
  color: string;
  gradient: string;
  href: string;
}

interface CollectionGroup {
  label: string;
  scope: 'intranet' | 'website';
  items: CollectionMeta[];
}

const COLLECTION_GROUPS: CollectionGroup[] = [
  {
    label: 'Intranet',
    scope: 'intranet',
    items: [
      { key: 'announcements', name: 'Announcements', icon: Megaphone, color: 'blue', gradient: 'from-blue-500 to-cyan-500', href: '/jewett-junction/admin/announcements' },
      { key: 'banner', name: 'Banner Messages', icon: Sparkles, color: 'purple', gradient: 'from-purple-500 to-pink-500', href: '/jewett-junction/admin/banner' },
      { key: 'events', name: 'Events', icon: Calendar, color: 'indigo', gradient: 'from-indigo-500 to-purple-500', href: '/jewett-junction/admin/events' },
      { key: 'jobPostings', name: 'Job Postings', icon: Briefcase, color: 'emerald', gradient: 'from-emerald-500 to-teal-500', href: '/jewett-junction/admin/jobs' },
      { key: 'cultureStories', name: 'Culture Stories', icon: Heart, color: 'pink', gradient: 'from-pink-500 to-rose-500', href: '/jewett-junction/admin/culture' },
      { key: 'employees', name: 'Employees', icon: Users, color: 'cyan', gradient: 'from-cyan-500 to-blue-500', href: '/jewett-junction/admin/employees' },
      { key: 'resources', name: 'Resources', icon: FolderOpen, color: 'amber', gradient: 'from-amber-500 to-orange-500', href: '/jewett-junction/admin/resources' },
      { key: 'hrContent', name: 'HR Content', icon: HeartHandshake, color: 'violet', gradient: 'from-violet-500 to-purple-500', href: '/jewett-junction/admin/hr' },
      { key: 'safetyContent', name: 'Safety Content', icon: HardHat, color: 'orange', gradient: 'from-orange-500 to-red-500', href: '/jewett-junction/admin/safety' },
      { key: 'itKnowledgeBase', name: 'IT Knowledge', icon: Monitor, color: 'sky', gradient: 'from-sky-500 to-blue-500', href: '/jewett-junction/admin/it' },
      { key: 'marketingAssets', name: 'Marketing', icon: Palette, color: 'rose', gradient: 'from-fuchsia-500 to-pink-500', href: '/jewett-junction/admin/marketing' },
      { key: 'submittedIdeas', name: 'Ideas', icon: Lightbulb, color: 'yellow', gradient: 'from-yellow-500 to-amber-500', href: '/jewett-junction/admin/ideas' },
    ],
  },
  {
    label: 'Website',
    scope: 'website',
    items: [
      { key: 'blogPosts', name: 'Blog Posts', icon: BookOpen, color: 'teal', gradient: 'from-teal-500 to-emerald-500', href: '/jewett-junction/admin/blog' },
      { key: 'blogCategories', name: 'Blog Categories', icon: Tag, color: 'lime', gradient: 'from-lime-500 to-green-500', href: '/jewett-junction/admin/blog-categories' },
      { key: 'faqs', name: 'FAQs', icon: CircleHelp, color: 'purple', gradient: 'from-purple-500 to-indigo-500', href: '/jewett-junction/admin/faqs' },
      { key: 'services', name: 'Services', icon: Wrench, color: 'slate', gradient: 'from-slate-500 to-zinc-500', href: '/jewett-junction/admin/services' },
      { key: 'industries', name: 'Industries', icon: Building, color: 'stone', gradient: 'from-stone-500 to-neutral-500', href: '/jewett-junction/admin/industries' },
      { key: 'serviceAreas', name: 'Service Areas', icon: MapPin, color: 'red', gradient: 'from-red-500 to-rose-500', href: '/jewett-junction/admin/service-areas' },
      { key: 'teamMembers', name: 'Team Members', icon: Users, color: 'blue', gradient: 'from-blue-500 to-indigo-500', href: '/jewett-junction/admin/team-members' },
      { key: 'ourWork', name: 'Our Work', icon: Sparkles, color: 'amber', gradient: 'from-amber-500 to-yellow-500', href: '/jewett-junction/admin/our-work' },
      { key: 'imageGalleries', name: 'Image Galleries', icon: Image, color: 'fuchsia', gradient: 'from-fuchsia-500 to-violet-500', href: '/jewett-junction/admin/galleries' },
    ],
  },
];

const ALL_COLLECTIONS = COLLECTION_GROUPS.flatMap((g) => g.items.map((item) => ({ ...item, scope: g.scope })));
```

Replace `COLLECTION_META` usages with `ALL_COLLECTIONS`. Stats loading loop stays the same (one fetch per collection); replace `for (const meta of COLLECTION_META)` with `for (const meta of ALL_COLLECTIONS)` and include `scope` in the resulting `CollectionStat` so the render pass can group them.

- [ ] **Step 4: Render the grouped grid with labeled sections**

Replace the "Collections" grid in `AdminOverview.tsx` (around line 202-239) with two grids separated by group headers:

```tsx
<div>
  <div className="flex items-center justify-between mb-4">
    <div>
      <h2 className="text-lg font-semibold text-white">Collections</h2>
      <p className="text-sm text-slate-400">Manage your content</p>
    </div>
  </div>
  {COLLECTION_GROUPS.map((group) => {
    const groupStats = stats.filter((s) => (s as any).scope === group.scope);
    const pillClass = group.scope === 'intranet'
      ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
      : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
    const dotClass = group.scope === 'intranet' ? 'bg-blue-400' : 'bg-emerald-400';
    return (
      <div key={group.scope} className="mb-8">
        <div className={`inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider rounded-full border ${pillClass}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
          {group.label}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" role="list">
          {groupStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <a
                key={stat.key}
                href={stat.href}
                aria-label={`Manage ${stat.name} - ${stat.count} items`}
                className="group relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 min-h-[140px] hover:border-slate-600 hover:bg-slate-800/70 hover:shadow-xl hover:shadow-slate-900/50 hover:-translate-y-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                role="listitem"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <span className="px-2.5 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-full">
                      {stat.count} {stat.count === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors">{stat.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">Click to manage</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  })}
</div>
```

- [ ] **Step 5: Verify in browser**

Run: `npm run dev`
Navigate to: `http://localhost:4321/admin`
Expected: Two labeled sections "Intranet" (blue pill) and "Website" (emerald pill). Intranet contains announcements, events, jobs, culture, employees, etc. Website contains blog, services, team-members, etc.
Sidebar: same grouping with two headers separating the lists.

- [ ] **Step 6: Commit**

```bash
git add src/components/admin/AdminLayout.tsx src/components/admin/AdminOverview.tsx
git commit -m "feat(admin): group navigation by intranet vs website scope"
```

---

## Task 3: IP allowlist middleware for intranet and admin

Gate all intranet routes (`/dashboard`, `/jewett-junction`, `/announcements`, `/culture`, `/directory`, `/events`, `/help`, `/hr`, `/it-helpdesk`, `/marketing`, `/notifications`, `/profile`, `/resources`, `/safety`, `/settings`, `/submit-idea`, and `/admin` + `/api/admin`) on the caller's IP. Public website paths (root site pages served by Webflow) stay open. Cloudflare forwards the client IP in `CF-Connecting-IP`; local dev has no such header, so the allowlist short-circuits when the env var is unset.

**Files:**
- Create: `src/lib/ip-allowlist.ts`
- Create: `src/lib/ip-allowlist.test.mjs`
- Create: `src/pages/access-denied.astro`
- Modify: `src/middleware.ts`

- [ ] **Step 1: Write the CIDR matcher with a verification script**

Create `src/lib/ip-allowlist.ts`:

```ts
export function ipv4ToInt(ip: string): number | null {
  const parts = ip.split('.');
  if (parts.length !== 4) return null;
  let result = 0;
  for (const part of parts) {
    const n = Number(part);
    if (!Number.isInteger(n) || n < 0 || n > 255) return null;
    result = (result << 8 >>> 0) + n;
  }
  return result >>> 0;
}

export function matchesCidr(ip: string, cidr: string): boolean {
  const [range, bitsStr] = cidr.split('/');
  const bits = bitsStr === undefined ? 32 : Number(bitsStr);
  if (!Number.isInteger(bits) || bits < 0 || bits > 32) return false;
  const ipInt = ipv4ToInt(ip);
  const rangeInt = ipv4ToInt(range);
  if (ipInt === null || rangeInt === null) return false;
  if (bits === 0) return true;
  const mask = (0xffffffff << (32 - bits)) >>> 0;
  return (ipInt & mask) === (rangeInt & mask);
}

export function parseAllowlist(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
}

export function isAllowedIp(ip: string | null, allowlist: string[]): boolean {
  if (!ip) return false;
  for (const entry of allowlist) {
    if (matchesCidr(ip, entry)) return true;
  }
  return false;
}
```

Create `src/lib/ip-allowlist.test.mjs` — a standalone Node test that does not require a test runner install:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matchesCidr, parseAllowlist, isAllowedIp } from './ip-allowlist.ts';

test('matchesCidr single host /32', () => {
  assert.equal(matchesCidr('1.2.3.4', '1.2.3.4/32'), true);
  assert.equal(matchesCidr('1.2.3.5', '1.2.3.4/32'), false);
});

test('matchesCidr /24 range', () => {
  assert.equal(matchesCidr('10.0.0.7', '10.0.0.0/24'), true);
  assert.equal(matchesCidr('10.0.1.7', '10.0.0.0/24'), false);
});

test('matchesCidr /0 matches any valid ipv4', () => {
  assert.equal(matchesCidr('192.168.1.1', '0.0.0.0/0'), true);
});

test('matchesCidr rejects malformed inputs', () => {
  assert.equal(matchesCidr('not-an-ip', '10.0.0.0/24'), false);
  assert.equal(matchesCidr('1.2.3.4', '10.0.0.0/33'), false);
});

test('matchesCidr bare ip defaults to /32', () => {
  assert.equal(matchesCidr('1.2.3.4', '1.2.3.4'), true);
  assert.equal(matchesCidr('1.2.3.5', '1.2.3.4'), false);
});

test('parseAllowlist splits, trims, ignores empties', () => {
  assert.deepEqual(parseAllowlist('  10.0.0.0/8 , , 192.168.1.1 '), ['10.0.0.0/8', '192.168.1.1']);
  assert.deepEqual(parseAllowlist(undefined), []);
});

test('isAllowedIp short-circuits on null ip', () => {
  assert.equal(isAllowedIp(null, ['0.0.0.0/0']), false);
});

test('isAllowedIp matches any entry', () => {
  assert.equal(isAllowedIp('10.5.5.5', ['192.168.0.0/16', '10.0.0.0/8']), true);
  assert.equal(isAllowedIp('172.20.0.1', ['192.168.0.0/16', '10.0.0.0/8']), false);
});
```

Run the tests. Node >= 20 runs TS under `--experimental-strip-types`; if that fails locally, temporarily copy the functions into a `.mjs` sibling to test.

Run: `node --test --experimental-strip-types src/lib/ip-allowlist.test.mjs`
Expected: 8 tests pass.

- [ ] **Step 2: Add access-denied page**

Create `src/pages/access-denied.astro`:

```astro
---
export const prerender = false;
---
<html lang="en" class="dark">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Access Denied | Jewett Junction</title>
    <style>
      body { font-family: system-ui, sans-serif; background: #020617; color: #f1f5f9; margin: 0; }
      main { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; text-align: center; }
      h1 { font-size: 2rem; margin: 0 0 0.5rem; }
      p { color: #94a3b8; max-width: 32rem; line-height: 1.5; }
      a { display: inline-block; margin-top: 1.5rem; padding: 0.75rem 1.5rem; background: #3b82f6; color: white; border-radius: 0.75rem; text-decoration: none; font-weight: 500; }
      a:hover { background: #2563eb; }
    </style>
  </head>
  <body>
    <main>
      <h1>You're not in the right place</h1>
      <p>This area is restricted to Jewett employees on the company network or VPN. If you reached this page by mistake, return to the main site.</p>
      <a href="https://jewettconstruction.com">Go to jewettconstruction.com</a>
    </main>
  </body>
</html>
```

- [ ] **Step 3: Wire the middleware to gate intranet + admin paths**

Edit `src/middleware.ts`. Import the matcher and allowlist parser, read `ALLOWED_IPS` from runtime env, and check before the existing CORS/rewrite logic. Full replacement below:

```ts
import { defineMiddleware } from 'astro:middleware';
import { parseAllowlist, isAllowedIp } from './lib/ip-allowlist';

const GATED_PREFIXES = [
  '/dashboard',
  '/jewett-junction',
  '/admin',
  '/announcements',
  '/culture',
  '/directory',
  '/events',
  '/help',
  '/hr',
  '/it-helpdesk',
  '/marketing',
  '/notifications',
  '/profile',
  '/resources',
  '/safety',
  '/settings',
  '/submit-idea',
  '/api/admin',
  '/jewett-junction/api/admin',
];

function getCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') || '';
  const allowedOrigins = import.meta.env.ALLOWED_ORIGINS
    ? import.meta.env.ALLOWED_ORIGINS.split(',').map((o: string) => o.trim())
    : [];
  const requestUrl = new URL(request.url);
  const sameOrigin = origin === requestUrl.origin;
  const isAllowed = sameOrigin || allowedOrigins.includes(origin);
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : requestUrl.origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept',
    'Access-Control-Max-Age': '86400',
  };
}

function isGatedPath(pathname: string): boolean {
  return GATED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

function getClientIp(request: Request): string | null {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    null
  );
}

function getAllowedIpsEnv(locals: any): string | undefined {
  const runtime = (locals as any)?.runtime;
  return runtime?.env?.ALLOWED_IPS || import.meta.env.ALLOWED_IPS;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const { request } = context;

  if (pathname.startsWith('/api/') || pathname.startsWith('/jewett-junction/api/')) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: getCorsHeaders(request) });
    }
  }

  if (isGatedPath(pathname)) {
    const rawAllowlist = getAllowedIpsEnv(context.locals);
    const allowlist = parseAllowlist(rawAllowlist);
    if (allowlist.length > 0) {
      const ip = getClientIp(request);
      if (!isAllowedIp(ip, allowlist)) {
        if (pathname.includes('/api/')) {
          return new Response(JSON.stringify({ error: 'Access denied' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        return context.rewrite('/access-denied');
      }
    }
  }

  if (pathname === '/jewett-junction' || pathname === '/jewett-junction/') {
    return context.rewrite('/dashboard');
  }

  const response = await next();

  if (pathname.startsWith('/api/') || pathname.startsWith('/jewett-junction/api/')) {
    const corsHeaders = getCorsHeaders(request);
    const newHeaders = new Headers(response.headers);
    Object.entries(corsHeaders).forEach(([key, value]) => newHeaders.set(key, value));
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }

  return response;
});
```

Key design notes:
- When `ALLOWED_IPS` is empty/unset, the gate is disabled — prevents locking yourself out in dev.
- Unauthenticated API calls get JSON 403 (not HTML rewrite) so fetch callers see a clean error.
- Root rewrite (`/jewett-junction` → `/dashboard`) happens AFTER the IP check so the gate applies to it too.

- [ ] **Step 4: Verify with and without allowlist**

Set no env var (or empty):
Run: `npm run dev`
Navigate to: `http://localhost:4321/dashboard`
Expected: dashboard loads normally.

Now set `ALLOWED_IPS=9.9.9.9/32` in `.dev.vars` (Wrangler format) or `.env` and restart:
Navigate to: `http://localhost:4321/dashboard`
Expected: rewritten to `/access-denied` page (dev machine's `cf-connecting-ip` is absent or localhost, so it won't match `9.9.9.9/32`).
API check: `curl -i http://localhost:4321/api/admin/items?collection=announcements`
Expected: `HTTP/1.1 403` with JSON `{"error":"Access denied"}`.

Set `ALLOWED_IPS=0.0.0.0/0` and retry dashboard — expected: loads normally (matches any IP, but only if a client IP is forwarded; in pure `astro dev` without CF proxy, no CF-Connecting-IP header is set, so with just `0.0.0.0/0` it will still deny. Add `x-forwarded-for` or test via `npm run preview` which uses Wrangler and forwards headers).

- [ ] **Step 5: Document the env var**

Edit `README.md` (append to the environment section, or add a new section if none). Add:

```md
## IP Allowlist (Intranet + Admin)

Set `ALLOWED_IPS` to a comma-separated list of CIDR ranges to restrict intranet and admin access:

ALLOWED_IPS=203.0.113.0/24,198.51.100.42/32

When unset or empty, the gate is disabled. Entries must be IPv4. The gate reads `CF-Connecting-IP` (Cloudflare) with `X-Forwarded-For` as fallback. Configure in Webflow Cloud environment settings for production; in `.dev.vars` for local Wrangler dev.
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/ip-allowlist.ts src/lib/ip-allowlist.test.mjs src/pages/access-denied.astro src/middleware.ts README.md
git commit -m "feat(security): IP allowlist for intranet and admin routes"
```

---

## Task 4: Editable Banner Messages for the rotating top marquee

Replace the hardcoded marquee at `src/pages/dashboard/index.astro:216-254` with CMS-driven content. Supports auto-hide when expiration passes (server-side filter on fetch) and an `is-active` toggle. Falls back to existing static strings when the collection is empty or unreachable.

**Files (prerequisite):** Webflow collection "Banner Messages" must exist (see "Manual prerequisites" at top of plan).

**Files:**
- Modify: `src/lib/webflow-cms.ts` (add COLLECTIONS entry, add `getBannerMessages()`)
- Modify: `src/components/admin/collections.ts` (add `banner` config)
- Modify: `src/pages/api/admin/items.ts` (add `banner` to VALID_FIELDS)
- Create: `src/pages/admin/banner.astro` (admin page for the collection)
- Modify: `src/pages/dashboard/index.astro` (fetch + render)

- [ ] **Step 1: Add the collection ID to webflow-cms.ts**

Edit `src/lib/webflow-cms.ts` `COLLECTIONS` object (line 292). Add one line:

```ts
banner: 'PASTE_WEBFLOW_COLLECTION_ID_HERE',
```

Paste the ID from the Webflow dashboard (from the prerequisite step).

- [ ] **Step 2: Add a fetcher**

In `src/lib/webflow-cms.ts`, add near other collection helpers:

```ts
export async function getBannerMessages(options?: { limit?: number }) {
  if (!COLLECTIONS.banner) return { items: [], total: 0 };
  const now = new Date();
  const result = await getCollection<any>(COLLECTIONS.banner, options);
  const items = result.items
    .filter((m) => m['is-active'] !== false)
    .filter((m) => {
      if (!m['expiration-date']) return true;
      const exp = new Date(m['expiration-date']);
      return isNaN(exp.getTime()) || exp > now;
    })
    .sort((a, b) => (a['display-order'] ?? 999) - (b['display-order'] ?? 999));
  return { ...result, items };
}
```

- [ ] **Step 3: Add the admin collection config**

Edit `src/components/admin/collections.ts` — add inside `COLLECTIONS` object (anywhere before the closing `};`):

```ts
banner: {
  name: 'Banner Messages',
  icon: 'Sparkles',
  color: 'purple',
  gradient: 'from-purple-500 to-pink-500',
  description: 'Rotating announcement banner at top of the dashboard',
  fields: [
    { key: 'name', label: 'Internal Name', type: 'text', required: true, placeholder: 'e.g., Construction Safety Week', helpText: 'Used only in admin — not shown to employees', icon: 'FileText' },
    { key: 'message', label: 'Banner Text', type: 'text', required: true, placeholder: 'e.g., Safety First - 4EverSafe', helpText: 'Text shown in the scrolling banner', icon: 'Megaphone' },
    { key: 'display-order', label: 'Display Order', type: 'number', placeholder: '1', helpText: 'Lower numbers appear first' },
    { key: 'icon-color', label: 'Icon Color', type: 'select', options: ['amber', 'emerald', 'pink', 'cyan', 'blue', 'purple'], helpText: 'Color of the leading icon', icon: 'Palette' },
    { key: 'expiration-date', label: 'Expiration Date', type: 'datetime', helpText: 'Optional — auto-hide after this time', icon: 'Clock' },
    { key: 'is-active', label: 'Active', type: 'boolean', helpText: 'Toggle off to hide without deleting' },
  ],
},
```

- [ ] **Step 4: Whitelist the fields on the items API**

Edit `src/pages/api/admin/items.ts` `VALID_FIELDS` object (line 12). Add:

```ts
banner: [
  'name', 'slug', 'message', 'display-order', 'icon-color', 'expiration-date', 'is-active',
],
```

- [ ] **Step 5: Create the admin page**

Create `src/pages/admin/banner.astro`:

```astro
---
import AdminBase from '../../layouts/admin-base.astro';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { CollectionEditor } from '../../components/admin/CollectionEditor';
import { COLLECTIONS } from '../../components/admin/collections';
---

<AdminBase title="Banner Messages | Admin">
  <AdminLayout client:load currentPage="banner" title="Banner Messages">
    <CollectionEditor client:load collectionKey="banner" config={COLLECTIONS.banner} />
  </AdminLayout>
</AdminBase>
```

- [ ] **Step 6: Render CMS-driven marquee on the dashboard**

Edit `src/pages/dashboard/index.astro`. In the frontmatter (top of file), update the `initCMS` import line (line 8) to include `getBannerMessages`:

```ts
import { initCMS, getAnnouncements, getEvents, getJobPostings, getCultureStories, getHRContent, getSafetyContent, getITKnowledgeBase, getMarketingAssets, getBannerMessages } from '../../lib/webflow-cms';
```

Add a new `let bannerMessages: any[] = [];` declaration alongside the other `let` declarations (line 14+), and fetch it in the `Promise.all` block (line 24), then assign it alongside the other results:

```ts
let bannerMessages: any[] = [];

try {
  const [announcementsRes, eventsRes, jobsRes, cultureRes, hrRes, safetyRes, itRes, marketingRes, bannerRes] = await Promise.all([
    getAnnouncements({ limit: 10 }),
    getEvents({ limit: 6, upcoming: true }),
    getJobPostings({ limit: 5 }),
    getCultureStories({ limit: 4 }),
    getHRContent({ limit: 3, featured: true }),
    getSafetyContent({ limit: 3, featured: true }),
    getITKnowledgeBase({ limit: 3, featured: true }),
    getMarketingAssets({ limit: 6, featured: true }),
    getBannerMessages({ limit: 20 }),
  ]);
  announcements = announcementsRes.items;
  events = eventsRes.items;
  jobs = jobsRes.items;
  cultureStories = cultureRes.items;
  hrContent = hrRes.items;
  safetyContent = safetyRes.items;
  itArticles = itRes.items;
  marketingAssets = marketingRes.items;
  bannerMessages = bannerRes.items;
} catch (error) {
  console.error('Error fetching CMS data:', error);
}
```

Then, replace the hardcoded marquee block at lines 216-254 with a CMS-driven render. The replacement starts at `<!-- Mission Statement Banner -->` and ends at the closing `</div>` of that outer marquee container. Replace with:

```astro
<!-- Rotating Banner Messages -->
{(() => {
  const FALLBACK = [
    { message: 'Building Excellence. Delivering Results. Creating Futures.', 'icon-color': 'amber' },
    { message: 'Safety First - 4EverSafe', 'icon-color': 'emerald' },
    { message: 'People. Integrity. Excellence. Teamwork.', 'icon-color': 'pink' },
    { message: 'Building New England Since 1972', 'icon-color': 'cyan' },
  ];
  const messages = bannerMessages.length > 0 ? bannerMessages : FALLBACK;
  const colorClass: Record<string, string> = {
    amber: 'text-amber-300', emerald: 'text-emerald-300', pink: 'text-pink-300',
    cyan: 'text-cyan-300', blue: 'text-blue-300', purple: 'text-purple-300',
  };
  // Duplicate the list for seamless marquee loop
  const loop = [...messages, ...messages];
  return (
    <div class="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 overflow-hidden relative" role="marquee" aria-label="Company messages">
      <div class="py-3 overflow-hidden whitespace-nowrap">
        <div class="animate-marquee inline-flex">
          {loop.map((m, i) => (
            <span class="mx-8 text-white font-medium flex items-center gap-2" key={i}>
              <svg class={`w-5 h-5 ${colorClass[m['icon-color']] || 'text-amber-300'}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
              {m.message}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
})()}
```

The fallback ensures the banner still renders if the Webflow collection returns empty or errors.

- [ ] **Step 7: Verify in browser**

Run: `npm run dev`
Navigate to: `http://localhost:4321/admin/banner`
Expected: empty collection editor; add a message "Test message 1" with order 1 and color "cyan". Save.
Navigate to: `http://localhost:4321/dashboard`
Expected: marquee shows your new message in cyan. If the Webflow publish lag is noticeable, trigger a publish from admin.
Verify expiration: add another item with expiration-date in the past — it should NOT appear in the dashboard marquee after reload.

- [ ] **Step 8: Commit**

```bash
git add src/lib/webflow-cms.ts src/components/admin/collections.ts src/pages/api/admin/items.ts src/pages/admin/banner.astro src/pages/dashboard/index.astro
git commit -m "feat(dashboard): CMS-driven banner messages with auto-expiry"
```

---

## Task 5: PDF upload + preview/download field type

Extend the upload API to accept PDFs and introduce a `file` field type for CollectionEditor so admins can attach PDFs to Resources, HR Content, Safety Content, etc. PDFs render in an iframe preview with a prominent download button on the intranet pages. Images continue to work unchanged.

**Files:**
- Modify: `src/pages/api/admin/upload.ts` (accept PDF MIME, raise size limit for PDFs)
- Modify: `src/components/admin/collections.ts` (add `'file'` to `FieldConfig.type` union)
- Modify: `src/components/admin/CollectionEditor.tsx` (render file upload + preview + download UI for `file` fields)
- Modify: `src/pages/api/admin/items.ts` (no field additions needed, but confirm `file` slug is already whitelisted for `resources`)

- [ ] **Step 1: Accept PDFs in the upload API**

Edit `src/pages/api/admin/upload.ts`. Replace `allowedTypes` at line 131 with:

```ts
const allowedTypes = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  'application/pdf',
];
```

Replace the max-size block (line 145-154) with a type-aware limit (images stay at 750 KB, PDFs get 5 MB since Webflow Cloud request body cap is higher for non-image assets):

```ts
const imageMax = 750 * 1024;        // 750 KB
const pdfMax = 5 * 1024 * 1024;     // 5 MB
const maxSize = fileType === 'application/pdf' ? pdfMax : imageMax;
if (fileSize > maxSize) {
  const kb = Math.round(maxSize / 1024);
  return withCors(new Response(JSON.stringify({
    error: `File too large. Maximum size is ${kb} KB for ${fileType === 'application/pdf' ? 'PDFs' : 'images'}.`
  }), { status: 400, headers: { 'Content-Type': 'application/json' } }));
}
```

- [ ] **Step 2: Extend FieldConfig type union**

Edit `src/components/admin/collections.ts:7`. Change:

```ts
type: 'text' | 'email' | 'tel' | 'url' | 'number' | 'textarea' | 'richtext' | 'datetime' | 'select' | 'boolean' | 'image';
```

to:

```ts
type: 'text' | 'email' | 'tel' | 'url' | 'number' | 'textarea' | 'richtext' | 'datetime' | 'select' | 'boolean' | 'image' | 'file';
```

- [ ] **Step 3: Add a `file` field to Resources**

In `src/components/admin/collections.ts`, inside the `resources` config, replace the existing `external-link` field with a richer pair:

```ts
{ key: 'file', label: 'Document File (PDF)', type: 'file', helpText: 'Upload a PDF — employees can preview in-browser and download', icon: 'FileText' },
{ key: 'external-link', label: 'External Link', type: 'url', placeholder: 'https://...', helpText: 'Use instead of file upload for third-party resources', icon: 'Link' },
```

The `file` slug is already in the `resources` VALID_FIELDS list at `src/pages/api/admin/items.ts:37`.

- [ ] **Step 4: Render the `file` type in CollectionEditor**

Edit `src/components/admin/CollectionEditor.tsx`. Find the `renderField` / field-rendering switch (grep for the `case 'image':` block). Immediately after the image case, add:

```tsx
case 'file': {
  const fileUrl = typeof formData[field.key] === 'object' ? (formData[field.key] as any)?.url : formData[field.key];
  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="application/pdf"
        id={`file-${field.key}`}
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          await uploadAndAttachFile(field.key, file);
        }}
      />
      {fileUrl ? (
        <div className="border border-slate-700 rounded-xl overflow-hidden">
          <iframe src={fileUrl} title={field.label} className="w-full h-64 bg-slate-950" />
          <div className="p-3 flex items-center gap-2 bg-slate-900">
            <a href={fileUrl} target="_blank" rel="noopener noreferrer"
               className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm">
              Download
            </a>
            <button type="button" onClick={() => setFormData((prev) => ({ ...prev, [field.key]: '' }))}
                    className="px-3 py-2 border border-slate-700 rounded-lg text-sm text-slate-300 hover:bg-slate-800">
              Remove
            </button>
            <label htmlFor={`file-${field.key}`}
                   className="px-3 py-2 border border-slate-700 rounded-lg text-sm text-slate-300 hover:bg-slate-800 cursor-pointer">
              Replace
            </label>
          </div>
        </div>
      ) : (
        <label htmlFor={`file-${field.key}`}
               className="flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-slate-700 rounded-xl text-slate-400 hover:border-blue-500 hover:text-blue-400 cursor-pointer">
          <Upload className="h-5 w-5" /> Upload PDF (max 5 MB)
        </label>
      )}
      {field.helpText && <p className="text-xs text-slate-500">{field.helpText}</p>}
    </div>
  );
}
```

Add an `uploadAndAttachFile` helper beside the existing image upload handler. Reuse the same base64 upload pattern the image handler already uses (grep for `handleImageUpload` or the fetch to `/api/admin/upload`). Minimal skeleton (adapt to match the existing helper's signature):

```tsx
const uploadAndAttachFile = async (fieldKey: string, file: File) => {
  setUploadingField(fieldKey);
  try {
    const reader = new FileReader();
    const base64 = await new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
    const res = await fetch(`${API_BASE}/api/admin/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({ fileName: file.name, fileType: file.type, fileSize: file.size, fileData: base64 }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    setFormData((prev) => ({ ...prev, [fieldKey]: data.url }));
    setImageFileIds((prev) => ({ ...prev, [fieldKey]: data.id }));
    setSuccess('File uploaded');
  } catch (err: any) {
    setError(err?.message || 'Upload failed');
  } finally {
    setUploadingField(null);
  }
};
```

If the existing image handler is named differently, alias to it instead of duplicating.

- [ ] **Step 5: Verify in browser**

Run: `npm run dev`
Navigate to: `http://localhost:4321/admin/resources`
Click "+ New" → fill Name, upload a small PDF (< 5 MB) into the new Document File field. Save.
Expected: upload succeeds, iframe preview renders, Download link opens the PDF in a new tab.
Visit: `http://localhost:4321/resources`
Expected: the resource appears with a working download link (the existing `/resources` page already reads `file` or `external-link` — verify; if not, that's a separate intranet page rendering task).

- [ ] **Step 6: Commit**

```bash
git add src/pages/api/admin/upload.ts src/components/admin/collections.ts src/components/admin/CollectionEditor.tsx
git commit -m "feat(admin): PDF upload with in-browser preview and download"
```

---

## Task 6: CSV bulk upload for intranet collections

Lets the admin paste or upload a CSV to create many items at once. Focus on the simplest useful shape: select a collection, upload CSV, preview rows, confirm. Handles Google Drive file links as plain `url` / `external-link` fields — no file fetching; user pastes the shareable link. Images require the URL or can be uploaded separately. Out of scope: image upload from URLs, complex cell transformations.

**Files:**
- Create: `src/pages/admin/bulk-upload.astro` (admin page)
- Create: `src/components/admin/BulkUploader.tsx` (React component)
- Create: `src/pages/api/admin/bulk-import.ts` (batch create endpoint)
- Modify: `src/components/admin/AdminLayout.tsx` (add link in Intranet group)

- [ ] **Step 1: Add the bulk-import API endpoint**

Create `src/pages/api/admin/bulk-import.ts`:

```ts
import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../../lib/webflow-cms';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

function verifyToken(request: Request): boolean {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  if (!token || !token.startsWith('admin_')) return false;
  const parts = token.slice('admin_'.length).split('.');
  if (parts.length !== 3) return false;
  const timestamp = parseInt(parts[1], 10);
  if (isNaN(timestamp)) return false;
  return Date.now() - timestamp <= 24 * 60 * 60 * 1000;
}

function getApiToken(locals: any): string {
  const runtime = (locals as any)?.runtime;
  return runtime?.env?.WEBFLOW_API_TOKEN || (import.meta.env as any).WEBFLOW_API_TOKEN;
}

export const POST: APIRoute = async ({ request, locals }) => {
  if (!verifyToken(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  const { collection, rows } = await request.json();
  const collectionId = (COLLECTIONS as Record<string, string>)[collection];
  if (!collectionId) {
    return new Response(JSON.stringify({ error: 'Invalid collection' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  if (!Array.isArray(rows) || rows.length === 0) {
    return new Response(JSON.stringify({ error: 'No rows provided' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  if (rows.length > 100) {
    return new Response(JSON.stringify({ error: 'Maximum 100 rows per import' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const apiToken = getApiToken(locals);
  const results: Array<{ ok: boolean; row: number; error?: string; id?: string }> = [];

  for (let i = 0; i < rows.length; i++) {
    const fieldData = rows[i];
    try {
      const res = await fetch(`${BASE_URL}/collections/${collectionId}/items`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ isArchived: false, isDraft: false, fieldData }),
      });
      if (!res.ok) {
        const err = await res.text();
        results.push({ ok: false, row: i, error: err.substring(0, 200) });
      } else {
        const data = await res.json();
        results.push({ ok: true, row: i, id: data.id });
      }
    } catch (e: any) {
      results.push({ ok: false, row: i, error: e?.message || 'Unknown error' });
    }
  }

  const succeeded = results.filter((r) => r.ok).length;
  return new Response(JSON.stringify({ succeeded, failed: results.length - succeeded, results }), {
    status: 200, headers: { 'Content-Type': 'application/json' },
  });
};
```

- [ ] **Step 2: Add the BulkUploader component**

Create `src/components/admin/BulkUploader.tsx`:

```tsx
import * as React from 'react';
import { Upload, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { COLLECTIONS as COLLECTION_CONFIGS } from './collections';

const API_BASE = '/jewett-junction';

// Intranet-scope collections only, for bulk import safety
const BULK_COLLECTIONS = [
  'announcements', 'events', 'jobPostings', 'cultureStories', 'employees', 'resources',
  'hrContent', 'safetyContent', 'itKnowledgeBase', 'marketingAssets', 'submittedIdeas', 'banner',
];

function parseCsv(text: string): { headers: string[]; rows: Record<string, string>[] } {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return { headers: [], rows: [] };
  const parseLine = (line: string): string[] => {
    const out: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inQuotes) {
        if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
        else if (c === '"') { inQuotes = false; }
        else { cur += c; }
      } else {
        if (c === '"') inQuotes = true;
        else if (c === ',') { out.push(cur); cur = ''; }
        else cur += c;
      }
    }
    out.push(cur);
    return out.map((v) => v.trim());
  };
  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).map((line) => {
    const cells = parseLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => { row[h] = cells[idx] ?? ''; });
    return row;
  });
  return { headers, rows };
}

export function BulkUploader() {
  const [collection, setCollection] = React.useState('announcements');
  const [csvText, setCsvText] = React.useState('');
  const [parsed, setParsed] = React.useState<{ headers: string[]; rows: Record<string, string>[] } | null>(null);
  const [isImporting, setIsImporting] = React.useState(false);
  const [result, setResult] = React.useState<{ succeeded: number; failed: number; results: Array<{ ok: boolean; row: number; error?: string }> } | null>(null);

  const config = (COLLECTION_CONFIGS as any)[collection];
  const validKeys = new Set(config?.fields.map((f: any) => f.key) ?? []);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      setCsvText(text);
      setParsed(parseCsv(text));
      setResult(null);
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!parsed || parsed.rows.length === 0) return;
    setIsImporting(true);
    setResult(null);
    const rows = parsed.rows.map((row) => {
      const filtered: Record<string, string> = {};
      for (const [k, v] of Object.entries(row)) {
        if (validKeys.has(k) && v !== '') filtered[k] = v;
      }
      return filtered;
    });
    const token = localStorage.getItem('admin_token') || '';
    const res = await fetch(`${API_BASE}/api/admin/bulk-import`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({ collection, rows }),
    });
    const data = await res.json();
    setResult(data);
    setIsImporting(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Target Collection</label>
          <select value={collection} onChange={(e) => { setCollection(e.target.value); setParsed(null); setResult(null); }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white">
            {BULK_COLLECTIONS.map((k) => (
              <option key={k} value={k}>{(COLLECTION_CONFIGS as any)[k]?.name || k}</option>
            ))}
          </select>
          <p className="text-xs text-slate-500 mt-1">CSV headers must match field slugs: {Array.from(validKeys).join(', ')}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">CSV File</label>
          <input type="file" accept=".csv,text/csv" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                 className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-600" />
        </div>
      </div>

      {parsed && parsed.rows.length > 0 && (
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-white">Preview — first 5 of {parsed.rows.length} rows</h3>
            <button onClick={handleImport} disabled={isImporting}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg text-sm flex items-center gap-2">
              {isImporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              Import {parsed.rows.length} rows
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="text-xs text-slate-300 w-full">
              <thead><tr className="border-b border-slate-700">
                {parsed.headers.map((h) => (
                  <th key={h} className={`text-left p-2 ${validKeys.has(h) ? 'text-white' : 'text-slate-500 line-through'}`}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {parsed.rows.slice(0, 5).map((row, i) => (
                  <tr key={i} className="border-b border-slate-800">
                    {parsed.headers.map((h) => <td key={h} className="p-2 max-w-[200px] truncate">{row[h]}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-2">Strikethrough columns are ignored — header doesn't match any field in this collection.</p>
        </div>
      )}

      {result && (
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span className="text-white">{result.succeeded} succeeded</span>
            {result.failed > 0 && (<>
              <XCircle className="h-5 w-5 text-rose-400 ml-4" />
              <span className="text-white">{result.failed} failed</span>
            </>)}
          </div>
          {result.failed > 0 && (
            <details className="text-xs text-slate-400">
              <summary className="cursor-pointer">Show failures</summary>
              <ul className="mt-2 space-y-1">
                {result.results.filter((r) => !r.ok).map((r) => (
                  <li key={r.row}>Row {r.row + 1}: {r.error}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Add the admin page**

Create `src/pages/admin/bulk-upload.astro`:

```astro
---
import AdminBase from '../../layouts/admin-base.astro';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { BulkUploader } from '../../components/admin/BulkUploader';
---

<AdminBase title="Bulk Upload | Admin">
  <AdminLayout client:load currentPage="bulk-upload" title="Bulk Upload">
    <BulkUploader client:load />
  </AdminLayout>
</AdminBase>
```

- [ ] **Step 4: Add a nav link**

Edit `src/components/admin/AdminLayout.tsx`. In the Intranet group inside `NAV_GROUPS` (added in Task 2), append:

```ts
{ key: 'bulk-upload', name: 'Bulk Upload', icon: Upload, color: 'teal', href: '/jewett-junction/admin/bulk-upload' },
```

Also import `Upload` at the top of the file alongside the other lucide imports.

- [ ] **Step 5: Verify in browser**

Run: `npm run dev`
Prepare a small CSV `test.csv`:

```csv
name,message,display-order,icon-color,is-active
Safety Week,Construction Safety Week - Be Vigilant,1,emerald,true
Winter Ops,Dress for the weather,2,cyan,true
```

Navigate to: `http://localhost:4321/admin/bulk-upload`
Select collection: Banner Messages. Upload `test.csv`.
Expected: preview shows 2 rows with all columns in white (none struck through). Click Import.
Expected: "2 succeeded". Navigate to `/admin/banner` → 2 new items appear. Navigate to `/dashboard` → marquee includes both new messages.

Try a negative case — add an unknown header like `foobar` and import again:
Expected: that column is struck through in preview and ignored on import.

- [ ] **Step 6: Commit**

```bash
git add src/pages/api/admin/bulk-import.ts src/components/admin/BulkUploader.tsx src/pages/admin/bulk-upload.astro src/components/admin/AdminLayout.tsx
git commit -m "feat(admin): CSV bulk upload for intranet collections"
```

---

## Self-Review Checklist

- **Spec coverage:** IP allowlist (Task 3), admin Intranet/Website grouping with colored indicators (Task 2), Team Members department fix (Task 1), editable Banner Bar (Task 4), PDF preview + download (Task 5), CSV bulk upload (Task 6). Careers page is intentionally out of scope — it's a public-website change, not a dashboard task.
- **Placeholder check:** All code blocks are complete. The Webflow collection ID in Task 4 Step 1 is the one user-supplied value — clearly marked with `PASTE_WEBFLOW_COLLECTION_ID_HERE`.
- **Type consistency:** `FieldConfig.type` gains `'file'` in Task 5 Step 2 before CollectionEditor uses it in Step 4. `NAV_GROUPS`/`COLLECTION_GROUPS` names are consistent. `banner` collection key is consistent across `collections.ts`, `webflow-cms.ts` COLLECTIONS, VALID_FIELDS, and the admin page's `currentPage` prop.
- **Order sensitivity:** Task 2 references `banner` in nav before Task 4 creates the page; the link will 404 during the window between Task 2 commit and Task 4 commit. Acceptable — the admin panel still renders. To avoid even that window, execute Task 4 before Task 2, or do Task 2 Step 1's `banner` entry as part of Task 4 Step 5. Flagging, not fixing, since executing tasks in order leaves only a short dev-window 404.

---

## Execution Handoff

Plan complete and saved to `docs/plans/2026-04-21-dashboard-improvements.md`. Two execution options:

**1. Subagent-Driven (recommended)** — Fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session with batch checkpoints for review.

Which approach?
