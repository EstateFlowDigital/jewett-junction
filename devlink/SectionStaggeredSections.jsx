"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { ElementVerticalCircuitLine } from "./ElementVerticalCircuitLine";
import { ElementFeatureCard } from "./ElementFeatureCard";
import * as _utils from "./utils";
import _styles from "./SectionStaggeredSections.module.css";

export function SectionStaggeredSections({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  sectionId,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "capabilities_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
      id={sectionId}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "capabilities_contain",
          "u-container",
          "u-grid-column-3",
          "u-gap-large"
        )}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "capabilities_content_wrap",
            "u-vflex-left-top",
            "u-gap-medium"
          )}
          id={_utils.cx(
            _styles,
            "w-node-_68941f4d-bc41-3c81-4aac-d2ea9c6ffa28-9c6ffa24"
          )}
          tag="div"
        >
          <GlobalContent
            headingStyle="u-text-h3"
            eyebrowEyebrowIsLeftAligned="is-left-aligned"
            paragraphParagraphMaxWidth="max-width: 70ch;"
            eyebrowFeaturedText="Industries"
            eyebrowEyebrowText={
              <_Builtin.Paragraph>
                {"Expertise Across Sectors"}
              </_Builtin.Paragraph>
            }
            eyebrowEyebrowIconViewbox="0 0 1200 1200"
            eyebrowIconPath1="m1087.5 1020.9c0 15.984-6.375 31.359-17.672 42.656-11.344 11.344-26.672 17.719-42.703 17.719h-853.64c-33.328 0-60.375-27.047-60.375-60.375 0-33.375 27.047-60.375 60.375-60.375h853.03c16.125-0.1875 31.641 6.0938 43.078 17.438s17.906 26.812 17.906 42.938zm-261.24-282.28v87.516h127.22v-87.516zm-660.28-282.84v486.37h207.52v-97.781h-135.98c-5.1562-0.046875-9.3281-4.2188-9.375-9.375v-105.75c0.046875-5.1562 4.2188-9.2812 9.375-9.375h136.22v-87.516l-136.22 0.046875c-5.2031 0-9.375-4.2188-9.375-9.375v-106.03c0-5.1562 4.1719-9.375 9.375-9.375h136.22v-51.234h-198.74c-3-0.046875-6-0.23438-9-0.60938zm858.61 0h-198.32v51.234h136.22c5.2031 0 9.375 4.2188 9.375 9.375v105.61c0 5.2031-4.1719 9.375-9.375 9.375h-136.22v87.516h136.22c5.1562 0.046875 9.3281 4.2188 9.375 9.375v106.73c-0.046875 5.1562-4.2188 9.3281-9.375 9.375h-136.22v97.359h207.52l-0.046874-485.95c-2.9062 0.375-5.8125 0.5625-8.7188 0.60938zm-778.08 157.5h127.22v-87.516h-127.22zm0 212.48h127.22v-87.516h-127.22zm354.52-116.25h-0.046875c-62.109 0-112.5 50.391-112.5 112.5v120h225v-120c0.046875-29.859-11.812-58.5-32.906-79.641-21.094-21.094-49.734-33-79.594-33zm-208.55 232.26v-615.37c0-74.156 39.562-142.64 103.78-179.72 64.172-37.078 143.29-37.078 207.47 0 64.219 37.078 103.78 105.56 103.78 179.72v615.37h-75v-120c0-72.516-58.781-131.26-131.26-131.26-72.516 0-131.26 58.734-131.26 131.26v120zm77.391-513.52c0 5.1562 4.2188 9.375 9.375 9.375h243.37c5.1562 0 9.375-4.2188 9.375-9.375v-105.75c0-5.1562-4.2188-9.375-9.375-9.375h-243.37c-5.1562 0-9.375 4.2188-9.375 9.375zm0 194.39c-0.046875 2.4844 0.9375 4.875 2.7188 6.6562 1.7344 1.7812 4.1719 2.7188 6.6562 2.7188h243.37c2.4844 0 4.9219-0.9375 6.6562-2.7188 1.7812-1.7812 2.7656-4.1719 2.7188-6.6562v-105.66c0.046875-2.4844-0.9375-4.875-2.7188-6.6562-1.7344-1.7812-4.1719-2.7188-6.6562-2.7188h-243.37c-2.4844 0-4.9219 0.9375-6.6562 2.7188-1.7812 1.7812-2.7656 4.1719-2.7188 6.6562zm-294.89-185.16h198.74v-111.23c0-4.5 0-8.8594 0.60938-13.266h-199.36c-34.5 0-62.484 27.984-62.484 62.531 0 34.5 27.984 62.484 62.484 62.484zm537.52 88.734h-225v87.516h225zm112.5 0v87.516h128.48v-87.516zm0-88.734h200.02c34.5 0 62.484-27.984 62.484-62.484s-27.984-62.484-62.484-62.484h-199.4v13.266zm-112.5-105.75h-225v87.516h225z"
            paragraphParagraphText={
              <_Builtin.Paragraph>
                {
                  "We deliver tailored construction solutions that set new benchmarks in quality, sustainability, and performance. Explore our work to see how we bring innovation and excellence to every project in several industries."
                }
              </_Builtin.Paragraph>
            }
            headingHeadingText={
              <_Builtin.Heading tag="h2">
                {"Bringing Our Expert Construction Services To "}
                <_Builtin.Strong>{"Diverse Industries"}</_Builtin.Strong>
              </_Builtin.Heading>
            }
            button1Button1Text="Explore All Industries"
            button1IconSvgPath1="m1087.5 1020.9c0 15.984-6.375 31.359-17.672 42.656-11.344 11.344-26.672 17.719-42.703 17.719h-853.64c-33.328 0-60.375-27.047-60.375-60.375 0-33.375 27.047-60.375 60.375-60.375h853.03c16.125-0.1875 31.641 6.0938 43.078 17.438s17.906 26.812 17.906 42.938zm-261.24-282.28v87.516h127.22v-87.516zm-660.28-282.84v486.37h207.52v-97.781h-135.98c-5.1562-0.046875-9.3281-4.2188-9.375-9.375v-105.75c0.046875-5.1562 4.2188-9.2812 9.375-9.375h136.22v-87.516l-136.22 0.046875c-5.2031 0-9.375-4.2188-9.375-9.375v-106.03c0-5.1562 4.1719-9.375 9.375-9.375h136.22v-51.234h-198.74c-3-0.046875-6-0.23438-9-0.60938zm858.61 0h-198.32v51.234h136.22c5.2031 0 9.375 4.2188 9.375 9.375v105.61c0 5.2031-4.1719 9.375-9.375 9.375h-136.22v87.516h136.22c5.1562 0.046875 9.3281 4.2188 9.375 9.375v106.73c-0.046875 5.1562-4.2188 9.3281-9.375 9.375h-136.22v97.359h207.52l-0.046874-485.95c-2.9062 0.375-5.8125 0.5625-8.7188 0.60938zm-778.08 157.5h127.22v-87.516h-127.22zm0 212.48h127.22v-87.516h-127.22zm354.52-116.25h-0.046875c-62.109 0-112.5 50.391-112.5 112.5v120h225v-120c0.046875-29.859-11.812-58.5-32.906-79.641-21.094-21.094-49.734-33-79.594-33zm-208.55 232.26v-615.37c0-74.156 39.562-142.64 103.78-179.72 64.172-37.078 143.29-37.078 207.47 0 64.219 37.078 103.78 105.56 103.78 179.72v615.37h-75v-120c0-72.516-58.781-131.26-131.26-131.26-72.516 0-131.26 58.734-131.26 131.26v120zm77.391-513.52c0 5.1562 4.2188 9.375 9.375 9.375h243.37c5.1562 0 9.375-4.2188 9.375-9.375v-105.75c0-5.1562-4.2188-9.375-9.375-9.375h-243.37c-5.1562 0-9.375 4.2188-9.375 9.375zm0 194.39c-0.046875 2.4844 0.9375 4.875 2.7188 6.6562 1.7344 1.7812 4.1719 2.7188 6.6562 2.7188h243.37c2.4844 0 4.9219-0.9375 6.6562-2.7188 1.7812-1.7812 2.7656-4.1719 2.7188-6.6562v-105.66c0.046875-2.4844-0.9375-4.875-2.7188-6.6562-1.7344-1.7812-4.1719-2.7188-6.6562-2.7188h-243.37c-2.4844 0-4.9219 0.9375-6.6562 2.7188-1.7812 1.7812-2.7656 4.1719-2.7188 6.6562zm-294.89-185.16h198.74v-111.23c0-4.5 0-8.8594 0.60938-13.266h-199.36c-34.5 0-62.484 27.984-62.484 62.531 0 34.5 27.984 62.484 62.484 62.484zm537.52 88.734h-225v87.516h225zm112.5 0v87.516h128.48v-87.516zm0-88.734h200.02c34.5 0 62.484-27.984 62.484-62.484s-27.984-62.484-62.484-62.484h-199.4v13.266zm-112.5-105.75h-225v87.516h225z"
            button1IconVisibility={true}
            button1IconViewbox="0 0 1200 1200"
            button2Button2Text="View Our Projects"
            button2Button2Link={{
              href: "#",
            }}
            button1Button1Link={{
              href: "#",
            }}
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "capabilities_features_wrap",
            "u-vflex-left-top",
            "u-gap-small"
          )}
          id={_utils.cx(
            _styles,
            "w-node-_68941f4d-bc41-3c81-4aac-d2ea9c6ffa32-9c6ffa24"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "capabilities_features",
              "u-hflex-left-top",
              "u-gap-small"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "circuit_connection_line",
                "is-top"
              )}
              tag="div"
            />
            <ElementVerticalCircuitLine />
            <_Builtin.NotSupported _atom="DynamoWrapper" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
