"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ElementKittingContent } from "./ElementKittingContent";
import { GlobalContent } from "./GlobalContent";
import { GlobalBackgroundGraphic } from "./GlobalBackgroundGraphic";
import * as _utils from "./utils";
import _styles from "./SectionKittingRequirements.module.css";

export function SectionKittingRequirements({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "kitting_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "kitting_contain",
          "u-container",
          "u-grid-column-2",
          "u-gap-large"
        )}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "kitting_details_wrap",
            "u-vflex-stretch-top",
            "u-gap-small"
          )}
          tag="div"
          data-theme="light"
        >
          <ElementKittingContent />
          <ElementKittingContent />
          <ElementKittingContent />
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "u-embed-css")}
            value="%3Cstyle%3E%0Asummary%3A%3A-webkit-details-marker%20%7B%0A%20%20display%3A%20none%3B%20%2F*%20Hides%20the%20default%20arrow%20*%2F%0A%7D%0A%3C%2Fstyle%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "kitting_content", "u-position-sticky")}
          tag="div"
        >
          <GlobalContent
            headingStyle="u-text-h2"
            eyebrowEyebrowIsLeftAligned="is-left-aligned"
            paragraphParagraphMaxWidth="max-width: 70ch;"
            headingHeadingMaxWidth="max-width: 22ch;"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <GlobalBackgroundGraphic
        rightGraphicVisibility={true}
        leftGraphicVisibility={false}
      />
    </_Component>
  );
}
