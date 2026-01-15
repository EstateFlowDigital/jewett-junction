"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { GlobalVisual } from "./GlobalVisual";
import * as _utils from "./utils";
import _styles from "./SectionCapabilities3Capabilities.module.css";

export function SectionCapabilities3Capabilities({
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
          eyebrowEyebrowIsLeftAligned="is-left-aligned"
          headingHeadingText={
            <_Builtin.Heading tag="h2">
              {"Thorough Inspection & Quality Control"}
            </_Builtin.Heading>
          }
          eyebrowEyebrowText={
            <_Builtin.Paragraph>
              {"Inspection & Cleaning Services"}
            </_Builtin.Paragraph>
          }
          paragraphParagraphText={
            <_Builtin.List tag="ul" unstyled={false}>
              <_Builtin.ListItem>
                {
                  "All assemblies undergo comprehensive inspection and cleaning processes:"
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>{"‍"}</_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Strong>{"AOI Inspection:"}</_Builtin.Strong>
                {
                  " Automated Optical Inspection to ensure accurate component placement and soldering"
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Strong>{"100% Visual Inspection:"}</_Builtin.Strong>
                {" Detailed visual checks under a microscope for precision"}
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Strong>
                  {"Inline Aqueous Cleaning System:"}
                </_Builtin.Strong>
                {
                  " A thorough wash and dry cycle for moisture and impurity removal"
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Strong>{"Batch Oven:"}</_Builtin.Strong>
                {" Complete moisture removal to enhance assembly durability"}
              </_Builtin.ListItem>
            </_Builtin.List>
          }
          paragraphParagraphMaxWidth="max-width: 70ch;"
          button1Button1Text="Learn More About SMS"
          headingHeadingMaxWidth="max-width: 22ch;"
        />
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "work_with_logos_wrap",
            "u-visual-wrap",
            "is-image-border"
          )}
          tag="div"
        >
          <GlobalVisual imageImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0f1e_close-up-electric-green-embedded-microcircuits-in-2023-11-27-05-21-32-utc%20(1).webp" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
