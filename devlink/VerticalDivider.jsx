"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./VerticalDivider.module.css";

export function VerticalDivider({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "vertical_divider_hide_mobile")}
      tag="div"
    />
  );
}
