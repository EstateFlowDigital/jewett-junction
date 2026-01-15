"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { GlobalVisual } from "./GlobalVisual";
import * as _utils from "./utils";
import _styles from "./SectionCapabilities2Capabilities.module.css";

export function SectionCapabilities2Capabilities({
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
              {"Advanced PCB Assembly Capabilities"}
            </_Builtin.Heading>
          }
          eyebrowEyebrowText={
            <_Builtin.Paragraph>
              {"Surface Mount & Through-Hole Technology"}
            </_Builtin.Paragraph>
          }
          paragraphParagraphText={
            <>
              <_Builtin.List tag="ul" unstyled={false}>
                <_Builtin.ListItem>
                  <_Builtin.Strong>{"SMT Capabilities"}</_Builtin.Strong>
                  {":"}
                </_Builtin.ListItem>
                <_Builtin.ListItem>
                  {" Placement accuracy down to 01005 components"}
                </_Builtin.ListItem>
                <_Builtin.ListItem>
                  {"Fine-pitch BGA (FBGA) for complex designs"}
                </_Builtin.ListItem>
                <_Builtin.ListItem>{"QFN and leadless ICs"}</_Builtin.ListItem>
                <_Builtin.ListItem>
                  {"Precise reflow thermal profiling for optimized performance"}
                </_Builtin.ListItem>
                <_Builtin.ListItem>{"‍"}</_Builtin.ListItem>
                <_Builtin.ListItem>
                  <_Builtin.Strong>{"THT Capabilities"}</_Builtin.Strong>
                  {": "}
                </_Builtin.ListItem>
                <_Builtin.ListItem>
                  {
                    "Nordson Select Selective Soldering for mixed technology assemblies"
                  }
                </_Builtin.ListItem>
              </_Builtin.List>
              <_Builtin.Paragraph>{"‍"}</_Builtin.Paragraph>
              <_Builtin.Paragraph>
                {
                  'We can handle board sizes up to 18"x15" and offer expert advice on panelization with recommended dimensions of 12"x8" and a 0.25" border.'
                }
              </_Builtin.Paragraph>
            </>
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
