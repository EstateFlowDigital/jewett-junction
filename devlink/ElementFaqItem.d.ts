import * as React from "react";
import * as Types from "./types";

declare function ElementFaqItem(props: {
  as?: React.ElementType;
  faqLongAnswer?: Types.Basic.RichTextChildren;
  faqQuestion?: Types.Basic.RichTextChildren;
  faqShortAnswer?: Types.Basic.RichTextChildren;
  faqLongAnswerVisibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
