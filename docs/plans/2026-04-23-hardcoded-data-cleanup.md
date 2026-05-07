# Hardcoded-Data Cleanup + Codebase Audit — Handoff Plan

> **Audience:** A coding agent (Codex / Claude / etc.) picking this up cold.
> **Prerequisites:** Working tree clean. Webflow + admin tokens already configured. MCP server `claude.ai Webflow` connected.
> **Don't break:** Anything currently working. The intranet is in production-ish use; verify before committing.

---

## 0. Project context (read first)

- **Stack:** Astro 5 SSR + React 19 islands, Cloudflare Workers adapter, Tailwind 4. Webflow CMS is the data backend.
- **Mount path:** App is mounted at `/jewett-junction/*`. Public site lives at `https://jewettconstruction.com`.
- **Webflow site id:** `67a464bc7184fcb8aacb0e8d`
- **Working dir:** `/Users/cameronameigh/House & Home Photo Dropbox/Cameron Ameigh/Mac (2)/Desktop/Webflow Websites/Jewett Junction`
- **Branch:** `main` — commit small, frequent, push to origin.
- **Type check:** `npx astro check` (target 0 errors / 0 warnings; pre-existing 700-ish hints are OK).
- **No tests** in this repo. Do verification by type check + manual smoke OR by adding throwaway `node --test` scripts when logic is non-trivial (see `src/lib/ip-allowlist.test.mjs` for the pattern).

### Key files to know

| File | Purpose |
|---|---|
| `src/lib/webflow-cms.ts` | Single source of truth for collection IDs, fetcher functions, TS interfaces, and the slug-alias layer (`COLLECTION_FIELD_ALIASES`). |
| `src/components/admin/collections.ts` | Field configs for the admin editor (label, type, options, helpText). |
| `src/pages/api/admin/items.ts` | `VALID_FIELDS` whitelist + admin CRUD route. Two-step create+publish flow lives here. |
| `src/pages/api/admin/schema.ts` | `getValidSlugs()` — fetches live Webflow schema as runtime allowlist (newer fields surface automatically). |
| `src/pages/api/cms/[collection].ts` | Public read route used by every intranet content component. |
| `src/lib/admin-auth.ts` | `verifyAdminRequest`, `getWebflowApiToken`, `getWebflowSiteId` — use these everywhere; do NOT redeclare. |
| `src/lib/form-submission-mapper.ts` | Shared mapper for inbound forms (apply, signage, IT ticket, safety incident). |
| `src/components/admin/CollectionEditor.tsx` | The shared admin form. All `/admin/*` pages render this with `collectionKey` + `config`. |
| `src/components/pages/TeamContactCard.tsx` | Just-built shared contact card; fetches Employees and picks leadership/featured per dept. |

### Established conventions — DO NOT diverge

1. **Slug-alias layer.** When a Webflow field is renamed, add a mapping in `COLLECTION_FIELD_ALIASES` (defined inline in `webflow-cms.ts`) so display code reads either old or new key. Example: announcements `category` ↔ `news-category`.
2. **Admin saves go to the new slug.** Reads use either. This pattern was established to handle Webflow's "you can't edit existing Option fields" limitation.
3. **Two-step publish.** `items.ts` POST/PATCH always creates with `isDraft: false` then calls `POST /collections/{id}/items/publish` with the new id. Inbound form endpoints use `isDraft: true` (admin reviews before publishing).
4. **Dedup slug.** Anything mirrored from external sources (form submissions, etc.) uses a `<prefix>-<unique>` slug as the dedup key.
5. **`getValidSlugs`** returns the live Webflow field allowlist. Both the items API and bulk-import use it (with the hardcoded `VALID_FIELDS` map as fallback).
6. **MCP for Webflow CRUD.** Use `mcp__claude_ai_Webflow__data_cms_tool` actions to create/update collections, fields, and items. The MCP can't update existing Option-field options — work around by creating a new Option field with a distinct slug and adding it to the alias map.
7. **No emojis** in code or commits unless asked. No celebration text. Concise commit messages.
8. **Don't commit `.dev.vars`, `.env`, `Website-Upload-Final/` images.** The first two are gitignored; the third should be.

