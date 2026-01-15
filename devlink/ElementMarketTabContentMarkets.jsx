"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalHeading } from "./GlobalHeading";
import { GlobalParagraph } from "./GlobalParagraph";
import { BtnMain } from "./BtnMain";
import { GlobalVisual } from "./GlobalVisual";
import { GlobalClickable } from "./GlobalClickable";
import * as _utils from "./utils";
import _styles from "./ElementMarketTabContentMarkets.module.css";

export function ElementMarketTabContentMarkets({
  as: _Component = _Builtin.Block,
  rightParagraphRichText = "",
  leftParagraphRichText = "",
  headingTab1ContentRichText = "",
  paragraphRichTex = "",
  tabHeadingText = "",
  tabParagraphText = "",
  tabImageFile = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg",
  tabImageAltText = "__wf_reserved_inherit",

  marketsPageLink = {
    href: "#",
  },

  isReversed,
  cityName = "Name",
  cardHeadingH3 = "",
  cardParagraph = "",
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "services_tab_content_wrap",
        "u-grid-column-2"
      )}
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
            "g_content_wrap",
            "u-vflex-left-center",
            "u-gap-medium"
          )}
          tag="div"
        >
          <_Builtin.DOM
            className={_utils.cx(
              _styles,
              "category_name_wrap",
              "u-gap-xsmall",
              "u-hflex-left-stretch"
            )}
            tag="div"
            slot=""
            _class="is-left-aligned"
          >
            <_Builtin.DOM
              className={_utils.cx(_styles, "g_eyebrow_text")}
              tag="div"
              slot=""
              style="max-width: none;"
            >
              <_Builtin.Block tag="div">{cityName}</_Builtin.Block>
            </_Builtin.DOM>
          </_Builtin.DOM>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text_content_wrap",
              "u-vflex-left-center",
              "u-gap-small"
            )}
            tag="div"
          >
            <_Builtin.DOM
              className={_utils.cx(_styles, "heading_wrap")}
              tag="div"
              slot=""
              _class="u-text-h4"
            >
              <GlobalHeading
                text={cardHeadingH3}
                visibility={true}
                maxWidth="max-width: 20ch;"
              />
            </_Builtin.DOM>
            <_Builtin.DOM
              className={_utils.cx(_styles, "paragraph_wrap")}
              tag="div"
              slot=""
              _class="u-text-main"
            >
              <GlobalParagraph
                text={cardParagraph}
                visibility={true}
                maxWidth="max-width: 55ch;"
              />
            </_Builtin.DOM>
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
            link={marketsPageLink}
            visibility={true}
            text="Explore Markets"
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
      <GlobalClickable link={marketsPageLink} text="Explore Markets" />
    </_Component>
  );
}
