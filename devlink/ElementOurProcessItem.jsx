"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { GlobalVisual } from "./GlobalVisual";
import * as _utils from "./utils";
import _styles from "./ElementOurProcessItem.module.css";

export function ElementOurProcessItem({
  as: _Component = _Builtin.Block,
  visualImageFile = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg",
  visualImageAltText = "__wf_reserved_inherit",
  contentEyebrowText = "",
  contentHeadingText = "",
  contentParagraphText = "",
  visualPositionIsFirst = "is-first",
  styledNumberVisibility = false,
  styledNumberContent = "",
  eyebrowFeaturedText = "Step 1",
  visualCdnImageAltText,
  visualCdnImageUrl = "https://picflow.media/images/resized/720x404/cf1ce05a-eb5e-4b0f-88f9-3a1812d791fb.jpg",
  visualImageVisibility = true,
  visualCdnImageVisibility = false,
  visualImagePosition = "object-position:30% 50%;",

  button1Link = {
    href: "#",
  },
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "our_process_steps_item",
        "u-grid-autofit",
        "u-gap-large"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "our_process_content")}
        id={_utils.cx(
          _styles,
          "w-node-_808f1dc3-eaac-8b27-8a2f-fa8a25c5698b-404e7d86"
        )}
        tag="div"
      >
        <GlobalContent
          eyebrowEyebrowText={contentEyebrowText}
          headingHeadingText={contentHeadingText}
          paragraphParagraphText={contentParagraphText}
          eyebrowFeaturedText={eyebrowFeaturedText}
          button1Button1Link={button1Link}
          headingHeadingMaxWidth="max-width: none;"
          paragraphParagraphMaxWidth="max-width: 55ch;"
          headingStyle="u-text-h2"
          eyebrowEyebrowFeaturedIconVisibility={false}
          button1IconVisibility={true}
          button1IconViewbox="0 0 1200 1200"
          button2Button2Visibility={false}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "process_visual_wrap", "u-visual-wrap")}
        tag="div"
      >
        <GlobalVisual
          imageImageFile={visualImageFile}
          imageImageAltText={visualImageAltText}
          imageCdnImageUrl={visualCdnImageUrl}
          imagePosition={visualImagePosition}
          imageCdnImageAltText={visualCdnImageAltText}
          imageImageVisibility={visualImageVisibility}
          imageCdnImageVisibility={visualCdnImageVisibility}
        />
      </_Builtin.Block>
    </_Component>
  );
}
