import * as React from "react";
import * as Types from "./types";

declare function GlobalEyebrow(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  text?: Types.Basic.RichTextChildren;
  maxWidth?: Types.Builtin.Text;
  eyebrowEyebrowIsLeftAligned?: Types.Builtin.Text;
  eyebrowPlainText?: React.ReactNode;
  eyebrowPlainTextVisibiliity?: Types.Visibility.VisibilityConditions;
  eyebrowRichTextVisibility?: Types.Visibility.VisibilityConditions;
  eyebrowFeaturedText?: React.ReactNode;
  eyebrowIconViewbox?: Types.Builtin.Text;
  eyebrowIconPath1?: Types.Builtin.Text;
  eyebrowFeaturedTextVisibility?: Types.Visibility.VisibilityConditions;
  eyebrowEyebrowFeaturedIconVisibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
