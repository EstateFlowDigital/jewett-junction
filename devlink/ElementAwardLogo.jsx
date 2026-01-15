"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalVisual } from "./GlobalVisual";
import * as _utils from "./utils";
import _styles from "./ElementAwardLogo.module.css";

export function ElementAwardLogo({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "awards_visuals_cms_item")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "awards_visuals_cms_img")}
        tag="div"
      >
        <GlobalVisual />
      </_Builtin.Block>
    </_Component>
  );
}
