"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalVisual } from "./GlobalVisual";
import { GlobalContent } from "./GlobalContent";
import { IconSvgWrap } from "./IconSvgWrap";
import { VerticalDivider } from "./VerticalDivider";
import { GlobalHeading } from "./GlobalHeading";
import { GlobalParagraph } from "./GlobalParagraph";
import { GlobalBackgroundGraphic } from "./GlobalBackgroundGraphic";
import * as _utils from "./utils";
import _styles from "./SectionAbout1.module.css";

export function SectionAbout1({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "work_with_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "work_with_contain",
          "u-container",
          "u-grid-column-2",
          "u-gap-large"
        )}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "work_with_logos_wrap",
            "u-visual-wrap"
          )}
          tag="div"
        >
          <GlobalVisual />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "about_content_wrap",
            "u-vflex-left-top",
            "u-gap-medium"
          )}
          tag="div"
        >
          <GlobalContent
            headingStyle="u-text-h2"
            eyebrowEyebrowIsLeftAligned="is-left-aligned"
            paragraphParagraphMaxWidth="max-width: 70ch;"
          />
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "about_icons_wrap",
              "u-vflex-left-top",
              "u-gap-small"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "about_icon_content",
                "u-hflex-left-center",
                "u-gap-small"
              )}
              tag="div"
              data-theme="light"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "about_icon", "u-visual-wrap")}
                tag="div"
              >
                <IconSvgWrap viewbox="0 0 300 300" />
              </_Builtin.Block>
              <VerticalDivider />
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "icon_text_content",
                  "u-vflex-left-between",
                  "u-gap-small"
                )}
                tag="div"
              >
                <_Builtin.DOM
                  className={_utils.cx(
                    _styles,
                    "about_icon_heading_wrap",
                    "u-text-h5"
                  )}
                  tag="div"
                  slot=""
                >
                  <GlobalHeading />
                </_Builtin.DOM>
                <_Builtin.DOM
                  className={_utils.cx(_styles, "about_icon_paragraph_wrap")}
                  tag="div"
                  slot=""
                >
                  <GlobalParagraph />
                </_Builtin.DOM>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <GlobalBackgroundGraphic
        rightGraphicVisibility={false}
        leftGraphicVisibility={false}
        topBackgroundGraphicVisibility={true}
      />
    </_Component>
  );
}
