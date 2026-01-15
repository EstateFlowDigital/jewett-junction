"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { GlobalLogoMain } from "./GlobalLogoMain";
import { IconSvgWrap } from "./IconSvgWrap";
import { ElementNavDropdownSublink } from "./ElementNavDropdownSublink";
import { BtnMain } from "./BtnMain";
import { ElementDropdownNavLinksWrap } from "./ElementDropdownNavLinksWrap";
import { ElementNavbarBottomViewDesktop } from "./ElementNavbarBottomViewDesktop";
import { ElementNavLinkIsLarge } from "./ElementNavLinkIsLarge";
import * as _utils from "./utils";
import _styles from "./GlobalNavbar.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-21":{"id":"e-21","name":"","animationType":"custom","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-22"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".nav_dropdown_wrap","originalId":"bbbe17e9-af8f-cfc7-4c07-dca312365de0","appliesTo":"CLASS"},"targets":[{"selector":".nav_dropdown_wrap","originalId":"bbbe17e9-af8f-cfc7-4c07-dca312365de0","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1726618006769},"e-22":{"id":"e-22","name":"","animationType":"custom","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-4","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-21"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".nav_dropdown_wrap","originalId":"bbbe17e9-af8f-cfc7-4c07-dca312365de0","appliesTo":"CLASS"},"targets":[{"selector":".nav_dropdown_wrap","originalId":"bbbe17e9-af8f-cfc7-4c07-dca312365de0","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1726618006769},"e-52":{"id":"e-52","name":"","animationType":"custom","eventTypeId":"PAGE_SCROLL","action":{"id":"","actionTypeId":"GENERAL_CONTINUOUS_ACTION","config":{"actionListId":"a-12","affectedElements":{},"duration":0}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"wf-page-id","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"wf-page-id","appliesTo":"PAGE","styleBlockIds":[]}],"config":[{"continuousParameterGroupId":"a-12-p","smoothing":50,"startsEntering":true,"addStartOffset":false,"addOffsetValue":50,"startsExiting":false,"addEndOffset":false,"endOffsetValue":50}],"createdOn":1735781844193}},"actionLists":{"a-3":{"id":"a-3","title":"Navbar 7 dropdown [Open] [Desktop]","actionItemGroups":[{"actionItems":[{"id":"a-3-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".nav_dropdown_icon","selectorGuids":["313cff56-d8ae-fbf4-a454-22a22b58a867"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-3-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".dropdown_nav_background","selectorGuids":["814a8f30-09b1-cd22-db7d-f3b308291216"]},"yValue":0,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626161550593},"a-4":{"id":"a-4","title":"Navbar 7 dropdown [Close] [Desktop]","actionItemGroups":[{"actionItems":[{"id":"a-4-n","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".nav_dropdown_icon","selectorGuids":["313cff56-d8ae-fbf4-a454-22a22b58a867"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-4-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".dropdown_nav_background","selectorGuids":["814a8f30-09b1-cd22-db7d-f3b308291216"]},"yValue":-5.5,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626161607847},"a-12":{"id":"a-12","title":"Navbar Scroll","continuousParameterGroups":[{"id":"a-12-p","type":"SCROLL_PROGRESS","parameterLabel":"Scroll","continuousActionGroups":[{"keyframe":0,"actionItems":[{"id":"a-12-n-3","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"selector":".nav_wrap","selectorGuids":["1626b426-30ef-8cea-8e20-615991609077"]},"globalSwatchId":"--swatch--dark-navbar-initial","rValue":42,"bValue":42,"gValue":42,"aValue":0}}]},{"keyframe":3,"actionItems":[{"id":"a-12-n-4","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"selector":".nav_wrap","selectorGuids":["1626b426-30ef-8cea-8e20-615991609077"]},"globalSwatchId":"--swatch--dark","rValue":42,"bValue":42,"gValue":42,"aValue":1}}]}]}],"createdOn":1735781847818}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function GlobalNavbar({
  as: _Component = _Builtin.NavbarWrapper,
  styleTheme = "dark",
  turnOffForLandingPage = true,
  turnOnForLandingPage = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "nav_wrap")}
      tag="div"
      data-theme={styleTheme}
      config={{
        easing: "ease-in-quad",
        easing2: "ease-in-cubic",
        duration: 750,
        docHeight: true,
        noScroll: true,
        animation: "default",
        collapse: "all",
      }}
    >
      <_Builtin.Link
        className={_utils.cx(_styles, "nav_main-link_wrap")}
        button={false}
        block="inline"
        options={{
          href: "/#main",
        }}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "nav_2_main-link_text", "u-text-small")}
          tag="div"
        >
          {"Skip to main content"}
        </_Builtin.Block>
      </_Builtin.Link>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "nav_contain",
          "u-container",
          "u-hflex-between-stretch",
          "u-gap-xsmall",
          "u-container"
        )}
        tag="div"
      >
        <GlobalLogoMain />
        <_Builtin.Block
          className={_utils.cx(_styles, "desktop_menu_wrap", "u-weight-bold")}
          tag="div"
        >
          <_Builtin.List
            className={_utils.cx(
              _styles,
              "nav_menu_list",
              "u-hflex-right-center",
              "u-gap-xsmall",
              "u-gap-small"
            )}
            tag="ul"
            unstyled={true}
          >
            {turnOffForLandingPage ? (
              <_Builtin.ListItem
                className={_utils.cx(_styles, "nav_menu_link-item")}
              >
                <_Builtin.Link
                  className={_utils.cx(
                    _styles,
                    "nav_link_wrap",
                    "u-hflex-right-center"
                  )}
                  button={false}
                  block="inline"
                  options={{
                    href: "#",
                  }}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "nav_link_text")}
                    tag="div"
                  >
                    {"Home"}
                  </_Builtin.Block>
                </_Builtin.Link>
              </_Builtin.ListItem>
            ) : null}
            {turnOffForLandingPage ? (
              <_Builtin.ListItem
                className={_utils.cx(
                  _styles,
                  "nav_menu_link-item",
                  "u-hflex-center-stretch"
                )}
              >
                <_Builtin.DropdownWrapper
                  className={_utils.cx(
                    _styles,
                    "nav_dropdown_wrap",
                    "u-width-full"
                  )}
                  tag="div"
                  delay={0}
                  hover={false}
                >
                  <_Builtin.DropdownToggle
                    className={_utils.cx(_styles, "nav_dropdown_toggle")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "nav_dropdown_text")}
                      tag="div"
                    >
                      {"About"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "nav_dropdown_icon")}
                      tag="div"
                    >
                      <IconSvgWrap
                        path1="m599.29 855.73 403.78-454.78h-807.55zm-405.2-471.78h810.39v-41.086h-810.39z"
                        viewbox="0 0 1200 1200"
                      />
                    </_Builtin.Block>
                  </_Builtin.DropdownToggle>
                  <_Builtin.DropdownList
                    className={_utils.cx(_styles, "nav_dropdown_content")}
                    tag="nav"
                    data-theme="light"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "dropdown_content_wrap",
                        "u-vflex-stretch-top",
                        "u-gap-medium"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "dropdown_content_contain",
                          "u-container"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "nav_dropdown_content_wrap"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "nav_dropdown_contain",
                              "u-container"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "nav_dropdown_layout",
                                "u-vflex-stretch-top",
                                "u-gap-medium"
                              )}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "footer_nav_wrap",
                                  "u-weight-bold",
                                  "u-text-large"
                                )}
                                tag="nav"
                              >
                                <ElementNavDropdownSublink
                                  text="About Jewett"
                                  link={{
                                    href: "#",
                                  }}
                                />
                                <ElementNavDropdownSublink
                                  text="Meet the Team"
                                  link={{
                                    href: "/about#team",
                                  }}
                                />
                                <ElementNavDropdownSublink
                                  text="The Jewett Experience"
                                  link={{
                                    href: "/about#the-jewett-difference",
                                  }}
                                />
                                <ElementNavDropdownSublink
                                  text="The Jewett Safety Promise"
                                  link={{
                                    href: "/about#jewett-safety-promise",
                                  }}
                                />
                                <ElementNavDropdownSublink
                                  text="Why Choose Jewett"
                                  link={{
                                    href: "/about#why-choose-jewett",
                                  }}
                                />
                                <ElementNavDropdownSublink
                                  text="Jewett Trade Scholarships"
                                  link={{
                                    href: "#",
                                  }}
                                />
                                <ElementNavDropdownSublink
                                  text="Subcontractors"
                                  link={{
                                    href: "#",
                                  }}
                                />
                                <ElementNavDropdownSublink
                                  text="Careers"
                                  link={{
                                    href: "https://jewett-careers.webflow.io/",
                                    target: "_blank",
                                  }}
                                />
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.DropdownList>
                </_Builtin.DropdownWrapper>
              </_Builtin.ListItem>
            ) : null}
            {turnOffForLandingPage ? (
              <_Builtin.ListItem
                className={_utils.cx(
                  _styles,
                  "nav_menu_link-item",
                  "u-hflex-center-stretch"
                )}
              >
                <_Builtin.DropdownWrapper
                  className={_utils.cx(
                    _styles,
                    "nav_dropdown_wrap",
                    "u-width-full"
                  )}
                  tag="div"
                  delay={0}
                  hover={false}
                >
                  <_Builtin.DropdownToggle
                    className={_utils.cx(_styles, "nav_dropdown_toggle")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "nav_dropdown_text")}
                      tag="div"
                    >
                      {"Services"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "nav_dropdown_icon")}
                      tag="div"
                    >
                      <IconSvgWrap
                        path1="m599.29 855.73 403.78-454.78h-807.55zm-405.2-471.78h810.39v-41.086h-810.39z"
                        viewbox="0 0 1200 1200"
                      />
                    </_Builtin.Block>
                  </_Builtin.DropdownToggle>
                  <_Builtin.DropdownList
                    className={_utils.cx(_styles, "nav_dropdown_content")}
                    tag="nav"
                    data-theme="light"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "dropdown_content_wrap",
                        "u-vflex-stretch-top",
                        "u-gap-medium"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "dropdown_content_contain",
                          "u-container"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "nav_dropdown_content_wrap"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "nav_dropdown_contain",
                              "u-container"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "nav_dropdown_layout",
                                "u-vflex-stretch-top",
                                "u-gap-medium"
                              )}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "footer_nav_wrap",
                                  "u-weight-bold",
                                  "u-text-large"
                                )}
                                tag="nav"
                              >
                                <_Builtin.NotSupported _atom="DynamoWrapper" />
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.DropdownList>
                </_Builtin.DropdownWrapper>
              </_Builtin.ListItem>
            ) : null}
            {turnOffForLandingPage ? (
              <_Builtin.ListItem
                className={_utils.cx(
                  _styles,
                  "nav_menu_link-item",
                  "u-hflex-center-stretch"
                )}
              >
                <_Builtin.DropdownWrapper
                  className={_utils.cx(
                    _styles,
                    "nav_dropdown_wrap",
                    "u-width-full"
                  )}
                  tag="div"
                  delay={0}
                  hover={false}
                >
                  <_Builtin.DropdownToggle
                    className={_utils.cx(_styles, "nav_dropdown_toggle")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "nav_dropdown_text")}
                      tag="div"
                    >
                      {"Our Work"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "nav_dropdown_icon")}
                      tag="div"
                    >
                      <IconSvgWrap
                        path1="m599.29 855.73 403.78-454.78h-807.55zm-405.2-471.78h810.39v-41.086h-810.39z"
                        viewbox="0 0 1200 1200"
                      />
                    </_Builtin.Block>
                  </_Builtin.DropdownToggle>
                  <_Builtin.DropdownList
                    className={_utils.cx(_styles, "nav_dropdown_content")}
                    tag="nav"
                    data-theme="light"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "dropdown_content_wrap",
                        "u-vflex-stretch-top",
                        "u-gap-medium"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "dropdown_content_contain",
                          "u-container"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "nav_dropdown_content_wrap"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "nav_dropdown_contain",
                              "u-container"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "nav_dropdown_layout",
                                "u-vflex-stretch-top",
                                "u-gap-medium"
                              )}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "footer_nav_wrap",
                                  "u-weight-bold",
                                  "u-text-large"
                                )}
                                tag="nav"
                              >
                                <ElementNavDropdownSublink
                                  text="Our Projects"
                                  link={{
                                    href: "#",
                                  }}
                                />
                                <ElementNavDropdownSublink
                                  text="Industries We Serve"
                                  link={{
                                    href: "#",
                                  }}
                                />
                                <ElementNavDropdownSublink
                                  text="Where We Build"
                                  link={{
                                    href: "#",
                                  }}
                                />
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.DropdownList>
                </_Builtin.DropdownWrapper>
              </_Builtin.ListItem>
            ) : null}
            {turnOffForLandingPage ? (
              <_Builtin.ListItem
                className={_utils.cx(_styles, "nav_menu_link-item")}
              >
                <_Builtin.Link
                  className={_utils.cx(
                    _styles,
                    "nav_link_wrap",
                    "u-hflex-right-center"
                  )}
                  button={false}
                  block="inline"
                  options={{
                    href: "https://jewett-careers.webflow.io/",
                  }}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "nav_link_text")}
                    tag="div"
                  >
                    {"Careers"}
                  </_Builtin.Block>
                </_Builtin.Link>
              </_Builtin.ListItem>
            ) : null}
            {turnOffForLandingPage ? (
              <_Builtin.ListItem
                className={_utils.cx(
                  _styles,
                  "nav_menu_btn-item",
                  "u-hflex-right-center",
                  "u-gap-xsmall",
                  "",
                  "u-gap-small"
                )}
              >
                <BtnMain
                  subtextVisibility={false}
                  buttonSizeIsSmall="is-small"
                  iconIconVisibility={true}
                  text="Contact Us"
                />
              </_Builtin.ListItem>
            ) : null}
          </_Builtin.List>
        </_Builtin.Block>
        {turnOnForLandingPage ? (
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "nav_menu_btn-item",
              "u-hflex-right-center"
            )}
            tag="div"
          >
            <BtnMain
              subtextVisibility={false}
              buttonSizeIsSmall="is-small"
              iconIconVisibility={true}
              text="Start the Conversation "
              link={{
                href: "#get-started",
              }}
            />
          </_Builtin.Block>
        ) : null}
        {turnOffForLandingPage ? (
          <_Builtin.NavbarMenu
            className={_utils.cx(
              _styles,
              "nav_menu_wrap",
              "u-hflex-center-stretch",
              "u-weight-bold"
            )}
            tag="nav"
            role="navigation"
            data-theme="dark"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "nav_menu_contain",
                "u-container",
                "u-height-screen",
                "u-vflex-stretch-center",
                "u-gap-medium"
              )}
              tag="div"
            >
              <_Builtin.List
                className={_utils.cx(
                  _styles,
                  "u-gap-xsmall",
                  "u-gap-small",
                  "nav_menu_layout",
                  "u-grid-autofit",
                  "u-gap-medium"
                )}
                tag="ul"
                unstyled={true}
              >
                <_Builtin.ListItem
                  className={_utils.cx(
                    _styles,
                    "nav_menu_link-item",
                    "u-hflex-center-stretch"
                  )}
                  id={_utils.cx(
                    _styles,
                    "w-node-_8aec71d6-2a2c-f923-74aa-51e070d4fec3-12365dd7"
                  )}
                >
                  <ElementNavLinkIsLarge
                    navLinkText="Home"
                    navLinkUrl={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(
                    _styles,
                    "nav_menu_link-item",
                    "u-hflex-center-stretch"
                  )}
                >
                  <ElementNavLinkIsLarge
                    navLinkText="About Us"
                    navLinkUrl={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(
                    _styles,
                    "nav_menu_link-item",
                    "u-hflex-center-stretch"
                  )}
                >
                  <ElementNavLinkIsLarge
                    navLinkText="Our Work"
                    navLinkUrl={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(
                    _styles,
                    "nav_menu_link-item",
                    "u-hflex-center-stretch"
                  )}
                >
                  <ElementNavLinkIsLarge
                    navLinkText="Services"
                    navLinkUrl={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(
                    _styles,
                    "nav_menu_link-item",
                    "u-hflex-center-stretch"
                  )}
                >
                  <ElementNavLinkIsLarge
                    navLinkText="Service Areas"
                    navLinkUrl={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(
                    _styles,
                    "nav_menu_link-item",
                    "u-hflex-center-stretch"
                  )}
                >
                  <ElementNavLinkIsLarge
                    navLinkText="Industries"
                    navLinkUrl={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(
                    _styles,
                    "nav_menu_link-item",
                    "u-hflex-center-stretch"
                  )}
                >
                  <ElementNavLinkIsLarge
                    navLinkText="Testimonials"
                    navLinkUrl={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(
                    _styles,
                    "nav_menu_link-item",
                    "u-hflex-center-stretch"
                  )}
                >
                  <ElementNavLinkIsLarge
                    navLinkText="FAQs"
                    navLinkUrl={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(
                    _styles,
                    "nav_menu_link-item",
                    "u-hflex-center-stretch"
                  )}
                >
                  <ElementNavLinkIsLarge
                    navLinkText="Blog"
                    navLinkUrl={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(
                    _styles,
                    "nav_menu_link-item",
                    "u-hflex-center-stretch"
                  )}
                >
                  <ElementNavLinkIsLarge
                    navLinkText="Contact Us"
                    navLinkUrl={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(
                    _styles,
                    "nav_menu_link-item",
                    "u-hflex-center-stretch"
                  )}
                >
                  <ElementNavLinkIsLarge
                    navLinkText="Careers"
                    navLinkUrl={{
                      href: "https://jewett-careers.webflow.io/",
                      target: "_blank",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(
                    _styles,
                    "nav_menu_link-item",
                    "u-hflex-center-stretch"
                  )}
                >
                  <ElementNavLinkIsLarge
                    navLinkText="Trade Scholarships"
                    navLinkUrl={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(
                    _styles,
                    "nav_menu_link-item",
                    "u-hflex-center-stretch"
                  )}
                >
                  <ElementNavLinkIsLarge
                    navLinkText="Subcontractors"
                    navLinkUrl={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(
                    _styles,
                    "nav_menu_link-item",
                    "u-hflex-center-stretch"
                  )}
                >
                  <ElementNavLinkIsLarge
                    navLinkText="Jewett Experience"
                    navLinkUrl={{
                      href: "/about#jewett-experience",
                    }}
                  />
                </_Builtin.ListItem>
              </_Builtin.List>
            </_Builtin.Block>
          </_Builtin.NavbarMenu>
        ) : null}
        {turnOffForLandingPage ? (
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "menu_btn_wrap",
              "u-hflex-right-center",
              "u-gap-small"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "nav_cta_btn_wrap",
                "u-weight-semibold"
              )}
              tag="div"
            >
              <BtnMain
                subtextVisibility={false}
                buttonSizeIsSmall="is-small"
                iconIconVisibility={true}
                link={{
                  href: "#",
                }}
                text="Contact Us"
              />
            </_Builtin.Block>
            <_Builtin.NavbarButton
              className={_utils.cx(_styles, "nav_btn_wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "hamburger_wrap")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "hamburger_line")}
                  tag="div"
                />
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "hamburger_embed")}
                  value="%3Cstyle%3E%0A.hamburger_wrap%20%7B%0A%09--hamburger_thickness%3A%200.15rem%3B%0A%09--hamburger_gap%3A%200.8rem%3B%0A%09--hamburger_rotate%3A%2045%3B%0A%7D%0A.w--open%20.hamburger_line%20%7B%0A%09width%3A%20100%25%3B%0A%7D%0A.w--open%20.hamburger_line%3Afirst-child%20%7B%0A%09transform%3A%20translateY(calc(var(--hamburger_thickness)%20*%200.5%20%2B%20var(--hamburger_gap)%20*%200.5))%20rotate(calc(var(--hamburger_rotate)%20*%203%20*%20-1deg))%3B%0A%7D%0A.w--open%20.hamburger_line%3Alast-child%20%7B%0A%09transform%3A%20translateY(calc(var(--hamburger_thickness)%20*%20-0.5%20%2B%20var(--hamburger_gap)%20*%20-0.5))%20rotate(calc(var(--hamburger_rotate)%20*%203%20*%201deg))%3B%0A%7D%0A%3C%2Fstyle%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "hamburger_line", "is-bottom")}
                  tag="div"
                />
              </_Builtin.Block>
            </_Builtin.NavbarButton>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
