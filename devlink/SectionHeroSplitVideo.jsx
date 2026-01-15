"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalClickable } from "./GlobalClickable";
import { GlobalVisual } from "./GlobalVisual";
import { GlobalContentWSlots } from "./GlobalContentWSlots";
import { IconArrow } from "./IconArrow";
import { IconSvgWrap } from "./IconSvgWrap";
import * as _utils from "./utils";
import _styles from "./SectionHeroSplitVideo.module.css";

export function SectionHeroSplitVideo({
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
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "split_hero_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={stylesTheme}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "split_hero_layout")}
        tag="div"
      >
        <_Builtin.SliderWrapper
          className={_utils.cx(_styles, "split_hero_slider", "u-height-screen")}
          navSpacing={3}
          autoplay={true}
          delay={4000}
          iconArrows={true}
          animation="slide"
          easing="ease-in-out"
          navNumbers={false}
          navShadow={false}
          navInvert={false}
          navRound={true}
          disableSwipe={false}
          duration={750}
          infinite={true}
          hideArrows={false}
          autoMax={0}
        >
          <_Builtin.SliderMask>
            <_Builtin.SliderSlide tag="div">
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "",
                  "split_hero_item_wrap",
                  "is-first"
                )}
                tag="div"
              >
                <GlobalClickable link={button1Button1Link} visibility={false} />
                <GlobalVisual
                  overlayOverlayVisibility={true}
                  videoVideoVisibility={true}
                  videoVideoUrl="https://cdn.prod.website-files.com/643754f42b7c21fd7a5e6c71/64a2edd6301a6b9c316c8dea_Complex Structures_d2-transcode.webm"
                  imageImageVisibility={false}
                  overlayOverlayOpacity="opacity: 60%;"
                  visualVisibility={true}
                />
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "split_hero_contain",
                    "u-container",
                    "u-height-screen"
                  )}
                  tag="div"
                  data-padding-top={stylesPaddingTop}
                  data-padding-bottom={stylesPaddingBottom}
                >
                  <GlobalContentWSlots
                    slot={
                      <ElementButtonsWrap
                        slot={
                          <>
                            <BtnMain />
                            <BtnMain
                              text="Meet the Team"
                              buttonStyle="secondary"
                              iconIconVisibility={false}
                              link={{
                                href: "/about#team",
                              }}
                            />
                          </>
                        }
                        variant="Center Hero"
                      />
                    }
                    variant="Content is Center Hero"
                    paragraphStyless=""
                  />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.SliderSlide>
            <_Builtin.SliderSlide tag="div">
              <_Builtin.Block
                className={_utils.cx(_styles, "", "split_hero_item_wrap")}
                tag="div"
              >
                <GlobalClickable link={button2Button2Link} visibility={false} />
                <GlobalVisual
                  overlayOverlayVisibility={true}
                  videoVideoVisibility={true}
                  videoVideoUrl="https://cdn.prod.website-files.com/65b1595b57ed42781c4d4313/65b7f06908b09d691be7bffa_jewett_construction_-_symphony_of_construction_(2160p_h264) (720p)-transcode.webm"
                  imageImageVisibility={false}
                  overlayOverlayOpacity="opacity: 60%;"
                />
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "split_hero_contain",
                    "u-container",
                    "u-height-screen"
                  )}
                  tag="div"
                  data-padding-top={stylesPaddingTop}
                  data-padding-bottom={stylesPaddingBottom}
                >
                  <GlobalContentWSlots
                    slot={
                      <ElementButtonsWrap
                        slot={
                          <>
                            <BtnMain
                              text="View Our Projects"
                              iconSvgPath1="m900 112.5h-600c-49.734 0-97.406 19.734-132.56 54.938-35.203 35.156-54.938 82.828-54.938 132.56v600c0 49.734 19.734 97.406 54.938 132.56 35.156 35.203 82.828 54.938 132.56 54.938h600c49.734 0 97.406-19.734 132.56-54.938 35.203-35.156 54.938-82.828 54.938-132.56v-600c0-49.734-19.734-97.406-54.938-132.56-35.156-35.203-82.828-54.938-132.56-54.938zm-600 75h600c62.109 0 112.5 50.391 112.5 112.5v465l-159.52-122.02c-31.5-23.156-74.438-23.156-105.98 0l-143.48 107.02-141.52-141c-16.359-16.594-38.672-25.969-62.016-25.969-23.297 0-45.609 9.375-61.969 25.969l-150 150v-459c0-61.922 50.062-112.22 111.98-112.5zm600 825h-600c-62.109 0-112.5-50.391-112.5-112.5v-34.5l203.48-203.48c2.3906-2.4375 5.625-3.8438 9-3.8438 3.4219 0 6.6562 1.4062 9 3.8438l264.52 264.52v-0.046875c14.625 14.625 38.344 14.625 53.016 0 14.625-14.625 14.625-38.344 0-52.969l-69.516-69.516 135-99.984c4.6406-3.2812 10.828-3.2812 15.516 0l204.98 156.52v39.469c0 62.109-50.391 112.5-112.5 112.5zm-150-474.98c55.594 0 105.75-33.516 127.03-84.891s9.5156-110.53-29.812-149.86c-39.328-39.328-98.438-51.094-149.86-29.812-51.375 21.281-84.844 71.438-84.844 127.03 0 75.938 61.547 137.53 137.48 137.53zm0-200.02c25.266 0 48.047 15.234 57.75 38.578 9.6562 23.344 4.3125 50.25-13.547 68.109-17.906 17.859-44.766 23.25-68.109 13.547-23.344-9.6562-38.578-32.438-38.578-57.75 0-34.5 27.984-62.484 62.484-62.484z"
                              link={{
                                href: "#",
                              }}
                            />
                            <BtnMain
                              text="Industries We Serve"
                              buttonStyle="secondary"
                              iconSvgPath1="m1087.5 1020.9c0 15.984-6.375 31.359-17.672 42.656-11.344 11.344-26.672 17.719-42.703 17.719h-853.64c-33.328 0-60.375-27.047-60.375-60.375 0-33.375 27.047-60.375 60.375-60.375h853.03c16.125-0.1875 31.641 6.0938 43.078 17.438s17.906 26.812 17.906 42.938zm-261.24-282.28v87.516h127.22v-87.516zm-660.28-282.84v486.37h207.52v-97.781h-135.98c-5.1562-0.046875-9.3281-4.2188-9.375-9.375v-105.75c0.046875-5.1562 4.2188-9.2812 9.375-9.375h136.22v-87.516l-136.22 0.046875c-5.2031 0-9.375-4.2188-9.375-9.375v-106.03c0-5.1562 4.1719-9.375 9.375-9.375h136.22v-51.234h-198.74c-3-0.046875-6-0.23438-9-0.60938zm858.61 0h-198.32v51.234h136.22c5.2031 0 9.375 4.2188 9.375 9.375v105.61c0 5.2031-4.1719 9.375-9.375 9.375h-136.22v87.516h136.22c5.1562 0.046875 9.3281 4.2188 9.375 9.375v106.73c-0.046875 5.1562-4.2188 9.3281-9.375 9.375h-136.22v97.359h207.52l-0.046874-485.95c-2.9062 0.375-5.8125 0.5625-8.7188 0.60938zm-778.08 157.5h127.22v-87.516h-127.22zm0 212.48h127.22v-87.516h-127.22zm354.52-116.25h-0.046875c-62.109 0-112.5 50.391-112.5 112.5v120h225v-120c0.046875-29.859-11.812-58.5-32.906-79.641-21.094-21.094-49.734-33-79.594-33zm-208.55 232.26v-615.37c0-74.156 39.562-142.64 103.78-179.72 64.172-37.078 143.29-37.078 207.47 0 64.219 37.078 103.78 105.56 103.78 179.72v615.37h-75v-120c0-72.516-58.781-131.26-131.26-131.26-72.516 0-131.26 58.734-131.26 131.26v120zm77.391-513.52c0 5.1562 4.2188 9.375 9.375 9.375h243.37c5.1562 0 9.375-4.2188 9.375-9.375v-105.75c0-5.1562-4.2188-9.375-9.375-9.375h-243.37c-5.1562 0-9.375 4.2188-9.375 9.375zm0 194.39c-0.046875 2.4844 0.9375 4.875 2.7188 6.6562 1.7344 1.7812 4.1719 2.7188 6.6562 2.7188h243.37c2.4844 0 4.9219-0.9375 6.6562-2.7188 1.7812-1.7812 2.7656-4.1719 2.7188-6.6562v-105.66c0.046875-2.4844-0.9375-4.875-2.7188-6.6562-1.7344-1.7812-4.1719-2.7188-6.6562-2.7188h-243.37c-2.4844 0-4.9219 0.9375-6.6562 2.7188-1.7812 1.7812-2.7656 4.1719-2.7188 6.6562zm-294.89-185.16h198.74v-111.23c0-4.5 0-8.8594 0.60938-13.266h-199.36c-34.5 0-62.484 27.984-62.484 62.531 0 34.5 27.984 62.484 62.484 62.484zm537.52 88.734h-225v87.516h225zm112.5 0v87.516h128.48v-87.516zm0-88.734h200.02c34.5 0 62.484-27.984 62.484-62.484s-27.984-62.484-62.484-62.484h-199.4v13.266zm-112.5-105.75h-225v87.516h225z"
                              iconIconVisibility={false}
                            />
                          </>
                        }
                        variant="Center Hero"
                      />
                    }
                    variant="Content is Center Hero"
                    paragraphStyless=""
                  />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.SliderSlide>
          </_Builtin.SliderMask>
          <_Builtin.SliderArrow
            className={_utils.cx(_styles, "split_hero_slider_arrow", "is-left")}
            dir="left"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "arrow_wrap",
                "u-visual-wrap",
                "is-left"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "arrow_wrap_inner")}
                tag="div"
              >
                <IconArrow />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.SliderArrow>
          <_Builtin.SliderArrow
            className={_utils.cx(_styles, "split_hero_slider_arrow")}
            dir="right"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "arrow_wrap", "u-visual-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "arrow_wrap_inner")}
                tag="div"
              >
                <IconArrow />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.SliderArrow>
        </_Builtin.SliderWrapper>
      </_Builtin.Block>
      <_Builtin.Link
        className={_utils.cx(_styles, "scroll_down_icon")}
        button={false}
        block="inline"
        options={{
          href: "#",
        }}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "icon_circle_padding")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "icon_circle_wrap")}
            tag="div"
          >
            <IconSvgWrap
              viewbox="0 0 1200 1200"
              path1="M660.46 378.8c0 33.371-27.086 60.457-60.457 60.457s-60.457-27.086-60.457-60.457v-90.684c0-33.371 27.086-60.457 60.457-60.457s60.457 27.086 60.457 60.457zm-29.85 506.33V521.85h-60.469v363.38a243 243 0 0 0 29.855 1.824c10.367 0 20.578-.66 30.613-1.93zm-60.47 100.64v95.941l-33.191-33.805-42.371 43.211L558 1155.676l-.18.191 42.383 43.188.18-.18.18.18 42.383-43.188-.18-.191 63.422-64.559-42.383-43.211-33.191 33.805v-96.012a311 311 0 0 1-30.613 1.535c-10.082-.004-20.031-.52-29.859-1.465z M600 .95c-166.95 0-302.27 135.32-302.27 302.27v362.73c0 156.85 119.5 285.82 272.43 300.82 9.828.948 19.777 1.464 29.855 1.464 10.332 0 20.543-.527 30.613-1.535 152.57-15.336 271.67-144.16 271.67-300.74v-362.73C902.275 136.289 766.948.959 600.008.959zm241.82 665c0 122.98-92.281 224.8-211.21 239.89a243 243 0 0 1-30.613 1.933c-10.105 0-20.062-.625-29.855-1.848-119.3-14.746-211.97-116.75-211.97-239.98v-362.73c0-133.33 108.49-241.81 241.82-241.81s241.82 108.49 241.82 241.81z"
              iconNoStrokeNeededDelete=""
              iconStrokeWidth=""
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Link>
    </_Component>
  );
}
