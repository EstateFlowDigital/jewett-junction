"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import * as _utils from "./utils";
import _styles from "./SectionServicesTabs.module.css";

export function SectionServicesTabs({
  as: _Component = _Builtin.Section,
  styleTheme = "dark",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "services_tabs_main_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "services_tabs_main_contain",
          "u-container"
        )}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "services_tabs_layout",
            "u-vflex-stretch-top",
            "u-gap-large"
          )}
          tag="div"
        >
          <GlobalContent paragraphStyless="u-text-large" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
