"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { ElementInternalPageVisual } from "./ElementInternalPageVisual";
import { GlobalVisual } from "./GlobalVisual";
import * as _utils from "./utils";
import _styles from "./SectionHeroInternalPage.module.css";

export function SectionHeroInternalPage({
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
  button1Button1Text = "Start the Conversation",

  button1Button1Link = {
    href: "#",
  },

  button2Button2Visibility = true,
  button2Button2Text = "View Our Projects",

  button2Button2Link = {
    href: "#",
  },

  mainVisualMainImageVisibility = true,
  mainVisualMainImageFile = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg",
  mainVisualMainImageAltText = "__wf_reserved_inherit",
  mainVisualMainImageLoading = "eager",
  mainVisualMainVideoVisibility = false,
  mainVisualMainVideoUrl,
  mainVisual2ColumnVisualSliderVisibility = true,
  headingStyle = "u-text-display",
  eyebrowStyles = "u-text-large",
  paragraphStyless = "u-text-main",
  mainVisualSingleVisualVisibility = false,
  mainVisualBackgroundVisualVisibility = false,
  mainVisualVisualVisibility = true,
  stylesPaddingTop,
  stylesPaddingBottom,
  stylesSpecialSpacing = "is-special-spacing",
  eyebrowPlainText = "Eyebrow Plain Text",
  eyebrowPlainTextVisibiliity = false,
  eyebrowRichTextVisibility = true,
  eyebrowFeaturedText = "New",
  eyebrowEyebrowIconViewbox = "0 0 8 13",
  eyebrowIconPath1 = "M0.506958 0.552979L6.50696 6.05298L0.506958 11.553",
  faqFaqItemVisibility = false,
  faqFaqLongAnswer = "",
  stylesIsBackgroundColor = "is-background-color",
  variant = "Base",
  contactFormContactFormVisibility = false,
  paragraphParagraphStyles = "u-text-large",
  elementQuestion = "Heading",
  mainVisualVisualPosition = "u-cover-absolute",
  slot,
  linkedinIconWrapVisibility = false,
  slot,
  socialMediaIconsVisibility = false,
  slot,
}) {
  const _styleVariantMap = {
    Base: "",
    "Text Content Full Width": "w-variant-e1bcaf97-9066-6e7d-5e43-01120db3f82a",
    "Top Aligned": "w-variant-16546072-0fdd-83c5-accd-c45072e2f3c1",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <_Component
      className={_utils.cx(_styles, "hero_interal_wrap", _activeStyleVariant)}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={stylesTheme}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "hero_interal_contain",
          "u-container",
          _activeStyleVariant
        )}
        tag="div"
        data-padding-top={stylesPaddingTop}
        data-padding-bottom={stylesPaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "hero_interal_layout",
            "u-grid-column-2",
            "u-gap-large",
            _activeStyleVariant
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "internal_page_content_wrap",
              "u-vflex-stretch-center",
              "u-gap-medium",
              _activeStyleVariant
            )}
            id={_utils.cx(
              _styles,
              "w-node-d77cf1b1-b11f-95c3-e785-f624b0f591fe-f6c321ac"
            )}
            tag="div"
          >
            <_Builtin.NotSupported _atom="Slot" />
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
              buttonGroupButtonGroupVisibility={
                buttonGroupButtonGroupVisibility
              }
              button1Button1Visibility={button1Button1Visibility}
              button1Button1Text={button1Button1Text}
              button1Button1Link={button1Button1Link}
              button2Button2Visibility={button2Button2Visibility}
              button2Button2Text={button2Button2Text}
              button2Button2Link={button2Button2Link}
              headingHeadingMaxWidth={headingHeadingMaxWidth}
              eyebrowPlainText={eyebrowPlainText}
              eyebrowPlainTextVisibiliity={eyebrowPlainTextVisibiliity}
              eyebrowRichTextVisibility={eyebrowRichTextVisibility}
              eyebrowFeaturedText={eyebrowFeaturedText}
              eyebrowEyebrowIconViewbox={eyebrowEyebrowIconViewbox}
              eyebrowIconPath1={eyebrowIconPath1}
              paragraphStyless={paragraphParagraphStyles}
              button1IconVisibility={true}
            />
            <_Builtin.NotSupported _atom="Slot" />
          </_Builtin.Block>
          {mainVisualVisualVisibility ? (
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "internal_page_visual_wrap",
                _activeStyleVariant
              )}
              id={_utils.cx(
                _styles,
                "w-node-_11beeb26-2817-764e-2c0f-5b5c68bcb261-f6c321ac"
              )}
              tag="div"
            >
              {mainVisual2ColumnVisualSliderVisibility ? (
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "internal_page_visual_layout",
                    _activeStyleVariant
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "internal_page_visual_column",
                      _activeStyleVariant
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "internal_page_visual_track",
                        _activeStyleVariant
                      )}
                      tag="div"
                    >
                      <_Builtin.NotSupported _atom="DynamoWrapper" />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "internal_page_visual_column",
                      _activeStyleVariant
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "internal_page_visual_track",
                        "is-reversed",
                        _activeStyleVariant
                      )}
                      tag="div"
                    >
                      <_Builtin.NotSupported _atom="DynamoWrapper" />
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              <_Builtin.HtmlEmbed
                className={_utils.cx(
                  _styles,
                  "internal_page_visual_embed",
                  _activeStyleVariant
                )}
                value="%3Cstyle%3E%0A%40keyframes%20internal_page_visual_timeline%20%7B%0A%09from%20%7B%20transform%3A%20translateY(-2%25)%3B%20%7D%0A%09to%20%7B%20transform%3A%20translateY(-50%25)%3B%20%7D%0A%7D%0A%0A.internal_page_visual_track%20%7B%0A%09animation%3A%20internal_page_visual_timeline%2050s%20linear%20infinite%3B%0A%7D%0A%0A%3C%2Fstyle%3E"
              />
              {mainVisualSingleVisualVisibility ? (
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "internal_page_single_visual",
                    "u-visual-wrap",
                    "u-height-full",
                    _activeStyleVariant
                  )}
                  tag="div"
                >
                  <GlobalVisual
                    imageImageFile={mainVisualMainImageFile}
                    imageImageAltText={mainVisualMainImageAltText}
                    position={mainVisualVisualPosition}
                  />
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          ) : null}
          {contactFormContactFormVisibility ? (
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "interal_page_contact_form",
                _activeStyleVariant
              )}
              tag="div"
            >
              <_Builtin.NotSupported _atom="Slot" />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      {mainVisualBackgroundVisualVisibility ? (
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "internal_page_background_visual",
            "u-visual-wrap",
            _activeStyleVariant
          )}
          tag="div"
        >
          <GlobalVisual
            imageImageFile={mainVisualMainImageFile}
            imageImageAltText={mainVisualMainImageAltText}
            overlayOverlayVisibility={true}
            overlayOverlayOpacity="opacity: 60%;"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
