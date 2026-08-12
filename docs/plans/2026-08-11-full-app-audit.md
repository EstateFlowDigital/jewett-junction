# Jewett Junction — Full Application Audit

**For:** a Claude-in-Chrome session driving a real browser
**Base URL:** `https://www.jewettconstruction.com/jewett-junction`
**Date:** 2026-08-11

---

## ⚠️ Read this first — two ways to cause real damage

**1. Every form now sends real email to real people.**
Email notifications went live today. Submitting any form on this site will put a
message in the inbox of Sarah LeBlanc, Hailley Holmes, or a shared company inbox
(`safety@`, `hr@`, `it@`, `builtwell@`, `marketing@`). Marketing is also CC'd on
everything right now.

- Do **not** submit forms unless the section below explicitly says to.
- When you do submit, start every free-text field with `AUDIT TEST — ignore` so a
  human who receives it knows immediately.
- Log every submission you make (form name + timestamp) so records can be deleted.

**2. The admin area writes to the live CMS.**
`/admin` edits real content the Jewett team depends on. Read and navigate freely.
Do **not** save, publish, or delete anything unless told to below.

---

## What is already known — don't re-report these

Verified by automated testing on 2026-08-11. Report only if you find them *broken again*:

- Horizontal scrolling on phones: fixed. 96/96 page-and-width combinations were
  clean at 320 / 375 / 414 / 768px.
- All 11 form endpoints accept a submission and write to the CMS.
- All internal links resolve (90 links crawled, zero dead).
- Every page returns HTTP 200.

## The one open bug — highest priority

**Reported:** "The menu button on smaller screens is no longer working. It's not
opening the menu as the user would expect."

**Status:** could not be reproduced in automated testing. The button opened
correctly on 22 pages across three phone sizes, with no JavaScript errors.

**Your job:** reproduce it in a real browser, or establish that it works.

1. Narrow the browser window below 768px (or use DevTools device toolbar).
2. Load `/dashboard`. The hamburger button sits at the top-left.
3. Click it. Expected: a dark panel slides in from the left with the Jewett logo
   at top and 12 links (Dashboard → Help).
4. Repeat on `/safety`, `/culture`, `/resources`, `/directory`.
5. Then test at these widths specifically: **767px, 768px, 769px**. At 767 you
   should see the hamburger and no sidebar; at 768+ the reverse. Report any
   width where you get *neither*.
6. Open the browser console and report any errors, especially ones mentioning
   `astro-island`, `hydrate`, or a failed module import.

If it works in Chrome, say so plainly — the suspicion is that it's specific to
iOS Safari, which this session can't test. Note whether the client's report
might have come from an iPhone.

---

## Section 1 — Navigation and layout

Load each page and confirm the sidebar shows **12 labelled items** (Dashboard,
Safety, HR / Payroll, IT Helpdesk, Marketing, Events, Culture, Directory,
Resources, Submit an Idea, Notifications, Help), the Jewett logo sits at the top,
and the current page is highlighted.

| Page | URL |
|---|---|
| Home | `/dashboard` |
| Safety | `/safety` |
| HR | `/hr` |
| Benefits | `/hr/benefits` |
| IT Helpdesk | `/it-helpdesk` |
| Marketing | `/marketing` |
| Events | `/events` |
| Culture | `/culture` |
| Directory | `/directory` |
| Resources | `/resources` |
| Announcements | `/announcements` |
| Help | `/help` |
| Notifications | `/notifications` |

Check: logo links home; no item is cut off; nothing overlaps the content.

---

## Section 2 — Client's Round 2 requests

These were the client's specific asks. Confirm each visually.

**Home (`/dashboard`)**
- [ ] "Living the Mission" box with nomination copy and a "Submit your Nomination!" button
- [ ] "Internal Sales Lead Submission" box
- [ ] All open job postings listed (should be 4, not 3)
- [ ] Photo gallery tiles open the individual asset, not the marketing hub

**Safety (`/safety`)**
- [ ] Award banner: "2026 Forever Safety Award Winner", Ed Pellerin, Senior
      Superintendent, **with his headshot** (not a generic icon). Confirm his
      face isn't cropped.
- [ ] A "Signage Request" box for Operations
- [ ] "Safety Resources" opens safety documents only, not the whole library
- [ ] No leftover sample content (IT Setup Guide, Employee Handbook 2025,
      Safety Procedures Manual, Benefits Summary should all be gone)

**HR (`/hr`, `/hr/benefits`)**
- [ ] Titled "HR / Payroll Resources"
- [ ] Employee Handbook appears and opens the 2026 edition
- [ ] Open Positions link works
- [ ] Living the Mission and BuiltWell boxes present
- [ ] Benefits page lists **8** providers: Consumer Health Solutions, Cigna,
      Delta Dental, Vision, Disability, LegalShield & IDShield, EAP, Principal 401(k)
- [ ] EAP entry mentions "Web ID: Guardian"
- [ ] Every provider link opens the right site in a new tab

