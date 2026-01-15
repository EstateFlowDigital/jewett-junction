"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { IconSvgWrap } from "./IconSvgWrap";
import * as _utils from "./utils";
import _styles from "./ElementNavDropdownSublink.module.css";

export function ElementNavDropdownSublink({
  as: _Component = _Builtin.Link,

  link = {
    href: "#",
  },

  text = "Nav Link",
  iconViewbox = "0 0 24 24",
  iconPath1 = "M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm3.85 12.35-5.5 5.5a.5.5 0 0 1-.85-.35V16a.5.5 0 0 1 .15-.35L13.29 12 9.65 8.35A.5.5 0 0 1 9.5 8V6.5a.5.5 0 0 1 .85-.35l5.5 5.5a.5.5 0 0 1 0 .7Z",
  iconPath2,
  iconPath3,
  iconPath4,
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "nav_dropdown_sublink",
        "u-hflex-between-center",
        "u-gap-small"
      )}
      button={false}
      block="inline"
      options={link}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "nav_dropdown_sublink_text")}
        tag="div"
      >
        {text}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "nav_dropdown_icon_wrap")}
        tag="div"
      >
        <IconSvgWrap
          viewbox={iconViewbox}
          path1={iconPath1}
          path2={iconPath2}
          path3={iconPath3}
          path4={iconPath4}
          iconStrokeWidth=""
          iconNoStrokeNeededDelete=""
        />
      </_Builtin.Block>
    </_Component>
  );
}
