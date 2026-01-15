"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { GlobalVisual } from "./GlobalVisual";
import * as _utils from "./utils";
import _styles from "./SectionCapabilities1Capabilities.module.css";

export function SectionCapabilities1Capabilities({
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
              {"Procurement & Assembly Lead Times"}
            </_Builtin.Heading>
          }
          eyebrowEyebrowText={
            <_Builtin.Paragraph>
              {"Flexible Lead Times for Every Project"}
            </_Builtin.Paragraph>
          }
          paragraphParagraphText={
            <_Builtin.List tag="ul" unstyled={false}>
              <_Builtin.ListItem>
                {
                  "Whether you need a quick turnaround or full support through the entire process, SMS provides reliable and timely solutions."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>{"‍"}</_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Strong>{"Quick-Turn Assembly: "}</_Builtin.Strong>
                {"2-4 days, based on your specific requirementsStandard "}
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Strong>{"Assembly"}</_Builtin.Strong>
                {": 5 days for assembly only"}
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Strong>{"Full Turnkey Assembly:"}</_Builtin.Strong>
                {" 10-15 days, depending on the availability of parts"}
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