---

## 1. Hardcoded data to eliminate

The audit identified 22 chunks of hardcoded data that should be admin-editable. Group them into 3 phases.

### Phase A — Settings singleton (high leverage, ~30 min)

**New Webflow collection:** `Settings` (singular: `Setting`, slug: `settings`). One-and-only-one item with these fields. Create via MCP `data_cms_tool > create_collection` then `create_collection_static_field` per field.

| Field name | Slug | Type | Initial value (verify with stakeholders) |
|---|---|---|---|
| Name | `name` | PlainText (required) | "Site Settings" |
| EAP Phone | `eap-phone` | Phone | (look up actual provider; the two existing hardcoded values disagree) |
| EAP Portal URL | `eap-portal-url` | Link | |
| Poison Control Phone | `poison-control-phone` | Phone | "1-800-222-1222" |
| IT Phone | `it-phone` | Phone | (real number, not the `(555)` placeholder) |
| IT Email | `it-email` | Email | "it@jewettconstruction.com" |
| IT Hours Weekday | `it-hours-weekday` | PlainText | "Mon–Fri 7:00 AM – 6:00 PM" |
| IT Hours Saturday | `it-hours-saturday` | PlainText | "Sat 8:00 AM – 12:00 PM" |
| IT Emergency Hours | `it-emergency-hours` | PlainText | "After-hours emergencies: see on-call rota" |
| HR Email | `hr-email` | Email | "hr@jewettconstruction.com" |
| Careers Email | `careers-email` | Email | "careers@jewettconstruction.com" |
| Marketing Email | `marketing-email` | Email | "marketing@jewettconstruction.com" |
| Safety Email | `safety-email` | Email | "safety@jewettconstruction.com" |
| Default Referral Bonus | `default-referral-bonus` | Number | 500 |
| HR Portal — ADP URL | `hr-portal-adp` | Link | |
| HR Portal — BCBS URL | `hr-portal-bcbs` | Link | |
| HR Portal — Fidelity URL | `hr-portal-fidelity` | Link | |

**Code wiring:**

1. Add `settings: '<id>'` to `COLLECTIONS` in `src/lib/webflow-cms.ts`.
2. Add a `getSiteSettings()` helper that fetches the first item and caches per request via Astro `Astro.locals` or a module-level memo:
   ```ts
   export async function getSiteSettings(): Promise<Record<string, any>> {
     const { items } = await getCollection<any>(COLLECTIONS.settings, { limit: 1 });
     return items[0] || {};
   }
   ```
3. Add `'settings'` to `VALID_FIELDS` in `src/pages/api/admin/items.ts` (every field slug from the table above).
4. Add the admin config in `src/components/admin/collections.ts` so the admin can edit it via the existing `CollectionEditor`.
5. Add a nav entry under Intranet group in `src/components/admin/AdminLayout.tsx` and `AdminOverview.tsx`. Suggested label: "Site Settings", icon `Settings`, color `slate`.
6. Create `src/pages/admin/site-settings.astro` mirroring `src/pages/admin/banner.astro`.

**Replace these hardcoded values with Settings reads:**

- `src/components/pages/HRContent.tsx:217,336` → `eap-phone` (resolve the inconsistency between the two existing numbers)
- `src/components/pages/HRContent.tsx:338` → `eap-portal-url` (currently a button with no `href`)
- `src/components/pages/HRContent.tsx:348-350` → `hr-portal-{adp,bcbs,fidelity}`
- `src/components/pages/ITHelpdeskContent.tsx:232-235` → `it-phone`, `it-email`
- `src/components/pages/ITHelpdeskContent.tsx:270-280` → `it-hours-weekday`, `it-hours-saturday`, `it-emergency-hours`
- `src/components/pages/SafetyContent.tsx:378` → `poison-control-phone`
- `src/components/pages/CareersContent.tsx:961` → `careers-email`
- `src/pages/dashboard/index.astro:385,683` → `default-referral-bonus`

For pages that are Astro SSR, fetch settings server-side and pass as a prop. For React components fetched client-side via `/api/cms/[collection]`, add a `?slug=...&limit=1` query and read inline. (Note: `[collection].ts` may need a `settings` case — check it covers all 23 collections after additions.)

