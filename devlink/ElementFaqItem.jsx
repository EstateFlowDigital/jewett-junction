"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalHeading } from "./GlobalHeading";
import { IconSvgWrap } from "./IconSvgWrap";
import { GlobalParagraph } from "./GlobalParagraph";
import * as _utils from "./utils";
import _styles from "./ElementFaqItem.module.css";

export function ElementFaqItem({
  as: _Component = _Builtin.Block,
  faqLongAnswer = "",
  faqQuestion = "",
  faqShortAnswer = "",
  faqLongAnswerVisibility = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "faq_cms_item")}
      tag="div"
      role="listitem"
    >
      <_Builtin.Block className={_utils.cx(_styles, "faq_component")} tag="div">
        <_Builtin.DOM
          className={_utils.cx(_styles, "faq_toggle_heading")}
          tag="h3"
          slot=""
        >
          <_Builtin.DOM
            className={_utils.cx(_styles, "faq_toggle_button")}
            tag="button"
            slot=""
            aria-expanded="false"
          >
            <_Builtin.DOM
              className={_utils.cx(_styles, "faq_toggle_text", "u-text-h5")}
              tag="div"
              slot=""
            >
              <GlobalHeading text={faqQuestion} />
            </_Builtin.DOM>
            <_Builtin.DOM
              className={_utils.cx(_styles, "faq_toggle_icon")}
              tag="span"
              slot=""
            >
              <IconSvgWrap
                viewbox="0 0 1200 1200"
                path1="m206.25 431.25c-44.738 0.050781-87.633 17.844-119.27 49.48s-49.43 74.531-49.48 119.27c-0.035156 3.1328 0.125 6.2617 0.48828 9.375 2.332 41.359 19.816 80.41 49.109 109.7 29.289 29.293 68.344 46.773 109.7 49.109 3.1328 0.39062 6.2891 0.57812 9.4492 0.5625 44.754 0 87.676-17.777 119.32-49.426 31.648-31.648 49.426-74.57 49.426-119.32s-17.777-87.676-49.426-119.32c-31.648-31.648-74.57-49.426-119.32-49.426zm51.113 246.96c0-1.0703 0.26172-2.1172 0.26172-3.207-0.035156-33.508-13.359-65.629-37.055-89.32-23.691-23.695-55.812-37.02-89.32-37.055-1.1445 0-2.2695 0.26172-3.4141 0.28125 15.363-23.691 40.602-39.176 68.68-42.145s55.996 6.8984 75.973 26.852c19.977 19.953 29.875 47.859 26.941 75.941-2.9375 28.082-18.395 53.336-42.066 68.727zm342.64-246.96c-44.738 0.050781-87.633 17.844-119.27 49.48s-49.43 74.531-49.48 119.27c-0.035156 3.1328 0.125 6.2617 0.48828 9.375 2.332 41.359 19.816 80.41 49.109 109.7 29.289 29.293 68.344 46.773 109.7 49.109 3.1328 0.39062 6.2891 0.57812 9.4492 0.5625 44.754 0 87.676-17.777 119.32-49.426 31.648-31.648 49.426-74.57 49.426-119.32s-17.777-87.676-49.426-119.32c-31.648-31.648-74.57-49.426-119.32-49.426zm51.113 246.96c0-1.0703 0.26172-2.1172 0.26172-3.207-0.035156-33.508-13.359-65.629-37.055-89.32-23.691-23.695-55.812-37.02-89.32-37.055-1.1445 0-2.2695 0.26172-3.4141 0.28125 15.363-23.691 40.602-39.176 68.68-42.145s55.996 6.8984 75.973 26.852c19.977 19.953 29.875 47.859 26.941 75.941-2.9375 28.082-18.395 53.336-42.066 68.727zm342.64-246.96c-44.738 0.050781-87.633 17.844-119.27 49.48s-49.43 74.531-49.48 119.27c-0.035156 3.1328 0.125 6.2617 0.48828 9.375 2.332 41.359 19.816 80.41 49.109 109.7 29.289 29.293 68.344 46.773 109.7 49.109 3.1328 0.39062 6.2891 0.57812 9.4492 0.5625 44.754 0 87.676-17.777 119.32-49.426 31.648-31.648 49.426-74.57 49.426-119.32s-17.777-87.676-49.426-119.32c-31.648-31.648-74.57-49.426-119.32-49.426zm51.113 246.96c0-1.0703 0.26172-2.1172 0.26172-3.207-0.035156-33.508-13.359-65.629-37.055-89.32-23.691-23.695-55.812-37.02-89.32-37.055-1.1445 0-2.2695 0.26172-3.4141 0.28125 15.363-23.691 40.602-39.176 68.68-42.145s55.996 6.8984 75.973 26.852c19.977 19.953 29.875 47.859 26.941 75.941-2.9375 28.082-18.395 53.336-42.066 68.727z"
              />
            </_Builtin.DOM>
          </_Builtin.DOM>
        </_Builtin.DOM>
        <_Builtin.Block
          className={_utils.cx(_styles, "faq_content_wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "faq_content_padding")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "faq_content_text")}
              tag="div"
            >
              <GlobalParagraph text={faqShortAnswer} />
            </_Builtin.Block>
            {faqLongAnswerVisibility ? (
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "faq_content_text",
                  "is-long-answer",
                  "u-rich-text"
                )}
                tag="div"
              >
                <GlobalParagraph text={faqLongAnswer} />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
