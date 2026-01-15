"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { ElementTeamMemberItem } from "./ElementTeamMemberItem";
import { IconArrowFull } from "./IconArrowFull";
import * as _utils from "./utils";
import _styles from "./SectionTeam.module.css";

export function SectionTeam({
  as: _Component = _Builtin.Section,
  contentHeading = "",
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  sectionVisibility = true,
  modalVisibility = false,
  globalContentParagraph = "",
}) {
  return sectionVisibility ? (
    <_Component
      className={_utils.cx(_styles, "team_members_section")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
      id="team"
    >
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%0A%2F*%20Initial%20state%20of%20the%20modal_wrap%3A%20hidden%20below%20the%20viewport%20*%2F%0A.team_hover_wrap%20%7B%0A%20%20position%3A%20absolute%3B%20%2F*%20Ensures%20the%20modal%20stays%20relative%20to%20the%20viewport%20*%2F%0A%20%20top%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20opacity%3A%200%3B%0A%0A%20%20%2F*%20Off-screen%20translation%20(slide%20down%20initially)%20*%2F%0A%20%20transform%3A%20translateY(105%25)%3B%0A%20%20%0A%20%20%2F*%20Smooth%20slide%20effect%20*%2F%0A%20%20transition%3A%20transform%200.6s%20cubic-bezier(0.23%2C%201%2C%200.32%2C%201)%3B%0A%7D%0A%0A%2F*%20When%20the%20modal_wrap%20is%20active%2C%20slide%20it%20into%20view%20*%2F%0A.team_hover_wrap.active%20%7B%0A%20%20transform%3A%20translateY(0)%3B%0A%20%20%20opacity%3A%20100%3B%0A%7D%0A%0A%3C%2Fstyle%3E" />
      <_Builtin.Block
        className={_utils.cx(_styles, "team_members_contain", "u-container")}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "team_members_content")}
          tag="div"
        >
          <GlobalContent
            headingHeadingText={contentHeading}
            paragraphParagraphText={globalContentParagraph}
            eyebrowIconPath1="M600 542.63c67.5 0 122.26-54.938 122.26-122.44S667.51 297.93 600 297.93s-122.26 54.938-122.26 122.26c0 67.32 54.75 122.44 122.26 122.44m233.81 276.56-15.188-84.562c-3.937-29.25-15.562-56.062-32.812-78-7.875-9.937-16.875-18.938-26.812-26.625-27.562-21.938-62.062-34.875-99.375-34.875h-119.25c-37.312 0-72 12.938-99.562 34.875a149 149 0 0 0-26.625 26.625c-17.25 21.75-28.875 48.188-32.625 77.062l-15.375 85.5-6.938 37.5-4.125 23.25c-.937 5.438.563 11.062 4.125 15.375s8.813 6.75 14.438 6.75h452.63c5.625 0 10.875-2.437 14.438-6.75s5.063-9.937 4.125-15.375l-4.125-23.25zM303.94 534.37c58.688 0 106.5-47.625 106.5-106.31s-47.812-106.31-106.5-106.31-106.31 47.625-106.31 106.31 47.812 106.31 106.31 106.31m80.8 99c6.375-8.437 13.688-16.312 21.75-23.438-16.125-6.75-33.75-10.312-51.938-10.312h-101.06c-69.188 0-128.26 51.938-137.06 119.44L94.12 834.37c-1.125 5.437.375 11.062 3.938 15.375s8.812 6.937 14.438 6.937h208.69l1.125-6.562 5.625-30.938 1.312-6.75 15.375-85.312c3.938-30.375 15.938-60.75 34.875-86.812a96 96 0 0 1 5.25-6.938zm511.32-99c58.5 0 106.31-47.625 106.31-106.31s-47.812-106.31-106.31-106.31-106.5 47.625-106.5 106.31 47.812 106.31 106.5 106.31m187.64 185.82c-9-68.625-68.062-120.56-137.26-120.56H845.38c-18.188 0-35.812 3.563-52.125 10.312 7.688 6.938 15.188 14.812 21.938 23.438 1.688 2.25 3.563 4.5 5.063 6.938 18.938 26.25 31.125 56.812 35.438 89.25l15 83.062 1.312 6.562 5.625 30.75 1.125 6.75h208.69c5.625 0 10.875-2.625 14.438-6.937s5.063-9.938 3.938-15.375z"
            eyebrowEyebrowIconViewbox="0 0 1200 1200"
            eyebrowEyebrowText={
              <_Builtin.Paragraph>{"Jewett's Leadership"}</_Builtin.Paragraph>
            }
            eyebrowFeaturedText="Our Team"
            buttonGroupButtonGroupVisibility={false}
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "team_members_wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "team_members_trim")}
            tag="div"
          >
            <_Builtin.NotSupported _atom="DynamoWrapper" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "team_members_layout")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "team_members_bullet_wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "team_members_bullet_item",
                  "is-active"
                )}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "team_members_bullet_item")}
                tag="div"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "team_members_btn_layout")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "team_members_btn_element",
                  "swiper-button-disabled",
                  "is-prev"
                )}
                tag="div"
              >
                <IconArrowFull />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "team_members_btn_element",
                  "is-next"
                )}
                tag="div"
              >
                <IconArrowFull />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "team_members_js")}
            value="%3Cscript%3E%0Adocument.addEventListener(%22DOMContentLoaded%22%2C%20()%20%3D%3E%20%7B%0A%20%20document.querySelectorAll(%22.team_members_wrap%22).forEach((wrap)%20%3D%3E%20%7B%0A%20%20%20%20%2F%2F%20%E2%94%80%E2%94%80%E2%94%80%201)%20One%E2%80%90time%20init%20guard%20%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%0A%20%20%20%20if%20(wrap.dataset.swiperInit)%20return%3B%0A%20%20%20%20wrap.dataset.swiperInit%20%3D%20%22true%22%3B%0A%0A%20%20%20%20%2F%2F%20%E2%94%80%E2%94%80%E2%94%80%202)%20Find%20the%20slider%20container%20%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%0A%20%20%20%20const%20container%20%3D%20wrap.querySelector(%22.team_members_cms_wrap%22)%3B%0A%20%20%20%20if%20(!container)%20%7B%0A%20%20%20%20%20%20console.warn(%22Cannot%20find%20.team_members_cms_wrap%20in%3A%22%2C%20wrap)%3B%0A%20%20%20%20%20%20return%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20%2F%2F%20%E2%94%80%E2%94%80%E2%94%80%203)%20Initialize%20Swiper%20%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%0A%20%20%20%20const%20swiper%20%3D%20new%20Swiper(container%2C%20%7B%0A%20%20%20%20%20%20slidesPerView%3A%20%20%20%22auto%22%2C%0A%20%20%20%20%20%20freeMode%3A%20%20%20%20%20%20%20%20false%2C%0A%20%20%20%20%20%20slideToClickedSlide%3A%20false%2C%20%2F%2F%20NO%20auto%E2%80%90advance%20on%20click%0A%20%20%20%20%20%20centeredSlides%3A%20%20false%2C%0A%20%20%20%20%20%20autoHeight%3A%20%20%20%20%20%20false%2C%0A%20%20%20%20%20%20speed%3A%20%20%20%20%20%20%20%20%20%20%20600%2C%0A%0A%20%20%20%20%20%20%2F%2F%20Require%20%E2%89%A55px%20drag%20to%20count%20as%20swipe%20(tiny%20taps%20won%E2%80%99t%20move)%0A%20%20%20%20%20%20threshold%3A%20%20%20%20%20%20%205%2C%0A%20%20%20%20%20%20shortSwipes%3A%20%20%20%20%20false%2C%0A%20%20%20%20%20%20longSwipes%3A%20%20%20%20%20%20true%2C%0A%0A%20%20%20%20%20%20%2F%2F%20Enable%20real%20touch%2Fmouse%20dragging%0A%20%20%20%20%20%20simulateTouch%3A%20%20%20true%2C%0A%20%20%20%20%20%20allowTouchMove%3A%20%20true%2C%0A%20%20%20%20%20%20touchStartPreventDefault%3A%20false%2C%0A%0A%20%20%20%20%20%20%2F%2F%20Don%E2%80%99t%20swallow%20click%20events%20so%20your%20own%20handlers%20fire%0A%20%20%20%20%20%20preventClicks%3A%20%20%20%20%20%20%20%20%20%20%20false%2C%0A%20%20%20%20%20%20preventClicksPropagation%3Afalse%2C%0A%0A%20%20%20%20%20%20%2F%2F%20Mousewheel%20%26%20keyboard%0A%20%20%20%20%20%20mousewheel%3A%20%7B%20forceToAxis%3A%20true%20%7D%2C%0A%20%20%20%20%20%20keyboard%3A%20%20%7B%20enabled%3A%20true%2C%20onlyInViewport%3A%20true%20%7D%2C%0A%0A%20%20%20%20%20%20%2F%2F%20Navigation%20arrows%0A%20%20%20%20%20%20navigation%3A%20%7B%0A%20%20%20%20%20%20%20%20nextEl%3A%20wrap.querySelector(%22.team_members_btn_element.is-next%22)%2C%0A%20%20%20%20%20%20%20%20prevEl%3A%20wrap.querySelector(%22.team_members_btn_element.is-prev%22)%2C%0A%20%20%20%20%20%20%7D%2C%0A%0A%20%20%20%20%20%20%2F%2F%20Pagination%20bullets%0A%20%20%20%20%20%20pagination%3A%20%7B%0A%20%20%20%20%20%20%20%20el%3A%20wrap.querySelector(%22.team_members_bullet_wrap%22)%2C%0A%20%20%20%20%20%20%20%20bulletClass%3A%20%20%20%20%20%20%20%22team_members_bullet_item%22%2C%0A%20%20%20%20%20%20%20%20bulletActiveClass%3A%20%22is-active%22%2C%0A%20%20%20%20%20%20%20%20bulletElement%3A%20%20%20%20%20%22button%22%2C%0A%20%20%20%20%20%20%20%20clickable%3A%20%20%20%20%20%20%20%20%20true%2C%0A%20%20%20%20%20%20%7D%2C%0A%0A%20%20%20%20%20%20%2F%2F%20Draggable%20scrollbar%0A%20%20%20%20%20%20scrollbar%3A%20%7B%0A%20%20%20%20%20%20%20%20el%3A%20wrap.querySelector(%22.team_members_draggable_wrap%22)%2C%0A%20%20%20%20%20%20%20%20draggable%3A%20%20%20%20%20true%2C%0A%20%20%20%20%20%20%20%20dragClass%3A%20%20%20%20%20%22team_members_draggable_handle%22%2C%0A%20%20%20%20%20%20%20%20snapOnRelease%3A%20true%2C%0A%20%20%20%20%20%20%7D%2C%0A%0A%20%20%20%20%20%20%2F%2F%20Active%E2%80%90state%20classes%0A%20%20%20%20%20%20slideActiveClass%3A%20%20%20%20%20%20%20%20%20%20%20%22is-active%22%2C%0A%20%20%20%20%20%20slideDuplicateActiveClass%3A%20%20%22is-active%22%2C%0A%20%20%20%20%7D)%3B%0A%0A%20%20%20%20%2F%2F%20%E2%94%80%E2%94%80%E2%94%80%204)%20Use%20Swiper%E2%80%99s%20own%20click%20event%20(fires%20before%20slide%20logic)%20%E2%94%80%E2%94%80%E2%94%80%0A%20%20%20%20swiper.on(%22click%22%2C%20(swiperInstance%2C%20e)%20%3D%3E%20%7B%0A%20%20%20%20%20%20const%20slide%20%3D%20swiperInstance.clickedSlide%3B%0A%20%20%20%20%20%20if%20(!slide)%20return%3B%0A%0A%20%20%20%20%20%20%2F%2F%20If%20they%20actually%20clicked%20a%20link%2Fbutton%2Fform%20control%2C%20bail%20out%3A%0A%20%20%20%20%20%20if%20(e.target.closest(%22a%2C%20button%2C%20input%2C%20select%2C%20textarea%2C%20label%22))%20%7B%0A%20%20%20%20%20%20%20%20return%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%2F%2F%20Otherwise%3A%20open%20the%20modal%20defined%20on%20the%20slide%0A%20%20%20%20%20%20const%20modalSelector%20%3D%20slide.dataset.modal%3B%0A%20%20%20%20%20%20if%20(modalSelector)%20%7B%0A%20%20%20%20%20%20%20%20const%20modal%20%3D%20document.querySelector(modalSelector)%3B%0A%20%20%20%20%20%20%20%20if%20(modal)%20modal.classList.add(%22is-open%22)%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%2F%2F%20Prevent%20any%20further%20click%20handling%20(just%20in%20case)%0A%20%20%20%20%20%20e.preventDefault()%3B%0A%20%20%20%20%20%20e.stopPropagation()%3B%0A%20%20%20%20%7D)%3B%0A%20%20%7D)%3B%0A%7D)%3B%0A%3C%2Fscript%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div" data-padding-bottom="main" />
    </_Component>
  ) : null;
}
