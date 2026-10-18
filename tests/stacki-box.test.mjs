/**
 * Every component can be styled from Stacki (Cameron, 2026-10-13): each
 * carries the StackiBox settings block written by scripts/stacki-box.mjs, and
 * src/utils/box.ts turns the chosen values into utility classes. Stacki shows
 * a dropdown only for a literal union in the component's own file, so the
 * block is checked here file by file rather than imported once.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { boxClasses, splitBox } from "../src/utils/box.ts";

const ROOT = "src/components";
const START = "// stacki-box:start";

/** Components with nothing on screen to style, each with its reason. */
const EXEMPT = {};

const files = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".astro")) files.push(path.relative(ROOT, p));
  }
})(ROOT);

test("every placeable component carries the Stacki box settings", () => {
  const missing = files.filter(
    (f) => !(f in EXEMPT) && !fs.readFileSync(path.join(ROOT, f), "utf8").includes(START),
  );
  assert.deepEqual(missing, [], "run `node scripts/stacki-box.mjs <file>` on these");
});

test("every box setting is a fixed list with a description", () => {
  const problems = [];
  for (const f of files) {
    const text = fs.readFileSync(path.join(ROOT, f), "utf8");
    const block = /\/\/ stacki-box:start[\s\S]*?\/\/ stacki-box:end/.exec(text)?.[0];
    if (!block) continue;
    const lines = block.split("\n");
    lines.forEach((line, i) => {
      const m = /^\s+(\w+)\?:\s*(.+);$/.exec(line);
      if (!m) return;
      if (!/^("[^"]+"\s*\|\s*)+"[^"]+"$/.test(m[2])) problems.push(`${f} ${m[1]}: not a list of choices`);
      if (!/^\s*\/\*\*.+\*\/\s*$/.test(lines[i - 1] ?? "")) problems.push(`${f} ${m[1]}: no description`);
    });
  }
  assert.deepEqual(problems, []);
});

test("unset settings add nothing; set ones map to the utility classes", () => {
  assert.deepEqual(boxClasses({}), []);
  assert.deepEqual(boxClasses({ padding: "medium", marginTop: "none", theme: "dark", maxWidth: "small" }), [
    "padding-5",
    "margin-top-0",
    "dark",
    "max-width-small",
  ]);
  assert.deepEqual(boxClasses({ theme: "inherit" }), [], "inherit adds no class");
  assert.deepEqual(boxClasses({ theme: /** @type {any} */ ("brand") }), [], "this app has no brand scheme");
  assert.deepEqual(boxClasses({ padding: /** @type {any} */ ("huge") }), [], "an unknown value is ignored");
});

test("box settings never reach the markup as attributes", () => {
  const { boxClass, props } = splitBox({ padding: "large", id: "x", theme: "dark" }, ["theme"]);
  assert.equal(boxClass, "padding-6");
  assert.deepEqual(props, { id: "x", theme: "dark" }, "a component's own theme stays with it");
});

/** The setting's type and the doc comment on the line above it. */
function propLine(file, name) {
  const lines = fs.readFileSync(path.join(ROOT, file), "utf8").split("\n");
  const i = lines.findIndex((l) => new RegExp(`^\\s+${name}\\?:`).test(l));
  return { type: lines[i]?.replace(/^\s+\w+\?:\s*/, "").replace(/;.*$/, ""), doc: lines[i - 1] ?? "" };
}

test("CmsIcon color and FilePreview height are dropdowns with a description", () => {
  for (const [file, name] of [
    ["shared/CmsIcon.astro", "color"],
    ["shared/FilePreview.astro", "height"],
  ]) {
    const { type, doc } = propLine(file, name);
    assert.match(type ?? "", /^("[^"]+"\s*\|\s*)+"[^"]+"$/, `${file} ${name}: not a list of choices`);
    assert.match(doc, /^\s*\/\*\*.+\*\/\s*$/, `${file} ${name}: no description`);
  }
});

test("FilePreview's default height is still 75vh", () => {
  const text = fs.readFileSync(path.join(ROOT, "shared/FilePreview.astro"), "utf8");
  assert.match(text, /height = "large"/);
  assert.match(text, /large: "h-\[75vh\]"/);
});

test("pages hand CmsIcon the CMS hex through hex, not color", () => {
  const offenders = [];
  (function walk(dir) {
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (p.endsWith(".astro") && /<CmsIcon\b[^>]*\bcolor=\{/.test(fs.readFileSync(p, "utf8"))) offenders.push(p);
    }
  })("src/pages");
  assert.deepEqual(offenders, []);
});
