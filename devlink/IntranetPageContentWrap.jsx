"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./IntranetPageContentWrap.module.css";

export function IntranetPageContentWrap({
  as: _Component = _Builtin.Block,
  slot,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "intranet_content_full_wrap")}
      tag="div"
    >
      <_Builtin.NotSupported _atom="Slot" />
    </_Component>
  );
}
