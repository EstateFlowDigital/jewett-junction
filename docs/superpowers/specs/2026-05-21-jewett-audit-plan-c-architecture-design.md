# Jewett Junction Audit — Plan C: Architecture & UX (Design)

**Date:** 2026-05-21
**Status:** Approved scope, ready for implementation plan
**Companion docs:** Plan A (code fixes), Plan B (CMS edits)
**Execution surface:** Code repo (Astro + React + Webflow CMS) and Webflow schema editor.

---

## Context

Plan A removes pure code bugs. Plan B cleans up CMS content. Plan C is the structural work that doesn't fit either: places where the schema is wrong, dedicated pages don't exist, the same data is read from two sources of truth, or admin UX makes maintenance painful. It also implements the user's directive: **delete all static/placeholder content and wire everything through CMS**.

The plan is intentionally larger than A or B. Items group naturally into four tracks:

```
Track 1 — Schema cleanup (Employees, Announcements, Events)
Track 2 — Static-content elimination (every hardcoded array/string → CMS)
Track 3 — New surfaces (HR sub-pages, Vendor Contacts, dynamic Photo Library)
Track 4 — Admin panel UX bugs
```

Track 1 + 2 are the highest impact. Track 3 is net-new pages. Track 4 is admin-side polish. Track 4 is where admins lose the most time today, but Track 1+2 fix the most public-side issues.

Admin governance (per-user accounts, RBAC, 2FA, audit log) is explicitly deferred indefinitely per Cameron's decision — the shared password stays.

---

## Architecture

### Form submission stack (used across Track 3)

All forms that today go to the wrong destination or fire-and-forget will route through a unified Resend + Astro API stack:

```
[Form on public page]
        │
        ▼
[POST /api/submit-<form>]   ← per-form Astro endpoint
        │
        ├─► Resend API ────► <department>@jewettconstruction.com
        │
        └─► Webflow CMS  ────► Form Submissions collection (for audit trail)
```

Each form gets its own `/api/submit-*` endpoint that:
1. Validates input.
2. Maps department → recipient email (lookup table or Site Settings).
3. Sends email via Resend.
4. Writes a record to the Webflow Form Submissions collection.
5. Returns success/failure to the form's client.

This replaces today's mixed pattern (some forms post directly to Webflow, some hit `/api/safety-incident.ts` etc.) with one consistent shape.

### Static content elimination

Every hardcoded array, fallback constant, or placeholder string that drives the public UI gets replaced with a CMS read. The pattern:

| Today | After Plan C |
|---|---|
| `const DEFAULT_SECTION_BODY = "..."` in component | Read from Page Copy collection by slug; component falls back to "" |
| Hardcoded department/category options in TS | Read from a `taxonomies` collection or from Site Settings option fields |
| Hardcoded contact emails / phones | Read from Site Settings |
| Hardcoded stats (Days Without Incident, Volunteer Hours, etc.) | Read from Site Settings |
| Hardcoded "Common Issues" placeholder list | Read from IT Knowledge collection only |
| Hardcoded service-area list on Project Manager | Read from CMS Service Areas reference field on the job |

The acceptance criterion for "static content elimination": grep the codebase for hardcoded long-string constants in components/pages; each remaining one is either truly stylistic (button labels, microcopy) or escalates to a follow-up ticket.

---

## Tracks

### Track 1 — Schema cleanup (P1)

**T1.1 — Canonicalize Employee Department field**

- The Employees collection has three department-like fields: `Department` (Basics), `Department` (General), `Team Department` (General).
- Canonical winner: **`Team Department`**.
- Migration:
  1. Audit all 43 records to identify which of the three fields each employee's "real" department lives in.
  2. Backfill `Team Department` on every record using whichever existing field holds the correct value.
  3. Remove the option `Test Department` from `Team Department`.
  4. Delete the two redundant fields from the schema (after confirming no other code reads them).
  5. Update [src/lib/webflow-cms.ts](../../../src/lib/webflow-cms.ts) field-alias map so `department` resolves to `team-department` only. Remove the `team-department` → `dept` chain.
  6. Update [src/components/pages/DirectoryContent.tsx](../../../src/components/pages/DirectoryContent.tsx) and any consumer to read the canonical field.
