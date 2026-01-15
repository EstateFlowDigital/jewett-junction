"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { ElementMarketTabContentMarkets } from "./ElementMarketTabContentMarkets";
import * as _utils from "./utils";
import _styles from "./SectionMarketsMarketsPage.module.css";

export function SectionMarketsMarketsPage({
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
      id="explore-all-markets"
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
