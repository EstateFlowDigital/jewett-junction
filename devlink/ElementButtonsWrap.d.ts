import * as React from "react";
import * as Types from "./types";

declare function ElementButtonsWrap(props: {
  as?: React.ElementType;
  slot?: Types.Slots.SlotContent;
  variant?: "Left" | "Center" | "Center Hero";
}): React.JSX.Element;