- Public outcome: Directory shows real departments (HR, IT, Marketing, Safety, Engineering, etc.) instead of "Team (41) / Operations (2)".

**Risks:** any place that grep'd for `dept` or `team-department` could break silently. Run a grep before deleting the field aliases.

**T1.2 — Resolve duplicate Priority on Announcements**

- Schema has two Priority fields with different casings. Pick the one under `Categorization` (`Normal / High / Urgent`).
- Migrate any record that only has the General-tab field populated to use the Categorization field.
- Remove the General-tab Priority field from the schema.
- Verify the public Announcements page reads the canonical field. Public-side code change minor.

**T1.3 — Resolve duplicate Category on Events**

- Same pattern: `Event Type` (Basics) vs `Category` (General) both present.
- Pick `Event Type` as canonical (it's the more discoverable label).
- Migrate; remove the duplicate; update [src/lib/webflow-cms.ts](../../../src/lib/webflow-cms.ts) aliases and [src/components/pages/EventsContent.tsx](../../../src/components/pages/EventsContent.tsx) consumer.
- Note: Plan A already dedupes the `categoryConfig` keys. T1.3 removes the upstream data fork.

**T1.4 — Add `is-vendor` to Employees**

- Add boolean field `is-vendor` to the Employees schema.
- Default false.
- Tag SymQuest = true (after re-creating the record per Plan B Group B5).
- Update [src/components/pages/DirectoryContent.tsx](../../../src/components/pages/DirectoryContent.tsx) to filter `is-vendor === true` out of the Directory list.
- See T3.2 for the Vendor Contacts surface.

**T1.5 — Remove "Test Department" option from Job Postings Department dropdown**

- Schema cleanup; one option removal.

---

### Track 2 — Static-content elimination (P0, per Cameron's directive)

**T2.1 — Page Copy records for every hub**

- Plan B Group B9 creates the CMS records.
- Plan C verifies every hub page reads its Page Copy first and only falls back to "" (not to a hardcoded paragraph) if no record exists.
- Files to audit:
  - [src/components/pages/CareersContent.tsx:598](../../../src/components/pages/CareersContent.tsx) — `DEFAULT_SECTION_BODY` constant should be replaced with `''` after Page Copy `careers` is populated.
  - [src/components/pages/HRContent.tsx](../../../src/components/pages/HRContent.tsx) — any default intro paragraph.
  - [src/components/pages/SafetyContent.tsx](../../../src/components/pages/SafetyContent.tsx) — same.
  - [src/components/pages/ITHelpdeskContent.tsx](../../../src/components/pages/ITHelpdeskContent.tsx) — same.
  - [src/components/pages/MarketingContent.tsx](../../../src/components/pages/MarketingContent.tsx) — same.
- Result: every hub intro is editable in admin without a code deploy.

**T2.2 — Site Settings drives stats and contacts**

- Plan B Group B8 populates Site Settings. Plan C verifies the public side reads from Site Settings instead of hardcoded values for:
  - "247 Days Without Incident" on /safety
  - "98% Training Compliance" on /safety
  - "$125K Donated" on /culture
  - "450+ Volunteer Hours" on /culture
  - "Mon–Fri 7:00 AM – 6:00 PM" on /it-helpdesk
  - Emergency / safety hotline / poison control phone numbers
  - EAP phone number
  - Brand colors and social URLs
- Implementation: a `getSiteSettings()` fetcher in [src/lib/webflow-cms.ts](../../../src/lib/webflow-cms.ts) returns the singleton. Pages call it and pass values down as props. Each consumer falls back to `''` or a sensible neutral if a field is empty (not to a hardcoded number).

**T2.3 — Taxonomy options come from CMS**

- Job posting Department options, Employee Team Department options, Announcement Priority options, Event Type options should ideally be edited in admin. Two strategies:
  - **Cheap:** keep them as Webflow option fields (admin edits the schema), accept that adding a new option requires schema-edit access.
  - **Better:** create a small `Taxonomies` collection where each record is `{ taxonomy: 'department', value: 'HR', sort-order: 3 }`. Schemas reference this collection. Adds complexity but lets non-developers manage taxonomies.
- **Recommendation for Plan C: keep option fields, just remove the bad options (`Test Department`).** The Taxonomies collection is a follow-up.

**T2.4 — IT "Common Issues" pulled from IT Knowledge only**

- [src/components/pages/ITHelpdeskContent.tsx](../../../src/components/pages/ITHelpdeskContent.tsx) currently shows skeletons or empty when IT Knowledge has no records. Plan A adds a neutral empty state. Plan C ensures the entire "Common Issues" panel is driven by IT Knowledge records (no hardcoded placeholder list anywhere).

**T2.5 — Project Manager service-area list comes from CMS**

- Today, the malformed list lives in the Project Manager job posting body (or hardcoded). Replace with a reference field `service-areas` on the Job Postings schema, pointing into the Service Areas collection.
- Detail page renders the referenced list dynamically.
- Plan B Group B10 audits which states should actually be referenced.

**T2.6 — Footer / sidebar / nav are CMS-driven where reasonable**

- Audit hardcoded nav arrays in shared layout. The Intranet Sections collection already drives the 404/help hub; verify it's used everywhere the section list appears.

---

### Track 3 — New surfaces (P1)

**T3.1 — HR sub-pages**

Build four real Astro pages with CMS-backed content:

- `/hr/pay` — Pay & Tax Info
- `/hr/time-off` — Time Off
- `/hr/benefits` — Benefits
- `/hr/help` — Get Help

Each page reads:
- Its own Page Copy record by slug for the intro.
- HR Content collection items filtered by a `subtopic` field (added to HR Content schema).
- Site Settings for any embedded phone/email/links.

Update [src/components/pages/HRContent.tsx](../../../src/components/pages/HRContent.tsx) so the four quick-action tiles link to these new routes.

**T3.2 — Vendor Contacts on /it-helpdesk**

Surface vendors (currently just SymQuest) in a dedicated card:

- New section on /it-helpdesk titled "Vendor Support".
- Reads from Employees where `is-vendor === true`.
- Renders each vendor with name, support portal URL, and contact info — different visual treatment from employee cards (no avatar initials; portal-link button).
- Uses the schema introduced in T1.4.

**T3.3 — IT tile deep-links**

- Add URL query-param support to [src/components/pages/ResourcesContent.tsx](../../../src/components/pages/ResourcesContent.tsx): reading `?category=` from the URL initializes the category filter.
- Update IT Helpdesk tile destinations:
  - Knowledge Base → `/resources`
  - Software → `/resources?category=Software`
  - My Devices → `/resources?category=Hardware`

**T3.4 — Safety Hazard deep-link**

- [src/pages/safety-incident.astro](../../../src/pages/safety-incident.astro) (or the form component) reads `?type=hazard` and pre-selects "Hazard Observation" in the Incident Type field.
- Update [src/components/pages/SafetyContent.tsx](../../../src/components/pages/SafetyContent.tsx) Report Hazard tile to link to `/safety-incident?type=hazard`.

**T3.5 — Photo Library**

- Repurpose [src/pages/marketing/photos.astro](../../../src/pages/marketing/photos.astro) to filter Marketing Assets where `asset-type === photo`.
- Add filter chips by photo category (project sites, events, team, etc.).
- Dashboard "Photo Gallery" widget reads N most recent photos from the same source (filtered to exclude logos).
- Empty state remains the neutral "No photos uploaded yet" from Plan A; surface real photos only when Plan B Group B11 supplies them.

**T3.6 — Related Content reference fields**

- Add an optional `related-items` multi-reference field to each content collection (Marketing Assets, HR Content, Safety Content, IT Knowledge, Culture Stories, Resources).
- Detail page renderer: if `related-items` has values, render those; otherwise fall back to today's auto-generation (same-collection-minus-self).
- The fallback stays so unset records still get a sensible default.

**T3.7 — Form submission unification (Resend + Astro)**

For each form (Submit Idea, Safety Incident, Signage Request, IT Ticket, Careers Apply, Submit Referral):

- Add a Resend API key to environment (single key; per-form `from` and `to` selectable).
- Create `/api/submit-<form>.ts` endpoint per form. Existing endpoints (`/api/safety-incident.ts`, `/api/it-ticket.ts`, `/api/signage-request.ts`, `/api/apply.ts`) are refactored to:
  1. Send Resend email to the configured department recipient.
  2. Write to Webflow Form Submissions collection (existing).
- New endpoints for Submit Idea and Submit Referral.
- Department recipients live in Site Settings (new fields: `submit-idea-recipient`, `submit-referral-recipient`, etc.).
- Each form's UI gets a success confirmation toast referencing the department ("Thanks — your safety incident has been routed to the Safety team. Expect a response within 24 hours.").

**Risks:**
- Resend free tier = 3K emails/month. Easy to stay under for an intranet but verify pricing.
- Existing form endpoints have their own validation logic; preserve it.
- Careers Apply must remain compatible with PDF resume attachments (Resend supports attachments via base64; size limit = 40 MB).

---

### Track 4 — Admin panel UX bugs (P2)

These improve admin maintainability without touching the public site.

**T4.1 — Sidebar nav for hidden collections**

- Add sidebar entries for: Intranet Sections, Core Values, Employee Benefits, Company Awards, Page Copy.
- Optional: group "Website" collections (Blog Posts, etc.) under a collapsible "Marketing Website" header so they're visible but not in the way of intranet admins.

**T4.2 — Consistent breadcrumbs**

- Audit every admin route. Ensure every page has `Admin › <Group> › <Page>` consistently.

**T4.3 — Edit button click race**

- First click sometimes no-ops on Banner Messages, Intranet Sections card. Debug the click handler — likely a state-not-yet-set race in the row click vs. button click. Stop event propagation as needed.

**T4.4 — Quick Action chips open create flow**

- "+ New Announcement", "+ New Event", etc. on Overview should open the create-record drawer for that collection directly, not just navigate to the collection index.

**T4.5 — List row ID column shows per-record IDs**

- In Intranet Sections, Core Values, Employee Benefits, Company Awards, and the Mission Banner Messages — the list view currently shows a truncated collection ID for every row. Fix the renderer to show each record's individual ID (or remove the ID column from the list view if it's not actionable; per-record IDs are mainly useful for support debugging).

