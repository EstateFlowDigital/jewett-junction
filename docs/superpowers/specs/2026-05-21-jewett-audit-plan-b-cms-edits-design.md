# Jewett Junction Audit — Plan B: CMS Content Edits (Design)

**Date:** 2026-05-21
**Status:** Approved scope, ready for implementation plan
**Companion docs:** Plan A (code fixes) and Plan C (architecture/UX) — see Out of scope.
**Execution surface:** Webflow admin panel at `/admin`. No code edits.

---

## Context

The Claude extension audited the public site, and a follow-up admin-panel audit confirmed that most of the visible content bugs are CMS data problems, not code. A seed migration appears to have run twice, leaving every "demo" record duplicated under two ID prefixes (`6979d6…` and `6979cd…`). Several "Test" records were never deleted. Two announcements ship without `Published Date`. Three concurrent department fields fragment the directory.

Plan B is the cleanup pass an admin can complete inside the Webflow admin without any code deploys. The "Test" records, duplicate seed batches, and missing dates are the highest-impact wins because they remove visible bugs from every page that reads those collections.

Plan B does not change any schemas — schema cleanup (canonicalizing the Department fields, removing duplicate Priority/Category fields, adding `is-vendor` to Employees) is structurally a code+CMS migration and lives in Plan C.

---

## Architecture

This is a content-editing checklist, not a system change. The work organizes around the Webflow collections that have problems, in roughly the order that produces the most visible improvement per minute spent:

```
Tier 1 — Visible-on-load fixes (do first)
  → Banner Messages: delete "Test"
  → Page Copy: fix "across Ohio" → "across New England"
  → Announcements: backfill Published Date + Author; rewrite RSVP body
  → Welcome announcement: regenerate slug

Tier 2 — Duplicate seed cleanup (mechanical, high volume)
  → Culture Stories, Resources, Safety Content, IT Knowledge,
    Submitted Ideas: remove the older seed batch

Tier 3 — Missing data / wrong data
  → Events: Q1 All-Hands has no Start Date
  → Employees: SymQuest, missing departments, Page Contact assignments
  → Resources: Employee Handbook year refresh
  → Site Settings: populate every blank field
  → Job Postings: create Construction Superintendent record
  → Marketing Assets: real content for letterhead / presentations / photos

Tier 4 — Decisions deferred to admin executor
  → Piper Weeks / Sarah Martinez / Q1 All-Hands keep-or-delete
  → Coffee break promo retire?
```

Tier 4 items require a per-record judgment call during execution.

---

## Groups

### Group B1 — Visible-on-load (P0)

**Banner Messages**
- Delete the `Test` record (Internal Name: Test, Banner Text: Test, Active: on). This removes "Test" from the public top marquee everywhere.

**Page Copy — Careers Page**
- Edit the Section Body rich-text: change "across **Ohio**" → "across **New England**".
- Also verify the Project Manager service-area list copy ("Massachusetts, Maine, Vermont, Connecticut, and New Hampshire and Virginia") — decide whether Virginia stays or goes.
- Note: Plan A also patches the hardcoded fallback string in `CareersContent.tsx`, so even if this CMS edit lags, the public site won't show "Ohio" after Plan A ships.

**Announcements — backfill missing fields**
- `Volunteer Opportunity`: set `Published Date` to the date it was intended to publish; set `Author` to the correct employee reference.
- `RSVP to the Summer Outing`: same as above.
- `RSVP` body content: rewrite from `Date:Time:&nbsp;Location:&nbsp;RSVP to Paula by X.` to actual values. Suggested format:
  > **Date:** July 18, 2026
  > **Time:** 5:00 PM – 8:00 PM
  > **Location:** Jewett HQ Backyard
  > Please RSVP to Paula by July 11.
- Real values come from Paula or whoever owns the event.

**Welcome announcement slug**
- Current: slug = `new-safety-training-portal-launched`, title = "Welcome to Jewett Junction!"
- Regenerate slug to `welcome-to-jewett-junction`. Brief 404 risk for anyone who bookmarked the old URL — acceptable for an intranet.
- Decide whether to also retire or refresh the "email Hailley the words 'coffee break' to be entered to win a Dunks gift card" line. Confirm the promo is still active.

---

### Group B2 — Delete "Test" records (P0)

Quick mechanical pass. Records to delete:

