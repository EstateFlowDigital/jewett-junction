"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FormTurnaroundTimePrice.module.css";

export function FormTurnaroundTimePrice({
  as: _Component = _Builtin.RichText,
  priceId = "finalPrice2Day",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g_paragraph_rich")}
      tag="div"
      slot=""
      id={priceId}
    >
      <_Builtin.Paragraph>{"$0.00"}</_Builtin.Paragraph>
    </_Component>
  );
}
