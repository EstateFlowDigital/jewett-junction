#!/usr/bin/env node
/**
 * Adds the Stacki box settings (padding, outer spacing, theme, width) to
 * components, or checks that they are there. See src/utils/box.ts.
 *
 *   node scripts/stacki-box.mjs src/components/Item/Card.astro …   add to these files
 *   node scripts/stacki-box.mjs --all                             add to every component
 *   node scripts/stacki-box.mjs --check                           list components without it
 *
 * Stacki shows a dropdown only for a literal union written in the component's
 * own frontmatter, with the doc comment above it as the "i" tooltip, so the
 * block is written into each file rather than imported. A setting the
 * component already has (a Card's theme, a Heading's maxWidth) is left out
 * of the block and left to the component.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT_EDIT = process.argv.includes("--root");
const START = "// stacki-box:start (written by scripts/stacki-box.mjs; change it there)";
const END = "// stacki-box:end";
const STEPS = `"none" | "xsmall" | "small" | "medium" | "large" | "xlarge"`;

/** Each setting: its type and the sentence Stacki shows behind the "i" icon. */
export const SETTINGS = [
  ["padding", STEPS, "Space inside this component, on all four sides. Empty keeps the design's own spacing."],
  ["paddingTop", STEPS, "Space inside this component, along the top edge. Overrides Padding for that side."],
  ["paddingBottom", STEPS, "Space inside this component, along the bottom edge. Overrides Padding for that side."],
  ["paddingLeft", STEPS, "Space inside this component, along the left edge. Overrides Padding for that side."],
  ["paddingRight", STEPS, "Space inside this component, along the right edge. Overrides Padding for that side."],
  ["marginTop", STEPS, "Space outside this component, above it. Empty keeps the design's own spacing."],
  ["marginBottom", STEPS, "Space outside this component, below it. Empty keeps the design's own spacing."],
  // This app has one alternate scheme, the `.dark` class (src/styles/global.css), so
  // theme offers only that; the Lumos template's light and brand have no match here.
  ["theme", `"inherit" | "dark"`, "Color scheme for this component and everything inside it. Inherit follows the page; Dark uses the app's dark colors."],
  ["maxWidth", `"small" | "full" | "none"`, "How wide this component can grow. Small keeps it to a readable width; Full fills its column."],
];

const frontmatterOf = (text) => {
  const m = /^---\n([\s\S]*?)\n---/.exec(text);
  return m ? { body: m[1], start: 4 } : null;
};

