"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalVisual } from "./GlobalVisual";
import * as _utils from "./utils";
import _styles from "./ElementInternalPageVisual.module.css";

export function ElementInternalPageVisual({
  as: _Component = _Builtin.Block,
  visualVisualImageFile = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg",
  visualVisualImageAltText = "__wf_reserved_inherit",
}) {
  return (
    <_Component tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "internal_page_visual_cms_img")}
        tag="div"
      >
        <GlobalVisual
          imageImageFile={visualVisualImageFile}
          imageImageAltText={visualVisualImageAltText}
        />
      </_Builtin.Block>
    </_Component>
  );
}
