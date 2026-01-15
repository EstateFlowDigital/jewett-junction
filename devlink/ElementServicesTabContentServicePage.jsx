"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalHeading } from "./GlobalHeading";
import { GlobalParagraph } from "./GlobalParagraph";
import { BtnMain } from "./BtnMain";
import { GlobalVisual } from "./GlobalVisual";
import { GlobalClickable } from "./GlobalClickable";
import * as _utils from "./utils";
import _styles from "./ElementServicesTabContentServicePage.module.css";

export function ElementServicesTabContentServicePage({
  as: _Component = _Builtin.Block,
  rightParagraphRichText = "",
  leftParagraphRichText = "",
  headingTab1ContentRichText = "",
  paragraphRichTex = "",
  tabHeadingText = "",
  tabParagraphText = "",
  tabImageFile = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg",
  tabImageAltText = "__wf_reserved_inherit",

  servicesPageLink = {
    href: "#",
  },

  isReversed,
  contentLayoutClasses = "u-grid-column-2",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "services_tab_content_wrap")}
      tag="div"
      data-theme="dark"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "services_tab_content_top",
          "u-container",
          "u-vflex-left-between",
          "u-gap-medium"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "services_tab_content",
            "u-vflex-left-top",
            "u-gap-xsmall"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "tab_content_layout",
              "u-hflex-left-center",
              "u-gap-xsmall",
              "u-text-h4"
            )}
            tag="div"
          >
            <GlobalHeading text={tabHeadingText} />
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <GlobalParagraph
              text={tabParagraphText}
              maxWidth="max-width: 65ch;"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "buttons_wrap",
            "u-hflex-left-center",
            "u-gap-small",
            "u-weight-semibold"
          )}
          tag="div"
        >
          <BtnMain
            link={servicesPageLink}
            visibility={true}
            text="Explore Service"
            buttonStyle="primary"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "services_tab_image_wrap",
          "u-visual-wrap",
          "is-image-border"
        )}
        tag="div"
      >
        <GlobalVisual
          imageImageFile={tabImageFile}
          imageImageAltText={tabImageAltText}
          overlayOverlayOpacity="opacity: 70%;"
          overlayOverlayVisibility={false}
        />
      </_Builtin.Block>
      <GlobalClickable link={servicesPageLink} text="Explore Service" />
    </_Component>
  );
}
