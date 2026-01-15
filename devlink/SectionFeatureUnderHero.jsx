"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ElementWorkWithLogoItem } from "./ElementWorkWithLogoItem";
import * as _utils from "./utils";
import _styles from "./SectionFeatureUnderHero.module.css";

export function SectionFeatureUnderHero({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "feature_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "feature_contain",
          "u-container",
          "u-vflex-center-center",
          "u-gap-medium"
        )}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "feature_layout",
            "u-hflex-center-center",
            "u-hflex-wrap",
            "u-gap-row-none",
            "u-gap-medium"
          )}
          tag="div"
        >
          <ElementWorkWithLogoItem />
          <ElementWorkWithLogoItem />
          <ElementWorkWithLogoItem />
          <ElementWorkWithLogoItem />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
