# Resources Detail Polish + App-Wide Previews & Clickability

**Date:** 2026-05-19
**Status:** Approved — implementation in progress

## Problem

1. The Resources detail page (`/resources/[slug]`) exists but is plainer than the Marketing detail page (`/marketing/[slug]`), missing gradient hero, badge row, tags, and richer styling.
2. The "Benefits Overview" cards on the HR page (and several other dashboard cards) are displayed but not wrapped in links — clicks go nowhere.
3. Only the Resources detail page renders an inline file preview. Every other detail page just shows a "Download" button, forcing the user to leave the app to see content.

## Goals

- Resources detail page reaches visual parity with — or exceeds — the Marketing detail page.
- Every CMS-entity card on the user-facing pages is clickable as a whole, routing to its detail endpoint.
- Every detail page renders an inline preview when a file or image is attached (PDF, image, Office doc, video). No more "download to see what this is."

## Non-Goals

- No changes to admin pages.
- No changes to dashboard structure (already heavily linked).
- No new CMS fields — work with existing Webflow collection schemas.

## Design

### 1. Shared `FilePreview` component

**Path:** `src/components/shared/FilePreview.astro`

Single reusable preview block. Detects type from URL extension, picks the right render strategy.

| File type | Strategy |
|---|---|
| `.pdf` | `<iframe>` 75vh, white bg, filename strip + "Open in new tab" link |
| `.jpg/.jpeg/.png/.gif/.webp/.svg` | `<img>` inside aspect container, click-to-open-full |
| `.mp4/.webm/.mov` | `<video controls preload="metadata">` |
| `.doc/.docx/.xls/.xlsx/.ppt/.pptx` | Google Docs Viewer iframe (`https://docs.google.com/gview?url=...&embedded=true`) |
| External link / unknown | Icon card with file name + "Open in new tab" button (no broken iframe) |

**Props:**
- `url: string` (required)
- `name?: string` (display label)
- `accent?: 'blue' | 'purple' | 'orange' | 'cyan' | 'rose' | 'amber' | 'green'` — section color theme
- `aspectRatio?: 'video' | 'square' | 'auto'` — for image/video

**Behavior:**
- Returns `null`-equivalent (renders nothing) if no `url` passed — caller can include unconditionally.
- Lazy-loads images and iframes.
- Filename strip shows truncated filename + open-in-new-tab link.

### 2. Resources detail page redesign

**Path:** `src/pages/resources/[slug].astro` (modify in place)

Reach parity with Marketing detail page:

- **Gradient hero band** at top of main card using category color (reuse `categoryConfig` map from `ResourcesContent.tsx`)
- **Header image banner** if `icon` field contains an image URL; else gradient icon block (current behavior)
- **Badge row** above title: category pill (gradient bg), file-type pill (uppercase), file-size pill, "Featured" pill, last-updated relative time
- **Description** (existing, keep prose-invert styling)
- **`<FilePreview>`** replaces ad-hoc iframe — now handles PDFs, images, Office docs, video uniformly
- **Tags row** (if `tags` field present on resource — comma-split)
- **Action buttons** — download + external link (existing)
- **Metadata strip** — file size, format, last updated, view count where present
- **Related resources** rail (existing) — enhance with thumbnail when icon is image

### 3. Add `<FilePreview>` to every detail page

- `hr/[slug].astro` — preview `document-link` field
- `safety/[slug].astro` — preview document, SDS, training
- `it-helpdesk/[slug].astro` — preview attachments/screenshots
- `culture/[slug].astro` — preview photo or video
- `events/[slug].astro` — preview event flyer
- `careers/[slug].astro` — preview job description PDF if attached
- `announcements/[slug].astro` — preview attachment
- `marketing/[slug].astro` — header image already present; add `<FilePreview>` for `download-link` file when applicable

### 4. Card clickability fixes

| File | Lines | Fix |
|---|---|---|
| `src/components/pages/HRContent.tsx` | 261-278 | Wrap each Benefits Overview card in `<a href="/jewett-junction/hr/${slug}">`. Fall back to `/hr` listing if no slug. |
| `src/components/pages/SafetyContent.tsx` | ~314-343 | Wrap each Training card in `<a href="/jewett-junction/safety/${slug}">` |
| `src/components/pages/CultureContent.tsx` | ~381-407, ~428-454 | Move `<a>` from h4/title to wrap entire Card |
| `src/components/pages/DirectoryContent.tsx` | ~227-230, ~385-389 | Move `<a>` from h3/title to wrap entire Card |

All wrappers respect existing 44px-min-height accessibility target and existing dark-theme hover patterns.

## Architecture Notes

- All preview logic lives in **one** Astro component — no duplication across 8 detail pages
- Card clickability follows the existing `<a>` → `<Card>` pattern already used in HR Forms section
- No new CMS fields required
- No new dependencies

## Build Sequence

1. Build `FilePreview.astro` component
2. Refactor `resources/[slug].astro` to use it + apply marketing-detail styling
3. Add `FilePreview` to other `[slug].astro` pages
4. Fix card clickability in 4 Content components
5. Run `astro check` / build verification

## Risks / Open Questions

- Google Docs Viewer requires public URLs — Webflow CDN URLs are public, so this works. Cloudflare R2 URLs would also work.
- Some Webflow CMS files may be served with `Content-Disposition: attachment` headers which suppress iframe rendering. Fallback: show file card with "Open in new tab" — never a broken empty iframe.
- Image previews on detail pages may double-up where header image is already shown. Avoid by skipping `<FilePreview>` when the same URL is already used as header.
