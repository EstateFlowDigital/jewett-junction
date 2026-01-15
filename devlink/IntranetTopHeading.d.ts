import * as React from "react";
import * as Types from "./types";

declare function IntranetTopHeading(props: {
  as?: React.ElementType;
  heading?: Types.Basic.RichTextChildren;
  subheading?: Types.Basic.RichTextChildren;
  scrollingText?: Types.Basic.RichTextChildren;
  /** Turn this off to stop the scrolling text.*/
  scrollingTextAnimationVisibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
