"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./RichTextCapabilities.module.css";

export function RichTextCapabilities({
  as: _Component = _Builtin.Block,
  seeMoreDetailsText = "",
}) {
  return (
    <_Component tag="div">
      <_Builtin.RichText
        className={_utils.cx(_styles, "u-rich-text")}
        tag="div"
        slot=""
      >
        {seeMoreDetailsText}
      </_Builtin.RichText>
    </_Component>
  );
}
