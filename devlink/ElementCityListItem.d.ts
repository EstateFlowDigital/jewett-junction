import * as React from "react";
import * as Types from "./types";

declare function ElementCityListItem(props: {
  as?: React.ElementType;
  visualImageFile?: Types.Asset.Image;
  button1Link?: Types.Basic.Link;
  globalVisualImageAltText?: Types.Basic.AltText;
  headingRichText?: Types.Basic.RichTextChildren;
  globalParagraphRichText?: Types.Basic.RichTextChildren;
  eyebrowPlainText?: React.ReactNode;
}): React.JSX.Element;
