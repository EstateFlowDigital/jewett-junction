"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalParagraph } from "./GlobalParagraph";
import { BtnMain } from "./BtnMain";
import * as _utils from "./utils";
import _styles from "./ElementNavbarBottomViewDesktop.module.css";

export function ElementNavbarBottomViewDesktop({
  as: _Component = _Builtin.Block,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "nav_dropdown_bottom_wrap")}
      tag="div"
      data-theme="dark"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "nav_dropdown_bottom_contain",
          "u-container",
          "u-hflex-between-center",
          "u-gap-small",
          "u-weight-bold"
        )}
        tag="div"
      >
        <GlobalParagraph
          text={
            <_Builtin.Paragraph>
              {
                "Ready to get started?Contact us today for a complimentary estimate!"
              }
            </_Builtin.Paragraph>
          }
          maxWidth="max-width: 35ch;"
        />
        <BtnMain
          buttonStyle="secondary"
          link={{
            href: "#",
          }}
          subtextVisibility={false}
          text="Get Started"
        />
      </_Builtin.Block>
    </_Component>
  );
}
