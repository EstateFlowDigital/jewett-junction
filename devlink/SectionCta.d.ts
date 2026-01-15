import * as React from "react";
import * as Types from "./types";

declare function SectionCta(props: {
  as?: React.ElementType;
  styleTheme?: Types.Builtin.Text;
  stylePaddingTop?: Types.Builtin.Text;
  stylePaddingBottom?: Types.Builtin.Text;
  headingContentRichText?: Types.Basic.RichTextChildren;
  paragraphContentRichText?: Types.Basic.RichTextChildren;
  eyebrowContentRichText?: Types.Basic.RichTextChildren;
}): React.JSX.Element;
