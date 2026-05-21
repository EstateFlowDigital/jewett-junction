# Jewett Junction Audit — Plan A: Code Fixes (Design)

**Date:** 2026-05-21
**Status:** Approved scope, ready for implementation plan
**Companion docs:** Plan B (CMS edits) and Plan C (architecture/UX) deferred — see "Out of scope" below.

---

## Context

The Claude Code extension produced a comprehensive 27-item audit of broken/inconsistent behaviors on the live Jewett Junction intranet. The issues span three distinct workflows — pure code bugs, CMS content edits, and UX/architecture decisions — so we split the work into three plans rather than one mega-spec.

**This document is Plan A: the code-only fixes.** It can ship in one PR-sized batch without admin login, without CMS schema changes, and without architectural design input. The goal is to remove every audit item that lives in the codebase rather than in CMS records, leaving Plans B and C with a cleaner remaining surface.

Three user decisions during brainstorming shape the scope:

1. **Empty-state admin leaks** → replace with neutral end-user copy. No client-side admin gating is added.
2. **Null announcement dates** → hide the timestamp entirely when `published-date` is missing.
3. **No per-user accounts** → this is a public-facing intranet for the whole Jewett team. Profile, Settings, and the sidebar avatar block are dead surfaces and are fully removed.

Quick-action tile destinations (IT Helpdesk's Knowledge Base/Software/My Devices all routing to `/resources`; Safety's Report Incident + Report Hazard both routing to `/safety-incident`) are explicitly deferred to Plan C.

---

## Architecture

Plan A is a refactor + cleanup, not a feature build. There is no new architecture introduced. The work organizes around eight independent groups, each touching a small set of files. Most groups can be cherry-picked or done in any order; Group 8 (account-UI removal) is the highest-risk group because it spans the shared layout.

```
Group 1 → Announcement rendering (HTML decode, null-date guard, item counter)
Group 2 → Careers (copy + duplicate click target)
Group 3 → Directory (initials parser, grammar)
Group 4 → Events (dedupe category config)
Group 5 → Marketing sub-pages (4 separate small fixes)
Group 6 → Empty-state copy (8 locations, neutral copy replacement)
Group 7 → IT Helpdesk (skeleton fallback + duplicated label)
Group 8 → Account-UI removal (delete /profile, /settings, sidebar avatar block)
```

**Shared utilities reused:**
- `decodeHtmlEntities()` in [src/lib/webflow-cms.ts:12-40](../../../src/lib/webflow-cms.ts) handles `&nbsp;`, `&lt;`, `&gt;`, `&amp;`, `&quot;`, `&#39;`. Group 1 reuses this rather than inventing a parallel decoder.
- `applyFieldAliases()` in [src/lib/webflow-cms.ts](../../../src/lib/webflow-cms.ts) normalizes CMS records server-side. Group 1 needs to verify that `/api/cms/announcements` (the JSON endpoint the notifications feed calls) runs this normalization; if not, that's a better fix-point than touching `stripHtml`.

---

## Groups

### Group 1 — Announcement rendering (P0)

**Problem:**
- Both the announcements list page and the notifications feed strip HTML tags but never decode entities, so the raw text `Date:Time:&nbsp;Location:&nbsp;RSVP to Paula by X.` leaks through to users.
- Two announcements (Volunteer + RSVP) have `publishedAt = null` in Webflow. The list page's `getRelativeTime()` helper passes the null straight to `new Date()`, producing `January 1, 1970`.
- The list header shows `{otherAnnouncements.length} items` but the rendered list also includes the pinned featured card, so the visible count and the label disagree.

**Files:**
- [src/pages/announcements/index.astro](../../../src/pages/announcements/index.astro)
- [src/components/notifications/NotificationsContent.tsx](../../../src/components/notifications/NotificationsContent.tsx)
- [src/lib/webflow-cms.ts](../../../src/lib/webflow-cms.ts) (read-only — import existing utility)

