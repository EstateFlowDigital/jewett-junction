"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ElementContentCard } from "./ElementContentCard";
import * as _utils from "./utils";
import _styles from "./ElementBlogFeedList.module.css";

export function ElementBlogFeedList({
  as: _Component = _Builtin.Block,
  styleCardTheme = "dark",
  itemsToShow = 6,
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "blog_feed_list",
        "u-vflex-stretch-top",
        "u-gap-row-medium"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "blog_navigation_wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "blog_navigation_layout",
            "u-hflex-left-stretch",
            "u-gap-small"
          )}
          tag="div"
        >
          <_Builtin.NotSupported _atom="DynamoWrapper" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.NotSupported _atom="DynamoWrapper" />
    </_Component>
  );
}
