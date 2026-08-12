# Jewett Junction — Audit Round 2 (verification pass)

**Base:** `https://www.jewettconstruction.com/jewett-junction`
**Purpose:** confirm five fixes landed, and work out which of the remaining
"does nothing" reports were the same root cause rather than separate bugs.

---

## Do not submit any forms

Form notifications are live. Submitting anything emails Sarah LeBlanc, Hailley
Holmes, or a shared company inbox. **Validation-only again this round** — check
that empty submits are blocked, then stop. Do not click Submit on a filled form.

The admin is **read-only** this round. No saves, no publishes, no deletes.

---

## The most important thing to know

Your last audit found the root cause of the reported menu bug: the buttons are
server-rendered, so they look pressable before the JavaScript attaches, and any
click landing in that window is silently swallowed. That is why a first tap
failed and a second worked.

**This changes how you must test.** For everything below:

- Click **once, immediately**, as soon as the element is visible. Do not wait,
  do not settle, do not click twice to "make sure".
- If nothing happens, wait 2 seconds and click again.
- Report the result as one of: **works on first click** / **only works on
  second click** / **never works**.

That distinction is the whole point of this round. "Only works on second click"
means the hydration race is still present somewhere.

---

## Part 1 — Verify the five fixes

Each has an exact expected result. Report pass/fail against it.

### F1. Mobile menu opens on the very first tap
Narrow below 768px. For each of `/resources`, `/events`, `/help`, `/hr`,
`/culture`, `/directory`: load the page and tap the hamburger the instant it
appears.

**Expected:** the drawer opens every time, on the first tap, on all six.
Previously `/resources`, `/events` and `/help` swallowed the first tap.

### F2. Resources deep link filters
Open `/resources?category=Safety`.

**Expected:** the counter reads **"Showing 2 of 7 resources"** and only safety
documents are listed. Previously it read "Showing 7 of 7".

Also: from `/safety`, click the "Safety Resources" tile and confirm it lands on
the same filtered view.

### F3. Culture has the two boxes
Open `/culture`.

**Expected:** a "Living the Mission" box and a "Submit a BuiltWell Idea" box now
render, in the same style as the ones on `/hr`. Both were previously absent.
Click each and confirm they reach `/living-the-mission` and `/builtwell`.

### F4. Culture nominations route correctly
On `/culture`, check where these three point:

| Button | Expected destination |
|---|---|
| Hero — "Nominate a Teammate" | `/living-the-mission` |
| "Know Someone Amazing?" — Submit Nomination | `/living-the-mission` |
| Community Impact — "Get Involved" | `/submit-idea` (deliberately unchanged) |

**Expected:** 3 links to `living-the-mission` on the page, 2 remaining to
`submit-idea`. Say if you think the "Get Involved" destination is wrong.

### F5. "Meet Our Team" works
On `/culture`, click "Meet Our Team" in the hero **immediately** on load.

**Expected:** scrolls to the Employee Spotlight section on the first click. It is
now a plain link rather than a scripted button, so it should not depend on
JavaScript at all.

---

## Part 2 — Re-test the "does nothing" reports

These were reported last round. Now that we know about the click-swallowing, we
need to know which were that, and which are real. **Use the first-click / second-click
method for each.**

### R1. Add to Calendar (`/events`, hero) — still unexplained
Click it immediately, then again after 2 seconds.

- Opens on first click → was the hydration race, now fixed.
- Only on second click → the race is still present here.
- Never opens → a real bug. Note whether the Events collection being empty
  seems related, and whether the button gives *any* feedback.

### R2. Admin edit buttons — known still broken
Sign in at `/admin`, open any collection, click an edit pencil immediately.

**This one has not been fixed yet**, so we expect the first click to be swallowed
and the second to work. Confirm that, and tell us **how many collections** show
it. We want to know the scale before fixing.

### R3. Benefit Links — your report said "No items yet"
Open `/admin/benefit-links`.

**This looks like it was a false reading.** The collection holds 8 items and
`/hr/benefits` renders all 8. Please look again and report exactly what you see.
If it is empty, capture a screenshot and any console error — that would mean a
real admin bug. Also confirm **Principal 401(k)** now appears (it was unpublished
until today).

### R4. Resources category chips
Click the "Safety Documents (2)" chip once, immediately.

**Expected:** filters to 2 items on the first click. Last round this needed two
clicks, which we believe was the same race.

---

## Part 3 — Regression sweep

Code changed on Culture, Resources, Events, Directory, Marketing and both
layouts. Confirm nothing broke.

- [ ] `/culture` — layout still correct: Recognitions and Team Wins above Core
      Values, no second statistics row, new boxes do not overlap anything
- [ ] `/resources` — clearing the filter returns to 7 of 7; search still works
- [ ] `/events` — "Add to Calendar" dropdown is not clipped by the hero
- [ ] Sidebar still shows 12 labelled items with the Jewett logo, correct page highlighted
- [ ] No horizontal scrolling at 375px and 768px on: Home, Safety, HR, Benefits,
      Marketing, Culture, Directory, Resources, Events, and a Culture story
      (`/culture/core-value-safety-first`)
- [ ] All 9 forms still block an empty submit
- [ ] No new console errors

---

## Known and already logged — do not re-report

- Events collection is empty (client has to add events)
- Three overlapping department fields; "Commercial" offered in the admin;
  "Team" chip in the Directory; SymQuest listed as an employee
- Stat tiles showing 0; stale January featured announcement; nav label mismatch
  ("HR" vs "HR / Payroll"); mixed-case email domain; inconsistent profile slug
- The Radix `aria-describedby` console warning when the menu opens
- Two different form validation styles

New instances of these are worth a line, but no detail needed.

---

## Report back

1. **Fix verification** — F1 to F5, pass or fail, with the actual value you saw
   where an exact result was given.
2. **First-click table** — for R1 to R4: works first click / second click only /
   never.
3. **Regressions** — anything in Part 3 that broke.
4. **Anything new** — with URL, steps, browser width, and a screenshot.

Confirm at the end that you submitted **no forms** and made **no admin writes**.