**T4.6 — "Edit Page Cop" drawer title truncation**

- CSS overflow / heading width bug in the drawer header. Increase header width or use `text-overflow: ellipsis` at a wider breakpoint.

**T4.7 — Announcements list "No items yet" bug**

- Empty-state subtitle is rendered as a subtitle even when 3 items are present. Hide the empty-state text when `items.length > 0`.

**T4.8 — Publish site confirmation modal**

- The "Publish site to Webflow" button is destructive (publishes pending changes to the live site) with no confirmation. Add a modal: "Publish all pending changes to the live site?" with a list of which collections have unpublished items if possible. Cancel + Publish buttons.

**T4.9 — Form Submissions duplicate-ID display**

- Audit the list row ID renderer for Form Submissions — IDs are colliding (same truncated prefix on different records). Likely the truncation is too aggressive. Show enough characters to distinguish records, or drop the column.

**T4.10 — "Backfill from Webflow" button safeguard**

- Add a confirmation step + a "last run at" timestamp so admins don't double-trigger it.

**T4.11 — Quick Action "Needs Your Attention" criteria**

- Current Overview shows 6 records labeled "New" but Form Submissions has 12 records in Draft. Either:
  - Define "Needs Attention" as `status === Draft` and pull all 12.
  - Or document the criteria visibly in the widget header.

