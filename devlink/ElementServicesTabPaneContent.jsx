"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { GlobalSpacer } from "./GlobalSpacer";
import { GlobalVisual } from "./GlobalVisual";
import * as _utils from "./utils";
import _styles from "./ElementServicesTabPaneContent.module.css";

export function ElementServicesTabPaneContent({
  as: _Component = _Builtin.Block,
  eyebrowFeaturedText = "New",
  headingHeadingRichText = "",
  paragraphParagraphText = "",
  button1Button1Text = "Button Text",

  button1Button1Link = {
    href: "#",
  },

  button2Button2Text = "Start the Conversation",

  button2Button2Link = {
    href: "#",
  },

  iconIconVisibility = false,
  iconIconSvgPath1 = "M394-120q-16 0-25-13.5t-9-30.5v-476H160q0-83 58.5-141.5T360-840h240v142l140-142h60v344h-60L600-638v474q0 18-13 31t-31 13H394Zm26-60h120v-237H420v237Zm0-297h120v-303H360q-39 0-75 22t-51 58h186v223Zm60-3Z",
  visualImageFile = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg",
  visualImageAltText = "__wf_reserved_inherit",
  eyebrowEyebrowPlainText = "Eyebrow Plain Text",
  headingHeadingMaxWidth = "max-width: 25ch;",
  servicesSlideVisibility = true,
}) {
  return servicesSlideVisibility ? (
    <_Component
      className={_utils.cx(
        _styles,
        "services_slide_item",
        "u-grid-custom",
        "u-gap-medium"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "services_slider_content")}
        id={_utils.cx(
          _styles,
          "w-node-_02dcb53f-718f-3a9d-4ca1-9d707a8c9534-01953929"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "service_expand_wrap")}
          tag="div"
        >
          <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%40media%20(hover%3A%20hover)%20%7B%0A%09.service_expand_mask%20%7B%20grid-template-rows%3A%200fr%3B%20transition%3A%20grid-template-rows%20200ms%3B%20%7D%0A%09.service_expand_wrap%3Ais(%3Ahover%2C%20%3Afocus-within)%20.service_expand_mask%20%7B%20grid-template-rows%3A%201fr%3B%20%7D%0A%7D%0A%3C%2Fstyle%3E" />
          <GlobalContent
            eyebrowFeaturedText={eyebrowFeaturedText}
            headingHeadingText={headingHeadingRichText}
            paragraphParagraphText={paragraphParagraphText}
            button1Button1Text={button1Button1Text}
            button1Button1Link={button1Button1Link}
            button2Button2Text={button2Button2Text}
            button2Button2Link={button2Button2Link}
            button1IconVisibility={iconIconVisibility}
            button1IconSvgPath1={iconIconSvgPath1}
            eyebrowPlainText={eyebrowEyebrowPlainText}
            eyebrowIconPath1={iconIconSvgPath1}
            headingHeadingMaxWidth={headingHeadingMaxWidth}
            eyebrowPlainTextVisibiliity={true}
            eyebrowRichTextVisibility={false}
            headingStyle="u-rich-text"
            button1IconViewbox="0 0 1200 1200"
            eyebrowEyebrowIconViewbox="0 0 1200 1200"
            paragraphParagraphVisibility={false}
            buttonGroupButtonGroupVisibility={false}
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "service_expand_mask")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "service_expand_clip")}
              id={_utils.cx(
                _styles,
                "w-node-dc8bf7c4-22e5-bdab-994e-790bcc469d68-01953929"
              )}
              tag="div"
            >
              <GlobalSpacer variant="small" />
              <GlobalContent
                eyebrowFeaturedText={eyebrowFeaturedText}
                headingHeadingText={headingHeadingRichText}
                paragraphParagraphText={paragraphParagraphText}
                button1Button1Text={button1Button1Text}
                button1Button1Link={button1Button1Link}
                button2Button2Text={button2Button2Text}
                button2Button2Link={button2Button2Link}
                button1IconVisibility={iconIconVisibility}
                button1IconSvgPath1={iconIconSvgPath1}
                eyebrowPlainText={eyebrowEyebrowPlainText}
                eyebrowIconPath1={iconIconSvgPath1}
                headingHeadingMaxWidth={headingHeadingMaxWidth}
                eyebrowPlainTextVisibiliity={false}
                eyebrowRichTextVisibility={false}
                headingStyle="u-rich-text"
                button1IconViewbox="0 0 1200 1200"
                eyebrowEyebrowIconViewbox="0 0 1200 1200"
                eyebrowEyebrowVisibility={false}
                eyebrowFeaturedTextVisibility={false}
                eyebrowEyebrowFeaturedIconVisibility={false}
                headingHeadingVisibility={false}
                buttonGroupButtonGroupVisibility={false}
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <GlobalSpacer variant="small" />
          <GlobalContent
            eyebrowFeaturedText={eyebrowFeaturedText}
            headingHeadingText={headingHeadingRichText}
            paragraphParagraphText={paragraphParagraphText}
            button1Button1Text={button1Button1Text}
            button1Button1Link={button1Button1Link}
            button2Button2Text={button2Button2Text}
            button2Button2Link={button2Button2Link}
            button1IconVisibility={iconIconVisibility}
            button1IconSvgPath1={iconIconSvgPath1}
            eyebrowPlainText={eyebrowEyebrowPlainText}
            eyebrowIconPath1={iconIconSvgPath1}
            headingHeadingMaxWidth={headingHeadingMaxWidth}
            eyebrowPlainTextVisibiliity={false}
            eyebrowRichTextVisibility={false}
            headingStyle="u-rich-text"
            button1IconViewbox="0 0 1200 1200"
            eyebrowEyebrowIconViewbox="0 0 1200 1200"
            eyebrowEyebrowVisibility={false}
            eyebrowFeaturedTextVisibility={false}
            eyebrowEyebrowFeaturedIconVisibility={false}
            headingHeadingVisibility={false}
            buttonGroupButtonGroupVisibility={true}
            paragraphParagraphVisibility={false}
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "services_slider_visual",
          "u-visual-wrap"
        )}
        tag="div"
      >
        <GlobalVisual
          imageImageFile={visualImageFile}
          imageImageAltText={visualImageAltText}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
