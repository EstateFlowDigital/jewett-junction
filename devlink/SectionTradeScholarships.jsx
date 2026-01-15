"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import * as _utils from "./utils";
import _styles from "./SectionTradeScholarships.module.css";

export function SectionTradeScholarships({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  slot,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "scholarship_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
      id="scholarships"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "scholarship_contain", "u-container")}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "scholarship_layout",
            "u-grid-column-3",
            "u-gap-medium"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "scholarship_content", "u-column-2")}
            id={_utils.cx(
              _styles,
              "w-node-_938c5040-fe4c-5822-4b20-37e10954071c-635b7a82"
            )}
            tag="div"
          >
            <GlobalContent
              headingHeadingText={
                <_Builtin.Heading tag="h1">
                  <_Builtin.Strong>
                    {"Jewett Trades Scholarship:"}
                  </_Builtin.Strong>
                  {" Investing in the Future of Skilled Trades"}
                </_Builtin.Heading>
              }
              paragraphParagraphText={
                <>
                  <_Builtin.Paragraph>
                    <_Builtin.Emphasized>
                      {
                        "Jewett Construction is proud to offer a $3,000 scholarship for New Hampshire students pursuing careers in the skilled trades!"
                      }
                    </_Builtin.Emphasized>
                  </_Builtin.Paragraph>
                  <_Builtin.Heading tag="h3">
                    {"Why This Matters"}
                  </_Builtin.Heading>
                  <_Builtin.Paragraph>
                    {
                      "The skilled trades are the backbone of our communities, powering industries and shaping our future. At Jewett Construction, we believe in supporting the next generation of tradespeople by providing opportunities that help turn passion into a lifelong career."
                    }
                  </_Builtin.Paragraph>
                  <_Builtin.Heading tag="h3">
                    {"How We’re Spreading the Word"}
                  </_Builtin.Heading>
                  <_Builtin.Paragraph>
                    {"We’ve partnered with the "}
                    <_Builtin.Strong>
                      {
                        "New Hampshire Interscholastic Athletic Association (NHIAA)"
                      }
                    </_Builtin.Strong>
                    {
                      " to share details through school guidance and athletics departments. The scholarship will also be promoted during NHIAA championship games throughout the school year."
                    }
                  </_Builtin.Paragraph>
                  <_Builtin.Paragraph>
                    {"But we need your help, too! "}
                    <_Builtin.Strong>
                      {"Please share this opportunity with your networks"}
                    </_Builtin.Strong>
                    {
                      " to reach more students who are ready to take the next step in their trade careers."
                    }
                  </_Builtin.Paragraph>
                  <_Builtin.Heading tag="h3">{"How to Apply"}</_Builtin.Heading>
                  <_Builtin.Paragraph>
                    {"Interested students can "}
                    <_Builtin.Strong>
                      {"submit a written or video essay"}
                    </_Builtin.Strong>
                    {
                      " via the NHIAA website, sharing their passion for the trades and how this scholarship will support their career journey."
                    }
                  </_Builtin.Paragraph>
                  <_Builtin.Paragraph>
                    {
                      "Let’s come together to celebrate and support the incredible talent in New Hampshire. "
                    }
                    <_Builtin.Strong>
                      {
                        "Together, we’re building a stronger future for the skilled trades!"
                      }
                    </_Builtin.Strong>
                  </_Builtin.Paragraph>
                </>
              }
              paragraphStyless="u-text-large u-rich-text"
              paragraphParagraphMaxWidth="max-width: none;"
              button1Button1Text="👉 Apply for Scholarship"
              button2Button2Visibility={false}
              headingHeadingMaxWidth="max-width: none;"
              eyebrowEyebrowText={
                <_Builtin.Paragraph>
                  {"Supporting Tomorrow’s Skilled Workforce"}
                </_Builtin.Paragraph>
              }
              eyebrowIconPath1="M618.94 481.69c-6 2.063-12.375 3.188-18.938 3.188s-12.938-1.125-18.938-3.375l-255.19-91.125-37.5-13.5v181.31c0 7.875 5.063 15 12.375 17.625l86.625 30.938c10.875-9.938 22.5-18.938 34.688-27.188 50.812-34.5 112.12-54.562 177.94-54.562 65.809 0 127.13 20.062 177.94 54.562 12.188 8.25 23.812 17.25 34.688 27.188l86.625-30.938c7.313-2.625 12.375-9.75 12.375-17.625v-181.13l-37.5 13.5z M1087.5 261.1c0-2.297-.562-4.453-1.312-6.516-.282-.703-.657-1.312-.985-1.968-.703-1.313-1.5-2.532-2.437-3.61a19 19 0 0 0-1.641-1.734c-1.078-.985-2.344-1.735-3.61-2.438-.656-.375-1.265-.797-1.968-1.078-.14-.047-.281-.187-.469-.234l-468.74-167.44a18.78 18.78 0 0 0-12.609 0l-468.74 167.44c-7.453 2.672-12.469 9.703-12.469 17.672 0 7.922 4.969 15 12.47 17.672l468.74 167.44c2.015.75 4.171 1.078 6.28 1.078s4.266-.375 6.281-1.078l443.72-158.48v232.87c0 10.359 8.391 18.75 18.75 18.75s18.75-8.39 18.75-18.75v-259.55zM600 562.5c-155.06 0-281.26 126.19-281.26 281.26 0 155.06 126.19 281.26 281.26 281.26 155.06 0 281.26-126.19 281.26-281.26C881.26 688.7 755.07 562.5 600 562.5m0 487.5c-113.72 0-206.26-92.531-206.26-206.26 0-113.73 92.531-206.26 206.26-206.26s206.26 92.531 206.26 206.26C806.26 957.47 713.729 1050 600 1050 M600 675c-93.047 0-168.74 75.703-168.74 168.74 0 93.039 75.703 168.74 168.74 168.74s168.74-75.703 168.74-168.74C768.74 750.701 693.037 675 600 675m-18.75 150h37.5c31.031 0 56.25 25.219 56.25 56.25s-25.219 56.25-56.25 56.25v9.375c0 10.359-8.39 18.75-18.75 18.75s-18.75-8.39-18.75-18.75V937.5h-37.5c-10.359 0-18.75-8.39-18.75-18.75S533.39 900 543.75 900h75c10.359 0 18.75-8.39 18.75-18.75s-8.39-18.75-18.75-18.75h-37.5c-31.031 0-56.25-25.219-56.25-56.25S550.219 750 581.25 750v-9.375c0-10.359 8.39-18.75 18.75-18.75s18.75 8.39 18.75 18.75V750h37.5c10.359 0 18.75 8.39 18.75 18.75s-8.39 18.75-18.75 18.75h-75c-10.359 0-18.75 8.39-18.75 18.75S570.89 825 581.25 825"
              eyebrowEyebrowIconViewbox="0 0 1200 1200"
              eyebrowFeaturedText="Scholarships"
              button1Button1Link={{
                href: "https://www.nhiaa.org/students-parents/JewettConstruction",
                target: "_blank",
              }}
              paragraphParagraphVisibility={false}
              buttonGroupButtonGroupVisibility={false}
            />
          </_Builtin.Block>
          <_Builtin.NotSupported _atom="Slot" />
          <_Builtin.Block
            className={_utils.cx(_styles, "scholarship_content", "u-column-3")}
            tag="div"
          >
            <GlobalContent
              headingHeadingText={
                <_Builtin.Heading tag="h1">
                  <_Builtin.Strong>
                    {"Jewett Trades Scholarship:"}
                  </_Builtin.Strong>
                  {" Investing in the Future of Skilled Trades"}
                </_Builtin.Heading>
              }
              paragraphParagraphText={
                <>
                  <_Builtin.Paragraph>
                    <_Builtin.Emphasized>
                      {
                        "Jewett Construction is proud to offer a $3,000 scholarship for New Hampshire students pursuing careers in the skilled trades!"
                      }
                    </_Builtin.Emphasized>
                  </_Builtin.Paragraph>
                  <_Builtin.Heading tag="h3">
                    {"Why This Matters"}
                  </_Builtin.Heading>
                  <_Builtin.Paragraph>
                    {
                      "The skilled trades are the backbone of our communities, powering industries and shaping our future. At Jewett Construction, we believe in supporting the next generation of tradespeople by providing opportunities that help turn passion into a lifelong career."
                    }
                  </_Builtin.Paragraph>
                  <_Builtin.Heading tag="h3">
                    {"How We’re Spreading the Word"}
                  </_Builtin.Heading>
                  <_Builtin.Paragraph>
                    {"We’ve partnered with the "}
                    <_Builtin.Strong>
                      {
                        "New Hampshire Interscholastic Athletic Association (NHIAA)"
                      }
                    </_Builtin.Strong>
                    {
                      " to share details through school guidance and athletics departments. The scholarship will also be promoted during NHIAA championship games throughout the school year."
                    }
                  </_Builtin.Paragraph>
                  <_Builtin.Paragraph>
                    {"But we need your help, too! "}
                    <_Builtin.Strong>
                      {"Please share this opportunity with your networks"}
                    </_Builtin.Strong>
                    {
                      " to reach more students who are ready to take the next step in their trade careers."
                    }
                  </_Builtin.Paragraph>
                  <_Builtin.Heading tag="h3">{"How to Apply"}</_Builtin.Heading>
                  <_Builtin.Paragraph>
                    {"Interested students can "}
                    <_Builtin.Strong>
                      {"submit a written or video essay"}
                    </_Builtin.Strong>
                    {
                      " via the NHIAA website, sharing their passion for the trades and how this scholarship will support their career journey."
                    }
                  </_Builtin.Paragraph>
                  <_Builtin.Paragraph>
                    {
                      "Let’s come together to celebrate and support the incredible talent in New Hampshire. "
                    }
                    <_Builtin.Strong>
                      {
                        "Together, we’re building a stronger future for the skilled trades!"
                      }
                    </_Builtin.Strong>
                  </_Builtin.Paragraph>
                </>
              }
              paragraphStyless="u-text-large u-rich-text"
              paragraphParagraphMaxWidth="max-width: none;"
              button1Button1Text="👉 Apply for Scholarship"
              button2Button2Visibility={false}
              headingHeadingMaxWidth="max-width: none;"
              eyebrowEyebrowText={
                <_Builtin.Paragraph>
                  {"Supporting Tomorrow’s Skilled Workforce"}
                </_Builtin.Paragraph>
              }
              eyebrowIconPath1="M618.94 481.69c-6 2.063-12.375 3.188-18.938 3.188s-12.938-1.125-18.938-3.375l-255.19-91.125-37.5-13.5v181.31c0 7.875 5.063 15 12.375 17.625l86.625 30.938c10.875-9.938 22.5-18.938 34.688-27.188 50.812-34.5 112.12-54.562 177.94-54.562 65.809 0 127.13 20.062 177.94 54.562 12.188 8.25 23.812 17.25 34.688 27.188l86.625-30.938c7.313-2.625 12.375-9.75 12.375-17.625v-181.13l-37.5 13.5z M1087.5 261.1c0-2.297-.562-4.453-1.312-6.516-.282-.703-.657-1.312-.985-1.968-.703-1.313-1.5-2.532-2.437-3.61a19 19 0 0 0-1.641-1.734c-1.078-.985-2.344-1.735-3.61-2.438-.656-.375-1.265-.797-1.968-1.078-.14-.047-.281-.187-.469-.234l-468.74-167.44a18.78 18.78 0 0 0-12.609 0l-468.74 167.44c-7.453 2.672-12.469 9.703-12.469 17.672 0 7.922 4.969 15 12.47 17.672l468.74 167.44c2.015.75 4.171 1.078 6.28 1.078s4.266-.375 6.281-1.078l443.72-158.48v232.87c0 10.359 8.391 18.75 18.75 18.75s18.75-8.39 18.75-18.75v-259.55zM600 562.5c-155.06 0-281.26 126.19-281.26 281.26 0 155.06 126.19 281.26 281.26 281.26 155.06 0 281.26-126.19 281.26-281.26C881.26 688.7 755.07 562.5 600 562.5m0 487.5c-113.72 0-206.26-92.531-206.26-206.26 0-113.73 92.531-206.26 206.26-206.26s206.26 92.531 206.26 206.26C806.26 957.47 713.729 1050 600 1050 M600 675c-93.047 0-168.74 75.703-168.74 168.74 0 93.039 75.703 168.74 168.74 168.74s168.74-75.703 168.74-168.74C768.74 750.701 693.037 675 600 675m-18.75 150h37.5c31.031 0 56.25 25.219 56.25 56.25s-25.219 56.25-56.25 56.25v9.375c0 10.359-8.39 18.75-18.75 18.75s-18.75-8.39-18.75-18.75V937.5h-37.5c-10.359 0-18.75-8.39-18.75-18.75S533.39 900 543.75 900h75c10.359 0 18.75-8.39 18.75-18.75s-8.39-18.75-18.75-18.75h-37.5c-31.031 0-56.25-25.219-56.25-56.25S550.219 750 581.25 750v-9.375c0-10.359 8.39-18.75 18.75-18.75s18.75 8.39 18.75 18.75V750h37.5c10.359 0 18.75 8.39 18.75 18.75s-8.39 18.75-18.75 18.75h-75c-10.359 0-18.75 8.39-18.75 18.75S570.89 825 581.25 825"
              eyebrowEyebrowIconViewbox="0 0 1200 1200"
              eyebrowFeaturedText="Scholarships"
              button1Button1Link={{
                href: "https://www.nhiaa.org/students-parents/JewettConstruction",
                target: "_blank",
              }}
              eyebrowEyebrowVisibility={false}
              headingHeadingVisibility={false}
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
