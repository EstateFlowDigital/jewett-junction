"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ElementOurProcessItem } from "./ElementOurProcessItem";
import * as _utils from "./utils";
import _styles from "./SectionAboutAboutPage.module.css";

export function SectionAboutAboutPage({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  item1HeadingRichText = "",
  item1ParagraphRichText = "",
  item2HeadingRichText = "",
  item2ParagraphRichText = "",
  item3HeadingRichText = "",
  item3ParagraphRichText = "",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "about_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "about_contain", "u-container")}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "about_layout",
            "u-vflex-left-top",
            "u-gap-large"
          )}
          tag="div"
        >
          <ElementOurProcessItem
            contentHeadingText={item1HeadingRichText}
            contentParagraphText={item1ParagraphRichText}
            visualPositionIsFirst=""
          />
          <ElementOurProcessItem
            contentHeadingText={item2HeadingRichText}
            contentParagraphText={item2ParagraphRichText}
          />
          <ElementOurProcessItem
            contentHeadingText={item3HeadingRichText}
            contentParagraphText={item3ParagraphRichText}
            visualPositionIsFirst=""
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
