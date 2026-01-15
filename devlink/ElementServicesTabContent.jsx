"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { IconSvgWrap } from "./IconSvgWrap";
import { GlobalParagraph } from "./GlobalParagraph";
import { GlobalVisual } from "./GlobalVisual";
import * as _utils from "./utils";
import _styles from "./ElementServicesTabContent.module.css";

export function ElementServicesTabContent({
  as: _Component = _Builtin.Block,
  rightParagraphRichText = "",
  leftParagraphRichText = "",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "services_tab_content_wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "services_tab_content_top",
          "u-container",
          "u-vflex-left-between",
          "u-gap-medium",
          "u-hflex-wrap",
          "tabs-color-blue"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "tab_content_layout",
            "u-hflex-left-center",
            "u-gap-xsmall"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "tab_icon_wrap")}
            tag="div"
          >
            <IconSvgWrap />
          </_Builtin.Block>
          <GlobalParagraph text={leftParagraphRichText} />
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <GlobalParagraph text={rightParagraphRichText} />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "services_tab_image_wrap",
          "u-visual-wrap"
        )}
        tag="div"
      >
        <GlobalVisual />
      </_Builtin.Block>
    </_Component>
  );
}
