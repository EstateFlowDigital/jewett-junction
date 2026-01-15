"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalVisual } from "./GlobalVisual";
import * as _utils from "./utils";
import _styles from "./OurCustomersLogosItem.module.css";

export function OurCustomersLogosItem({
  as: _Component = _Builtin.Block,
  imageFile = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg",
  imageAltText = "__wf_reserved_inherit",
  isDarkMode = "is-dark-mode",
}) {
  return (
    <_Component className={_utils.cx(_styles, "logos_cms_item")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "logos_item", "u-visual-wrap")}
        tag="div"
      >
        <GlobalVisual
          imageImageFile={imageFile}
          imageImageAltText={imageAltText}
        />
      </_Builtin.Block>
    </_Component>
  );
}
