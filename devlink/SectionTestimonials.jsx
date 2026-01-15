"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import * as _utils from "./utils";
import _styles from "./SectionTestimonials.module.css";

export function SectionTestimonials({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  eyebrowContentRichText = "",
  headingContentRichText = "",
  paragraphContentRichText = "",
  contentVisibility = true,
  variant = null,
  headingText = "",
  paragraphText = "",
  buttonGroupVisibility = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "testimonials_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "testimonials_contain",
          "u-container",
          "u-vflex-stretch-center",
          "u-gap-large"
        )}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        {contentVisibility ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "testimonial_content_wrap")}
            tag="div"
          >
            <GlobalContent
              headingHeadingText={headingText}
              paragraphParagraphText={paragraphText}
              variant={variant}
              buttonGroupButtonGroupVisibility={buttonGroupVisibility}
              headingStyle="u-text-h1"
              eyebrowFeaturedText="Testimonials"
              eyebrowEyebrowText={
                <_Builtin.Paragraph>{"What Our Client Say"}</_Builtin.Paragraph>
              }
              button1Button1Text="Read More Reviews"
              eyebrowIconPath1="m600 120c-298.23 0-540 214.9-540 480s241.77 480 540 480c118.84 0 228.64-34.203 317.82-92.027l222.18 92.027-89.328-215.65c56.406-75.82 89.328-166.65 89.328-264.35 0-265.1-241.77-480-540-480zm-207 660v-60s60-26.918 60-60c-66.273 0-120-53.727-120-120s53.727-120 120-120 120 53.727 120 120c0 120-90 240-180 240zm294 0v-60s60-26.918 60-60c-66.273 0-120-53.727-120-120s53.727-120 120-120 120 53.727 120 120c0 120-90 240-180 240z"
              eyebrowEyebrowIconViewbox="0 0 1200 1200"
              button1Button1Link={{
                href: "#",
              }}
              button1IconVisibility={true}
              button1IconSvgPath1="m600 120c-298.23 0-540 214.9-540 480s241.77 480 540 480c118.84 0 228.64-34.203 317.82-92.027l222.18 92.027-89.328-215.65c56.406-75.82 89.328-166.65 89.328-264.35 0-265.1-241.77-480-540-480zm-207 660v-60s60-26.918 60-60c-66.273 0-120-53.727-120-120s53.727-120 120-120 120 53.727 120 120c0 120-90 240-180 240zm294 0v-60s60-26.918 60-60c-66.273 0-120-53.727-120-120s53.727-120 120-120 120 53.727 120 120c0 120-90 240-180 240z"
              button1IconViewbox="0 0 1200 1200"
              button2Button2Text="View Our Projects"
              button2Button2Link={{
                href: "#",
              }}
            />
          </_Builtin.Block>
        ) : null}
        <_Builtin.HtmlEmbed value="%3C!--%20Elfsight%20All-in-One%20Reviews%20%7C%20Jewett%20Construction%20Reviews%20Feed%20--%3E%0A%3Cscript%20src%3D%22https%3A%2F%2Fstatic.elfsight.com%2Fplatform%2Fplatform.js%22%20async%3E%3C%2Fscript%3E%0A%3Cdiv%20class%3D%22elfsight-app-b9b6b4b5-61c8-4aa0-bfeb-561da1027eed%22%20data-elfsight-app-lazy%3E%3C%2Fdiv%3E" />
      </_Builtin.Block>
    </_Component>
  );
}
