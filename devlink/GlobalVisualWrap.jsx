"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GlobalVisualWrap.module.css";

export function GlobalVisualWrap({
  as: _Component = _Builtin.DOM,
  slot,
  variant = "Auto",
  minHeight = "min-height:20rem",
  imagePosition = "object-position: 50% 50%;",
  visibility = true,
}) {
  const _styleVariantMap = {
    Auto: "",
    "Square (1:1)": "w-variant-aa560c33-2d9e-2205-5a0b-28f79fbe16dd",
    "Landscape (3:2)": "w-variant-8ae56eea-3a0b-6562-4559-93679cd03722",
    "Landscape (16:9)": "w-variant-23b4ddba-80e6-7927-a5d7-8566d9f517c5",
    "Portrait (2:3)": "w-variant-12e825c2-2861-8231-73a4-9141f85d6ade",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return visibility ? (
    <_Component
      className={_utils.cx(
        _styles,
        "g_visual_wrap",
        "u-visual-wrap",
        _activeStyleVariant
      )}
      tag="div"
      slot=""
      style={minHeight}
    >
      <_Builtin.NotSupported _atom="Slot" />
    </_Component>
  ) : null;
}
