"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { ElementServicesTabContent } from "./ElementServicesTabContent";
import * as _utils from "./utils";
import _styles from "./SectionServicesHomepage.module.css";

export function SectionServicesHomepage({
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
  tab1HeadingRichTe = "",
  tab1ParagraphRichTe = "",
  tab1BannerLeftTextRichText = "",
  elementServicesTabContentServicePageRichText = "",
  tab1BannerRightTextRichText = "",
  tab2HeadingRichText = "",
  tab2ParagraphRichText = "",
  tab2LeftBannerTextRichText = "",
  tab2ParagraphRichText = "",
  tab3ParagraphRichTex = "",
  tab3HeadingRichTex = "",
  tab3LeftTextRichText = "",
  tab3RightTextRichText = "",
  tab4HeadingRich = "",
  tab4LeftBannerTextRichTex = "",
  tab4ParagraphRichT = "",
  tab4RightTextRichText = "",
  tab5HeadingRichT = "",
  tab5ParagraphRich = "",
  tab5RightTextRichTe = "",
  tab5LeftParagraphRichT = "",
  tab6HeadingRic = "",
  tab6ParagraphRic = "",
  tab6RightRichText = "",
  tab6LeftBannerTextRichT = "",
  tab7HeadingRichTextt = "",
  tab7ParagraphRichTextt = "",
  tab7LeftBannerTextRichTextt = "",
  tab7RightBannerTextRichText = "",
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
            "services_tabs",
            "u-hflex-left-top",
            "u-gap-xsmall",
            "u-width-full"
          )}
          data-duration-in="400"
          data-duration-out="200"
          data-theme="light"
          current="Tab 11"
          easing="ease"
          fadeIn={500}
          fadeOut={300}
        >
          <_Builtin.TabsMenu
            className={_utils.cx(
              _styles,
              "services_nav_tab",
              "u-grid-autofit",
              "u-weight-semibold"
            )}
            id={_utils.cx(
              _styles,
              "w-node-_80f38ec1-b2d4-7ef2-08bc-d6f58f3cc0e9-8f3cc0e5"
            )}
            tag="div"
          >
            <_Builtin.TabsLink
              className={_utils.cx(_styles, "services_tab_link")}
              data-w-tab="Tab 1"
              block="inline"
            >
              <_Builtin.Heading
                className={_utils.cx(_styles, "no-wrap")}
                tag="h3"
              >
                {"Expert Materials Procurement"}
              </_Builtin.Heading>
            </_Builtin.TabsLink>
            <_Builtin.TabsLink
              className={_utils.cx(_styles, "services_tab_link")}
              data-w-tab="Tab 6"
              block="inline"
            >
              <_Builtin.Heading
                className={_utils.cx(_styles, "no-wrap")}
                tag="h3"
              >
                {"Quick-Turn PCB Assembly"}
              </_Builtin.Heading>
            </_Builtin.TabsLink>
            <_Builtin.TabsLink
              className={_utils.cx(
                _styles,
                "services_tab_link",
                "tab-color-blue"
              )}
              data-w-tab="Tab 7"
              block="inline"
            >
              <_Builtin.Heading
                className={_utils.cx(_styles, "no-wrap")}
                tag="h3"
              >
                {"Consigned PCB Assembly"}
              </_Builtin.Heading>
            </_Builtin.TabsLink>
            <_Builtin.TabsLink
              className={_utils.cx(_styles, "services_tab_link")}
              data-w-tab="Tab 8"
              block="inline"
            >
              <_Builtin.Heading
                className={_utils.cx(_styles, "no-wrap")}
                tag="h3"
              >
                {"Turnkey PCB Assembly Services"}
              </_Builtin.Heading>
            </_Builtin.TabsLink>
            <_Builtin.TabsLink
              className={_utils.cx(_styles, "services_tab_link")}
              data-w-tab="Tab 9"
              block="inline"
            >
              <_Builtin.Heading
                className={_utils.cx(_styles, "no-wrap")}
                tag="h3"
              >
                {"Inline Aqueous PCB Cleaning"}
              </_Builtin.Heading>
            </_Builtin.TabsLink>
            <_Builtin.TabsLink
              className={_utils.cx(_styles, "services_tab_link")}
              data-w-tab="Tab 10"
              block="inline"
            >
              <_Builtin.Heading
                className={_utils.cx(_styles, "no-wrap")}
                tag="h3"
              >
                {"AOI & Visual PCB Inspection"}
              </_Builtin.Heading>
            </_Builtin.TabsLink>
            <_Builtin.TabsLink
              className={_utils.cx(_styles, "services_tab_link")}
              data-w-tab="Tab 11"
              block="inline"
            >
              <_Builtin.Heading
                className={_utils.cx(_styles, "no-wrap")}
                tag="h3"
              >
                {"BGA Rework & Reballing"}
              </_Builtin.Heading>
            </_Builtin.TabsLink>
          </_Builtin.TabsMenu>
          <_Builtin.TabsContent
            className={_utils.cx(_styles, "services_tabs_pane_wrap")}
            tag="div"
          >
            <_Builtin.TabsPane
              className={_utils.cx(_styles, "services_tabs_pane")}
              tag="div"
              data-w-tab="Tab 1"
            >
              <ElementServicesTabContent leftParagraphRichText="" />
            </_Builtin.TabsPane>
            <_Builtin.TabsPane
              className={_utils.cx(_styles, "services_tabs_pane")}
              tag="div"
              data-w-tab="Tab 6"
            >
              <ElementServicesTabContent
                leftParagraphRichText={
                  <_Builtin.Paragraph>
                    {"default setting changed"}
                  </_Builtin.Paragraph>
                }
              />
            </_Builtin.TabsPane>
            <_Builtin.TabsPane
              className={_utils.cx(_styles, "services_tabs_pane")}
              tag="div"
              data-w-tab="Tab 7"
            >
              <ElementServicesTabContent
                leftParagraphRichText={
                  <_Builtin.Paragraph>
                    {"default setting changed"}
                  </_Builtin.Paragraph>
                }
              />
            </_Builtin.TabsPane>
            <_Builtin.TabsPane tag="div" data-w-tab="Tab 8">
              <ElementServicesTabContent
                leftParagraphRichText={
                  <_Builtin.Paragraph>
                    {"default setting changed"}
                  </_Builtin.Paragraph>
                }
              />
            </_Builtin.TabsPane>
            <_Builtin.TabsPane tag="div" data-w-tab="Tab 9">
              <ElementServicesTabContent
                leftParagraphRichText={
                  <_Builtin.Paragraph>
                    {"default setting changed"}
                  </_Builtin.Paragraph>
                }
              />
            </_Builtin.TabsPane>
            <_Builtin.TabsPane tag="div" data-w-tab="Tab 10">
              <ElementServicesTabContent
                leftParagraphRichText={
                  <_Builtin.Paragraph>
                    {"default setting changed"}
                  </_Builtin.Paragraph>
                }
              />
            </_Builtin.TabsPane>
            <_Builtin.TabsPane tag="div" data-w-tab="Tab 11">
              <ElementServicesTabContent
                leftParagraphRichText={
                  <_Builtin.Paragraph>
                    {"default setting changed"}
                  </_Builtin.Paragraph>
                }
              />
            </_Builtin.TabsPane>
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
