"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AccoladesLogo.module.css";

export function AccoladesLogo({
  as: _Component = _Builtin.Block,
  accoladesLogo = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ee6_logo-relume.svg",
  altText = "__wf_reserved_inherit",
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "accolades_wrapper",
        "u-vflex-center-center"
      )}
      id={_utils.cx(
        _styles,
        "w-node-f2886e51-ceac-367e-f79f-1c855ce16e09-5ce16e09"
      )}
      tag="div"
      data-theme="invert"
    >
      <_Builtin.Image
        className={_utils.cx(_styles, "accolades_logo")}
        width="auto"
        height="auto"
        loading="lazy"
        src={accoladesLogo}
      />
    </_Component>
  );
}
