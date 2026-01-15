"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./StarterWhyUsSubItemHomepage.module.css";

export function StarterWhyUsSubItemHomepage({
  as: _Component = _Builtin.Block,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  item1TextRichText = "",
  iconViewbox = "0 0 8 13",
  iconPath1 = "M0.506958 0.552979L6.50696 6.05298L0.506958 11.553",
  iconFill = "none",
  iconPath2,
  iconPath3,
  iconPath2Visibility = false,
  iconPath3Visibility = false,
  iconPath4Visibility = false,
  iconPath4,
  iconStrokeOrFill = "fill",
  iconStrokeOrFillColor = "currentColor",
  textClass,
  slot,
  slot,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "why_us_sub_item")}
      tag="div"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "why_us_subitem_layout",
          "u-vflex-left-center",
          "u-gap-xsmall",
          "u-width-full"
        )}
        tag="div"
      >
        <_Builtin.NotSupported _atom="Slot" />
        <_Builtin.NotSupported _atom="Slot" />
      </_Builtin.Block>
    </_Component>
  );
}