---

## Data flow / interfaces

### Site Settings reads

```
Astro page (.astro)
  ├─► getSiteSettings()  ←─ src/lib/webflow-cms.ts
  │     │
  │     └─► Webflow API → singleton record
  │
  └─► Pass values as props to <Component client:load />
        Component renders settings.daysWithoutIncident etc.
        Empty values fall back to '' (no hardcoded number).
```

### Form submission

```
Public form (React island)
  │
  ▼ POST /api/submit-<form>
[Astro endpoint]
  ├─► Resend.emails.send({ from, to, subject, html, attachments })
  ├─► Webflow.collections.items.create({ collection: 'form-submissions', ... })
  └─► return { ok: true, message: 'Routed to <Department>' }
        │
        ▼
Form shows success toast.
```

### Page Copy reads

```
Astro page
  ├─► getPageCopy('hr')   ←─ src/lib/webflow-cms.ts
  │     └─► Webflow API filtered by slug
  │
  └─► Pass `pageBody` prop to Component
        Component renders set:html={pageBody}
        Empty body falls back to '' (no hardcoded paragraph).
```

---

## Error handling

- **Resend failures:** API endpoints return `{ ok: false, error }`. Form UI shows a "Couldn't submit — please email <department> directly" fallback with the email pre-filled.
- **Webflow CMS write failures (Form Submissions):** Log; don't block the email send. The audit trail is nice-to-have; the email is the primary path.
- **Site Settings missing:** All consumers default to `''` (not to hardcoded values). Pages may show empty stats rather than fake numbers.
- **Page Copy missing:** Page renders without intro body. Plan A's neutral empty-state pattern applies if needed.
- **Schema migration mid-flight:** if the canonical Department field is mid-backfill, the Directory may briefly show "no department" for unmigrated records. Acceptable; communicate the migration window.

