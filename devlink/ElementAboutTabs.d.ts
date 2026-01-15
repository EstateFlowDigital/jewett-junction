import * as React from "react";
import * as Types from "./types";

declare function ElementAboutTabs(props: {
  as?: React.ElementType;
  imageFile?: Types.Asset.Image;
  globalParagraph?: Types.Basic.RichTextChildren;
  globalImageAltText?: Types.Basic.AltText;
  underVisualTextVisibility?: Types.Visibility.VisibilityConditions;
  id?: Types.Basic.IdTextInput;
}): React.JSX.Element;
