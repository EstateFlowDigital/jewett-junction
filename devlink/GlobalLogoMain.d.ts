import * as React from "react";
import * as Types from "./types";

declare function GlobalLogoMain(props: {
  as?: React.ElementType;
  isLoader?: Types.Builtin.Text;
  footerLogoVisibility?: Types.Visibility.VisibilityConditions;
  navbarLogoVisibility?: Types.Visibility.VisibilityConditions;
  variant?: "Base" | "Footer";
}): React.JSX.Element;
