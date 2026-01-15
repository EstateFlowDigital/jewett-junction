import * as React from "react";
import * as Types from "./types";

declare function ElementContentCard(props: {
  as?: React.ElementType;
  textHeadingText?: Types.Basic.RichTextChildren;
  textParagraphText?: Types.Basic.RichTextChildren;
  buttonButtonText?: React.ReactNode;
  buttonButtonUrl?: Types.Basic.Link;
  textEyebrowText?: React.ReactNode;
  eyebrowText?: Types.Basic.RichTextChildren;
  eyebrowFeaturedText?: React.ReactNode;
  styleTheme?: Types.Builtin.Text;
  cdnImageUrl?: Types.Builtin.Text;
  cdnImageAltText?: Types.Builtin.Text;
  mainImageVisibility?: Types.Visibility.VisibilityConditions;
  mainVisual?: Types.Asset.Image;
  cdnImageVisibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
