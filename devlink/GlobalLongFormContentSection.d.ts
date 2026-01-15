import * as React from "react";
import * as Types from "./types";

declare function GlobalLongFormContentSection(props: {
  as?: React.ElementType;
  longFormContent?: Types.Basic.RichTextChildren;
  imageFile?: Types.Asset.Image;
  imageAltText?: Types.Basic.AltText;
  visualVisibility?: Types.Visibility.VisibilityConditions;
  formVisibility?: Types.Visibility.VisibilityConditions;
  slot?: Types.Slots.SlotContent;
  topContentVisibility?: Types.Visibility.VisibilityConditions;
  paddingBottom?: Types.Builtin.Text;
  paddingTop?: Types.Builtin.Text;
  slot?: Types.Slots.SlotContent;
  additionalContentSlotVisibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
