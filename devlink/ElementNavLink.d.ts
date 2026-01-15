import * as React from "react";
import * as Types from "./types";

declare function ElementNavLink(props: {
  as?: React.ElementType;
  navLinkUrl?: Types.Basic.Link;
  navLinkText?: React.ReactNode;
}): React.JSX.Element;
