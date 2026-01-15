"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalVisual } from "./GlobalVisual";
import * as _utils from "./utils";
import _styles from "./ElementWorkWithLogoItem.module.css";

export function ElementWorkWithLogoItem({
  as: _Component = _Builtin.Block,
  imageFile = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ee8_logo-webflow.svg",
  imageAltText = "__wf_reserved_inherit",
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "logos_item",
        "u-visual-wrap",
        "u-vflex-center-center"
      )}
      tag="div"
    >
      <GlobalVisual
        imageImageFile={imageFile}
        imageImageAltText={imageAltText}
      />
    </_Component>
  );
}
