"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ElementNavLink.module.css";

export function ElementNavLink({
  as: _Component = _Builtin.NavbarLink,

  navLinkUrl = {
    href: "#",
  },

  navLinkText = "Nav Link",
}) {
  return (
    <_Component className={_utils.cx(_styles, "nav_link")} options={navLinkUrl}>
      {navLinkText}
    </_Component>
  );
}
