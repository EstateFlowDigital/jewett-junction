import * as React from "react";
import * as Types from "./types";

declare function GlobalVisualWrap(props: {
  as?: React.ElementType;
  slot?: Types.Slots.SlotContent;
  variant?:
    | "Auto"
    | "Square (1:1)"
    | "Landscape (3:2)"
    | "Landscape (16:9)"
    | "Portrait (2:3)";
  minHeight?: Types.Builtin.Text;
  imagePosition?: Types.Builtin.Text;
  visibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
