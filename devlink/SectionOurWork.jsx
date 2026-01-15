"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ElementGalleryItem } from "./ElementGalleryItem";
import * as _utils from "./utils";
import _styles from "./SectionOurWork.module.css";

export function SectionOurWork({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  styleSizeIs1Is2Is3Is4 = "is-1",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "our_work_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "our_work_contain", "u-container")}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "our_work_gallery_list")}
          tag="div"
        >
          <_Builtin.NotSupported _atom="DynamoWrapper" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
