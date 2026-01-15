import * as React from "react";
import * as Types from "./types";

declare function BtnPlay(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  buttonStyle?: Types.Builtin.Text;
  text?: React.ReactNode;
  linkTagVisibility?: Types.Visibility.VisibilityConditions;
  link?: Types.Basic.Link;
  buttonTagVisibility?: Types.Visibility.VisibilityConditions;
  dataTrigger?: Types.Builtin.Text;
}): React.JSX.Element;