/** Prop names the component already declares, outside any box block. */
function ownProps(fm) {
  const withoutBlock = fm.replace(new RegExp(`${escape(START)}[\\s\\S]*?${escape(END)}`), "");
  return new Set([...withoutBlock.matchAll(/^\s+(\w+)\??:\s/gm)].map((m) => m[1]));
}
function escape(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function block(own) {
  const lines = [START, "type StackiBox = {"];
  for (const [key, type, doc] of SETTINGS) {
    if (own.has(key)) continue;
    lines.push(`  /** ${doc} */`, `  ${key}?: ${type};`);
  }
  lines.push("};", END);
  return lines.join("\n");
}

export function apply(text) {
  const fmMatch = /^---\n([\s\S]*?)\n---/.exec(text);
  if (!fmMatch) return { text, error: "no frontmatter" };
  let fm = fmMatch[1];
  if (fm.includes(START)) return { text, skipped: "already has it" };

  const own = ownProps(fm);
  const ownBox = SETTINGS.map(([k]) => k).filter((k) => own.has(k));

  // 1. The Props declaration takes the block.
  const typeRe = /^type Props\s*=\s*/m;
  const ifaceRe = /^(export\s+)?interface Props\b([^{]*)\{/m;
  if (typeRe.test(fm)) {
    fm = fm.replace(typeRe, (m) => `${m}StackiBox &\n  `);
  } else if (ifaceRe.test(fm)) {
    fm = fm.replace(ifaceRe, (m, exp = "", heritage) => {
      const h = heritage.trim();
      const ext = h.startsWith("extends") ? `extends StackiBox, ${h.replace(/^extends\s+/, "")}` : "extends StackiBox";
      return `${exp}interface Props ${ext} {`;
    });
  } else {
    return { text, error: "no Props declaration" };
  }

  // 2. The destructure reads the props without the box settings, and the
  //    caller's class carries the box classes to the outer element.
  const destructure = /const\s*\{([\s\S]*?)\}\s*=\s*Astro\.props(\s+as\s+\w+)?\s*;/m;
  const d = destructure.exec(fm);
  if (!d) return { text, error: "no `const { … } = Astro.props` destructure" };
  // A component that never took the caller's class gets one now, and its
  // outermost classed element (the first in the markup) carries it.
  let markupEdit = false;
  if (!/\bclass\s*:\s*className\b/.test(d[1])) {
    if (/\bclass\s*:/.test(d[1]) || !ROOT_EDIT) return { text, error: "destructure does not take `class: className`" };
    markupEdit = true;
  }
  const own2 = ownBox.length ? `, ${JSON.stringify(ownBox)}` : "";
  // \`Astro.props as X\` stays word for word: Stacki reads the props type
  // from it (stacki-hub electron/astroParser.ts, parsePropSchema).
  const asType = d[2] ? d[2].trim() : "";
  const destructured = markupEdit ? d[0].replace(/const\s*\{/, "const { class: __ownClass,") : d[0];
  const replaced =
    `const __box = splitBox(Astro.props${asType ? " " + asType : ""}${own2});\n` +
    destructured.replace(/\bclass\s*:\s*className\b/, "class: __ownClass")
      .replace(/Astro\.props(\s+as\s+\w+)?/, markupEdit ? "__box.props as typeof __box.props & { class?: string }" : "Astro.props$1").replace(/Astro\.props(\s+as\s+\w+)?/, "__box.props") +
    `\nconst className = [__ownClass, __box.boxClass].filter(Boolean).join(" ") || undefined;`;
  // Spliced, never String#replace with a string: frontmatter can hold \`$&\`.
  fm = fm.slice(0, d.index) + replaced + fm.slice(d.index + d[0].length);

  // 3. The block goes before the Props declaration; the helper is imported.
  const declAt = fm.search(/^(export\s+)?(type|interface) Props\b/m);
  fm = fm.slice(0, declAt) + block(own) + "\n\n" + fm.slice(declAt);
  const importLine = `import { splitBox } from "@/utils/box.ts";`;
  // The end of the last import statement, which may span several lines.
  const lastImport = [...fm.matchAll(/^import\b[\s\S]*?["'][^"'\n]+["'];?\n/gm)].pop();
  fm = lastImport
    ? fm.slice(0, lastImport.index + lastImport[0].length) + importLine + "\n" + fm.slice(lastImport.index + lastImport[0].length)
    : importLine + "\n" + fm;

  const fmStart = fmMatch.index + fmMatch[0].indexOf(fmMatch[1]);
  let markup = text.slice(fmStart + fmMatch[1].length);
  if (markupEdit) {
    const list = /class:list=\{\[/.exec(markup);
    const plain = /\sclass="([^"]*)"/.exec(markup);
    const first = [list, plain].filter(Boolean).sort((a, b) => a.index - b.index)[0];
    if (!first) return { text, error: "no classed element in the markup for the box classes" };
    const edited = first === list
      ? "class:list={[className, "
      : ` class:list={[${JSON.stringify(plain[1])}, className]}`;
    markup = markup.slice(0, first.index) + edited + markup.slice(first.index + first[0].length);
  }
  return { text: keepAstroProps(text.slice(0, fmStart) + fm + markup) };
}

/**
 * The destructure stays `= Astro.props as X` word for word: Stacki reads both
 * the props type and each prop's default from it (stacki-hub
 * electron/astroParser.ts, parsePropSchema and parsePropSchemaDestructure).
 * `apply` writes the simpler `__box.props` form first; this rewrites it.
 */
function keepAstroProps(s) {
  const head = /const __box = splitBox\(Astro\.props(\s+as\s+\w+)?(,\s*(\[[^\]]*\]))?\);\n/.exec(s);
  if (!head) return s;
  const asType = head[1] ? head[1].trim() : "";
  const own = head[3] ?? "";
  s = s.slice(0, head.index) + s.slice(head.index + head[0].length);

  const tail = /\}\s*=\s*__box\.props(\s+as typeof __box\.props & \{ class\?: string \})?;\n/.exec(s);
  if (!tail) { return s; }
  const needsClass = Boolean(tail[1]);
  // The destructure's opening `const {` before the tail.
  const open = s.lastIndexOf("const {", tail.index);
  let body = s.slice(open, tail.index);
  let restName = null;
  body = body.replace(/\.\.\.(\w+)/, (m, name) => {
    restName = name;
    return `...__${name}Raw`;
  });
  const typeText = asType
    ? needsClass ? `${asType} & { class?: string }` : asType
    : needsClass ? "as Props & { class?: string }" : "";
  const ownArg = own ? `, ${own}` : "";
  let after = `} = Astro.props${typeText ? " " + typeText : ""};\n`;
  after += `const __box = splitBox(Astro.props${ownArg});\n`;
  if (restName) after += `const ${restName} = splitBox(__${restName}Raw${ownArg}).props;\n`;
  s = s.slice(0, open) + body + after + s.slice(tail.index + tail[0].length);
  return s;
}

function components(root = "src/components") {
  const out = [];
  (function walk(d) {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (p.endsWith(".astro")) out.push(p);
    }
  })(root);
  return out.sort();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  if (args[0] === "--check") {
    const missing = components().filter((f) => !fs.readFileSync(f, "utf8").includes(START));
    console.log(missing.length ? missing.join("\n") : "every component has the Stacki box settings");
    process.exit(missing.length ? 1 : 0);
  }
  const files = args[0] === "--all" ? components() : args.filter((a) => a !== "--root");
  for (const f of files) {
    const before = fs.readFileSync(f, "utf8");
    const r = apply(before);
    if (r.error) console.log(`needs hand work  ${f}: ${r.error}`);
    else if (r.skipped) console.log(`skipped          ${f}: ${r.skipped}`);
    else {
      fs.writeFileSync(f, r.text);
      console.log(`added            ${f}`);
    }
  }
}