### Phase B — Stats singletons + 4 multi-item collections (medium, ~2 hr)

**Safety Stats** (singleton) — `days-without-incident` (Number), `company-record-days` (Number), `training-compliance-pct` (Number 0–100), `active-site-count` (Number), `last-updated` (DateTime). Wire to `SafetyContent.tsx:104-119`.

**Culture Stats** (singleton) — `charitable-donations-ytd` (Number), `volunteer-hours-ytd` (Number), `last-updated` (DateTime). Wire to `CultureContent.tsx:469-475`. Also remove the fake fallback counts at `CultureContent.tsx:235-237` (return 0 or hide the tile).

**Core Values** (multi-item) — `name` (PlainText), `tagline` (PlainText), `description` (RichText), `icon-key` (Option: `shield`, `award`, `users`, `heart`, `star`), `accent-color` (Option: blue/green/purple/amber/rose), `display-order` (Number). Wire to `CultureContent.tsx:63-96` and `CareersContent.tsx:686-693`.

**Benefits** (multi-item) — `name` (PlainText), `description` (PlainText), `category` (Option: Health / Retirement / Time-Off / Perks / Wellness), `icon-key` (Option), `display-order` (Number). Wire to `CareersContent.tsx:59-100` AND `HRContent.tsx` Benefits Overview section.

**Company Awards** (multi-item) — `year` (Number), `award-title` (PlainText), `awarding-body` (PlainText), `award-image` (Image), `display-order` (Number). Wire to `CareersContent.tsx:103-106`.

For each: same wiring steps as Phase A — `COLLECTIONS` entry, `VALID_FIELDS`, admin config, nav entry, admin page, replace hardcoded JSX with a fetch + map.

### Phase C — Optional polish

- **System Status** (multi-item) at `ITHelpdeskContent.tsx:255-259` — only worth it if you actually want live status. Otherwise delete the fake "Operational" badges entirely.
- **Page Copy** singletons (`Careers Page Copy`, `Culture Page Copy`) for hero/about marketing text. Lower priority — can stay hardcoded if rarely changes.
- `settings/index.astro:267` — replace the static `2.1.0` portal version with a build-time read from `package.json`.

---

## 2. Already-built TeamContactCard — finish wiring

`src/components/pages/TeamContactCard.tsx` exists and pulls Employees by department, prefers `leadership-team`/`is-featured`. Replace the hardcoded JD/JM/LW cards:

- `src/components/pages/HRContent.tsx:300-324` → `<TeamContactCard department="HR" title="HR Team" fallbackEmail={settings['hr-email']} accent="purple" theme={theme} />`
- `src/components/pages/SafetyContent.tsx:340-362` → `department="Safety"` accent `green`
- `src/components/pages/ITHelpdeskContent.tsx:226-...` → `department="IT"` accent `blue`
- `src/components/pages/MarketingContent.tsx:188-210` → `department="Marketing"` accent `rose`

The card already has a graceful loading skeleton + missing-record fallback, so no extra empty-state work needed.

---

## 3. Codebase audit Codex should ALSO do

