import * as React from "react";
import * as Types from "./types";

declare function ElementStatItem(props: {
  as?: React.ElementType;
  statContentHeadingText?: Types.Basic.RichTextChildren;
  statContentSubheadingText?: Types.Basic.RichTextChildren;
  statText?: React.ReactNode;
  animationId?: Types.Basic.IdTextInput;
}): React.JSX.Element;