**Changes:**
1. Update the local `stripHtml()` at announcements/index.astro lines 44-47: decode entities first via `decodeHtmlEntities()`, then strip tags. Same fix in NotificationsContent.tsx line 32.
2. Null-guard `getRelativeTime()` at announcements/index.astro lines 29-41: return `null` when input is falsy or `new Date(input)` yields `NaN`. In the template at line 200, wrap the date span in `{relativeTime && (...)}` so the timestamp row collapses cleanly.
3. Fix the item counter at announcements/index.astro line 149. Two viable options:
   - Use a combined count of pinned + others (recommended, matches what the user sees).
   - Rename label to "X other announcements" (less invasive but reads awkwardly).

**Risks:** `stripHtml` may be called elsewhere — grep before changing. If so, refactor in-place rather than renaming.

---

### Group 2 — Careers (P0/P1)

**Problem:**
- The "Why Jewett Construction?" copy reads "set the standard in commercial construction across **Ohio**". Jewett is a New England firm.
- Each job card has two click targets that both route to the detail page — the job title is a link and the "View Details" button below it also links. The audit flags this as a duplicated button.

**File:** [src/components/pages/CareersContent.tsx](../../../src/components/pages/CareersContent.tsx)

**Changes:**
1. Line 598 (`DEFAULT_SECTION_BODY` constant): change `"across Ohio"` → `"across New England"`. This is the fallback when the CMS Page Copy record for slug `careers` is empty, so the fix takes effect immediately whether the CMS record is populated or not.
2. Job card click target — pick one of the two:
   - **Recommended:** keep the "View Details" + "Apply" button row (gives Apply a visual peer); make the job title at line 836 a plain `<h3>` rather than a wrapping `<a>`.
   - Alternative: keep the title link, remove the View Details button. Smaller diff but loses the buttons-as-pair visual.

**Risks:** None — pure markup.

---

### Group 3 — Directory (P1)

**Problem:**
- Initials parser at `getInitials()` splits on whitespace and slices the first two characters. For `Tim "TC" Holt`, the split yields `['Tim', '"TC"', 'Holt']`, the join produces `T"H`, and the slice gives `T"`.
- Stats hero shows "1 Locations" instead of "1 Location" (and the same problem could surface on departments/categories when count === 1).

**File:** [src/components/pages/DirectoryContent.tsx](../../../src/components/pages/DirectoryContent.tsx)

**Changes:**
1. Replace the initials parser at lines 86-88 with a version that strips non-letter characters first:
   ```ts
   return name
     .replace(/[^\p{L}\s]/gu, ' ')
     .split(/\s+/)
     .filter(Boolean)
     .map(n => n[0])
     .join('')
     .toUpperCase()
     .slice(0, 2);
   ```
   Verifies: `Tim "TC" Holt` → `TH`, `O'Brien` → `OB`, `Sarah Martinez` → `SM`.
2. Pluralization in the stats hero (around lines 240-245): conditionally render singular/plural for Locations, Departments, and any other count-suffixed label.

**Risks:** Single-name CMS records (e.g., SymQuest if it remains) still need to produce a single-letter avatar, not blank. Verify by adding a `|| '·'` fallback after `.slice(0, 2)` if necessary.

---

### Group 4 — Events (P1)

**Problem:** The `categoryConfig` object has two keys whose labels collide: both `all-hands` and `all-hands-meeting` map to `label: 'All-Hands Meeting'`, and both `social` and `social-event` likely map to `label: 'Social Event'`. The legend at lines 689-715 iterates `Object.entries()` and renders both, producing "All-Hands Meeting / All-Hands Meeting".

**File:** [src/components/pages/EventsContent.tsx](../../../src/components/pages/EventsContent.tsx)