- `HR Content` → "Test" (Published)
- `Submitted Ideas` → "Test" (Draft)
- `Form Submissions` → "Newsletter Form — Test" (Jul 21, 2025)

These exist in addition to the Banner Messages "Test" record handled in Group B1.

---

### Group B3 — Dedupe seed batches (P1)

A seed migration ran twice. Records appear in two batches identified by ID prefix `6979d6…` and `6979cd…`. **The implementer should pick one batch (likely `6979cd…`, the older one per the audit) and delete it from each collection.** Verify by spot-checking 1-2 records: the newer batch should be the one with any updates applied since seed.

Collections to dedupe (counts approximate from audit):

| Collection | Total | Unique | Duplicates to delete |
|---|---|---|---|
| Culture Stories | 8 | 4 | 4 |
| Resources | 10 | 5 | 5 |
| Safety Content | ~10 | 6 | 4 (Confined Space, Heat Illness, PPE, Fall Protection) |
| IT Knowledge | 9 | 5 | 4 (Procore, Teams, VPN, Password Reset) |
| Submitted Ideas | 11 (incl. Test) | 5 | 5 (after Test is gone) |

**Risks:**
- If any record in the duplicate batch has unique edits (e.g., someone updated the body after seed), the wrong batch could be deleted. Spot-check edit timestamps before bulk delete.
- Culture Stories duplicates include the placeholder Piper Weeks and Sarah Martinez stories — see Group B7 for fate decision before deleting both copies.

---

### Group B4 — Events (P1)

- `Q1 All-Hands Meeting` has no `Start Date & Time` and no `Event Type`. This is why /events shows 0 upcoming and the category legend duplicates.
- **Decision required during execution (per Cameron):**
  - If this is a real upcoming event: populate Start Date + Event Type.
  - If placeholder seed: delete it.
- Public-side Plan A also fixes the duplicate category-legend rendering, so this event won't compound the visual bug after Plan A ships.

---

### Group B5 — Employees (P1)

- **SymQuest record**: delete. Plan C will introduce `is-vendor` flag and a Vendor Contacts surface on /it-helpdesk; SymQuest is re-created there with the correct schema. Until Plan C ships, the public Directory just shouldn't include SymQuest.
- **Page Contact For assignments:**
  - Audit current values across all 43 employees.
  - HR Contact slot currently empty → assign correct HR lead.
  - IT Contact slot currently empty → assign correct IT lead (or note that SymQuest covers IT via Plan C vendor surface).
  - Marketing Contact slot currently empty → assign correct Marketing lead.
  - Safety Contact: currently Andrew Affronti (Director of Operations). Confirm or reassign.
- **Tim "TC" Holt** — admin form doesn't warn about the quote in his name. Plan A fixes the initials parser; CMS edit is not required, but consider whether the display name should be normalized to `Tim Holt` with `TC` in a separate nickname field.

(Department field migration is structural and lives in Plan C, not here.)

---

### Group B6 — Resources (P1)

- After Group B3 dedupes the collection, update `Employee Handbook 2025` to `2026` (or upload the current handbook as a new file and update the file URL).
- Verify which resources should be marked `Featured = true` so the "0 Featured" stat on the public Resources page goes positive.

---

### Group B7 — Culture (P1, decisions required)

After Group B3 dedupes Culture Stories, decide on the three placeholder entries:

- `Employee Spotlight: Piper Weeks (Chief Paw Officer)` — likely placeholder, default to delete unless Cameron confirms keep.
- `Employee Spotlight: Sarah Martinez` — Sarah isn't in Employees collection, default to delete.
- Cross-check Recent Recognitions counts against the deduped collection.

---

### Group B8 — Site Settings (P1)

The Site Settings singleton record is largely blank. Several public-side stats currently come from hardcoded fallbacks because Site Settings has nothing to read. Fields to populate:

- Emergency phone numbers (Poison Control, Safety Hotline if different, EAP phone)
- IT hours (weekday + weekend)
- IT support email
- Days Without Incident (number)
- Volunteer Hours (annual)
- Annual donations dollar amount
- Training Compliance %
- Signage timeline copy (the steps shown on /marketing/signage)
- Social URLs
- Brand colors

