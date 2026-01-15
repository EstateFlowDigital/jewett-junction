"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalHeading } from "./GlobalHeading";
import { GlobalParagraph } from "./GlobalParagraph";
import { GlobalVisual } from "./GlobalVisual";
import { BtnPlay } from "./BtnPlay";
import { ElementStatItem } from "./ElementStatItem";
import * as _utils from "./utils";
import _styles from "./SectionIntroSection.module.css";

export function SectionIntroSection({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  contentVisibility = true,
  videoVisibiltiy = true,
  centerPhotoVisibility = false,
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
            "u-gap-medium",
            "anchor-offset"
          )}
          tag="div"
          id="intro"
        >
          {contentVisibility ? (
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
                id={_utils.cx(
                  _styles,
                  "w-node-_42c126de-0f73-3c8f-f7e3-8356c425483e-07a8ba59"
                )}
                tag="div"
              >
                <GlobalHeading
                  text={
                    <_Builtin.Paragraph>
                      {"A Smarter Approach to "}
                      <_Builtin.Strong>
                        {"Commercial Construction"}
                      </_Builtin.Strong>
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
                id={_utils.cx(
                  _styles,
                  "w-node-a261517f-1166-6a07-06bc-7f212a88a9dd-07a8ba59"
                )}
                tag="div"
              >
                <GlobalParagraph
                  text={
                    <>
                      <_Builtin.Paragraph>
                        {
                          "At Jewett Construction, we don’t just build structures—we create spaces that fuel growth, efficiency, and long-term success. With decades of expertise in commercial, industrial, and specialized projects, our client-first approach ensures every build is delivered "
                        }
                        <_Builtin.Strong>
                          {"on time, on budget, and without disruption"}
                        </_Builtin.Strong>
                        {" to daily operations."}
                        <br />
                        {"‍"}
                      </_Builtin.Paragraph>
                      <_Builtin.Paragraph>
                        {
                          "Our process is built for certainty: from early feasibility studies to post-completion support, we streamline every phase with full-service design-build solutions, clear communication, and proactive problem-solving. Whether you're expanding, renovating, or breaking ground on a new facility, Jewett provides the expertise, precision, and commitment needed to bring your vision to life."
                        }
                      </_Builtin.Paragraph>
                    </>
                  }
                />
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
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
                "w-node-e85f16f2-06fa-2107-1b64-680f93ff8bc6-07a8ba59"
              )}
              tag="div"
            >
              <GlobalVisual imageImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c25a84c5be693c5595b961_Featured%20Image%204.webp" />
            </_Builtin.Block>
            {videoVisibiltiy ? (
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "intro_section_visual",
                  "u-visual-wrap",
                  "u-vflex-center-center"
                )}
                id={_utils.cx(
                  _styles,
                  "w-node-_724940e0-8b17-895b-26bf-65d7958f8ced-07a8ba59"
                )}
                tag="div"
              >
                <_Builtin.DOM
                  className={_utils.cx(
                    _styles,
                    "intro_video_lightbox",
                    "u-cover-absolute"
                  )}
                  tag="div"
                  slot=""
                  style="padding:56.25% 0 0 0;position:relative;"
                >
                  <_Builtin.DOM
                    tag="iframe"
                    slot=""
                    src="https://player.vimeo.com/progressive_redirect/playback/1116881356/rendition/1080p/file.mp4?loc=external&log_user=0&signature=2dd969f8d40b6350c0404cabf210613cc508daaa03cdd68f3e5e71f6c7edab42"
                    style="position:absolute;top:0;left:0;width:100%;height:100%; max-height:80dvh;"
                    frameborder="0"
                    allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    title="Jewett Construction: Seamless integration of Planning, Architecture, and Construction Management under one contract"
                  />
                </_Builtin.DOM>
              </_Builtin.Block>
            ) : null}
            {centerPhotoVisibility ? (
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "intro_section_visual",
                  "u-visual-wrap",
                  "u-vflex-center-center"
                )}
                id={_utils.cx(
                  _styles,
                  "w-node-a2fb2737-6375-1ede-36fe-7fd3646386e9-07a8ba59"
                )}
                tag="div"
              >
                <GlobalVisual imageImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c25a84939a2c6ad5eea230_Featured%20Image%203.webp" />
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "intro_section_visual",
                "u-visual-wrap"
              )}
              id={_utils.cx(
                _styles,
                "w-node-_2d68c175-9e23-4a82-b221-f1d2c5cb8df6-07a8ba59"
              )}
              tag="div"
            >
              <GlobalVisual imageImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c259611cdf51a9958eb694_Featured%20Image%202.webp" />
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
                <ElementStatItem
                  statContentHeadingText={
                    <_Builtin.Paragraph>{"2016"}</_Builtin.Paragraph>
                  }
                  statContentSubheadingText={
                    <_Builtin.Paragraph>
                      {"Founded by The Jewetts"}
                    </_Builtin.Paragraph>
                  }
                  statText="1972"
                  animationId="founding-year"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "stat_item")}
                id={_utils.cx(
                  _styles,
                  "w-node-_5c39f8e0-77b8-08fa-d85f-cea3f3b10f0c-07a8ba59"
                )}
                tag="div"
              >
                <ElementStatItem
                  statContentHeadingText={
                    <_Builtin.Heading tag="h2">{"100+"}</_Builtin.Heading>
                  }
                  statContentSubheadingText={
                    <_Builtin.Paragraph>
                      {"Successful Projects "}
                    </_Builtin.Paragraph>
                  }
                  statText="1000+"
                  animationId="projects-count"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "stat_item")}
                id={_utils.cx(
                  _styles,
                  "w-node-a5971cd2-10a0-3f77-0a26-1b0dae2e79b3-07a8ba59"
                )}
                tag="div"
              >
                <ElementStatItem
                  statContentHeadingText={
                    <_Builtin.Heading tag="h2">{"95%"}</_Builtin.Heading>
                  }
                  statContentSubheadingText={
                    <_Builtin.Paragraph>
                      {"Client Satisfaction"}
                    </_Builtin.Paragraph>
                  }
                  statText="95%"
                  animationId="satisfaction-count"
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "vimeo-script")}
        value="%3Cscript%20src%3D%22https%3A%2F%2Fplayer.vimeo.com%2Fapi%2Fplayer.js%22%3E%3C%2Fscript%3E"
      />
    </_Component>
  );
}
