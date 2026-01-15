import * as React from "react";
import * as Types from "./types";

declare function SectionPortfolio(props: {
  as?: React.ElementType;
  styleTheme?: Types.Builtin.Text;
  stylePaddingTop?: Types.Builtin.Text;
  stylePaddingBottom?: Types.Builtin.Text;
  contentFeaturedText?: React.ReactNode;
  contentEyebrowText?: Types.Basic.RichTextChildren;
  contentHeadingText?: Types.Basic.RichTextChildren;
  contentParagraphText?: Types.Basic.RichTextChildren;
  contentButtonGroupVisibility?: Types.Visibility.VisibilityConditions;
  portfolioContentVisibility?: Types.Visibility.VisibilityConditions;
  contentAlignment?: "Base" | "Content is Center" | "v-flex-between";
  contentHeadingMaxWidth?: Types.Builtin.Text;
}): React.JSX.Element;
