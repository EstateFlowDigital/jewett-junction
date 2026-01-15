"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { ElementFaqSummaryDetailsItem } from "./ElementFaqSummaryDetailsItem";
import * as _utils from "./utils";
import _styles from "./SectionFaQs.module.css";

export function SectionFaQs({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  faqContentVisibility = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "faq_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "faq_css")}
        value="%3Cstyle%3E%0A.wf-design-mode%20.faq_content_wrap%20%7B%0A%09display%3A%20block%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "faq_contain", "u-container")}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "faq_layout",
            "u-vflex-stretch-top",
            "u-gap-medium"
          )}
          tag="div"
        >
          {faqContentVisibility ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "faq_content_wrap")}
              tag="div"
            >
              <GlobalContent
                eyebrowEyebrowIconViewbox="0 0 1200 1200"
                eyebrowIconPath1="m600 60c-298.18 0-540 241.82-540 540s241.82 540 540 540 540-241.82 540-540-241.82-540-540-540zm-3.0469 869.39c-29.859 0-54-24.141-54-54 0-29.719 24.141-53.812 54-53.812 29.719 0 53.812 24.141 53.812 53.812 0.046875 29.859-24.094 54-53.812 54zm104.81-325.5c-37.312 32.719-54.516 62.109-54.516 92.297 0 27.656-22.594 50.297-50.297 50.297-27.844 0-50.297-22.594-50.297-50.297 0-60.422 29.016-115.27 88.594-167.72 53.156-46.734 59.906-76.266 53.672-106.12-6.0938-29.719-43.547-51.141-88.922-51.141-3.1875 0-78.469 0.65625-92.156 61.078-6.0938 27-32.906 44.203-60.094 37.781-27-6.0938-44.062-32.906-37.969-60.094 25.031-110.02 131.34-139.36 190.22-139.36 94.312 0 171.47 54 187.5 131.29 19.734 96-39.516 161.29-85.734 201.98z"
                eyebrowFeaturedText="FAQ"
                eyebrowEyebrowText={
                  <_Builtin.Paragraph>
                    {"Additional Questions Answered"}
                  </_Builtin.Paragraph>
                }
                headingHeadingText={
                  <_Builtin.Heading tag="h2">
                    {"Find More "}
                    <_Builtin.Strong>
                      {"Answers to Your Questions"}
                    </_Builtin.Strong>
                  </_Builtin.Heading>
                }
                paragraphParagraphText={
                  <_Builtin.Paragraph>
                    {
                      "Get further clarity on our processes and services by exploring additional frequently asked questions. Our comprehensive answers are designed to guide you through every detail of our construction expertise."
                    }
                  </_Builtin.Paragraph>
                }
                buttonGroupButtonGroupVisibility={false}
                variant="Content is Center"
              />
            </_Builtin.Block>
          ) : null}
          <_Builtin.TabsWrapper
            className={_utils.cx(
              _styles,
              "faq_tabs",
              "u-vflex-stretch-top",
              "u-gap-medium"
            )}
            current="Tab 1"
            easing="ease"
            fadeIn={300}
            fadeOut={100}
          >
            <_Builtin.TabsMenu
              className={_utils.cx(
                _styles,
                "blog_navigation_layout",
                "u-hflex-left-stretch",
                "u-gap-small"
              )}
              tag="div"
            >
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "blog_btn", "u-button-style")}
                data-w-tab="Tab 1"
                block="inline"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "blog_btn_layout",
                    "u-gap-small",
                    "u-hflex-between-center",
                    "u-position-relative"
                  )}
                  tag="div"
                  aria-hidden="true"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "btn_main_text",
                      "u-weight-bold"
                    )}
                    tag="div"
                  >
                    {"General Construction Process"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "blog_btn", "u-button-style")}
                data-w-tab="Tab 2"
                block="inline"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "blog_btn_layout",
                    "u-gap-small",
                    "u-hflex-between-center",
                    "u-position-relative"
                  )}
                  tag="div"
                  aria-hidden="true"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "btn_main_text",
                      "u-weight-bold"
                    )}
                    tag="div"
                  >
                    {"Compliance & Site Preparation"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "blog_btn", "u-button-style")}
                data-w-tab="Tab 3"
                block="inline"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "blog_btn_layout",
                    "u-gap-small",
                    "u-hflex-between-center",
                    "u-position-relative"
                  )}
                  tag="div"
                  aria-hidden="true"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "btn_main_text",
                      "u-weight-bold"
                    )}
                    tag="div"
                  >
                    {"Budget, Cost & Financing"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "blog_btn", "u-button-style")}
                data-w-tab="Tab 4"
                block="inline"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "blog_btn_layout",
                    "u-gap-small",
                    "u-hflex-between-center",
                    "u-position-relative"
                  )}
                  tag="div"
                  aria-hidden="true"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "btn_main_text",
                      "u-weight-bold"
                    )}
                    tag="div"
                  >
                    {"Sustainability & Innovation"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "blog_btn", "u-button-style")}
                data-w-tab="Tab 5"
                block="inline"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "blog_btn_layout",
                    "u-gap-small",
                    "u-hflex-between-center",
                    "u-position-relative"
                  )}
                  tag="div"
                  aria-hidden="true"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "btn_main_text",
                      "u-weight-bold"
                    )}
                    tag="div"
                  >
                    {"Methodologies & Specialized Builds"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "blog_btn", "u-button-style")}
                data-w-tab="Tab 6"
                block="inline"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "blog_btn_layout",
                    "u-gap-small",
                    "u-hflex-between-center",
                    "u-position-relative"
                  )}
                  tag="div"
                  aria-hidden="true"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "btn_main_text",
                      "u-weight-bold"
                    )}
                    tag="div"
                  >
                    {"Project Execution & Risk Management"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "blog_btn", "u-button-style")}
                data-w-tab="Tab 7"
                block="inline"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "blog_btn_layout",
                    "u-gap-small",
                    "u-hflex-between-center",
                    "u-position-relative"
                  )}
                  tag="div"
                  aria-hidden="true"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "btn_main_text",
                      "u-weight-bold"
                    )}
                    tag="div"
                  >
                    {"Post-Construction & Maintenance"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.TabsLink>
            </_Builtin.TabsMenu>
            <_Builtin.TabsContent tag="div">
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "faq_tab_pane")}
                tag="div"
                data-w-tab="Tab 1"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "faq_cms_wrap")}
                  tag="div"
                  data-close-previous="true"
                  data-close-on-second-click="true"
                  data-open-on-hover="false"
                  data-open-by-default="false"
                >
                  <_Builtin.NotSupported _atom="DynamoWrapper" />
                </_Builtin.Block>
              </_Builtin.TabsPane>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "faq_tab_pane")}
                tag="div"
                data-w-tab="Tab 2"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "faq_cms_wrap")}
                  tag="div"
                  data-close-previous="true"
                  data-close-on-second-click="true"
                  data-open-on-hover="false"
                  data-open-by-default="false"
                >
                  <_Builtin.NotSupported _atom="DynamoWrapper" />
                </_Builtin.Block>
              </_Builtin.TabsPane>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "faq_tab_pane")}
                tag="div"
                data-w-tab="Tab 3"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "faq_cms_wrap")}
                  tag="div"
                  data-close-previous="true"
                  data-close-on-second-click="true"
                  data-open-on-hover="false"
                  data-open-by-default="false"
                >
                  <_Builtin.NotSupported _atom="DynamoWrapper" />
                </_Builtin.Block>
              </_Builtin.TabsPane>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "faq_tab_pane")}
                tag="div"
                data-w-tab="Tab 4"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "faq_cms_wrap")}
                  tag="div"
                  data-close-previous="true"
                  data-close-on-second-click="true"
                  data-open-on-hover="false"
                  data-open-by-default="false"
                >
                  <_Builtin.NotSupported _atom="DynamoWrapper" />
                </_Builtin.Block>
              </_Builtin.TabsPane>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "faq_tab_pane")}
                tag="div"
                data-w-tab="Tab 5"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "faq_cms_wrap")}
                  tag="div"
                  data-close-previous="true"
                  data-close-on-second-click="true"
                  data-open-on-hover="false"
                  data-open-by-default="false"
                >
                  <_Builtin.NotSupported _atom="DynamoWrapper" />
                </_Builtin.Block>
              </_Builtin.TabsPane>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "faq_tab_pane")}
                tag="div"
                data-w-tab="Tab 6"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "faq_cms_wrap")}
                  tag="div"
                  data-close-previous="true"
                  data-close-on-second-click="true"
                  data-open-on-hover="false"
                  data-open-by-default="false"
                >
                  <_Builtin.NotSupported _atom="DynamoWrapper" />
                </_Builtin.Block>
              </_Builtin.TabsPane>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "faq_tab_pane")}
                tag="div"
                data-w-tab="Tab 7"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "faq_cms_wrap")}
                  tag="div"
                  data-close-previous="true"
                  data-close-on-second-click="true"
                  data-open-on-hover="false"
                  data-open-by-default="false"
                >
                  <_Builtin.NotSupported _atom="DynamoWrapper" />
                </_Builtin.Block>
              </_Builtin.TabsPane>
            </_Builtin.TabsContent>
          </_Builtin.TabsWrapper>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "faq_js")}
        value="%3Cscript%20src%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fgsap%403.12.5%2Fdist%2Fgsap.min.js%22%3E%3C%2Fscript%3E%0A%3Cscript%3E%0Adocument.addEventListener(%22DOMContentLoaded%22%2C%20function()%20%7B%0A%20document.querySelectorAll(%22.faq_cms_wrap%22).forEach((cmsWrap%2C%20listIndex)%20%3D%3E%20%7B%0A%20if%20(cmsWrap.dataset.scriptInitialized)%20return%3B%0A%20cmsWrap.dataset.scriptInitialized%20%3D%20%22true%22%3B%0A%0A%20const%20closePrevious%20%3D%20cmsWrap.getAttribute(%22data-close-previous%22)%20!%3D%3D%20%22false%22%3B%0A%20const%20closeOnSecondClick%20%3D%20cmsWrap.getAttribute(%22data-close-on-second-click%22)%20!%3D%3D%20%22false%22%3B%0A%20const%20openOnHover%20%3D%20cmsWrap.getAttribute(%22data-open-on-hover%22)%20%3D%3D%3D%20%22true%22%3B%0A%20const%20openByDefault%20%3D%20cmsWrap.getAttribute(%22data-open-by-default%22)%20!%3D%3D%20null%20%26%26%20!isNaN(%2BcmsWrap.getAttribute(%22data-open-by-default%22))%20%3F%20%2BcmsWrap.getAttribute(%22data-open-by-default%22)%20%3A%20false%3B%0A%0A%20let%20previousIndex%20%3D%20null%2C%20closeFunctions%20%3D%20%5B%5D%3B%0A%0A%20cmsWrap.querySelectorAll(%22.faq_component%22).forEach((thisCard%2C%20cardIndex)%20%3D%3E%20%7B%0A%20const%20button%20%3D%20thisCard.querySelector(%22.faq_toggle_button%22)%3B%0A%20const%20content%20%3D%20thisCard.querySelector(%22.faq_content_wrap%22)%3B%0A%20const%20icon%20%3D%20thisCard.querySelector(%22.faq_toggle_icon%22)%3B%0A%0A%20if%20(!button%20%7C%7C%20!content%20%7C%7C%20!icon)%20return%20console.warn(%22Missing%20elements%3A%22%2C%20thisCard)%3B%0A%0A%20button.setAttribute(%22aria-expanded%22%2C%20%22false%22)%3B%0A%20button.setAttribute(%22id%22%2C%20%22faq_button_%22%20%2B%20listIndex%20%2B%20%22_%22%20%2B%20cardIndex)%3B%0A%20content.setAttribute(%22id%22%2C%20%22faq_content_%22%20%2B%20listIndex%20%2B%20%22_%22%20%2B%20cardIndex)%3B%0A%20button.setAttribute(%22aria-controls%22%2C%20content.id)%3B%0A%20content.setAttribute(%22aria-labelledby%22%2C%20button.id)%3B%0A%20content.style.display%20%3D%20%22none%22%3B%0A%0A%20const%20refresh%20%3D%20()%20%3D%3E%20%7B%20tl.invalidate()%3B%20if%20(typeof%20ScrollTrigger%20!%3D%3D%20%22undefined%22)%20ScrollTrigger.refresh()%3B%20%7D%3B%0A%20const%20tl%20%3D%20gsap.timeline(%7B%20paused%3A%20true%2C%20defaults%3A%20%7B%20duration%3A%200.3%2C%20ease%3A%20%22power1.inOut%22%20%7D%2C%20onComplete%3A%20refresh%2C%20onReverseComplete%3A%20refresh%20%7D)%3B%0A%20tl.set(content%2C%20%7B%20display%3A%20%22block%22%20%7D)%3B%0A%20tl.fromTo(content%2C%20%7B%20height%3A%200%20%7D%2C%20%7B%20height%3A%20%22auto%22%20%7D)%3B%0A%20tl.fromTo(icon%2C%20%7B%20rotate%3A%200%20%7D%2C%20%7B%20rotate%3A%20-180%20%7D%2C%20%22%3C%22)%3B%0A%0A%20const%20closeAccordion%20%3D%20()%20%3D%3E%20thisCard.classList.contains(%22is-opened%22)%20%26%26%20(thisCard.classList.remove(%22is-opened%22)%2C%20tl.reverse()%2C%20button.setAttribute(%22aria-expanded%22%2C%20%22false%22))%3B%0A%20closeFunctions%5BcardIndex%5D%20%3D%20closeAccordion%3B%0A%0A%20const%20openAccordion%20%3D%20(instant%20%3D%20false)%20%3D%3E%20%7B%0A%20if%20(closePrevious%20%26%26%20previousIndex%20!%3D%3D%20null%20%26%26%20previousIndex%20!%3D%3D%20cardIndex)%20closeFunctions%5BpreviousIndex%5D%3F.()%3B%0A%20previousIndex%20%3D%20cardIndex%3B%0A%09%09%09%09button.setAttribute(%22aria-expanded%22%2C%20%22true%22)%0A%20thisCard.classList.add(%22is-opened%22)%3B%0A%20instant%20%3F%20tl.progress(1)%20%3A%20tl.play()%3B%0A%20%7D%3B%0A%20if%20(openByDefault%20%3D%3D%3D%20cardIndex)%20openAccordion(true)%3B%0A%0A%20button.addEventListener(%22click%22%2C%20()%20%3D%3E%20thisCard.classList.contains(%22is-opened%22)%20%26%26%20closeOnSecondClick%20%3F%20(closeAccordion()%2C%20previousIndex%20%3D%20null)%20%3A%20openAccordion())%3B%0A%20if%20(openOnHover)%20button.addEventListener(%22mouseenter%22%2C%20()%20%3D%3E%20openAccordion())%3B%0A%20%7D)%3B%0A%20%7D)%3B%0A%7D)%3B%0A%3C%2Fscript%3E"
      />
    </_Component>
  );
}
