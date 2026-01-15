"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalVisual } from "./GlobalVisual";
import { IconSvgWrap } from "./IconSvgWrap";
import { IconCloseIcon } from "./IconCloseIcon";
import { GlobalContent } from "./GlobalContent";
import * as _utils from "./utils";
import _styles from "./ElementTeamMemberItem.module.css";

export function ElementTeamMemberItem({
  as: _Component = _Builtin.Block,
  imageFile = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg",
  imageAltText = "__wf_reserved_inherit",
  title = "Owner",
  shortDescription = "",
  nameTitle = "",
  modalVisibility = false,

  linkedInUrl = {
    href: "#",
    target: "_blank",
  },

  linkedInVisibility = true,
  slot,
  name = "Owner",

  globalTeamMemberPage = {
    href: "#",
  },
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "team_members_cms_img")}
      tag="div"
      data-theme="dark"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "team_member_image_wrap",
          "u-visual-wrap"
        )}
        tag="div"
      >
        <GlobalVisual
          imageImageFile={imageFile}
          imageImageAltText={imageAltText}
          position="is-position-top"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "team_member_overlay",
          "u-cover-absolute",
          "u-hflex-between-bottom",
          "u-gap-small"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "team_member_overlay_content",
            "u-vflex-left-bottom",
            "u-gap-xsmall"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "team_member_name", "u-text-h2")}
            tag="div"
          >
            {name}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "team_member_title", "g_styled_bold")}
            tag="div"
          >
            {title}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "team_hover_btn")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "team_hover_btn_item")}
            tag="div"
          >
            <IconSvgWrap
              viewbox="0 0 1200 1200"
              path1="m600.1 0.046875c-330.89 0-600.1 269.21-600.1 600.1 0 330.89 269.21 599.81 600.1 599.81 330.89 0 599.9-268.92 599.9-599.81s-268.97-600.1-599.9-600.1zm0 75c290.39 0 524.81 234.74 524.81 525.1 0 290.39-234.47 524.81-524.81 524.81-290.39 0-525.05-234.47-525.05-524.81 0-290.39 234.66-525.1 525.05-525.1zm0 222v-0.046875c-9.9375-0.046875-19.5 3.8906-26.578 10.922-7.0312 7.0312-11.016 16.547-11.062 26.531v228.05h-228.05c-9.9844-0.046875-19.594 3.9375-26.672 10.969-7.0781 7.0781-11.016 16.688-10.969 26.672 0.046875 9.9375 4.0312 19.453 11.062 26.484 7.0781 6.9844 16.641 10.922 26.578 10.875h228.05v228.14c-0.046875 9.9844 3.9375 19.594 11.016 26.672 7.0312 7.0312 16.641 11.016 26.625 10.969 9.9844 0 19.5-3.9844 26.531-11.062s10.969-16.641 10.922-26.578v-228.14h228.05c9.9375 0.046875 19.5-3.8906 26.578-10.875 7.0312-7.0312 11.016-16.547 11.062-26.484 0.046875-9.9844-3.8906-19.594-10.969-26.672-7.0781-7.0312-16.688-11.016-26.672-10.969h-228.05v-228.05c-0.046875-20.672-16.781-37.406-37.453-37.453z"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "img_overlay", "g_visual_overlay")}
          tag="div"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "team_hover_wrap", "u-vflex-left-bottom")}
        tag="div"
      >
        <IconCloseIcon />
        <_Builtin.NotSupported _atom="Slot" />
        <_Builtin.Block
          className={_utils.cx(_styles, "spacer-xsmall")}
          tag="div"
        />
        <GlobalContent
          eyebrowPlainText={title}
          headingHeadingText={nameTitle}
          paragraphParagraphText={shortDescription}
          button1Button1Link={globalTeamMemberPage}
          headingStyle="u-text-h3"
          eyebrowPlainTextVisibiliity={true}
          eyebrowRichTextVisibility={false}
          buttonGroupButtonGroupVisibility={true}
          eyebrowEyebrowVisibility={true}
          eyebrowFeaturedText="Our Team"
          eyebrowIconPath1="M600 542.63c67.5 0 122.26-54.938 122.26-122.44S667.51 297.93 600 297.93s-122.26 54.938-122.26 122.26c0 67.32 54.75 122.44 122.26 122.44m233.81 276.56-15.188-84.562c-3.937-29.25-15.562-56.062-32.812-78-7.875-9.937-16.875-18.938-26.812-26.625-27.562-21.938-62.062-34.875-99.375-34.875h-119.25c-37.312 0-72 12.938-99.562 34.875a149 149 0 0 0-26.625 26.625c-17.25 21.75-28.875 48.188-32.625 77.062l-15.375 85.5-6.938 37.5-4.125 23.25c-.937 5.438.563 11.062 4.125 15.375s8.813 6.75 14.438 6.75h452.63c5.625 0 10.875-2.437 14.438-6.75s5.063-9.937 4.125-15.375l-4.125-23.25zM303.94 534.37c58.688 0 106.5-47.625 106.5-106.31s-47.812-106.31-106.5-106.31-106.31 47.625-106.31 106.31 47.812 106.31 106.31 106.31m80.8 99c6.375-8.437 13.688-16.312 21.75-23.438-16.125-6.75-33.75-10.312-51.938-10.312h-101.06c-69.188 0-128.26 51.938-137.06 119.44L94.12 834.37c-1.125 5.437.375 11.062 3.938 15.375s8.812 6.937 14.438 6.937h208.69l1.125-6.562 5.625-30.938 1.312-6.75 15.375-85.312c3.938-30.375 15.938-60.75 34.875-86.812a96 96 0 0 1 5.25-6.938zm511.32-99c58.5 0 106.31-47.625 106.31-106.31s-47.812-106.31-106.31-106.31-106.5 47.625-106.5 106.31 47.812 106.31 106.5 106.31m187.64 185.82c-9-68.625-68.062-120.56-137.26-120.56H845.38c-18.188 0-35.812 3.563-52.125 10.312 7.688 6.938 15.188 14.812 21.938 23.438 1.688 2.25 3.563 4.5 5.063 6.938 18.938 26.25 31.125 56.812 35.438 89.25l15 83.062 1.312 6.562 5.625 30.75 1.125 6.75h208.69c5.625 0 10.875-2.625 14.438-6.937s5.063-9.938 3.938-15.375z"
          eyebrowEyebrowIconViewbox="0 0 1200 1200"
          button1Button1Text="Read Full Bio"
          button2Button2Visibility={false}
          button1IconSvgPath1="m1005 217.5h-810c-62.027 0-112.5 50.473-112.5 112.5v540c0 62.027 50.473 112.5 112.5 112.5h810c62.027 0 112.5-50.473 112.5-112.5v-540c0-62.027-50.473-112.5-112.5-112.5zm-450 562.5c0 37.223-30.277 67.5-67.5 67.5h-225c-37.223 0-67.5-30.277-67.5-67.5v-45c0-86.832 70.656-157.5 157.5-157.5h22.5c-62.137 0-112.5-50.363-112.5-112.5s50.363-112.5 112.5-112.5 112.5 50.363 112.5 112.5-50.363 112.5-112.5 112.5h22.5c86.844 0 157.5 70.668 157.5 157.5zm337.5-22.5h-225c-12.422 0-22.5-10.066-22.5-22.5s10.078-22.5 22.5-22.5h225c12.422 0 22.5 10.066 22.5 22.5s-10.078 22.5-22.5 22.5zm90-135h-315c-12.422 0-22.5-10.078-22.5-22.5s10.078-22.5 22.5-22.5h315c12.422 0 22.5 10.078 22.5 22.5s-10.078 22.5-22.5 22.5zm0-135h-315c-12.422 0-22.5-10.078-22.5-22.5s10.078-22.5 22.5-22.5h315c12.422 0 22.5 10.078 22.5 22.5s-10.078 22.5-22.5 22.5z"
          button1IconViewbox="0 0 1200 1200"
          button1IconVisibility={true}
        />
      </_Builtin.Block>
      {modalVisibility ? (
        <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%0A%2F*%20Show%20modal%20inside%20Webflow%20Designer%20*%2F%0A.wf-design-mode%20.team_hover_wrap%20%7B%0A%20%20transform%3A%20translateY(0)%20!important%3B%0A%20%20opacity%3A%201%20!important%3B%0A%20%20display%3A%20block%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%7D%0A%0A%3C%2Fstyle%3E" />
      ) : null}
    </_Component>
  );
}
