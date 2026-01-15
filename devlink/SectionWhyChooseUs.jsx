"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { StarterWhyUsSubItemBackgroundHomepage } from "./StarterWhyUsSubItemBackgroundHomepage";
import { GlobalBackgroundGraphic } from "./GlobalBackgroundGraphic";
import * as _utils from "./utils";
import _styles from "./SectionWhyChooseUs.module.css";

export function SectionWhyChooseUs({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  eyebrowContentRichText = "",
  headingContentRichText = "",
  paragraphContentRichText = "",
  button2Visibility = true,
  button1Text = "Learn About Us",

  button1Link = {
    href: "#",
  },
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "why_us_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "why_us_contain",
          "u-container",
          "u-vflex-center-center",
          "u-gap-medium"
        )}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "why_us_grid",
            "u-grid-autofit",
            "u-gap-large"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "why_us_content_wrap",
              "u-vflex-left-center"
            )}
            id={_utils.cx(
              _styles,
              "w-node-_0012f56c-c04d-a14e-138d-25142de131f5-ec4786b4"
            )}
            tag="div"
          >
            <GlobalContent
              headingStyle="u-text-h2"
              eyebrowEyebrowIsLeftAligned="is-left-aligned"
              button2Button2Link={{
                href: "#",
              }}
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "why_us_items_wrap",
              "u-vflex-left-center"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "why_us_item_layout",
                "u-grid-autofit"
              )}
              id={_utils.cx(
                _styles,
                "w-node-_6d8a6295-0366-22ca-2564-900ba9050d65-ec4786b4"
              )}
              tag="div"
            >
              <StarterWhyUsSubItemBackgroundHomepage />
              <StarterWhyUsSubItemBackgroundHomepage />
              <StarterWhyUsSubItemBackgroundHomepage />
              <StarterWhyUsSubItemBackgroundHomepage />
              <StarterWhyUsSubItemBackgroundHomepage />
              <StarterWhyUsSubItemBackgroundHomepage />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <GlobalBackgroundGraphic
        leftGraphicVisibility={false}
        rightGraphicVisibility={true}
      />
    </_Component>
  );
}
