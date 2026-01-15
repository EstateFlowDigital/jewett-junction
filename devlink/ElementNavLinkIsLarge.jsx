"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ElementNavLinkIsLarge.module.css";

export function ElementNavLinkIsLarge({
  as: _Component = _Builtin.Link,
  navLinkText = "Nav Link",

  navLinkUrl = {
    href: "#",
  },
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "nav_link_wrap",
        "u-hflex-right-center",
        "u-text-h3"
      )}
      button={false}
      block="inline"
      options={navLinkUrl}
    >
      <_Builtin.Block className={_utils.cx(_styles, "nav_link_text")} tag="div">
        {navLinkText}
      </_Builtin.Block>
    </_Component>
  );
}
