"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalClickable } from "./GlobalClickable";
import { GlobalVisual } from "./GlobalVisual";
import { GlobalHeading } from "./GlobalHeading";
import { GlobalParagraph } from "./GlobalParagraph";
import { BtnMain } from "./BtnMain";
import * as _utils from "./utils";
import _styles from "./IntranetCard.module.css";

export function IntranetCard({
  as: _Component = _Builtin.Block,
  visualVisualImageFile = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg",
  visualVisualImageAltText = "__wf_reserved_inherit",

  urlClickableLink = {
    href: "#",
  },

  urlDescriptiveText = "Button Text",
  headingHeadingRichText = "",
  paragraphParagraphRichText = "",
  classes = "u-column-1",
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "intranet_card_wrap",
        "u-vflex-left-bottom",
        "u-gap-small"
      )}
      tag="div"
      data-theme="dark"
    >
      <GlobalClickable link={urlClickableLink} text={urlDescriptiveText} />
      <_Builtin.Block
        className={_utils.cx(_styles, "menu_bottom_item_visual")}
        tag="div"
      >
        <GlobalVisual
          imageImageFile={visualVisualImageFile}
          imageImageAltText={visualVisualImageAltText}
          overlayOverlayVisibility={true}
          overlayOverlayOpacity="opacity: 75%;"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "menu_bottom_item_content",
          "u-vflex-left-bottom",
          "u-gap-xsmall"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "bottom_item_heading_wrap",
            "u-text-h4"
          )}
          tag="div"
        >
          <GlobalHeading text={headingHeadingRichText} />
        </_Builtin.Block>
        <GlobalParagraph text={paragraphParagraphRichText} />
      </_Builtin.Block>
      <BtnMain
        text={urlDescriptiveText}
        link={urlClickableLink}
        buttonStyle="primary"
        subtextVisibility={false}
        iconIconVisibility={true}
        iconSvgPath1="m888 144h-576c-99.234 0-180 80.766-180 180v576c0 99.234 80.766 180 180 180h576c99.234 0 180-80.766 180-180v-576c0-99.234-80.766-180-180-180zm4.0781 541.45-198.14 198.14c-9 9.1406-21.141 14.062-33.938 14.062-12.844 0-24.844-5.0625-33.938-14.062-18.703-18.703-18.703-49.219 0-67.922l155.63-155.63-433.69-0.046875c-26.531 0-48-21.469-48-48s21.469-48 48-48h433.69l-155.63-155.63c-18.703-18.703-18.703-49.219 0-67.922 9-9.1406 21.141-14.062 33.938-14.062 12.844 0 24.844 5.0625 33.938 14.062l198.14 198.14c40.453 40.453 40.453 106.31 0 146.86z"
        iconIconViewbox="0 0 1200 1200"
        buttonSizeIsSmall="is-small"
      />
    </_Component>
  );
}
