import * as React from "react";
import * as Types from "./types";

declare function SectionTeam(props: {
  as?: React.ElementType;
  contentHeading?: Types.Basic.RichTextChildren;
  styleTheme?: Types.Builtin.Text;
  stylePaddingTop?: Types.Builtin.Text;
  stylePaddingBottom?: Types.Builtin.Text;
  sectionVisibility?: Types.Visibility.VisibilityConditions;
  modalVisibility?: Types.Visibility.VisibilityConditions;
  globalContentParagraph?: Types.Basic.RichTextChildren;
}): React.JSX.Element;
