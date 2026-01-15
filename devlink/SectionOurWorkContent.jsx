"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalHeading } from "./GlobalHeading";
import { GlobalParagraph } from "./GlobalParagraph";
import { GlobalVisual } from "./GlobalVisual";
import { BtnPlay } from "./BtnPlay";
import { ElementStatItem } from "./ElementStatItem";
import * as _utils from "./utils";
import _styles from "./SectionOurWorkContent.module.css";

export function SectionOurWorkContent({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "intro_section_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "intro_section_contain", "u-container")}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "intro_section_layout",
            "u-vflex-stretch-top",
            "u-gap-medium"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "intro_section_top",
              "u-grid-autofit",
              "u-gap-medium"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "intro_section_heading",
                "u-text-h1"
              )}
              tag="div"
            >
              <GlobalHeading
                text={
                  <_Builtin.Paragraph>
                    {"Lorem ipsum dolor sit amet, "}
                    <_Builtin.Strong>
                      {"consectetur adipiscing elit, sed "}
                    </_Builtin.Strong>
                    {"do eiusmod tempor incididunt ut labore "}
                  </_Builtin.Paragraph>
                }
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "intro_section_paragraph",
                "u-text-large"
              )}
              tag="div"
            >
              <GlobalParagraph
                text={
                  <>
                    <_Builtin.Paragraph>
                      {
                        "Lorem ipsum odor amet, consectetuer adipiscing elit. Elementum libero gravida primis ut quisque. Sed tortor pellentesque torquent vel vehicula donec justo. Parturient taciti tempus diam nunc ad sagittis diam. Tellus torquent auctor a nullam lobortis maecenas et. Nisl dignissim a blandit aliquet tempor malesuada himenaeos. Vivamus ligula tincidunt luctus; maecenas ullamcorper pretium euismod."
                      }
                    </_Builtin.Paragraph>
                    <_Builtin.Paragraph>{"‍"}</_Builtin.Paragraph>
                    <_Builtin.Paragraph>
                      {
                        "Quam montes efficitur molestie phasellus eu varius. Nec porta taciti nam felis risus. Libero proin penatibus."
                      }
                    </_Builtin.Paragraph>
                  </>
                }
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "intro_section_bottom",
              "u-grid-column-4"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "intro_section_visual",
                "u-visual-wrap"
              )}
              id={_utils.cx(
                _styles,
                "w-node-_46e44190-93e0-71a6-52de-2359e1abd35e-e1abd34a"
              )}
              tag="div"
            >
              <GlobalVisual />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "intro_section_visual",
                "u-visual-wrap",
                "u-vflex-center-center"
              )}
              id={_utils.cx(
                _styles,
                "w-node-_46e44190-93e0-71a6-52de-2359e1abd360-e1abd34a"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "open_portfolio_button")}
                tag="div"
                data-lightbox-trigger="intro-video"
              >
                <BtnPlay text="Play Intro Video" />
              </_Builtin.Block>
              <_Builtin.NotSupported _atom="LightboxWrapper" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "intro_section_visual",
                "u-visual-wrap"
              )}
              id={_utils.cx(
                _styles,
                "w-node-_46e44190-93e0-71a6-52de-2359e1abd366-e1abd34a"
              )}
              tag="div"
            >
              <GlobalVisual />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "intro_section_stats",
              "gradient-background",
              "u_shadow_main"
            )}
            tag="div"
            data-theme="dark"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "intro_section_stat_layout",
                "u-hflex-between-center",
                "u-gap-small"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "stat_item")}
                tag="div"
              >
                <ElementStatItem />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "stat_item")}
                id={_utils.cx(
                  _styles,
                  "w-node-_46e44190-93e0-71a6-52de-2359e1abd36c-e1abd34a"
                )}
                tag="div"
              >
                <ElementStatItem
                  statContentHeadingText={
                    <_Builtin.Heading tag="h2">{"Stat 2"}</_Builtin.Heading>
                  }
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "stat_item")}
                id={_utils.cx(
                  _styles,
                  "w-node-_46e44190-93e0-71a6-52de-2359e1abd370-e1abd34a"
                )}
                tag="div"
              >
                <ElementStatItem
                  statContentHeadingText={
                    <_Builtin.Heading tag="h2">{"Stat 3"}</_Builtin.Heading>
                  }
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
