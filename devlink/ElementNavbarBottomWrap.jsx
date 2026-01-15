"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalParagraph } from "./GlobalParagraph";
import { BtnMain } from "./BtnMain";
import * as _utils from "./utils";
import _styles from "./ElementNavbarBottomWrap.module.css";

export function ElementNavbarBottomWrap({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "nav_dropdown_bottom_wrap",
        "show-tablet",
        "u-weight-bold"
      )}
      tag="div"
      data-theme="dark"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "nav_dropdown_bottom_contain",
          "u-container",
          "u-hflex-between-center",
          "u-gap-small"
        )}
        tag="div"
      >
        <GlobalParagraph
          text={
            <_Builtin.Paragraph>
              {"Want a quick cost breakdown? Use our instant estimate tool!"}
            </_Builtin.Paragraph>
          }
        />
        <BtnMain buttonStyle="secondary" />
      </_Builtin.Block>
    </_Component>
  );
}
