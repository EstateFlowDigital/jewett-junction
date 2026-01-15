import * as React from "react";
import * as Types from "./types";

declare function ElementFeatureCard(props: {
  as?: React.ElementType;
  iconViewbox?: Types.Builtin.Text;
  iconPath1?: Types.Builtin.Text;
  iconPath2?: Types.Builtin.Text;
  iconPath3?: Types.Builtin.Text;
  iconPath2Visibility?: Types.Visibility.VisibilityConditions;
  iconPath3Visibility?: Types.Visibility.VisibilityConditions;
  contentHeadingText?: Types.Basic.RichTextChildren;
  contentParagraphText?: Types.Basic.RichTextChildren;
  paragraphClass?: Types.Builtin.Text;
  objectIsALink?: Types.Visibility.VisibilityConditions;
  clickableText?: React.ReactNode;
  clickableLink?: Types.Basic.Link;
  styleTheme?: Types.Builtin.Text;
}): React.JSX.Element;
