"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ElementFooterLink.module.css";

export function ElementFooterLink({
  as: _Component = _Builtin.Link,

  footerLinkUrl = {
    href: "#",
  },

  footerLinkText = "Text Link",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "footer_link_wrap")}
      button={false}
      block="inline"
      options={footerLinkUrl}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "footer_link_text")}
        tag="div"
      >
        {footerLinkText}
      </_Builtin.Block>
    </_Component>
  );
}
