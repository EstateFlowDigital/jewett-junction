"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { ElementIndustriesTabContentIndustries } from "./ElementIndustriesTabContentIndustries";
import * as _utils from "./utils";
import _styles from "./SectionIndustriesIndustriesPage.module.css";

export function SectionIndustriesIndustriesPage({
  as: _Component = _Builtin.Section,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "markets_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme="dark"
      id="explore-all-industries"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "markets_contain",
          "u-container",
          "u-vflex-center-top",
          "u-gap-medium"
        )}
        tag="div"
        data-padding-top="main"
        data-padding-bottom="main"
      >
        <GlobalContent />
        <_Builtin.Block
          className={_utils.cx(_styles, "markets_collection_wrap")}
          tag="div"
        >
          <_Builtin.NotSupported _atom="DynamoWrapper" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
