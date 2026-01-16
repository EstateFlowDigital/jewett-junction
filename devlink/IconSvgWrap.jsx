"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./IconSvgWrap.module.css";

export function IconSvgWrap({
  as: _Component = _Builtin.Block,
  viewbox = "0 0 8 13",
  path1 = "M0.506958 0.552979L6.50696 6.05298L0.506958 11.553",
  path2,
  path3,
  path4,
  iconStrokeWidth = "var(--svg-stroke-width--main)",
  iconNoStrokeNeededDelete = "stroke-width",
  iconPath2Visibility = false,
  iconPath3Visibility = false,
  iconPath4Visibility = false,
  strokeOrFill = "fill",
  strokeOrFillColor = "currentColor",
}) {
  return (
    <_Component className={_utils.cx(_styles, "svg_wrap")} tag="div">
      <_Builtin.DOM
        tag="svg"
        slot=""
        viewBox={viewbox}
        width="100%"
        height="100%"
        vectorpath="non-scaling-stroke"
        aria-hidden="true"
        fillRule="evenodd"
      >
        <_Builtin.DOM tag="path" slot="" d={path1} />
        {iconPath2Visibility ? (
          <_Builtin.DOM tag="path" slot="" d={path2} />
        ) : null}
        {iconPath3Visibility ? (
          <_Builtin.DOM tag="path" slot="" d={path3} />
        ) : null}
        {iconPath4Visibility ? (
          <_Builtin.DOM tag="path" slot="" d={path4} />
        ) : null}
      </_Builtin.DOM>
    </_Component>
  );
}
