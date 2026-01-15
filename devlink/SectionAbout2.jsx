"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalVisual } from "./GlobalVisual";
import { GlobalContent } from "./GlobalContent";
import * as _utils from "./utils";
import _styles from "./SectionAbout2.module.css";

export function SectionAbout2({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "work_with_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "work_with_contain",
          "u-container",
          "u-grid-column-2",
          "u-gap-large",
          "is-revered"
        )}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "work_with_logos_wrap",
            "u-visual-wrap"
          )}
          tag="div"
        >
          <GlobalVisual />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "work_with_content")}
          id={_utils.cx(
            _styles,
            "w-node-_55472ca0-929c-b215-5836-a49b373823f7-3d3c0555"
          )}
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
    </_Component>
  );
}
