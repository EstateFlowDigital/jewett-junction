"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { BtnPlay } from "./BtnPlay";
import { AccoladesLogo } from "./AccoladesLogo";
import * as _utils from "./utils";
import _styles from "./SectionAccolades.module.css";

export function SectionAccolades({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  styleTopPadding = "small",
  styleBottomPadding = "small",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "accolades_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "accolades_contain", "u-container")}
        tag="div"
        data-padding-top={styleTopPadding}
        data-padding-bottom={styleBottomPadding}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "accolades_component")}
          tag="div"
        >
          <_Builtin.Grid
            className={_utils.cx(
              _styles,
              "accolades_content",
              "u-vflex-stretch-top",
              "u-gap-large"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "accolades_content-left",
                "u-grid-autofit",
                "u-gap-medium"
              )}
              id={_utils.cx(
                _styles,
                "w-node-_5ad7d8eb-4205-e537-edce-7b5435f01ab1-35f01aad"
              )}
              tag="div"
            >
              <GlobalContent
                eyebrowEyebrowText={
                  <_Builtin.Paragraph>
                    {"Recognized for Excellence"}
                  </_Builtin.Paragraph>
                }
                eyebrowFeaturedText="Awards"
                eyebrowEyebrowIconViewbox="0 0 1200 1200"
                eyebrowIconPath1="m818.06 848.86v175.08c-0.23438 6.5625-4.2656 12.422-10.312 15s-13.031 1.4062-17.906-3l-65.391-60-65.391 60c-4.9219 4.5-11.953 5.6719-18.047 3.0938s-10.125-8.4375-10.312-15.094v-137.26c0-9.375 7.5938-16.922 16.922-16.922 9.375 0 16.922 7.5469 16.922 16.922v99.141l48-44.062c6.4219-5.8594 16.266-5.8594 22.688 0l48 44.062v-136.97c0.75-8.7188 8.0625-15.469 16.875-15.469 8.7656 0 16.125 6.75 16.828 15.469zm-266.06 20.766c-9.3281 0-16.922 7.5938-16.922 16.922v198.37l-48-44.156c-6.4688-5.9062-16.359-5.9062-22.781 0l-48 44.156v-235.31c0.375-4.7344-1.2188-9.375-4.4062-12.891-3.2344-3.4688-7.7344-5.4844-12.469-5.4844s-9.2344 2.0156-12.469 5.4844c-3.1875 3.5156-4.7812 8.1562-4.4062 12.891v273.47c0.14062 6.6094 4.125 12.516 10.219 15.141 6.0938 2.5781 13.125 1.3594 18-3.1406l65.391-60 65.391 60c4.875 4.4531 11.953 5.6719 18 3.0938 6.0938-2.5781 10.125-8.4844 10.312-15.094v-236.53c0.046875-4.6406-1.875-9.0938-5.25-12.281-3.4219-3.2344-7.9688-4.875-12.609-4.6406zm418.45-337.69c-19.594 18.141-28.406 45.094-23.297 71.297 5.8125 30.141-1.125 61.359-19.172 86.156-18 24.844-45.516 41.109-75.984 44.906-26.25 3.2812-48.891 19.875-60 43.922v0.70312c-13.219 27.797-37.359 48.844-66.656 58.125-29.344 9.3281-61.219 6.0469-88.031-9.0469-23.203-13.078-51.562-13.078-74.766 0-26.812 14.812-58.5 17.859-87.656 8.4375-29.156-9.375-53.062-30.422-66.188-58.125-11.062-24-33.75-40.594-60-43.922-30.422-3.7969-57.984-20.016-76.031-44.859s-25.031-56.016-19.219-86.156c5.2031-26.109-3.5156-53.016-23.062-71.062-22.406-21-35.109-50.391-35.109-81.094 0-30.75 12.703-60.094 35.109-81.141 19.688-17.953 28.547-44.906 23.297-71.016-5.8125-30.047 0.98438-61.125 18.844-85.922 17.859-24.797 45.188-41.156 75.469-45.141 26.203-3.4219 48.844-19.969 60-43.922 12.984-27.938 37.031-49.266 66.328-58.781 29.297-9.5625 61.266-6.4688 88.219 8.4844 23.203 13.125 51.562 13.125 74.766 0 26.859-14.766 58.547-17.812 87.703-8.3906 29.156 9.4219 53.109 30.422 66.281 58.078 11.109 24.375 34.125 41.25 60.703 44.531 30.469 3.7031 57.984 19.875 76.031 44.672 18.047 24.844 24.984 56.016 19.125 86.109-5.1094 26.156 3.6562 53.062 23.156 71.156 22.5 20.953 35.25 50.297 35.297 81 0 30.703-12.703 60.047-35.156 81zm-22.453-137.26c-28.031-25.969-40.641-64.594-33.375-102.14 4.125-20.953-0.65625-42.703-13.172-60.047-12.562-17.297-31.734-28.641-52.922-31.266-37.875-4.4062-70.734-28.125-86.906-62.625-9.0938-19.359-25.828-34.078-46.172-40.641s-42.516-4.4062-61.219 5.9531c-33.375 18.469-73.922 18.469-107.3 0-18.656-10.359-40.781-12.516-61.078-5.9531-20.344 6.5625-36.984 21.281-46.078 40.641-16.031 34.453-48.75 58.125-86.484 62.625-21.234 2.625-40.406 13.969-52.969 31.219-12.562 17.297-17.438 39-13.406 60 7.4062 37.5-5.1562 76.172-33.141 102.23-15.656 14.531-24.516 34.969-24.516 56.344s8.8594 41.766 24.516 56.344c28.078 25.922 40.688 64.594 33.281 102.09-4.125 21.047 0.65625 42.797 13.266 60.141 12.562 17.297 31.828 28.641 53.062 31.172 37.688 4.5469 70.406 28.172 86.531 62.531 9 19.406 25.688 34.172 46.031 40.734 20.297 6.5625 42.469 4.4062 61.125-6.0469 33.375-18.469 73.922-18.469 107.3 0 18.656 10.453 40.875 12.656 61.219 6.0469 20.391-6.5625 37.125-21.328 46.172-40.734v-0.70312c16.219-34.312 48.938-57.891 86.625-62.391 21.234-2.5781 40.453-13.875 53.016-31.172s17.344-39.047 13.219-60.047c-7.2656-37.453 5.25-75.984 33.141-102 15.562-14.531 24.422-34.828 24.469-56.109s-8.7188-41.625-24.234-56.203zm-106.55 56.297v-0.046875c0 63.891-25.312 125.11-70.406 170.29-45.094 45.188-106.31 70.594-170.16 70.688-63.844 0.09375-125.11-25.219-170.34-70.266-45.188-45.094-70.688-106.31-70.781-170.16-0.14062-63.844 25.125-125.11 70.172-170.34 45.047-45.234 106.22-70.734 170.06-70.922 63.844 0.09375 125.02 25.5 170.16 70.594 45.141 45.141 70.547 106.31 70.688 170.11zm-110.39-17.062-38.766-75c-2.9062-5.625-8.7188-9.1406-15-9.1406h-153.98c-6.375-0.046875-12.188 3.4688-15.094 9.1406l-38.766 75c-3.0938 6-2.2969 13.312 2.0156 18.469l115.45 140.39c3.1406 3.9375 7.9219 6.2344 12.938 6.2812 5.1094-0.046875 9.9844-2.3438 13.219-6.2812l115.45-140.39c3.9844-5.2969 4.7344-12.422 1.9219-18.469zm-131.06 121.55 79.781-97.078h-159.56zm-66.469-171.47-21.375 41.156h175.69l-21.234-41.156z"
                headingHeadingText={
                  <_Builtin.Paragraph>
                    {"Award-Winning Construction, "}
                    <_Builtin.Strong>{"Proven Results"}</_Builtin.Strong>
                  </_Builtin.Paragraph>
                }
                paragraphParagraphText={
                  <_Builtin.Paragraph>
                    {
                      "From safety certifications to industry honors, our accolades reflect our unwavering commitment to quality, integrity, and innovation."
                    }
                  </_Builtin.Paragraph>
                }
                buttonGroupButtonGroupVisibility={false}
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "career_video")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "intro_section_visual",
                    "u-visual-wrap",
                    "u-vflex-center-center"
                  )}
                  id={_utils.cx(
                    _styles,
                    "w-node-_70d78d87-9f81-970c-c057-8bdc3b64b0ee-35f01aad"
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "open_portfolio_button")}
                    tag="div"
                    data-lightbox-trigger="intro-video"
                  >
                    <BtnPlay
                      text="Play Intro Video"
                      dataTrigger="career-video"
                    />
                  </_Builtin.Block>
                  <_Builtin.NotSupported _atom="LightboxWrapper" />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Grid
              className={_utils.cx(
                _styles,
                "accolades_list",
                "u-grid-column-3",
                "u-gap-small"
              )}
              id={_utils.cx(
                _styles,
                "w-node-_5ad7d8eb-4205-e537-edce-7b5435f01abf-35f01aad"
              )}
              tag="div"
            >
              <_Builtin.Block
                id={_utils.cx(
                  _styles,
                  "w-node-ea537d5d-2efe-cc2a-7269-f92c96380f21-35f01aad"
                )}
                tag="div"
              >
                <AccoladesLogo accoladesLogo="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c61e777e3b430e58ac4715_65cbd27871ca99f3226c3f77_BestCo23Logo%20(1)-p-800.webp" />
              </_Builtin.Block>
              <_Builtin.Block
                id={_utils.cx(
                  _styles,
                  "w-node-d6d7271e-faea-98a9-0427-588b8e3c5ee7-35f01aad"
                )}
                tag="div"
              >
                <AccoladesLogo accoladesLogo="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c61e7729cc42595980e3a5_66df452228a0c965538d770a_BestCo24Logo-p-800.webp" />
              </_Builtin.Block>
              <_Builtin.Block
                id={_utils.cx(
                  _styles,
                  "w-node-d60fb763-d8e3-808b-5b2f-8b27b4526685-35f01aad"
                )}
                tag="div"
              >
                <AccoladesLogo accoladesLogo="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c622428a391cad2b24cff4_66e2fca51c66e53ea5843efa_VFB%20SILVER-p-800.webp" />
              </_Builtin.Block>
            </_Builtin.Grid>
          </_Builtin.Grid>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
