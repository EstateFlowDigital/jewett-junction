"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalVisual } from "./GlobalVisual";
import { GlobalEyebrow } from "./GlobalEyebrow";
import { GlobalHeading } from "./GlobalHeading";
import { GlobalParagraph } from "./GlobalParagraph";
import { IconArrowFull } from "./IconArrowFull";
import { BtnPlay } from "./BtnPlay";
import { GlobalContent } from "./GlobalContent";
import { GlobalClickable } from "./GlobalClickable";
import * as _utils from "./utils";
import _styles from "./ElementPortfolioSlide.module.css";

export function ElementPortfolioSlide({
  as: _Component = _Builtin.Block,
  isActive,
  videoVideoLightboxId = "portfolio_video",
  visualVisualImageAltText = "__wf_reserved_inherit",
  visualImageFile = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg",
  headingHeadingRichText = "",
  paragraphParagraphRichText = "",
  overlayVideoHeadingRichText = "",
  overlayOverlayHeadingRichText = "",
  overlayOverlayParagraphRichText = "",

  buttonButtonButton1Link = {
    href: "#",
  },

  eyebrowEyebrowRichText = "",
  eyebrowEyebrowFeaturedText = "New",
  eyebrowEyebrowPlainText = "Eyebrow Plain Text",
  dataIndustrySlug,
  dataStateSlug,
  industrySlug = "",
  stateSlug = "",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "portfilio_slider_items")}
      tag="div"
      data-theme="dark"
    >
      <_Builtin.DOM
        className={_utils.cx(_styles, "hidden-industry")}
        tag="div"
        slot=""
        data-industry={dataIndustrySlug}
      >
        {industrySlug}
      </_Builtin.DOM>
      <_Builtin.DOM
        className={_utils.cx(_styles, "hidden-state")}
        tag="div"
        slot=""
        data-state={dataStateSlug}
      >
        {stateSlug}
      </_Builtin.DOM>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "portfolio-slider_cms_contain",
          "u-container",
          "u-vflex-stretch-bottom"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "portfolio-slider_cms_img",
            "u-visual-wrap"
          )}
          tag="div"
        >
          <GlobalVisual
            imageImageFile={visualImageFile}
            imageImageAltText={visualVisualImageAltText}
            overlayOverlayVisibility={true}
            overlayOverlayOpacity="opacity: 50%;"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "portfolio-slider_cms_content")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "g_content_wrap",
              "u-vflex-left-top",
              "u-gap-small"
            )}
            tag="div"
          >
            <_Builtin.DOM
              className={_utils.cx(_styles, "eyebrow_wrap", "u-weight-bold")}
              tag="div"
              slot=""
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "eyebrow_content")}
                tag="div"
              >
                <GlobalEyebrow
                  eyebrowFeaturedText={eyebrowEyebrowFeaturedText}
                  eyebrowPlainText={eyebrowEyebrowPlainText}
                  visibility={true}
                  maxWidth="max-width: none;"
                  eyebrowEyebrowIsLeftAligned=""
                  eyebrowIconViewbox="0 0 1200 1200"
                  eyebrowIconPath1="m900 112.5h-600c-49.734 0-97.406 19.734-132.56 54.938-35.203 35.156-54.938 82.828-54.938 132.56v600c0 49.734 19.734 97.406 54.938 132.56 35.156 35.203 82.828 54.938 132.56 54.938h600c49.734 0 97.406-19.734 132.56-54.938 35.203-35.156 54.938-82.828 54.938-132.56v-600c0-49.734-19.734-97.406-54.938-132.56-35.156-35.203-82.828-54.938-132.56-54.938zm-600 75h600c62.109 0 112.5 50.391 112.5 112.5v465l-159.52-122.02c-31.5-23.156-74.438-23.156-105.98 0l-143.48 107.02-141.52-141c-16.359-16.594-38.672-25.969-62.016-25.969-23.297 0-45.609 9.375-61.969 25.969l-150 150v-459c0-61.922 50.062-112.22 111.98-112.5zm600 825h-600c-62.109 0-112.5-50.391-112.5-112.5v-34.5l203.48-203.48c2.3906-2.4375 5.625-3.8438 9-3.8438 3.4219 0 6.6562 1.4062 9 3.8438l264.52 264.52v-0.046875c14.625 14.625 38.344 14.625 53.016 0 14.625-14.625 14.625-38.344 0-52.969l-69.516-69.516 135-99.984c4.6406-3.2812 10.828-3.2812 15.516 0l204.98 156.52v39.469c0 62.109-50.391 112.5-112.5 112.5zm-150-474.98c55.594 0 105.75-33.516 127.03-84.891s9.5156-110.53-29.812-149.86c-39.328-39.328-98.438-51.094-149.86-29.812-51.375 21.281-84.844 71.438-84.844 127.03 0 75.938 61.547 137.53 137.48 137.53zm0-200.02c25.266 0 48.047 15.234 57.75 38.578 9.6562 23.344 4.3125 50.25-13.547 68.109-17.906 17.859-44.766 23.25-68.109 13.547-23.344-9.6562-38.578-32.438-38.578-57.75 0-34.5 27.984-62.484 62.484-62.484z"
                  eyebrowRichTextVisibility={false}
                  eyebrowPlainTextVisibiliity={true}
                />
              </_Builtin.Block>
            </_Builtin.DOM>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text_content_wrap",
                "u-vflex-left-top",
                "u-gap-small"
              )}
              tag="div"
            >
              <_Builtin.DOM
                className={_utils.cx(_styles, "heading_wrap")}
                tag="div"
                slot=""
                _class="u-text-h3"
              >
                <GlobalHeading
                  text={headingHeadingRichText}
                  visibility={true}
                  maxWidth="max-width: 20ch;"
                />
              </_Builtin.DOM>
              <_Builtin.DOM
                className={_utils.cx(_styles, "paragraph_wrap")}
                tag="div"
                slot=""
                _class="u-text-large"
              >
                <GlobalParagraph
                  text={paragraphParagraphRichText}
                  visibility={true}
                  maxWidth="max-width: 55ch;"
                />
              </_Builtin.DOM>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "portfolio_card_arrow")}
              tag="div"
            >
              <IconArrowFull />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <GlobalClickable
          link={buttonButtonButton1Link}
          text="Explore Our Work"
        />
      </_Builtin.Block>
    </_Component>
  );
}
