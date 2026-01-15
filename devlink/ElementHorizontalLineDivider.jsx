"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ElementHorizontalLineDivider.module.css";

export function ElementHorizontalLineDivider({
  as: _Component = _Builtin.Block,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "horizontal_line_divider")}
      tag="div"
    />
  );
}
