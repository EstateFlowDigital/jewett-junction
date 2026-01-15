import * as React from "react";
import * as Types from "./types";

declare function GlobalNavbar(props: {
  as?: React.ElementType;
  styleTheme?: Types.Builtin.Text;
  turnOffForLandingPage?: Types.Visibility.VisibilityConditions;
  turnOnForLandingPage?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
