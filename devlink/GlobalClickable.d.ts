import * as React from "react";
import * as Types from "./types";

declare function GlobalClickable(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  text?: React.ReactNode;
  link?: Types.Basic.Link;
  typeButtonSubmitReset?: Types.Builtin.Text;
  targetBlankOpensInNewTab?: Types.Builtin.Text;
  _class?: Types.Builtin.Text;
}): React.JSX.Element;
