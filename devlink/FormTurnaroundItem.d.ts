import * as React from "react";
import * as Types from "./types";

declare function FormTurnaroundItem(props: {
  as?: React.ElementType;
  turnaroundText?: Types.Basic.RichTextChildren;
  turnaroundPriceId?: Types.Basic.IdTextInput;
  turnaroundTag?: Types.Basic.TagType;
  priceVisibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