**Changes:**
- **Recommended:** Remove the duplicate keys from `categoryConfig` (lines 58-72) if no event records reference the longer slugs. Check by inspecting current events' `event-category` field via `getEvents()` output.
- **Fallback:** Keep both keys (in case CMS records use either slug) but dedupe the legend render with `arr.findIndex(([_, c]) => c.label === entry[1].label) === i`.

**Risks:** Event records using the longer category slug would lose their config mapping if the keys are removed. Mitigation: verify before removing.

---

### Group 5 — Marketing sub-pages (P1)

**Problem:** Four independent sub-page bugs:
- Brand Assets: "Logo - Vertical" displays its file type as `"LOGO"` (the fallback string is `'Logo'`, not a file extension).
- Letterhead: logos are miscategorized as Business Forms because the filter keyword list includes `'log'`, which matches "Logo".
- Signage Request: Processing Timeline step 3 ("Delivery") uses a `<CheckCircle />` icon instead of a numbered "3" badge to match steps 1 and 2.
- Marketing hub: thumbnails for assets without `preview-image` fall back to an initials/icon block, even when the asset's primary file is itself an image.

**Files:**
- [src/pages/marketing/brand-assets.astro](../../../src/pages/marketing/brand-assets.astro)
- [src/pages/marketing/letterhead.astro](../../../src/pages/marketing/letterhead.astro)
- [src/pages/marketing/signage.astro](../../../src/pages/marketing/signage.astro)
- [src/components/pages/MarketingContent.tsx](../../../src/components/pages/MarketingContent.tsx)

**Changes:**
1. brand-assets.astro line 106: derive file extension from `asset.file?.url` when `file-format` is missing; render nothing if there's no file either.
2. letterhead.astro lines 22-29: drop the `'log'` keyword (likely meant for "log" the activity log, not the file extension), or add an explicit `asset['asset-type'] !== 'logo'` exclusion before the keyword check.
3. signage.astro lines 73-75: replace the bare `<CheckCircle />` with `<span class="text-green-400 font-bold text-sm">3</span>` to mirror steps 1 and 2.
4. MarketingContent.tsx lines 218-236: extend the thumbnail conditional to accept the primary file URL when its extension matches `jpe?g|png|svg|webp`. Render `<img>` if any image URL is found; otherwise the existing icon fallback.

**Risks:** The letterhead filter change might exclude a legitimate business form that contains "log" in its name. Audit the current Marketing Assets collection visually at `/marketing/letterhead` after the change.

---

### Group 6 — Empty-state copy (P2)

**Problem:** The string "Add content in the admin panel" appears on at least 4 React empty states and 3 Astro page empty states, exposing internal admin UX to every visitor.

**Files:**
- [src/components/pages/HRContent.tsx](../../../src/components/pages/HRContent.tsx) lines 233-235
- [src/components/pages/ITHelpdeskContent.tsx](../../../src/components/pages/ITHelpdeskContent.tsx) lines 256-258
- [src/components/pages/MarketingContent.tsx](../../../src/components/pages/MarketingContent.tsx) lines 242-244
- [src/components/pages/SafetyContent.tsx](../../../src/components/pages/SafetyContent.tsx) lines 324-326
- [src/pages/marketing/letterhead.astro](../../../src/pages/marketing/letterhead.astro) (empty-section block)
- [src/pages/marketing/presentations.astro](../../../src/pages/marketing/presentations.astro) lines 101-109
- [src/pages/marketing/photos.astro](../../../src/pages/marketing/photos.astro) lines 81-89
- [src/pages/marketing/brand-assets.astro](../../../src/pages/marketing/brand-assets.astro) — verify whether it has an admin CTA too

**Change pattern:** Replace each `<a href=".../admin">Add content in the admin panel</a>` link (and its surrounding "No X yet" headline) with neutral end-user copy. Keep the container card and icon so the page doesn't visually shrink. Suggested strings:
- HR → "No announcements posted yet — check back soon."
- IT → "No how-to articles available yet."
- Marketing hub → "No assets in this category yet."
- Safety → "No safety alerts at this time."
- Letterhead/Presentations/Photos → "No <type> uploaded yet."