After the wiring above, walk the codebase end-to-end. Flag (don't auto-fix unless trivial) anything that smells off. Pay attention to:

1. **Other hardcoded contact info / phone numbers / addresses** — search for `tel:`, `mailto:`, `(555)`, `1-800` across `src/`. Anything not yet covered by Settings should be flagged.
2. **Mock data leftovers** — search for `mock`, `Mock`, `// TODO`, `placeholder`, `// in production`. Most are gone but a sweep is worth it.
3. **Dead components** — re-run the unused-component sweep (basename grep across `src/**/*.{tsx,ts,astro}`). The recent gamification cleanup removed 21 files; there may be more orphans now that contacts are centralized.
4. **Missing `prerender = false`** — every `.astro` page that calls `initCMS(Astro.locals)` or fetches CMS at request time must have `export const prerender = false`. The audit flagged 12 missing from a prior pass; check if they've all been fixed.
5. **Slug-rename completeness** — for each entry in `COLLECTION_FIELD_ALIASES`, grep the codebase for the old key and verify it has a fallback OR the alias layer covers the read. New renames should add to the alias map.
6. **Routes that 404** — every `<a href>` and `Astro.redirect` should resolve to a real page. Easy false-positives are slugs (`[slug].astro`) — those are dynamic and OK.
7. **Two-step publish drift** — any new `fetch('https://api.webflow.com/v2/collections/.../items')` call in API routes should either pass `isDraft: false` and call `/items/publish`, or pass `isDraft: true` if it's an inbound form. Don't ship items as drafts to public website collections.
8. **CORS regressions** — any new `/api/...` route should pass through middleware (no extra `Access-Control-Allow-*` headers in the route — middleware handles it).
9. **Admin auth** — every `/api/admin/*` route MUST call `verifyAdminRequest` from `src/lib/admin-auth.ts`. Any new route with hand-rolled token logic is a regression.
10. **Webhook routes** — `?secret=` query param check is mandatory; never expose the webhook URL elsewhere.
11. **`.gitignore` hygiene** — `Website-Upload-Final/` is currently tracked and should not be (~hundreds of `.webp` files). Remove from index, add to `.gitignore`.
12. **Unused npm dependencies** — `npm ls` and cross-check against `import` graph. Don't aggressively prune; just flag.
13. **`console.log` noise** — already trimmed once (commit `7bc89a5`); confirm nothing crept back in admin/API routes.

Output an **issues found** list at the end of your run, grouped by Critical / Important / Minor — same shape as the prior audits in this repo.

---

## 4. Working rules for the agent

- **One feature per commit.** "Add Settings collection + wire IT phone" is one commit. Don't bundle 5 collections in a single commit.
- **Type-check after every commit:** `npx astro check`. Stop and fix before pushing if errors appear.
- **Verify each MCP write.** After `update_collection_items`, call `list_collection_items` with a small `limit` and confirm the change is real. MCP responses can exceed the tool token cap — when they do, save the response file path and parse with `python3` / `jq`.
- **Idempotency.** Any backfill / migration action you write should be safe to re-run.
- **Stop if unsure about a value.** Phone numbers, EAP vendor name, and similar facts should NOT be made up. If the existing hardcoded value is suspicious (e.g., the two mismatched EAP numbers), commit a placeholder and **clearly flag it for the user**.
- **Don't push to main until type check passes AND a quick smoke pass on the affected page.**
- **No new tests / new test runners.** Existing pattern is `node --test src/lib/*.test.mjs` for pure logic only.
- **Match existing prose tone.** Read existing copy before drafting new fallback strings.
- **Webflow MCP gotchas:**
  - `update_collection_field` only updates `isRequired` / `displayName` / `helpText`. To change Option-field options, create a new Option field with a different slug and add it to `COLLECTION_FIELD_ALIASES`.
  - There is no `delete_collection` MCP action. If you create a wrong collection, leave it and add the right one — note the orphan in the final report.
  - Single-action MCP calls sometimes fail validation; pad with a harmless second action (`get_collection_details` on an unrelated collection) if a single-action call rejects with `actions: expected array`.

---

## 5. Definition of done

- All Phase A items wired and pushed.
- Phase B items wired (or, if scope-cut, the new collections at minimum exist in Webflow with seeded values so the user can finish the wiring later).
- Phase C deliberately deferred — note in final report.
- 0 type errors, 0 warnings.
- Final report posted as a comment / message: what shipped, what's pending, which user-facing facts (EAP phone, awards list, etc.) are awaiting actual data from stakeholders.
- Commits pushed to `main`. No force-pushes. No skipped pre-commit hooks.

---

## 6. Scratch space — current Webflow state for reference

- 22 collections live. IDs in `src/lib/webflow-cms.ts` `COLLECTIONS` map.
- Form Submissions collection (id `69e95d7506997240e17e09bd`) already absorbs apply / signage / IT-ticket / safety-incident; new inbound forms should follow that pattern via `mapSubmissionToFieldData`.
- ALLOWED_IPS env may be set in Cloudflare Workers — middleware gates intranet routes by IP. Any new admin route is automatically gated; any new public route is automatically open.
- The webhook for form submissions is registered (id `69e9607c608be39298db9d70`) — don't re-register.
