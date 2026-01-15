import * as React from "react";
import * as Types from "./types";

declare function ElementFaqSummaryDetailsItem(props: {
  as?: React.ElementType;
  faqLongAnswer?: Types.Basic.RichTextChildren;
  globalFaqQuestion?: Types.Basic.RichTextChildren;
  btnFullAnswerLink?: Types.Basic.Link;
  questionText?: React.ReactNode;
  globalFaqShortAnswer?: Types.Basic.RichTextChildren;
}): React.JSX.Element;
