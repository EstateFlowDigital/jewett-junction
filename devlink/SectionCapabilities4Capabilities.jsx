"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { GlobalVisual } from "./GlobalVisual";
import * as _utils from "./utils";
import _styles from "./SectionCapabilities4Capabilities.module.css";

export function SectionCapabilities4Capabilities({
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
          "u-gap-large",
          "is-revered"
        )}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <GlobalContent
          headingStyle="u-text-h2"
          headingHeadingText={
            <_Builtin.Heading tag="h2">
              {"Complete Testing & Rework Solutions"}
            </_Builtin.Heading>
          }
          eyebrowEyebrowText={
            <_Builtin.Paragraph>
              {"PCB Testing and Rework Services"}
            </_Builtin.Paragraph>
          }
          paragraphParagraphText={
            <_Builtin.List tag="ul" unstyled={false}>
              <_Builtin.ListItem>
                {
                  "We offer comprehensive testing and rework services to guarantee optimal performance:"
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Strong>{"BGA X-Ray Inspection:"}</_Builtin.Strong>
                {
                  " Ensures correct alignment and functionality of BGA components"
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Strong>{"Functional Testing"}</_Builtin.Strong>
                {": Validates PCB performance under real-world conditions"}
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Strong>{"BGA Rework & Reballing:"}</_Builtin.Strong>
                {
                  " Expert services to fix assembly errors and restore functionality"
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                {
                  "Our testing and rework solutions ensure that your PCB assemblies are reliable and high-performing, even under the most demanding conditions."
                }
              </_Builtin.ListItem>
            </_Builtin.List>
          }
          paragraphParagraphMaxWidth="max-width: 70ch;"
          button1Button1Text="Learn More About SMS"
          headingHeadingMaxWidth="max-width: 22ch;"
          eyebrowEyebrowIsLeftAligned="is-left-aligned"
        />
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "work_with_logos_wrap",
            "u-visual-wrap",
            "is-image-border",
            "u-order-first"
          )}
          tag="div"
        >
          <GlobalVisual imageImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0f1e_close-up-electric-green-embedded-microcircuits-in-2023-11-27-05-21-32-utc%20(1).webp" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
