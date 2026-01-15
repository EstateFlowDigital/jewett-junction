"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GlobalSpacer.module.css";

export function GlobalSpacer({
  as: _Component = _Builtin.Block,
  variant = "none",
  visibility = true,
}) {
  const _styleVariantMap = {
    none: "",
    xsmall: "w-variant-9865540a-87de-6ad9-b3e8-2f2a5ae6f289",
    small: "w-variant-be2be4d9-ae41-afb8-8193-b4a4e562b4f7",
    medium: "w-variant-822e469b-6f9f-073f-fa1a-d835cfd22a0f",
    large: "w-variant-58d52555-9491-0425-0177-4947f6f76f98",
    "vertical-padding-small": "w-variant-bc325f5e-b969-0b1d-1463-3cd2796efe07",
    "vertical-padding-medium": "w-variant-a2fa4982-1c61-0161-ba13-2bff61e7159c",
    "vertical-padding-large": "w-variant-70bcf11c-2784-259e-663a-00c9a9295cc0",
  };

  const _activeStyleVariant = _styleVariantMap[variant];
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "g_spacer", _activeStyleVariant)}
      tag="div"
    />
  ) : null;
}
