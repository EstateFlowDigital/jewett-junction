import * as React from "react";
import * as Types from "./types";

declare function GlobalSpacer(props: {
  as?: React.ElementType;
  variant?:
    | "none"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "vertical-padding-small"
    | "vertical-padding-medium"
    | "vertical-padding-large";
  visibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
