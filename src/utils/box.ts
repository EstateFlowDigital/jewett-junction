/**
 * Stacki box settings: padding, outer spacing, theme and width on every
 * component, chosen from fixed lists so Stacki shows them as dropdowns.
 *
 * Cameron's rule (2026-10-13): every component can be styled from Stacki,
 * every setting is a dropdown with an "i" tooltip, and no box takes free
 * text. Stacki reads a component's props from the component's own file and
 * only offers a dropdown for a literal union written there, so each
 * component carries the same `StackiBox` type block (written by
 * `scripts/stacki-box.mjs`, checked by `tests/stacki-box.test.mjs`). This
 * file turns the chosen values into utility classes. Jewett Junction is not a
 * Lumos site, so the spacing and width classes are defined in
 * src/styles/global.css (Tailwind's `utilities` layer, on its `--spacing`
 * scale), and theme maps onto the app's existing `.dark` class.
 *
 * Unset means "as designed": no class is added and nothing changes.
 */

/** The spacing scale, in words, mapped onto the `--space-*` tokens. */
const STEP = {
  none: "0",
  xsmall: "2",
  small: "3",
  medium: "5",
  large: "6",
  xlarge: "8",
} as const;

export type BoxStep = keyof typeof STEP;
export type BoxTheme = "inherit" | "dark";
export type BoxWidth = "small" | "full" | "none";

export interface BoxSettings {
  padding?: BoxStep;
  paddingTop?: BoxStep;
  paddingBottom?: BoxStep;
  paddingLeft?: BoxStep;
  paddingRight?: BoxStep;
  marginTop?: BoxStep;
  marginBottom?: BoxStep;
  theme?: BoxTheme;
  maxWidth?: BoxWidth;
}

/** Every box setting, in the order the panel lists them. */
export const BOX_KEYS = [
  "padding",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "marginTop",
  "marginBottom",
  "theme",
  "maxWidth",
] as const;

export type BoxKey = (typeof BOX_KEYS)[number];

const SPACE_CLASS: Record<string, string> = {
  padding: "padding",
  paddingTop: "padding-top",
  paddingBottom: "padding-bottom",
  paddingLeft: "padding-left",
  paddingRight: "padding-right",
  marginTop: "margin-top",
  marginBottom: "margin-bottom",
};

const isStep = (value: unknown): value is BoxStep =>
  typeof value === "string" && value in STEP;

/** The utility classes for a set of box settings, or an empty list. */
export function boxClasses(settings: BoxSettings): string[] {
  const out: string[] = [];
  for (const key of BOX_KEYS) {
    const value: unknown = settings[key];
    if (value === undefined || value === null || value === "") continue;
    if (key in SPACE_CLASS) {
      if (isStep(value)) out.push(`${SPACE_CLASS[key]}-${STEP[value]}`);
    } else if (key === "theme") {
      if (value === "dark") out.push("dark");
    } else if (key === "maxWidth") {
      if (value === "small" || value === "full" || value === "none") out.push(`max-width-${value}`);
    }
  }
  return out;
}

/**
 * Takes the box settings out of a component's props, so they never reach the
 * markup as stray attributes. `own` names settings the component already
 * handles itself (a Card's `theme`, a Heading's `maxWidth`); those stay in
 * the props untouched.
 */
export function splitBox<P extends object, K extends BoxKey = never>(
  props: P,
  own: readonly K[] = [],
): { boxClass: string | undefined; props: Omit<P, Exclude<BoxKey, K>> } {
  const rest: Record<string, unknown> = { ...(props as Record<string, unknown>) };
  const settings: Record<string, unknown> = {};
  for (const key of BOX_KEYS) {
    if ((own as readonly BoxKey[]).includes(key)) continue;
    if (key in rest) {
      settings[key] = rest[key];
      delete rest[key];
    }
  }
  const classes = boxClasses(settings as BoxSettings);
  return {
    boxClass: classes.length ? classes.join(" ") : undefined,
    props: rest as Omit<P, Exclude<BoxKey, K>>,
  };
}
