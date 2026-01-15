import * as React from "react";
import * as Types from "./types";

declare function IntranetSectionWSlot(props: {
  as?: React.ElementType;
  slot?: Types.Slots.SlotContent;
  /** Change the class to another option. ie. u-grid-column-2, u-grid-column-3, u-grid-column-4, etc.*/
  layoutClasses?: Types.Builtin.Text;
}): React.JSX.Element;
