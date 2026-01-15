import * as React from "react";
import * as Types from "./types";

declare function SectionBlogFeed(props: {
  as?: React.ElementType;
  styleTheme?: Types.Builtin.Text;
  stylePaddingTop?: Types.Builtin.Text;
  stylePaddingBottom?: Types.Builtin.Text;
  blogHeaderContentVisibility?: Types.Visibility.VisibilityConditions;
  styleCardTheme?: Types.Builtin.Text;
  variant?: "Base" | "left";
  itemsToShow?: number;
}): React.JSX.Element;
