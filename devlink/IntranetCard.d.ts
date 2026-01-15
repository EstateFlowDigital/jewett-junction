import * as React from "react";
import * as Types from "./types";

declare function IntranetCard(props: {
  as?: React.ElementType;
  visualVisualImageFile?: Types.Asset.Image;
  visualVisualImageAltText?: Types.Basic.AltText;
  urlClickableLink?: Types.Basic.Link;
  urlDescriptiveText?: React.ReactNode;
  headingHeadingRichText?: Types.Basic.RichTextChildren;
  paragraphParagraphRichText?: Types.Basic.RichTextChildren;
  /** Have the card span 1, 2 or 3 columns by changing the number.*/
  classes?: Types.Builtin.Text;
}): React.JSX.Element;
