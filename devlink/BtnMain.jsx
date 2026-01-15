"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalClickable } from "./GlobalClickable";
import { IconSvgWrap } from "./IconSvgWrap";
import * as _utils from "./utils";
import _styles from "./BtnMain.module.css";

export function BtnMain({
  as: _Component = _Builtin.Block,
  visibility = true,
  text = "Start the Conversation",

  link = {
    href: "#",
  },

  buttonStyle = "primary",
  typeButtonSubmitReset = "button",
  iconIconVisibility = true,
  subtext = "Subtext",
  subtextVisibility = false,
  buttonSizeIsSmall,
  iconIconViewbox = "0 0 1200 1200",
  iconSvgPath1 = "m1145.2 597.71c0 102.84-88.453 192-216 231-5.6719 2.0625-8.9531 7.9219-7.6875 13.828l27.938 104.3 0.046875-0.046875c0.84375 2.6719-0.14062 5.5781-2.3906 7.2188-2.2969 1.5469-5.2969 1.5469-7.5938 0l-180-104.06c-97.453-3.6094-184.69-33.844-247.08-80.156 67.781-10.5 132.24-36.422 188.39-75.703 63.938-46.688 111.61-114.84 111.61-196.31-0.89062-56.812-23.203-111.19-62.391-152.29 9.9375-0.60938 19.922-0.84375 30-0.84375 201.71 0 365.16 113.3 365.16 253.08zm-725.16-353.16c-201.71 0-365.16 113.39-365.16 253.22 0 102.84 88.453 191.29 216 230.86 5.6719 2.0625 8.9531 7.9219 7.6875 13.828l-27.938 104.39h-0.046875c-0.79688 2.625 0.1875 5.4844 2.3906 7.0781 2.2969 1.6406 5.3438 1.6406 7.5938 0l180-103.92c192-7.3125 345-117.7 345-252.71 0-139.78-163.45-253.22-365.16-253.22zm185.86 183.74c-17.906 0-34.031 10.781-40.875 27.328-6.8906 16.547-3.0938 35.578 9.5625 48.234 12.703 12.656 31.734 16.453 48.281 9.6094s27.328-23.016 27.328-40.922c0-24.422-19.828-44.25-44.297-44.25zm-185.86 0c17.906 0 34.078 10.781 40.922 27.328 6.8438 16.547 3.0469 35.578-9.6094 48.234s-31.734 16.453-48.234 9.6094c-16.547-6.8438-27.375-23.016-27.375-40.922 0-24.422 19.828-44.25 44.297-44.25zm-185.86 0c17.906 0 34.031 10.781 40.875 27.328 6.8906 16.547 3.0938 35.578-9.5625 48.234-12.703 12.656-31.734 16.453-48.281 9.6094s-27.328-23.016-27.328-40.922c0-11.719 4.6406-23.016 12.984-31.312 8.2969-8.2969 19.547-12.938 31.312-12.938z",
  btnTextClasses,
  btnLinkClass,
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(
        _styles,
        "btn_main_wrap",
        "u-button-style",
        "u-position-relative",
        "u-display-inline-block"
      )}
      tag="div"
      data-button-style={buttonStyle}
    >
      <GlobalClickable
        text={text}
        link={link}
        typeButtonSubmitReset={typeButtonSubmitReset}
        _class={btnLinkClass}
      />
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "btn_main_layout",
          "u-gap-small",
          "u-hflex-between-center",
          "u-position-relative"
        )}
        tag="div"
        aria-hidden="true"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "btn_text_wrap",
            "u-vflex-left-center",
            "u-gap-xsmall"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "btn_main_text", "u-weight-bold")}
            tag="div"
          >
            {text}
          </_Builtin.Block>
          {subtextVisibility ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "btn_subtext", "u-text-small")}
              tag="div"
            >
              {subtext}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        {iconIconVisibility ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "btn_icon_wrap")}
            tag="div"
          >
            <IconSvgWrap viewbox={iconIconViewbox} path1={iconSvgPath1} />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
