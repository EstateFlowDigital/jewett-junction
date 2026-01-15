"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalParagraph } from "./GlobalParagraph";
import * as _utils from "./utils";
import _styles from "./ElementStatItem.module.css";

export function ElementStatItem({
  as: _Component = _Builtin.Block,
  statContentHeadingText = "",
  statContentSubheadingText = "",
  statText = "Heading",
  animationId,
}) {
  return (
    <_Component className={_utils.cx(_styles, "stat_item_wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "stat_heading_wrap",
          "u-text-display",
          "u-weight-bold"
        )}
        tag="div"
      >
        <_Builtin.DOM
          className={_utils.cx(_styles, "g_heading_wrap")}
          tag="div"
          slot=""
          style="max-width: none;"
        >
          <_Builtin.Heading tag="h3" id={animationId}>
            {statText}
          </_Builtin.Heading>
        </_Builtin.DOM>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "stat_subheading_wrap",
          "u-text-transform-uppercase"
        )}
        tag="div"
      >
        <GlobalParagraph text={statContentSubheadingText} />
      </_Builtin.Block>
    </_Component>
  );
}
