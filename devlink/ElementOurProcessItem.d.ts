import * as React from "react";
import * as Types from "./types";

declare function ElementOurProcessItem(props: {
  as?: React.ElementType;
  visualImageFile?: Types.Asset.Image;
  visualImageAltText?: Types.Basic.AltText;
  contentEyebrowText?: Types.Basic.RichTextChildren;
  contentHeadingText?: Types.Basic.RichTextChildren;
  contentParagraphText?: Types.Basic.RichTextChildren;
  visualPositionIsFirst?: Types.Builtin.Text;
  styledNumberVisibility?: Types.Visibility.VisibilityConditions;
  styledNumberContent?: Types.Basic.RichTextChildren;
  eyebrowFeaturedText?: React.ReactNode;
  visualCdnImageAltText?: Types.Builtin.Text;
  visualCdnImageUrl?: Types.Builtin.Text;
  visualImageVisibility?: Types.Visibility.VisibilityConditions;
  visualCdnImageVisibility?: Types.Visibility.VisibilityConditions;
  visualImagePosition?: Types.Builtin.Text;
  button1Link?: Types.Basic.Link;
}): React.JSX.Element;
