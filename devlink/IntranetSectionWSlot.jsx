"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./IntranetSectionWSlot.module.css";

export function IntranetSectionWSlot({
  as: _Component = _Builtin.Section,
  slot,
  layoutClasses = "u-grid-autofit",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "internet_content_wrap")}
      tag="section"
      grid={{
        type: "section",
      }}
      data-theme="inherit"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "internet_content_contain",
          "u-container"
        )}
        tag="div"
        data-padding-top="main"
        data-padding-bottom="main"
      >
        <_Builtin.NotSupported _atom="Slot" />
      </_Builtin.Block>
    </_Component>
  );
}
