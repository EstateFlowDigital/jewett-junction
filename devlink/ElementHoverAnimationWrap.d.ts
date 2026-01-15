import * as React from "react";
import * as Types from "./types";

declare function ElementHoverAnimationWrap(props: {
  as?: React.ElementType;
  slot?: Types.Slots.SlotContent;
  wrapClass?: Types.Builtin.Text;
  maskClass?: Types.Builtin.Text;
}): React.JSX.Element;
