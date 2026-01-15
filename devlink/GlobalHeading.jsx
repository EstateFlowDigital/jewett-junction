"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GlobalHeading.module.css";

export function GlobalHeading({
  as: _Component = _Builtin.DOM,
  visibility = true,
  text = "",
  maxWidth = "max-width: none;",
  classes,
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "g_heading_wrap")}
      tag="div"
      slot=""
      style={maxWidth}
      _class={classes}
    >
      <_Builtin.RichText
        className={_utils.cx(
          _styles,
          "g_heading_rich",
          "u-hide-rich-text-media"
        )}
        tag="div"
        slot=""
      >
        {text}
      </_Builtin.RichText>
    </_Component>
  ) : null;
}
