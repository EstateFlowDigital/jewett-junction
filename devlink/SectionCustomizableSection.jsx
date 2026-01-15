"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SectionCustomizableSection.module.css";

export function SectionCustomizableSection({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  slot,
  styleLayoutClasses = "u-grid-autofit",
  ctaHeroId,
  slot,
  visualVisibility = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "customizable_section_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
      id={ctaHeroId}
    >
      <_Builtin.NotSupported _atom="Slot" />
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "customizable_section_contain",
          "u-container"
        )}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.NotSupported _atom="Slot" />
      </_Builtin.Block>
    </_Component>
  );
}
