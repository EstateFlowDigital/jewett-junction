"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalClickable } from "./GlobalClickable";
import * as _utils from "./utils";
import _styles from "./BtnPlay.module.css";

export function BtnPlay({
  as: _Component = _Builtin.Block,
  visibility = true,
  buttonStyle = "primary",
  text = "Play",
  linkTagVisibility = false,

  link = {
    href: "#",
  },

  buttonTagVisibility = true,
  dataTrigger = "intro-video",
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(
        _styles,
        "btn_play_wrap",
        "u-button-style",
        "u-hflex-center-center",
        "u-radius-round",
        "u-position-relative"
      )}
      tag="div"
      data-button-style={buttonStyle}
      data-lightbox={dataTrigger}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "btn_play_icon", "u-position-relative")}
        tag="div"
        aria-hidden="true"
      >
        <_Builtin.DOM
          className={_utils.cx(_styles, "btn_play_play", "u-cover-absolute")}
          tag="svg"
          slot=""
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 1393 1394"
          fill="none"
        >
          <_Builtin.DOM
            tag="path"
            slot=""
            d="M1271 696.5L280 1393L280 -4.3318e-05L1271 696.5Z"
            fill="currentColor"
          />
        </_Builtin.DOM>
        <_Builtin.DOM
          className={_utils.cx(_styles, "btn_play_pause", "u-cover-absolute")}
          tag="svg"
          slot=""
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 898 1277"
          fill="none"
        >
          <_Builtin.DOM
            tag="rect"
            slot=""
            x="577"
            width="321"
            height="1277"
            fill="currentColor"
          />
          <_Builtin.DOM
            tag="rect"
            slot=""
            width="321"
            height="1277"
            fill="currentColor"
          />
        </_Builtin.DOM>
      </_Builtin.Block>
      <GlobalClickable text={text} link={link} />
    </_Component>
  ) : null;
}
