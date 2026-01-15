"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { IconSvgWrap } from "./IconSvgWrap";
import * as _utils from "./utils";
import _styles from "./GlobalEyebrow.module.css";

export function GlobalEyebrow({
  as: _Component = _Builtin.DOM,
  visibility = true,
  text = "",
  maxWidth = "max-width: none;",
  eyebrowEyebrowIsLeftAligned,
  eyebrowPlainText = "Eyebrow Plain Text",
  eyebrowPlainTextVisibiliity = false,
  eyebrowRichTextVisibility = true,
  eyebrowFeaturedText = "New",
  eyebrowIconViewbox = "0 0 8 13",
  eyebrowIconPath1 = "M0.506958 0.552979L6.50696 6.05298L0.506958 11.553",
  eyebrowFeaturedTextVisibility = true,
  eyebrowEyebrowFeaturedIconVisibility = true,
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "g_eyebrow_wrap", "u-hflex-left-center")}
      tag="div"
      slot=""
      _class={eyebrowEyebrowIsLeftAligned}
    >
      {eyebrowFeaturedTextVisibility ? (
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "eyebrow_featured_text",
            "u-button-style",
            "u-text-small",
            "u-hflex-center-center",
            "u-gap-xsmall",
            "u-weight-bold"
          )}
          tag="div"
        >
          {eyebrowEyebrowFeaturedIconVisibility ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "eyebrow_icon_wrap")}
              tag="div"
            >
              <IconSvgWrap
                viewbox={eyebrowIconViewbox}
                path1={eyebrowIconPath1}
              />
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block tag="div">{eyebrowFeaturedText}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.DOM
        className={_utils.cx(_styles, "g_eyebrow_text")}
        tag="div"
        slot=""
        style={maxWidth}
      >
        {eyebrowRichTextVisibility ? (
          <_Builtin.RichText
            className={_utils.cx(
              _styles,
              "g_eyebrow_rich",
              "u-hide-rich-text-media"
            )}
            tag="div"
            slot=""
          >
            {text}
          </_Builtin.RichText>
        ) : null}
        {eyebrowPlainTextVisibiliity ? (
          <_Builtin.Block tag="div">{eyebrowPlainText}</_Builtin.Block>
        ) : null}
      </_Builtin.DOM>
    </_Component>
  ) : null;
}
