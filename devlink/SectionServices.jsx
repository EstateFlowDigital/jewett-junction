"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { IconSvgWrap } from "./IconSvgWrap";
import { ElementServiceItemTab } from "./ElementServiceItemTab";
import { ElementServicesTabPaneContent } from "./ElementServicesTabPaneContent";
import * as _utils from "./utils";
import _styles from "./SectionServices.module.css";

export function SectionServices({
  as: _Component = _Builtin.Section,
  stylesTheme = "dark",
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
  contentVisibility = true,
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
          "u-gap-large"
        )}
        tag="div"
        data-padding-top={stylesPaddingTop}
        data-padding-bottom={stylesPaddingBottom}
      >
        {contentVisibility ? (
          <_Builtin.Block tag="div">
            <GlobalContent
              headingHeadingText={
                <_Builtin.Heading tag="h2">
                  {"A "}
                  <_Builtin.Strong>{"Full-Service"}</_Builtin.Strong>
                  {" Approach for Every Commercial Project"}
                </_Builtin.Heading>
              }
              eyebrowFeaturedText="Services"
              eyebrowEyebrowText={
                <_Builtin.Paragraph>
                  {"Expert Construction Services"}
                </_Builtin.Paragraph>
              }
              eyebrowEyebrowIconViewbox="0 0 1200 1200"
              eyebrowIconPath1="m900 337.5h-375v712.5h37.5c20.719 0 37.5 16.781 37.5 37.5s-16.781 37.5-37.5 37.5h-337.5c-20.719 0-37.5-16.781-37.5-37.5s16.781-37.5 37.5-37.5h37.5v-562.5h-75c-29.859 0-58.453-11.859-79.547-32.953s-32.953-49.688-32.953-79.547v-150c0-29.859 11.859-58.453 32.953-79.547s49.688-32.953 79.547-32.953h37.5c29.859 0 58.453 11.859 79.547 32.953s32.953 49.688 32.953 79.547v37.5h18.75v-82.5c0-36.328 17.531-70.406 47.109-91.547 29.578-21.094 67.5-26.672 101.86-14.859l551.06 188.9h31.219c20.719 0 37.5 16.781 37.5 37.5s-16.781 37.5-37.5 37.5h-112.5v75h-75zm-468.74-75h393.74l-344.11-117.98c-11.438-3.9375-24.047-2.0625-33.938 4.9688-9.8438 7.0312-15.703 18.422-15.703 30.516zm581.26 225c62.156 0 112.5 50.344 112.5 112.5v75c0 62.156-50.344 112.5-112.5 112.5h-150c-62.156 0-112.5-50.344-112.5-112.5v-75c0-62.156 50.344-112.5 112.5-112.5z"
              paragraphParagraphText={
                <_Builtin.Paragraph>
                  {
                    "Jewett Construction expertly manages every phase of your project—feasibility & planning, pre-construction collaboration, project management, construction excellence, and post-completion support—all under one roof. With an in-house design team, we streamline the entire process from initial concept to final walk-through, ensuring you stay on time, on budget, and always in control."
                  }
                </_Builtin.Paragraph>
              }
              button1Button1Text="Explore All Services"
              button1Subtext="Commercial & Industrial Construction"
              button1IconVisibility={true}
              button1IconViewbox="0 0 1200 1200"
              button1IconSvgPath1="m900 337.5h-375v712.5h37.5c20.719 0 37.5 16.781 37.5 37.5s-16.781 37.5-37.5 37.5h-337.5c-20.719 0-37.5-16.781-37.5-37.5s16.781-37.5 37.5-37.5h37.5v-562.5h-75c-29.859 0-58.453-11.859-79.547-32.953s-32.953-49.688-32.953-79.547v-150c0-29.859 11.859-58.453 32.953-79.547s49.688-32.953 79.547-32.953h37.5c29.859 0 58.453 11.859 79.547 32.953s32.953 49.688 32.953 79.547v37.5h18.75v-82.5c0-36.328 17.531-70.406 47.109-91.547 29.578-21.094 67.5-26.672 101.86-14.859l551.06 188.9h31.219c20.719 0 37.5 16.781 37.5 37.5s-16.781 37.5-37.5 37.5h-112.5v75h-75zm-468.74-75h393.74l-344.11-117.98c-11.438-3.9375-24.047-2.0625-33.938 4.9688-9.8438 7.0312-15.703 18.422-15.703 30.516zm581.26 225c62.156 0 112.5 50.344 112.5 112.5v75c0 62.156-50.344 112.5-112.5 112.5h-150c-62.156 0-112.5-50.344-112.5-112.5v-75c0-62.156 50.344-112.5 112.5-112.5z"
              button1Button1Link={{
                href: "#",
              }}
              button2Button2Link={{
                href: "#",
              }}
            />
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "services_slider_wrap",
            "u-vflex-stretch-top",
            "u-gap-medium"
          )}
          tag="div"
          data-theme="light"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "services_slider_bottom")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "services_slider_btn_layout")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "services_slider_btn_element",
                  "swiper-button-disabled",
                  "is-prev"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "slider_svg_wrap")}
                  tag="div"
                >
                  <IconSvgWrap
                    path1="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"
                    viewbox="0 -960 960 960"
                    iconNoStrokeNeededDelete=""
                    iconStrokeWidth=""
                  />
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "services_slider_btn_element",
                  "is-next"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "slider_svg_wrap")}
                  tag="div"
                >
                  <IconSvgWrap
                    path1="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"
                    viewbox="0 -960 960 960"
                    iconNoStrokeNeededDelete=""
                    iconStrokeWidth=""
                  />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.NotSupported _atom="DynamoWrapper" />
          </_Builtin.Block>
          <_Builtin.NotSupported _atom="DynamoWrapper" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
