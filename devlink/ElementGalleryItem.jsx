"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalVisual } from "./GlobalVisual";
import * as _utils from "./utils";
import _styles from "./ElementGalleryItem.module.css";

export function ElementGalleryItem({
  as: _Component = _Builtin.Block,
  sizeIs1Is2Is3Is4 = "is-1",
  globalImageFIle = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "our_work_gallery_item", "u-visual-wrap")}
      tag="div"
    >
      <GlobalVisual imageImageFile={globalImageFIle} />
    </_Component>
  );
}
