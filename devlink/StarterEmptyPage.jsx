"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { CustomCode } from "./CustomCode";
import { GridGuide } from "./GridGuide";
import * as _utils from "./utils";
import _styles from "./StarterEmptyPage.module.css";

export function StarterEmptyPage({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <CustomCode />
      <GridGuide />
      <_Builtin.Block
        className={_utils.cx(_styles, "page_main")}
        tag="main"
        id="main"
      />
    </_Component>
  );
}