After editing, grep `src/` for `"admin panel"` to catch any missed occurrences.

**Risks:** None. Pure copy edit.

---

### Group 7 — IT Helpdesk (P2)

**Problem:**
- The "Common Issues & Quick Fixes" panel shows four loading-skeleton rows that never resolve when the article fetch returns empty or errors silently.
- The "Mon - Fri" Support Hours row renders both a left label of "Mon - Fri" and a right value that itself appears to include the day prefix ("Mon–Fri 7:00 AM – 6:00 PM"), so the label appears twice.

**File:** [src/components/pages/ITHelpdeskContent.tsx](../../../src/components/pages/ITHelpdeskContent.tsx)

**Changes:**
1. Lines 217-229: when `isLoading === false` and both arrays are empty, render an empty-state card ("No how-to articles available yet."), not the four skeleton rows. The current branch falls through to `null` only after the loading flag flips — add an explicit `else` branch.
2. Lines 315-317: read the actual `itHoursWeekday` value and decide which side to strip:
   - If the value already includes "Mon–Fri", remove the left literal label.
   - If the value is just the hours, strip nothing on the right and leave the label.

**Risks:** Need to verify the current value of `itHoursWeekday` before choosing which side to trim.

---

### Group 8 — Public-site cleanup: remove accounts UI (P3)

**Problem:** The intranet has no per-user authentication for end users. `/profile`, `/settings`, the sidebar avatar block at the bottom of the left nav, and the `PROFILE_EMAIL_KEY` localStorage helper are all dead UI. Worse, the Settings page shows fake security claims ("2FA Enabled", "Last changed 30 days ago", "2 devices") that imply per-user security state that doesn't exist.

**Files to delete:**
- `src/pages/profile/index.astro`
- `src/components/profile/ProfileContent.tsx`
- `src/pages/settings/index.astro`
- Any orphans under `src/components/profile/` or `src/components/settings/` after deletion

**Files to edit:**
- The shared layout/sidebar component that renders the bottom-of-nav avatar block — locate by grepping for `JC` initials or the profile-link href.
- Any navigation entries linking to `/profile` or `/settings` — grep `src/` for both paths.
- Every read/write of `PROFILE_EMAIL_KEY` — grep for the constant and remove.

**Risks (highest in the plan):**
- A nav component may rely on the avatar block for flex/grid sizing. Removing it without adjusting the parent container could leave dead vertical space or break responsive collapse. Visual check needed.
- The `/admin` login flow uses `admin_token` in localStorage. This is unrelated to `PROFILE_EMAIL_KEY` and must NOT be touched. Verify both are independent.
- There may be a sidebar config array listing "My Profile" and "Settings" — remove from there too.

**Execution order:**
1. Grep `/profile`, `/settings`, `PROFILE_EMAIL_KEY`, and the sidebar profile-block markup in a single pass to map all touch points.
2. Remove nav entries first (routes 404 cleanly while still registered).
3. Delete the page and component files.
4. Remove the sidebar block + reflow its container.
5. Remove the localStorage helper(s).
6. Final grep to confirm no lingering references.

---

## Data flow / interfaces

No new data sources or APIs are introduced. The plan only consumes existing CMS fetchers from [src/lib/webflow-cms.ts](../../../src/lib/webflow-cms.ts) and existing utilities (`decodeHtmlEntities`, `applyFieldAliases`).

A potential second-order fix surfaces in Group 1: if `/api/cms/announcements` (the JSON endpoint NotificationsContent calls) bypasses `applyFieldAliases`, the right fix is to normalize there rather than at every render site. Implementation plan should verify this first and pick the higher-leverage location.

---

## Error handling

