# Jewett Junction

Project slug: `jewett-junction`

At the start of work, call `get_project_context` with this slug.
Save decisions, conventions and gotchas with `save_memory` as they happen.
Before ending substantial work, call `log_session`.

Everything else about this project lives in the Memory Hub brief, not in this file.

## Stacki box settings

Every `.astro` component carries a `StackiBox` block (padding,
paddingTop/Bottom/Left/Right, marginTop/Bottom, theme, maxWidth) of literal
unions with a one-sentence doc each, which Stacki shows as dropdowns with an
"i" tooltip. `scripts/stacki-box.mjs` writes it (`--root` for a component that
never took a `class`), `src/utils/box.ts` (`splitBox`) maps it to the box
utilities at the end of `src/styles/global.css` (Tailwind's `--spacing` scale)
and to `.dark`, and `tests/stacki-box.test.mjs` enforces it. Leave the block and
`Astro.props as X` as written: Stacki reads both from the component's own file.
