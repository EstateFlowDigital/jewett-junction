import * as React from "react";
import * as Types from "./types";

declare function ElementTeamMemberItem(props: {
  as?: React.ElementType;
  imageFile?: Types.Asset.Image;
  imageAltText?: Types.Basic.AltText;
  title?: React.ReactNode;
  shortDescription?: Types.Basic.RichTextChildren;
  nameTitle?: Types.Basic.RichTextChildren;
  modalVisibility?: Types.Visibility.VisibilityConditions;
  linkedInUrl?: Types.Basic.Link;
  linkedInVisibility?: Types.Visibility.VisibilityConditions;
  slot?: Types.Slots.SlotContent;
  name?: React.ReactNode;
  globalTeamMemberPage?: Types.Basic.Link;
}): React.JSX.Element;
