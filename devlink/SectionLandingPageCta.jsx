"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SectionLandingPageCta.module.css";

export function SectionLandingPageCta({
  as: _Component = _Builtin.Section,
  styleTheme = "dark",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  headingContentRichText = "",
  paragraphContentRichText = "",
  eyebrowContentRichText = "",
  slot,
  slot,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cta_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.NotSupported _atom="Slot" />
      <_Builtin.Block
        className={_utils.cx(_styles, "cta_contain", "u-container")}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.NotSupported _atom="Slot" />
      </_Builtin.Block>
    </_Component>
  );
}
