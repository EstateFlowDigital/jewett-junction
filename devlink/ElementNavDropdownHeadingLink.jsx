"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { IconSvgWrap } from "./IconSvgWrap";
import * as _utils from "./utils";
import _styles from "./ElementNavDropdownHeadingLink.module.css";

export function ElementNavDropdownHeadingLink({
  as: _Component = _Builtin.Link,
  text = "Page One",

  link = {
    href: "#",
  },
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "nav_dropdown_link_heading",
        "u-text-large",
        "u-hflex-between-center",
        "u-gap-xsmall",
        "u-weight-bold"
      )}
      button={false}
      block="inline"
      options={link}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "nav_dropdown_heading_text")}
        tag="div"
      >
        {text}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "see_more_wrap",
          "u-hflex-right-center",
          "u-gap-xsmall",
          "u-text-main",
          "u-weight-bold"
        )}
        tag="div"
      >
        <_Builtin.Block tag="div">{"See All"}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "tab_icon_wrap", "is-smaller")}
          tag="div"
        >
          <IconSvgWrap
            path1="M17.86 11.65 6.86.15A.5.5 0 0 0 6 .5v2a.5.5 0 0 0 .14.34L14.81 12l-8.67 9.16a.5.5 0 0 0-.14.34v2a.5.5 0 0 0 .86.35l11-11.5a.5.5 0 0 0 0-.7Z"
            viewbox="0 0 24 24"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