---

## Testing

After each track:

**Track 1:** /directory shows departments other than "Team" / "Operations"; admin Job Posting form has no "Test Department" in dropdowns; Announcements + Events render with single canonical field; no broken consumer references in components.

**Track 2:** Grep for `DEFAULT_SECTION_BODY`, `const DEFAULT_`, long hardcoded string constants in components — should return only stylistic/microcopy strings. Site Settings drives every stat surface. Editing any Page Copy or Site Settings field in admin reflects on the public site within a refresh.

**Track 3:**
- /hr/pay, /hr/time-off, /hr/benefits, /hr/help all return 200 and render CMS content.
- /it-helpdesk shows a Vendor Support card with SymQuest (or whichever vendor record exists).
- /resources?category=Software loads with Software category pre-selected.
- /safety-incident?type=hazard pre-selects Hazard Observation.
- /marketing/photos shows real photos from CMS; dashboard photo widget too.
- Submit Idea / Safety Incident / Signage Request / IT Ticket / Careers Apply / Submit Referral each route via Resend to the correct department email AND write to Webflow Form Submissions.

**Track 4:** Admin sidebar shows all 21+ collections; clicking "+ New Announcement" on Overview opens the create drawer; Edit buttons work first-click; Publish site shows a confirmation modal; list rows show per-record IDs.

---

## Out of scope

- **Per-user admin accounts, RBAC, 2FA, audit log** — deferred indefinitely per Cameron. Shared password stays.
- **Marketing-website / Team Members collection reconciliation** — separate initiative; Plan C does not merge the 12-person marketing Team Members with the 43-person intranet Employees.
- **Days Without Incident dynamic counter** — Plan B sets a manual field; Plan C does not build the incident-date-based computed value. Future ticket if desired.
- **Taxonomies collection** — Plan C keeps option fields as schema-managed, not CMS records.

---

## Open questions (resolved at execution time)

- T1.1: precise migration mapping for each of the 43 employees (which existing field holds their real department).
- T2.5: confirmed Service Areas the Project Manager covers.
- T3.7: per-form recipient emails (Site Settings field definition).
- T3.7: do we want Resend audit-log retention beyond Webflow Form Submissions (e.g., send a BCC to a shared archive inbox)?
- T4.1: should the marketing-Website collections live in a collapsible drawer or be removed from the intranet admin entirely (with a separate admin for marketing)?

---

## Self-review

- No "TBD" / "TODO" remain in non-Open-Questions sections.
- Internal consistency: each track has files, schemas, consumers, and risks. Cross-references to Plan A and Plan B are explicit so no double-work occurs.
- Scope: Plan C is the largest of the three plans. Tracks 1+2 are tightly coupled (schema migrations require consumer updates); Tracks 3+4 are independently shippable.
- Ambiguity: T2.3 (Taxonomies) explicitly chooses the cheaper option. T3.7 (Resend) chosen over alternatives during brainstorming. T1.1 canonical field = Team Department locked.
- Highest-risk items called out: T1.1 (Employee Department migration), T3.7 (form rewiring without breaking existing endpoints), T4.8 (Publish-site confirmation must not block a real publish).