**Decision required:** the "Days Without Incident" field implies a live counter, but a static CMS number can't increment automatically. Options for execution:
- Rename the field to "Days Without Incident (manually set)".
- Build an incident-date-based computed value (out of Plan B scope — code change).
- Set the number manually and bump it as needed.

---

### Group B9 — Page Copy (P1)

Currently only the `careers` slug exists. Schema documentation lists `hr`, `safety`, `it-helpdesk`, `marketing` as wired slugs that the public pages will look for. Create one Page Copy record per slug:

- `hr` — Section Body for the HR Hub intro copy.
- `safety` — Section Body for the Safety Hub intro copy.
- `it-helpdesk` — Section Body for the IT Hub intro copy.
- `marketing` — Section Body for the Marketing Hub intro copy.

Initial body can be placeholder text from the existing hardcoded fallbacks; the point is to have the CMS records exist so future edits don't require code deploys.

---

### Group B10 — Job Postings (P1)

- `Construction Superintendent`: admin record exists and is fully populated. The public-side route `/careers/construction-superintendent` falling back to index is a Plan A/C code issue, not a Plan B data issue — but verify the slug field on the admin record matches what the public route expects (`construction-superintendent`).
- `Department` dropdown contains a `Test Department` option — removal is schema work, lives in Plan C.
- Verify `Project Manager` description body's service-area list reads as intended (drop Virginia if not actually serviced).

---

### Group B11 — Marketing Assets (P1, content sourcing)

The Marketing Assets collection currently has 3 records (Apparel Store, Logo - Vertical, Logo - Horizontal). The public Letterhead, Presentations, and Photo Library pages are empty because there's no content. To populate:

- Letterhead templates: upload PDF / DOCX templates as Marketing Assets with `asset-type = letterhead`.
- Presentation templates: upload as Marketing Assets with `asset-type = presentation`.
- Photo Library: upload company photos as Marketing Assets with `asset-type = photo`.
- Logo - Horizontal: verify the file is actually attached. If the public hub shows "EW" initials in place of the logo image, the file may be missing or the wrong field is populated. Re-upload if necessary.

**Decision required:** if these assets don't exist yet (i.e., Jewett doesn't have an internal photo library curated), Plan C decides whether to hide the empty sub-pages or keep the neutral empty states from Plan A.

---

### Group B12 — Form Submissions cleanup (P2)

Lower priority but recommended:

- Audit the 99 Form Submissions records.
- Delete the literal "Test" Newsletter submission.
- Define what `Draft` vs `Published` means in this collection (admin convention, not a CMS change). Most recent 12 are Draft; if Draft = "needs review", confirm the workflow.
- The "Backfill from Webflow" button risk: don't repeatedly click it. Document what it does in admin notes.

---

## Data flow / interfaces

No code changes in Plan B, so no interface changes. All edits happen in Webflow admin via the existing collection editors.

After Plan B + Plan A ship together, the following data flows resolve:

| Public page bug | Resolved by |
|---|---|
| "Test" in top marquee | Plan B (delete record) |
| Welcome announcement wrong slug | Plan B (regenerate slug) |
| RSVP body with raw `&nbsp;` | Plan A (decoder) + Plan B (rewrite body) |
| "January 1, 1970" announcement dates | Plan A (null guard) + Plan B (backfill dates) |
| Volunteer announcement missing author/date | Plan B (backfill) |
| Careers "across Ohio" | Plan A (fallback string) + Plan B (Page Copy edit) |
| Tom Richardson duplicate recognition | Plan B (dedupe Culture Stories) |
| Resources showing 10 (= 5×2) | Plan B (dedupe) |
| SymQuest in Directory | Plan B (delete) + Plan C (vendor schema) |
| Empty Marketing sub-pages | Plan A (neutral empty copy) + Plan B (upload assets, if available) |
| Q1 All-Hands without date | Plan B (populate or delete) |
| Site Settings stats hardcoded | Plan B (populate fields) |

---

## Error handling

Plan B is data edits. The main risk is destructive operations:

- **Bulk delete risk** in Group B3 (dedupe seed batches): pick a batch, confirm by spot-check, delete with awareness of timestamps. Webflow has no undo on collection-item deletes.
- **Slug regeneration risk** in Group B1: changing the Welcome slug 404s the old URL. Acceptable for intranet; flag if anyone has the old URL bookmarked.
- **Field backfill risk** in Groups B1, B5, B8: typing wrong values has no rollback. Double-check entries.

