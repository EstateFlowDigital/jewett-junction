import * as React from "react";
import * as Types from "./types";

declare function SectionTestimonials(props: {
  as?: React.ElementType;
  styleTheme?: Types.Builtin.Text;
  stylePaddingTop?: Types.Builtin.Text;
  stylePaddingBottom?: Types.Builtin.Text;
  eyebrowContentRichText?: Types.Basic.RichTextChildren;
  headingContentRichText?: Types.Basic.RichTextChildren;
  paragraphContentRichText?: Types.Basic.RichTextChildren;
  contentVisibility?: Types.Visibility.VisibilityConditions;
  variant?: "Base" | "Content is Center" | "v-flex-between";
  headingText?: Types.Basic.RichTextChildren;
  paragraphText?: Types.Basic.RichTextChildren;
  buttonGroupVisibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
