import * as React from "react";
import * as Types from "./types";

declare function ElementMarketTabContentMarkets(props: {
  as?: React.ElementType;
  rightParagraphRichText?: Types.Basic.RichTextChildren;
  leftParagraphRichText?: Types.Basic.RichTextChildren;
  headingTab1ContentRichText?: Types.Basic.RichTextChildren;
  paragraphRichTex?: Types.Basic.RichTextChildren;
  tabHeadingText?: Types.Basic.RichTextChildren;
  tabParagraphText?: Types.Basic.RichTextChildren;
  tabImageFile?: Types.Asset.Image;
  tabImageAltText?: Types.Basic.AltText;
  marketsPageLink?: Types.Basic.Link;
  isReversed?: Types.Builtin.Text;
  cityName?: React.ReactNode;
  cardHeadingH3?: Types.Basic.RichTextChildren;
  cardParagraph?: Types.Basic.RichTextChildren;
}): React.JSX.Element;
