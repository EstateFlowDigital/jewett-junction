"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalParagraph } from "./GlobalParagraph";
import * as _utils from "./utils";
import _styles from "./FormTurnaroundItem.module.css";

export function FormTurnaroundItem({
  as: _Component = _Builtin.DOM,
  turnaroundText = "",
  turnaroundPriceId = "finalPrice2Day",
  turnaroundTag = "div",
  priceVisibility = true,
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "turnaround_time_item",
        "u-hflex-between-top",
        "u-gap-small"
      )}
      slot=""
      tag={turnaroundTag}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "tunaround_time")}
        tag="div"
      >
        <GlobalParagraph text={turnaroundText} />
      </_Builtin.Block>
      {priceVisibility ? (
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "tunaround_time",
            "price",
            "u-weight-bold",
            "u-text-h6"
          )}
          tag="div"
        >
          <_Builtin.Block tag="div" id={turnaroundPriceId}>
            {"$0.00"}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
