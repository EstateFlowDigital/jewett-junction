"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalHeading } from "./GlobalHeading";
import * as _utils from "./utils";
import _styles from "./ElementSectionNameOveraly.module.css";

export function ElementSectionNameOveraly({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "wireframe_heading", "u-text-display")}
      tag="div"
    >
      <GlobalHeading
        text={<_Builtin.Heading tag="h2">{"Section Name"}</_Builtin.Heading>}
      />
    </_Component>
  );
}