Mitigation: do the work in a logical order (delete records last; backfill values first), and back up the Webflow site or take CSV exports before bulk-deleting.

---

## Testing

After each tier, visit the public side to confirm the fix landed:

- **After Group B1:** /announcements (no Jan 1970, RSVP body has real values), top marquee (no "Test"), /careers (no "Ohio" — assuming Plan A is also deployed), /announcements/welcome-to-jewett-junction (loads).
- **After Group B2:** /admin/hr, /admin/ideas, /admin/form-submissions — no more "Test" records.
- **After Group B3:** /culture (recognitions deduped), /resources (5 items, not 10), /safety (full list of policies), /it-helpdesk (no duplicate articles), /submit-idea (no duplicate inspirations).
- **After Group B4:** /events (either shows the populated event or shows neutral empty state).
- **After Group B5:** /directory (no SymQuest), /hr (HR Contact card shows real person), /marketing (Marketing Contact card shows real person), /it-helpdesk (IT contact accurate or marked vendor TBD).
- **After Group B6:** /resources (Handbook 2026 shown; Featured count > 0).
- **After Group B7:** /culture (no Piper/Sarah unless retained).
- **After Group B8:** /safety, /it-helpdesk, /culture (stats reflect Site Settings, not fallbacks).
- **After Group B9:** /hr, /safety, /it-helpdesk, /marketing (intro copy editable in admin without code deploy).
- **After Group B10:** /careers/construction-superintendent (loads with full job description, assuming slug matches).
- **After Group B11:** /marketing/letterhead, /marketing/presentations, /marketing/photos (real content visible).

---

## Out of scope

**Deferred to Plan A (code fixes):** all rendering bugs (HTML entity decoder, null-date guard, initials parser, dedupe event categoryConfig, signage step badge, marketing logo thumbnail fallback, brand-asset file-format default, letterhead filter, admin-leak empty states, IT skeleton fallback, Mon-Fri duplication, account-UI removal).

**Deferred to Plan C (architecture / schema):**
- Resolve duplicate Department fields on Employees (3 fields → 1; canonical = `Team Department`).
- Resolve duplicate Priority on Announcements; duplicate Category on Events.
- Remove "Test Department" from dropdowns.
- Add `is-vendor` to Employees; add Vendor Contacts surface on /it-helpdesk.
- Build /hr/pay, /hr/time-off, /hr/benefits, /hr/help destination pages.
- Deep-link IT tiles (Software, My Devices) with `?category=` query support.
- Deep-link Safety Hazard tile with `?type=hazard`.
- Photo Library design.
- Related Content reference-field schema addition.
- Resend + per-form API routing.
- Days Without Incident dynamic counter (vs manual field).
- Admin sidebar nav for hidden collections; admin UX bugs (drawer truncation, list ID renderer, Edit click race, Publish confirmation).

**Deferred indefinitely:** admin governance (per-user accounts, RBAC, 2FA, audit log).

---

## Open questions (resolved at execution time)

- Group B1: real RSVP event date/time/location values.
- Group B1: is the coffee-break-Dunks promo still active?
- Group B3: confirm which seed batch (`6979d6…` vs `6979cd…`) is the duplicate set to delete.
- Group B4: Q1 All-Hands keep-with-real-date or delete?
- Group B5: which employee is the HR / IT / Marketing / Safety contact?
- Group B7: Piper Weeks keep or delete? (default: delete) Sarah Martinez keep or delete? (default: delete)
- Group B8: real values for every Site Settings field.
- Group B10: should Virginia stay on the Project Manager service-area list?
- Group B11: do letterhead / presentation / photo library assets exist to upload?

---

## Self-review

- No "TBD" / "TODO" remain in non-Open-Questions sections.
- Internal consistency: every fix is mapped to (collection, record, field). Reference to other plans is explicit.
- Scope: single content-editor checklist, executable end-to-end by one admin in 2-4 hours (minus content-sourcing time for Group B11).
- Ambiguity: the seed-batch identification (`6979d6…` vs `6979cd…`) is the only delete decision that needs verification per-collection before mass deletion — explicit risk callout.
- Coordination with Plan A: every CMS fix has a matching Plan A code fix where applicable, so the public site degrades gracefully if Plan B lags.
