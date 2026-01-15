"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalBackgroundGraphic } from "./GlobalBackgroundGraphic";
import { GlobalContent } from "./GlobalContent";
import { ElementMainContactForm } from "./ElementMainContactForm";
import * as _utils from "./utils";
import _styles from "./SectionHeroContactUs.module.css";

export function SectionHeroContactUs({
  as: _Component = _Builtin.Section,
  stylesTheme = "inherit",
  eyebrowEyebrowVisibility = true,
  eyebrowEyebrowText = "",
  eyebrowEyebrowMaxWidth = "max-width: none;",
  headingHeadingVisibility = true,
  headingHeadingText = "",
  headingHeadingMaxWidth = "max-width: 20ch;",
  paragraphParagraphVisibility = true,
  paragraphParagraphText = "",
  paragraphParagraphMaxWidth = "max-width: 65ch;",
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
  mainVisualMainImageLoading = "eager",
  mainVisualMainVideoVisibility = false,
  mainVisualMainVideoUrl,
  headingStyle = "u-text-display",
  eyebrowStyles = "u-text-large",
  paragraphStyless = "u-text-main",
  visualVisibility = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "hero_interal_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={stylesTheme}
    >
      <GlobalBackgroundGraphic
        leftGraphicVisibility={false}
        topBackgroundGraphicVisibility={true}
      />
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "hero_interal_contain",
          "u-container",
          "u-vflex-stretch-top",
          "u-gap-medium"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "hero_interal_layout",
            "u-grid-autofit",
            "u-gap-large"
          )}
          tag="div"
        >
          <GlobalContent
            eyebrowStyles={eyebrowStyles}
            eyebrowEyebrowVisibility={eyebrowEyebrowVisibility}
            eyebrowEyebrowMaxWidth={eyebrowEyebrowMaxWidth}
            eyebrowEyebrowText={eyebrowEyebrowText}
            headingStyle={headingStyle}
            headingHeadingVisibility={headingHeadingVisibility}
            headingHeadingText={headingHeadingText}
            paragraphParagraphVisibility={paragraphParagraphVisibility}
            paragraphParagraphText={paragraphParagraphText}
            paragraphParagraphMaxWidth={paragraphParagraphMaxWidth}
            buttonGroupButtonGroupVisibility={buttonGroupButtonGroupVisibility}
            button1Button1Visibility={button1Button1Visibility}
            button1Button1Text={button1Button1Text}
            button1Button1Link={button1Button1Link}
            button2Button2Visibility={button2Button2Visibility}
            button2Button2Text={button2Button2Text}
            button2Button2Link={button2Button2Link}
            paragraphStyless={paragraphStyless}
            headingHeadingMaxWidth={headingHeadingMaxWidth}
          />
          <ElementMainContactForm />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
