"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalHeading } from "./GlobalHeading";
import * as _utils from "./utils";
import _styles from "./IntranetTopHeading.module.css";

export function IntranetTopHeading({
  as: _Component = _Builtin.Section,
  heading = "",
  subheading = "",
  scrollingText = "",
  scrollingTextAnimationVisibility = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "intranet_heading_wrap")}
      tag="section"
      grid={{
        type: "section",
      }}
      data-theme="inherit"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "intranet_heading_contain",
          "u-container"
        )}
        tag="div"
        data-padding-top="main"
        data-padding-bottom="main"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "intranet_heading_layout",
            "u-vflex-stretch-top",
            "u-gap-small"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "intranet_heading_top", "u-text-h1")}
            tag="div"
          >
            <GlobalHeading text={heading} />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "intranet_heading_bottom",
              "u-text-h3"
            )}
            tag="div"
          >
            <GlobalHeading text={subheading} />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "spacer-xsmall")}
          tag="div"
        />
        <_Builtin.Block className={_utils.cx(_styles, "div-block-2")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "logos_track", "_2")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "logos_cms_wrap", "u-text-h4")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "mission_statment_list")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "mission_statment_item")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "mission_statement_item",
                      "u-rich-text"
                    )}
                    tag="div"
                  >
                    <GlobalHeading text={scrollingText} />
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          {scrollingTextAnimationVisibility ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "logos_embed")}
              value="%3Cstyle%3E%0A%40keyframes%20logos_timeline%20%7B%0A%09from%20%7B%20transform%3A%20translateX(-50%25)%3B%20%7D%0A%09to%20%7B%20transform%3A%20translateX(0)%3B%20%7D%0A%7D%0A%3C%2Fstyle%3E"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
