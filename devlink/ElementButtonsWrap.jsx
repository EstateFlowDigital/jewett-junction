"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ElementButtonsWrap.module.css";

export function ElementButtonsWrap({
  as: _Component = _Builtin.Block,
  slot,
  variant = "Left",
}) {
  const _styleVariantMap = {
    Left: "",
    Center: "w-variant-b7227d48-bf9f-5d3b-6227-f0d4383dbf2b",
    "Center Hero": "w-variant-ee212f6e-56f6-c0a9-abfe-0a4fb8d9387a",
  };

  const _activeStyleVariant = _styleVariantMap[variant];
  return (
    <_Component tag="div">
      <_Builtin.NotSupported _atom="Slot" />
    </_Component>
  );
}
