"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GlobalClickable.module.css";

export function GlobalClickable({
  as: _Component = _Builtin.Block,
  visibility = true,
  text = "",

  link = {
    href: "#",
  },

  typeButtonSubmitReset = "button",
  targetBlankOpensInNewTab,
  _class,
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(
        _styles,
        "g_clickable_wrap",
        "u-cover-absolute",
        "u-radius-inherit",
        "u-zindex-3"
      )}
      tag="div"
    >
      <_Builtin.Link
        className={_utils.cx(
          _styles,
          "g_clickable_link",
          "u-cover-absolute",
          "u-radius-inherit",
          "u-display-block"
        )}
        button={false}
        target={targetBlankOpensInNewTab}
        aria-expanded="false"
        block="inline"
        options={link}
      >
        <_Builtin.DOM
          className={_utils.cx(_styles, "g_clickable_text", "u-sr-only")}
          tag="span"
          slot=""
        >
          {text}
        </_Builtin.DOM>
      </_Builtin.Link>
      <_Builtin.DOM
        className={_utils.cx(
          _styles,
          "g_clickable_btn",
          "u-cover-absolute",
          "u-radius-inherit",
          "u-display-none"
        )}
        tag="button"
        slot=""
        type={typeButtonSubmitReset}
      >
        <_Builtin.DOM
          className={_utils.cx(_styles, "g_clickable_text", "u-sr-only")}
          tag="span"
          slot=""
        >
          {text}
        </_Builtin.DOM>
      </_Builtin.DOM>
    </_Component>
  ) : null;
}
