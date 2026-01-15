import * as React from "react";
import * as Types from "./types";

declare function GlobalBackgroundGraphic(props: {
  as?: React.ElementType;
  leftGraphicVisibility?: Types.Visibility.VisibilityConditions;
  rightGraphicVisibility?: Types.Visibility.VisibilityConditions;
  topBackgroundGraphicVisibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
