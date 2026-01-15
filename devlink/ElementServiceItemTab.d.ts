import * as React from "react";
import * as Types from "./types";

declare function ElementServiceItemTab(props: {
  as?: React.ElementType;
  isActive?: Types.Builtin.Text;
  tabsServiceTabText?: Types.Basic.RichTextChildren;
  iconSvgPath1?: Types.Builtin.Text;
  serviceName?: React.ReactNode;
  lineVisibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
