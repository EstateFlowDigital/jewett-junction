"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { ElementBlogFeedList } from "./ElementBlogFeedList";
import * as _utils from "./utils";
import _styles from "./SectionBlogFeed.module.css";

export function SectionBlogFeed({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  blogHeaderContentVisibility = false,
  styleCardTheme = "dark",
  variant = "Base",
  itemsToShow = 6,
}) {
  const _styleVariantMap = {
    Base: "",
    left: "w-variant-46dcd6f1-86e3-6653-d84b-c4babee091cb",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <_Component
      className={_utils.cx(_styles, "blog_feed_wrap", _activeStyleVariant)}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "blog_feed_contain",
          "u-container",
          "u-vflex-stretch-top",
          "u-gap-large",
          _activeStyleVariant
        )}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        {blogHeaderContentVisibility ? (
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "blog_section_content",
              _activeStyleVariant
            )}
            tag="div"
          >
            <GlobalContent
              eyebrowIconPath1="m934.87 564.84h-669.74v-63.75h669.71v63.75zm-441.89-272.02h587.02v728.53c0 13.266-10.828 24.094-24.094 24.094l-911.76 0.046875c-13.078 0-24.094-11.062-24.094-24.094v-673.6h324.1c7.7812 0 15.047-3.8906 19.359-10.406l29.484-44.531zm2.1562 387.66c0-12.844-10.406-23.203-23.203-23.203h-229.97c-12.844 0-23.203 10.406-23.203 23.203v229.92c0 12.844 10.406 23.203 23.203 23.203h229.97c12.844 0 23.203-10.406 23.203-23.203zm486.19 198.24c0-12.844-10.406-23.203-23.203-23.203h-366.98c-12.844 0-23.203 10.406-23.203 23.203 0 12.844 10.406 23.203 23.203 23.203h366.98c12.844 0 23.203-10.406 23.203-23.203zm0-84.984c0-12.844-10.406-23.203-23.203-23.203h-366.98c-12.844 0-23.203 10.406-23.203 23.203 0 12.844 10.406 23.203 23.203 23.203h366.98c12.844 0 23.203-10.406 23.203-23.203zm0-81.609c0-12.844-10.406-23.203-23.203-23.203h-366.98c-12.844 0-23.203 10.406-23.203 23.203 0 12.844 10.406 23.203 23.203 23.203h366.98c12.844 0 23.203-10.406 23.203-23.203zm-23.203-257.48h-716.21c-12.844 0-23.203 10.406-23.203 23.203v110.2c0 12.844 10.406 23.203 23.203 23.203h716.16c12.844 0 23.203-10.406 23.203-23.203v-110.2c0-12.844-10.406-23.203-23.203-23.203zm121.87-276.1v67.781h-599.48c-7.7812 0-15.047 3.8906-19.359 10.406l-29.484 44.531-311.63 0.046875v-122.72c0-13.266 10.828-24.094 24.094-24.094h911.76c13.266 0 24.094 10.828 24.094 24.094zm-840.89 49.312c0-12.797-10.406-23.203-23.203-23.203s-23.203 10.406-23.203 23.203 10.406 23.203 23.203 23.203 23.203-10.406 23.203-23.203zm72.844 0c0-12.797-10.5-23.203-23.297-23.203s-23.203 10.406-23.203 23.203 10.406 23.203 23.203 23.203 23.297-10.406 23.297-23.203zm72.797 0c0-12.797-10.406-23.203-23.297-23.203-12.844 0-23.203 10.406-23.203 23.203s10.406 23.203 23.203 23.203 23.297-10.406 23.297-23.203zm-119.58 659.26h183.52v-183.47h-183.52z"
              eyebrowEyebrowIconViewbox="0 0 1200 1200"
              eyebrowFeaturedText="Blog"
              eyebrowEyebrowText={
                <_Builtin.Paragraph>
                  {"Discover More Insights"}
                </_Builtin.Paragraph>
              }
              paragraphParagraphText={
                <_Builtin.Paragraph>
                  {
                    "Looking for further inspiration? Dive into our blog for a wealth of information on construction trends, expert advice, and project case studies. Expand your knowledge and discover new ways to innovate in your projects."
                  }
                </_Builtin.Paragraph>
              }
              headingHeadingText={
                <_Builtin.Heading tag="h2">
                  {"More to Read "}
                  <_Builtin.Strong>{"and Explore"}</_Builtin.Strong>
                </_Builtin.Heading>
              }
              buttonGroupButtonGroupVisibility={false}
            />
          </_Builtin.Block>
        ) : null}
        <ElementBlogFeedList
          styleCardTheme={styleCardTheme}
          itemsToShow={itemsToShow}
          sort={sort}
          filters={filters}
        />
      </_Builtin.Block>
    </_Component>
  );
}
