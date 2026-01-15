import * as React from "react";
import * as Types from "./types";

declare function BtnMain(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  text?: React.ReactNode;
  link?: Types.Basic.Link;
  buttonStyle?: Types.Builtin.Text;
  typeButtonSubmitReset?: Types.Builtin.Text;
  iconIconVisibility?: Types.Visibility.VisibilityConditions;
  subtext?: React.ReactNode;
  subtextVisibility?: Types.Visibility.VisibilityConditions;
  buttonSizeIsSmall?: Types.Builtin.Text;
  iconIconViewbox?: Types.Builtin.Text;
  iconSvgPath1?: Types.Builtin.Text;
  btnTextClasses?: Types.Builtin.Text;
  btnLinkClass?: Types.Builtin.Text;
}): React.JSX.Element;
