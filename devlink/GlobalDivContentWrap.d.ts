import * as React from "react";
import * as Types from "./types";

declare function GlobalDivContentWrap(props: {
  as?: React.ElementType;
  slot?: Types.Slots.SlotContent;
  classes?: Types.Builtin.Text;
}): React.JSX.Element;
