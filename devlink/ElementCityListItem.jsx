"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalVisual } from "./GlobalVisual";
import { GlobalEyebrow } from "./GlobalEyebrow";
import { GlobalHeading } from "./GlobalHeading";
import { GlobalParagraph } from "./GlobalParagraph";
import { BtnMain } from "./BtnMain";
import { GlobalClickable } from "./GlobalClickable";
import * as _utils from "./utils";
import _styles from "./ElementCityListItem.module.css";

export function ElementCityListItem({
  as: _Component = _Builtin.Block,
  visualImageFile = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg",

  button1Link = {
    href: "#",
  },

  globalVisualImageAltText = "__wf_reserved_inherit",
  headingRichText = "",
  globalParagraphRichText = "",
  eyebrowPlainText = "Eyebrow Plain Text",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "community_item", "u-grid-autofit")}
      tag="div"
      data-theme="invert"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "community_item_visual", "u-visual-wrap")}
        tag="div"
      >
        <GlobalVisual
          imageImageFile={visualImageFile}
          imageImageAltText={globalVisualImageAltText}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "community_item_content")}
        id={_utils.cx(
          _styles,
          "w-node-d6214565-1365-94b8-eeed-9101769fd45f-769fd45c"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "g_content_wrap",
            "u-vflex-left-top",
            "u-gap-small",
            "v-flex-between"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "community_content_top",
              "u-vflex-left-top",
              "u-gap-medium"
            )}
            tag="div"
          >
            <_Builtin.DOM
              className={_utils.cx(
                _styles,
                "eyebrow_wrap",
                "u-weight-bold",
                "v-flex-between-2"
              )}
              tag="div"
              slot=""
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "eyebrow_content",
                  "v-flex-between-3"
                )}
                tag="div"
              >
                <GlobalEyebrow
                  eyebrowPlainText={eyebrowPlainText}
                  visibility={true}
                  maxWidth="max-width: none;"
                  text={
                    <_Builtin.Paragraph>
                      {"Eyebrow Text Here"}
                    </_Builtin.Paragraph>
                  }
                  eyebrowEyebrowIsLeftAligned=""
                  eyebrowPlainTextVisibiliity={true}
                  eyebrowRichTextVisibility={false}
                  eyebrowFeaturedText="Service Area"
                  eyebrowIconViewbox="0 0 1200 1200"
                  eyebrowIconPath1="m750 885c100-132.5 225-322.5 225-460-2.5-207.5-170-375-375-375s-372.5 167.5-372.5 372.5c0 137.5 122.5 327.5 225 460-130 17.5-252.5 57.5-252.5 130 0 90 200 137.5 400 137.5s400-47.5 400-137.5c0-72.5-122.5-112.5-250-127.5zm-150-610c70 0 125 55 125 125s-55 125-125 125-125-55-125-125 55-125 125-125zm0 825c-227.5 0-350-57.5-350-87.5 0-22.5 70-65 237.5-82.5 35 42.5 62.5 75 80 95h-117.5v50h300v-50h-117.5c17.5-20 45-52.5 80-95 167.5 15 237.5 60 237.5 82.5 0 30-122.5 87.5-350 87.5z"
                  eyebrowFeaturedTextVisibility={true}
                  eyebrowEyebrowFeaturedIconVisibility={true}
                />
              </_Builtin.Block>
            </_Builtin.DOM>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text_content_wrap",
                "u-vflex-left-top",
                "u-gap-small",
                "v-flex-between-4"
              )}
              tag="div"
            >
              <_Builtin.DOM
                className={_utils.cx(
                  _styles,
                  "heading_wrap",
                  "v-flex-between-5"
                )}
                tag="div"
                slot=""
                _class="u-text-h4"
              >
                <GlobalHeading
                  text={headingRichText}
                  visibility={true}
                  maxWidth="max-width: 20ch;"
                />
              </_Builtin.DOM>
              <_Builtin.DOM
                className={_utils.cx(
                  _styles,
                  "paragraph_wrap",
                  "v-flex-between-6"
                )}
                tag="div"
                slot=""
                _class="u-text-small"
              >
                <GlobalParagraph
                  text={globalParagraphRichText}
                  visibility={true}
                  maxWidth="max-width: none;"
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
              "u-weight-semibold",
              "v-flex-between-7"
            )}
            tag="div"
          >
            <BtnMain
              link={button1Link}
              visibility={true}
              text="Explore Service Area"
              subtext="Subtext"
              subtextVisibility={false}
              iconIconVisibility={true}
              iconIconViewbox="0 0 1200 1200"
              iconSvgPath1="m750 885c100-132.5 225-322.5 225-460-2.5-207.5-170-375-375-375s-372.5 167.5-372.5 372.5c0 137.5 122.5 327.5 225 460-130 17.5-252.5 57.5-252.5 130 0 90 200 137.5 400 137.5s400-47.5 400-137.5c0-72.5-122.5-112.5-250-127.5zm-150-610c70 0 125 55 125 125s-55 125-125 125-125-55-125-125 55-125 125-125zm0 825c-227.5 0-350-57.5-350-87.5 0-22.5 70-65 237.5-82.5 35 42.5 62.5 75 80 95h-117.5v50h300v-50h-117.5c17.5-20 45-52.5 80-95 167.5 15 237.5 60 237.5 82.5 0 30-122.5 87.5-350 87.5z"
            />
            <BtnMain
              buttonStyle="secondary"
              visibility={false}
              text="Button Text"
              link={{
                href: "#",
              }}
              subtext="Subtext"
              subtextVisibility={false}
              iconIconVisibility={false}
              iconIconViewbox="0 -960 960 960"
              iconSvgPath1="M394-120q-16 0-25-13.5t-9-30.5v-476H160q0-83 58.5-141.5T360-840h240v142l140-142h60v344h-60L600-638v474q0 18-13 31t-31 13H394Zm26-60h120v-237H420v237Zm0-297h120v-303H360q-39 0-75 22t-51 58h186v223Zm60-3Z"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <GlobalClickable link={button1Link} />
    </_Component>
  );
}
