"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { GlobalVisual } from "./GlobalVisual";
import { ElementServicesTabContent } from "./ElementServicesTabContent";
import * as _utils from "./utils";
import _styles from "./SectionFeatures.module.css";

export function SectionFeatures({
  as: _Component = _Builtin.Section,
  stylesTheme = "inherit",
  stylesPaddingTop = "main",
  stylesPaddingBottom = "main",
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
  stylesSectionHeight = "u-height-screen",
  paragraphStyless = "u-text-main",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "services_tab_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={stylesTheme}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "services_tabs_contain",
          "u-container",
          "u-vflex-stretch-top",
          "u-gap-medium"
        )}
        tag="div"
        data-padding-top={stylesPaddingTop}
        data-padding-bottom={stylesPaddingBottom}
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
        <_Builtin.TabsWrapper
          className={_utils.cx(
            _styles,
            "features_tab",
            "u-vflex-center-top",
            "u-width-full"
          )}
          data-duration-in="400"
          data-duration-out="200"
          data-theme="light"
          current="Tab 1"
          easing="ease"
          fadeIn={500}
          fadeOut={300}
        >
          <_Builtin.TabsMenu
            className={_utils.cx(
              _styles,
              "features_tabs_wrap",
              "u-grid-custom"
            )}
            id={_utils.cx(
              _styles,
              "w-node-_385bde45-a9b7-60a4-4975-1c475b6af7d0-5b6af7cc"
            )}
            tag="div"
          >
            <_Builtin.TabsLink
              className={_utils.cx(
                _styles,
                "features_tab_link",
                "u-hflex-left-top",
                "u-gap-small"
              )}
              data-w-tab="Tab 1"
              block="inline"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "featured_tab_visual",
                  "u-visual-wrap"
                )}
                tag="div"
              >
                <GlobalVisual imageImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0edf_icon.svg" />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "featured_tab_heading")}
                tag="div"
              >
                <_Builtin.Heading tag="h3">
                  {"PCB Assembly Techniques"}
                </_Builtin.Heading>
              </_Builtin.Block>
            </_Builtin.TabsLink>
            <_Builtin.TabsLink
              className={_utils.cx(
                _styles,
                "features_tab_link",
                "u-hflex-left-top",
                "u-gap-small"
              )}
              data-w-tab="Tab 2"
              block="inline"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "featured_tab_visual",
                  "u-visual-wrap"
                )}
                tag="div"
              >
                <GlobalVisual imageImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0edf_icon.svg" />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "featured_tab_heading")}
                tag="div"
              >
                <_Builtin.Heading tag="h3">
                  {"Quality Assurance & Testing"}
                </_Builtin.Heading>
              </_Builtin.Block>
            </_Builtin.TabsLink>
            <_Builtin.TabsLink
              className={_utils.cx(
                _styles,
                "features_tab_link",
                "u-hflex-left-top",
                "u-gap-small"
              )}
              data-w-tab="Tab 3"
              block="inline"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "featured_tab_visual",
                  "u-visual-wrap"
                )}
                tag="div"
              >
                <GlobalVisual imageImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0edf_icon.svg" />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "featured_tab_heading")}
                tag="div"
              >
                <_Builtin.Heading tag="h3">
                  {"Cleaning & Rework"}
                </_Builtin.Heading>
              </_Builtin.Block>
            </_Builtin.TabsLink>
            <_Builtin.TabsLink
              className={_utils.cx(
                _styles,
                "features_tab_link",
                "u-hflex-left-top",
                "u-gap-small"
              )}
              data-w-tab="Tab 4"
              block="inline"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "featured_tab_visual",
                  "u-visual-wrap"
                )}
                tag="div"
              >
                <GlobalVisual imageImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0edf_icon.svg" />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "featured_tab_heading")}
                tag="div"
              >
                <_Builtin.Heading tag="h3">
                  {"Lead Times & Customization"}
                </_Builtin.Heading>
              </_Builtin.Block>
            </_Builtin.TabsLink>
          </_Builtin.TabsMenu>
          <_Builtin.TabsContent
            className={_utils.cx(_styles, "features_tabs_pane_wrap")}
            tag="div"
          >
            <_Builtin.TabsPane
              className={_utils.cx(_styles, "features_tabs_pane")}
              tag="div"
              data-w-tab="Tab 1"
            >
              <ElementServicesTabContent />
            </_Builtin.TabsPane>
            <_Builtin.TabsPane tag="div" data-w-tab="Tab 2" />
            <_Builtin.TabsPane tag="div" data-w-tab="Tab 3" />
            <_Builtin.TabsPane tag="div" data-w-tab="Tab 4" />
          </_Builtin.TabsContent>
        </_Builtin.TabsWrapper>
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "style_hide_psuedo_element_tab")}
          value="%3Cstyle%3E.w-tabs%3Abefore%2C%20.w-tabs%3Aafter%20%7B%0A%20%20%20%20content%3A%20%22%22%3B%0A%20%20%20%20display%3A%20none%3B%0A%7D%0A%0A%3C%2Fstyle%3E%0A%0A%3Cstyle%3E%20%0A%40media%20(max-width%3A%20768px)%20%7B%0A%0A%20%20.layout496_tabs-menu%20%7B%0A%20%20%20%20order%3A%201%3B%0A%20%20%7D%0A%20%20.layout496_tabs-pane%20%7B%0A%20%20%20%20order%3A%202%3B%0A%20%20%7D%0A%7D%0A%3C%2Fstyle%3E"
        />
      </_Builtin.Block>
    </_Component>
  );
}