**Marketing (`/marketing`)**
- [ ] Box reads "Apparel" (not "Apparel Store") and opens a page offering **both**
      the apparel guide and a "Shop the Apparel Store" button
- [ ] "Submit a Job Site Photo" box (Photo Library should be gone)
- [ ] "Marketing Request" box
- [ ] Social icons present and pointing at Jewett's real accounts

**Culture (`/culture`)**
- [ ] Second row of statistics is gone
- [ ] Recent Recognitions and Team Wins appear **above** Core Values
- [ ] Living the Mission and BuiltWell boxes present

**Directory (`/directory`)**
- [ ] Open a person in a large department (e.g. Finance) — their department
      section should list the **whole team**, not three people
- [ ] Filter links work: `/directory?department=Finance`, `?department=Marketing`
- [ ] No one shows a raw ID or "Unknown" where a department should be
- [ ] Search for a surname (try "Palmer") returns relevant people only

---

## Section 3 — Forms

**Submit each form once.** Prefix every text field with `AUDIT TEST — ignore`.
Use `audit@estateflowdigital.com` wherever an email is required.

| Form | URL | Goes to |
|---|---|---|
| Living the Mission | `/living-the-mission` | Sarah + Hailley |
| Internal Sales Lead | `/sales-lead` | Sarah + Hailley |
| BuiltWell Idea | `/builtwell` | builtwell@ |
| Ops Signage Request | `/safety/signage-request` | marketing@ |
| Job Site Photo | `/marketing/submit-photo` | Sarah + Hailley |
| Marketing Request | `/marketing/request` | Sarah + Hailley |
| IT Ticket | `/it-ticket` | it@ |
| Safety Incident | `/safety-incident` | safety@ |
| Submit an Idea | `/submit-idea` | marketing@ |

For each, confirm:
1. Required-field validation fires when you submit empty
2. A clear success message appears after a valid submission
3. No console errors

For **Job Site Photo**, upload an actual image and confirm the preview appears
and the submission succeeds — this is the only form with a file upload.

**Then report the exact list of what you submitted and when**, so the records can
be cleaned out of the admin and the recipients warned.

---

## Section 4 — Admin

Sign in at `/admin` (Cameron has the password). **Read-only unless stated.**

- [ ] Dashboard loads and lists the collections
- [ ] `/admin/form-submissions` shows your test submissions from Section 3, each
      with the **submitter's name filled in** (a blank name column is a bug)
- [ ] `/admin/quick-actions` — the two dashboard boxes are editable, and both
      "Description" and "Button Label" fields are visible
- [ ] `/admin/benefit-links` lists all 8 providers
- [ ] `/admin/employees` — open a record; the Department dropdown offers
      **Pre-Construction**
- [ ] `/admin/site-settings` — the safety award fields show Ed Pellerin and his photo
- [ ] Spot-check 5 other collections load without error

**One permitted write:** in `/admin/ui-strings`, open any record, change nothing,
and click Save. Confirm it saves without error, then move on. This proves the
write path works without altering content.

---

## Section 5 — Responsive

At **375px** and **768px** wide, walk through: Home, Safety, HR, Benefits,
Marketing, Culture, Directory, Resources, Events, and one Culture story
(`/culture/core-value-safety-first`).

For each, confirm:
- [ ] The page does not scroll sideways (this was just fixed — regressions matter)
- [ ] No text is cut off or running past the screen edge
- [ ] Buttons are large enough to tap comfortably
- [ ] Images fit their containers
- [ ] Tables and long links wrap or scroll inside their own box

Give the **Events** page extra attention — open "Add to Calendar" on an event and
confirm the dropdown is fully visible and not clipped.

---

## Section 6 — Content quality

- [ ] No lorem ipsum or obvious placeholder text
- [ ] No broken images
- [ ] Dates read sensibly (e.g. "September 1, 2026", not "2026-09-01")
- [ ] Event times look right for Eastern time
- [ ] Nothing references a department Jewett doesn't have (there is no
      "Commercial" department)
- [ ] External links open in a new tab; internal ones don't

---

## How to report

Give me one list, ordered by severity. For each item:

- **Where** — page URL and the spot on the page
- **What you expected** vs **what happened**
- **How to reproduce** — exact steps, plus browser width if it's layout-related
- A screenshot for anything visual
- Console errors verbatim

Please separate:
1. **Broken** — doesn't work, or wrong information shown
2. **Rough** — works but looks or reads poorly
3. **Suggestions** — improvements, clearly marked as optional

And at the end, the **list of test submissions you created** so I can delete them.

---

## Notes and limits

- This session runs in Chrome. It cannot test iOS Safari, which is where the
  reported menu bug most likely lives.
- Email delivery can't be confirmed from the browser — someone has to check the
  inboxes. Flag that as a follow-up.
- If a page is slow on first load, retry once; the app sleeps between visits and
  the first hit after idle can take a few seconds. Report it only if it repeats.
