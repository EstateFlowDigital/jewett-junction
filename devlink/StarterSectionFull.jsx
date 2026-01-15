"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalEyebrow } from "./GlobalEyebrow";
import { GlobalHeading } from "./GlobalHeading";
import { GlobalParagraph } from "./GlobalParagraph";
import { BtnMain } from "./BtnMain";
import { GlobalVisual } from "./GlobalVisual";

export function StarterSectionFull({
  as: _Component = _Builtin.Section,
  stylesTheme = "inherit",
  stylesPaddingTop = "main",
  stylesPaddingBottom = "main",
  eyebrowEyebrowVisibility = true,
  eyebrowEyebrowText = "",
  eyebrowEyebrowMaxWidth = "max-width: none;",
  headingHeadingVisibility = true,
  headingHeadingText = "",
  headingHeadingMaxWidth = "max-width: none;",
  paragraphParagraphVisibility = true,
  paragraphParagraphText = "",
  paragraphParagraphMaxWidth = "max-width: none;",
  buttonGroupButtonGroupVisibility = true,
  button1Button1Visibility = true,
  button1Button1Text = "Button Text",

  button1Button1Link = {
    href: "#",
  },

  button2Button2Visibility = true,
  button2Button2Text = "Button Text",

  button2Button2Link = {
    href: "#",
  },

  mainVisualMainImageVisibility = true,
  mainVisualMainImageFile = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg",
  mainVisualMainImageAltText = "__wf_reserved_inherit",
  mainVisualMainImageLoading = "lazy",
  mainVisualMainVideoVisibility = false,
  mainVisualMainVideoUrl,
}) {
  return (
    <_Component
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={stylesTheme}
    >
      <_Builtin.Block
        tag="div"
        data-padding-top={stylesPaddingTop}
        data-padding-bottom={stylesPaddingBottom}
      >
        <GlobalEyebrow
          visibility={eyebrowEyebrowVisibility}
          maxWidth={eyebrowEyebrowMaxWidth}
          text={eyebrowEyebrowText}
        />
        <GlobalHeading
          visibility={headingHeadingVisibility}
          text={headingHeadingText}
          maxWidth={headingHeadingMaxWidth}
        />
        <GlobalParagraph
          visibility={paragraphParagraphVisibility}
          text={paragraphParagraphText}
          maxWidth={paragraphParagraphMaxWidth}
        />
        {buttonGroupButtonGroupVisibility ? (
          <_Builtin.Block tag="div">
            <BtnMain
              visibility={button1Button1Visibility}
              text={button1Button1Text}
              link={button1Button1Link}
            />
            <BtnMain
              visibility={button2Button2Visibility}
              text={button2Button2Text}
              link={button2Button2Link}
              buttonStyle="secondary"
            />
          </_Builtin.Block>
        ) : null}
        <GlobalVisual
          imageImageFile={mainVisualMainImageFile}
          imageImageVisibility={mainVisualMainImageVisibility}
          imageImageAltText={mainVisualMainImageAltText}
          videoVideoUrl={mainVisualMainVideoUrl}
          videoVideoVisibility={mainVisualMainVideoVisibility}
          imageImageLoading={mainVisualMainImageLoading}
          visualVisibility={false}
        />
      </_Builtin.Block>
    </_Component>
  );
}