The plan replaces several failure modes with safer fallbacks:
- Null/invalid `published-date` → hide the date row instead of rendering 1/1/1970.
- `&nbsp;` and other entities in stripped HTML → decoded before strip.
- Empty article fetch in IT Helpdesk → neutral empty state instead of perpetual skeletons.
- Missing `file-format` on a marketing asset → derive from URL or omit, instead of showing literal "LOGO".
- Non-letter characters in employee names → stripped before initials slicing.

No new try/catch blocks needed.

---

## Testing

No automated tests in this codebase that cover these surfaces. Manual verification per group:

1. **/announcements** — count next to "X items" matches rendered list. Volunteer + RSVP show no date row. RSVP body has no raw `&nbsp;`.
2. **/announcements/<slug>** — Welcome + RSVP detail pages render bodies without entity strings.
3. **/notifications** — RSVP notification line has no `&nbsp;`.
4. **/careers** — copy reads "across New England". Each job card has one click target to detail.
5. **/directory** — Tim "TC" Holt's avatar shows `TH`. Stat block uses singular form when count is 1.
6. **/events** — Categories legend shows each label only once.
7. **/marketing/brand-assets** — Logo - Vertical chip shows extension (e.g., `SVG`) or no chip, not "LOGO".
8. **/marketing/letterhead** — logos no longer appear in Business Forms.
9. **/marketing/signage** — step 3 of timeline shows numbered "3" badge.
10. **/marketing** hub — recent-asset thumbnails with image extensions render the file, not the initials block.
11. All hub pages — grep rendered DOM for "admin panel"; should appear nowhere on public pages.
12. **/it-helpdesk** — Common Issues panel renders neutral empty state, not perpetual skeleton. Support Hours shows Mon-Fri label once.
13. **/profile** + **/settings** — both return 404.
14. **Sidebar nav** — no avatar block, no Profile or Settings entries.
15. **Console/network** — no errors, no failed fetches from removed routes.
16. **/admin** — login still works (sanity check that account removal didn't touch admin auth).

---

## Out of scope

This plan deliberately does not touch:

**Deferred to Plan B (CMS edits):**
- Delete the "Test" banner-message record.
- Edit the Welcome announcement slug + set `published-date` on Volunteer + RSVP.
- Rewrite RSVP body with real Date/Time/Location.
- Populate `dept` field per employee.
- Delete or relabel SymQuest record.
- Dedupe Tom Richardson recognition; resolve Piper Weeks / Sarah Martinez.
- Update Employee Handbook record to current year.
- Fix Project Manager service-area list; create Construction Superintendent record.
- Relabel or remove the Poison Control number from the Safety Hotline field.
- Marketing Contact card: populate person.

**Deferred to Plan C (architecture/UX):**
- HR quick-action tile destinations (Pay & Tax / Time Off / Benefits / Get Help).
- IT tile deep-links to category-filtered Resources.
- Safety tile merge or deep-link.
- Empty hub section hiding-vs-neutral-copy policy.
- Photo Gallery vs Photo Library design.
- Related Content curation strategy.

---

## Open questions

None at this point. All design decisions confirmed during brainstorming:
- Empty-state strategy: neutral copy, no admin gating.
- Null-date strategy: hide row.
- Account-UI strategy: full removal.
- Tile-destination strategy: defer to Plan C.

---

## Self-review

- No "TBD"/"TODO" remain.
- Internal consistency: every group lists files, line ranges, the change, and risks.
- Scope: single implementation plan, executable end-to-end; groups are also independently cherry-pickable.
- Ambiguity: Group 1 #4 (item counter), Group 2 #2 (which click target to keep), Group 4 (remove keys vs dedupe render), Group 7 #2 (which side of Mon-Fri to strip) each note two viable approaches with a recommendation. The implementation plan should resolve each by inspecting the actual code/data before committing.
- Group 8 is the highest-risk group; its execution order is explicit to avoid orphaning a layout container or breaking the unrelated `/admin` login.
