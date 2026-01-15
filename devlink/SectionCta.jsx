"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalVisual } from "./GlobalVisual";
import { GlobalContent } from "./GlobalContent";
import * as _utils from "./utils";
import _styles from "./SectionCta.module.css";

export function SectionCta({
  as: _Component = _Builtin.Section,
  styleTheme = "dark",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  headingContentRichText = "",
  paragraphContentRichText = "",
  eyebrowContentRichText = "",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cta_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <GlobalVisual
        overlayOverlayVisibility={true}
        overlayOverlayOpacity="opacity: 80%;"
        imageImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0fb3_Pre-Engineered%20Metal%20Buildings%20-%20Klassen%20and%20smith%20construction.webp"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "cta_contain", "u-container")}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "cta_layout",
            "u-vflex-left-center",
            "u-gap-large"
          )}
          tag="div"
        >
          <GlobalContent
            eyebrowEyebrowIsLeftAligned="is-left-aligned"
            headingHeadingText={
              <_Builtin.Paragraph>
                {"It’s Time to "}
                <_Builtin.Strong>
                  {"Break Ground with Confidence"}
                </_Builtin.Strong>
              </_Builtin.Paragraph>
            }
            headingStyle="u-text-display"
            paragraphParagraphText={
              <_Builtin.Paragraph>
                {
                  "Every successful project starts with the right team. Whether you’re planning a new build, expansion, or renovation, Jewett Construction is ready to bring your vision to life—on time, on budget, and with unmatched precision. Let’s collaborate to create a space that drives your business forward. Reach out today and take the first step toward a seamless construction experience."
                }
              </_Builtin.Paragraph>
            }
            paragraphParagraphMaxWidth="max-width: 70ch;"
            eyebrowEyebrowText={
              <_Builtin.Paragraph>
                {"Bring Your Vision to Life"}
              </_Builtin.Paragraph>
            }
            eyebrowFeaturedText="Let's Get Started"
            eyebrowIconPath1="m935.86 192.71h-38.297v-13.172c0-10.594 8.5781-19.125 19.078-19.125 10.594 0 19.219 8.5781 19.219 19.125zm172.74 502.87c0 108.09-87.984 195.98-196.08 195.98s-195.94-87.891-195.94-195.98 87.891-195.98 195.94-195.98c108.09-0.046875 196.08 87.891 196.08 195.98zm-96.656 0c0-9.3281-7.5938-16.828-16.922-16.828h-65.578v-92.062c0-9.3281-7.5938-16.828-16.922-16.828s-16.781 7.5469-16.781 16.828v108.89c0 9.3281 7.4531 16.828 16.781 16.828h82.5c9.3281 0 16.922-7.5 16.922-16.828zm-920.53 283.36h597.84v40.406c0 56.297-45.797 102.05-102.09 102.05h-393.66c-56.297 0-102.09-45.797-102.09-102.05zm226.82 66.562c0 9.3281 7.5938 16.828 16.922 16.828h110.39c9.2812 0 16.922-7.5 16.922-16.828s-7.5938-16.828-16.922-16.828h-110.39c-9.3281 0-16.922 7.5-16.922 16.828zm222.61-165.66h148.4v65.391h-597.84v-764.58c0-56.297 45.797-102.05 102.09-102.05h393.71c56.297 0 102.09 45.75 102.09 102.05v14.344h-56.062v-15.469c0-9.3281-7.4531-16.828-16.781-16.828s-16.922 7.5-16.922 16.828v15.469h-58.641c-64.359 0-116.67 52.312-116.67 116.67v451.5c-0.046875 64.312 52.266 116.67 116.62 116.67zm-303.98-726.79c0-9.2812-7.5-16.828-16.781-16.828h-11.812c-9.3281 0-16.781 7.5469-16.781 16.828 0 9.3281 7.4531 16.828 16.781 16.828h11.812c9.2344 0.046875 16.781-7.5469 16.781-16.828zm98.25 16.875h110.39c9.3281 0 16.922-7.5 16.922-16.828s-7.5938-16.828-16.922-16.828h-110.39c-9.3281 0-16.922 7.5-16.922 16.828 0.046875 9.2812 7.6406 16.828 16.922 16.828zm400.92 672.47 3.1406 3.75h-198.32c-45.797 0-83.016-37.219-83.016-83.016v-451.45c0-45.797 37.219-82.969 83.016-82.969h58.641v15.469c0 9.3281 7.5938 16.828 16.922 16.828s16.781-7.5 16.781-16.828v-15.469h266.68v15.469c0 9.2812 7.5469 16.828 16.781 16.828 9.3281 0 16.922-7.5 16.922-16.828v-15.469h58.781c45.703 0 83.016 37.266 83.016 82.969v221.9l-3.8906-3.7031c-84.984-81.422-217.18-85.594-306.89-9.8438l-0.65625 0.5625h-166.69c-9.2812 0-16.781 7.5938-16.781 16.828 0 9.2344 7.5469 16.828 16.781 16.828h134.29c-28.688 38.297-44.062 76.547-48 124.45h-86.297c-9.2812 0-16.781 7.5938-16.781 16.828 0 9.2812 7.5469 16.828 16.781 16.828h86.297c3.9375 48.562 21.281 92.531 52.5 130.03zm-155.63-463.13c0 9.2812 7.5469 16.828 16.781 16.828h338.68c9.3281 0 16.781-7.5 16.781-16.828 0-9.3281-7.4531-16.828-16.781-16.828h-338.68c-9.2344-0.046876-16.781 7.5469-16.781 16.828z"
            eyebrowEyebrowIconViewbox="0 0 1200 1200"
            button2Button2Text="Schedule a Meeting"
            button1IconVisibility={true}
            button2Button2Visibility={false}
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
