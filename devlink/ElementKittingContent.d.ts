import * as React from "react";
import * as Types from "./types";

declare function ElementKittingContent(props: {
  as?: React.ElementType;
  heading?: Types.Basic.RichTextChildren;
  paragraph?: Types.Basic.RichTextChildren;
  iconViewbox?: Types.Builtin.Text;
  iconPath1?: Types.Builtin.Text;
  imageFile?: Types.Asset.Image;
  imageAltText?: Types.Basic.AltText;
  seeMoreDetailsText?: Types.Basic.RichTextChildren;
}): React.JSX.Element;
