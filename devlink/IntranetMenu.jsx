"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { GlobalLogoMain } from "./GlobalLogoMain";
import { IconSvgWrap } from "./IconSvgWrap";
import { ElementNavDropdownSublink } from "./ElementNavDropdownSublink";
import { BtnMain } from "./BtnMain";
import * as _utils from "./utils";
import _styles from "./IntranetMenu.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-21":{"id":"e-21","name":"","animationType":"custom","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-22"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".nav_dropdown_wrap","originalId":"bbbe17e9-af8f-cfc7-4c07-dca312365de0","appliesTo":"CLASS"},"targets":[{"selector":".nav_dropdown_wrap","originalId":"bbbe17e9-af8f-cfc7-4c07-dca312365de0","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1726618006769},"e-22":{"id":"e-22","name":"","animationType":"custom","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-4","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-21"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".nav_dropdown_wrap","originalId":"bbbe17e9-af8f-cfc7-4c07-dca312365de0","appliesTo":"CLASS"},"targets":[{"selector":".nav_dropdown_wrap","originalId":"bbbe17e9-af8f-cfc7-4c07-dca312365de0","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1726618006769}},"actionLists":{"a-3":{"id":"a-3","title":"Navbar 7 dropdown [Open] [Desktop]","actionItemGroups":[{"actionItems":[{"id":"a-3-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".nav_dropdown_icon","selectorGuids":["313cff56-d8ae-fbf4-a454-22a22b58a867"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-3-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".dropdown_nav_background","selectorGuids":["814a8f30-09b1-cd22-db7d-f3b308291216"]},"yValue":0,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626161550593},"a-4":{"id":"a-4","title":"Navbar 7 dropdown [Close] [Desktop]","actionItemGroups":[{"actionItems":[{"id":"a-4-n","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".nav_dropdown_icon","selectorGuids":["313cff56-d8ae-fbf4-a454-22a22b58a867"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-4-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".dropdown_nav_background","selectorGuids":["814a8f30-09b1-cd22-db7d-f3b308291216"]},"yValue":-5.5,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626161607847}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function IntranetMenu({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  visibility = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "intranet_menu_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "intranet_menu_contain",
          "u-container",
          "u-vflex-stretch-between"
        )}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "intranet_menu_layout")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "menu_logo_close_wrap",
              "u-hflex-between-stretch",
              "u-gap-small"
            )}
            tag="div"
          >
            <GlobalLogoMain />
            <_Builtin.Block
              className={_utils.cx(_styles, "menu_close_button")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "menu_close_icon_wrap")}
                tag="div"
              >
                <IconSvgWrap
                  path1="m972 192.98h-744c-70.688 0-128.02 57.328-128.02 128.02v558c0 33.938 13.5 66.516 37.5 90.516s56.578 37.5 90.516 37.5h744c70.688 0 128.02-57.328 128.02-128.02v-558c0-70.688-57.328-128.02-128.02-128.02zm-801.98 686.02v-558c0-32.016 25.969-57.984 57.984-57.984h243.98v673.97h-243.98c-32.016 0-57.984-25.969-57.984-57.984zm860.02 0h-0.046875c0 32.016-25.969 57.984-57.984 57.984h-429.98v-673.97h429.98c15.375 0 30.141 6.0938 41.016 16.969s16.969 25.641 16.969 41.016zm-158.02-435.98v314.02-0.046875c-0.70312 11.578-8.2969 21.609-19.312 25.359-10.969 3.7031-23.109 0.42188-30.703-8.3438l-114.52-156.98c-7.0312-10.266-7.0312-23.766 0-34.031l112.5-156.98c7.1719-10.453 20.344-14.906 32.391-10.969s20.016 15.328 19.641 27.984z"
                  viewbox="0 0 1200 1200"
                  iconPath2Visibility={false}
                />
              </_Builtin.Block>
              <_Builtin.Paragraph
                className={_utils.cx(_styles, "u-text-small")}
              >
                {"Close"}
              </_Builtin.Paragraph>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.NavbarWrapper
            className={_utils.cx(
              _styles,
              "intranet_menu_nav",
              "u-vflex-stretch-between",
              "u-gap-medium"
            )}
            tag="div"
            config={{
              animation: "default",
              collapse: "none",
              docHeight: false,
              duration: 400,
              easing: "ease",
              easing2: "ease",
              noScroll: false,
            }}
          >
            <_Builtin.List
              className={_utils.cx(
                _styles,
                "intranet_menu_nav_list",
                "u-vflex-stretch-top",
                "u-gap-small"
              )}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem
                className={_utils.cx(
                  _styles,
                  "intranet_menu_nav_list_item",
                  "u-weight-bold"
                )}
              >
                <_Builtin.DropdownWrapper
                  className={_utils.cx(
                    _styles,
                    "nav_dropdown_wrap",
                    "u-width-full",
                    "u-vflex-left-top",
                    "u-gap-xsmall"
                  )}
                  tag="div"
                  delay={0}
                  hover={false}
                >
                  <_Builtin.DropdownToggle
                    className={_utils.cx(
                      _styles,
                      "nav_dropdown_toggle",
                      "u-width-full",
                      "intranet"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "nav_dropdown_text")}
                      tag="div"
                    >
                      {"Safety First"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "nav_dropdown_icon")}
                      tag="div"
                    >
                      <IconSvgWrap
                        path1="M6 18L24.5 35L43 18"
                        viewbox="0 0 50 50"
                      />
                    </_Builtin.Block>
                  </_Builtin.DropdownToggle>
                  <_Builtin.DropdownList
                    className={_utils.cx(_styles, "dropdown_intranet")}
                    tag="nav"
                  >
                    <ElementNavDropdownSublink text="Safety Newsletters" />
                    <ElementNavDropdownSublink text="Crisis Management Guide" />
                  </_Builtin.DropdownList>
                </_Builtin.DropdownWrapper>
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(
                  _styles,
                  "intranet_menu_nav_list_item",
                  "u-weight-bold"
                )}
              >
                <_Builtin.DropdownWrapper
                  className={_utils.cx(
                    _styles,
                    "nav_dropdown_wrap",
                    "u-width-full",
                    "u-vflex-left-top",
                    "u-gap-xsmall"
                  )}
                  tag="div"
                  delay={0}
                  hover={false}
                >
                  <_Builtin.DropdownToggle
                    className={_utils.cx(
                      _styles,
                      "nav_dropdown_toggle",
                      "u-width-full",
                      "intranet"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "nav_dropdown_text")}
                      tag="div"
                    >
                      {"HR Resources"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "nav_dropdown_icon")}
                      tag="div"
                    >
                      <IconSvgWrap
                        path1="M6 18L24.5 35L43 18"
                        viewbox="0 0 50 50"
                      />
                    </_Builtin.Block>
                  </_Builtin.DropdownToggle>
                  <_Builtin.DropdownList
                    className={_utils.cx(_styles, "dropdown_intranet")}
                    tag="nav"
                  >
                    <ElementNavDropdownSublink text="Employee Handbook" />
                    <ElementNavDropdownSublink text="Benefits" />
                    <ElementNavDropdownSublink text="EAP" />
                    <ElementNavDropdownSublink text="Payroll/Timesheets" />
                  </_Builtin.DropdownList>
                </_Builtin.DropdownWrapper>
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(
                  _styles,
                  "intranet_menu_nav_list_item",
                  "u-weight-bold"
                )}
              >
                <ElementNavDropdownSublink text="IT Helpdesk" />
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(
                  _styles,
                  "intranet_menu_nav_list_item",
                  "u-weight-bold"
                )}
              >
                <ElementNavDropdownSublink text="Marketing" />
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(
                  _styles,
                  "intranet_menu_nav_list_item",
                  "u-weight-bold"
                )}
              >
                <ElementNavDropdownSublink text="Org Chart" />
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(
                  _styles,
                  "intranet_menu_nav_list_item",
                  "u-weight-bold"
                )}
              >
                <ElementNavDropdownSublink text="Team Members" />
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.NavbarWrapper>
        </_Builtin.Block>
        <BtnMain
          subtextVisibility={false}
          text="Share GoodNews"
          link={{
            href: "mailto:marketing@jewettconstruction.com?subject=I%20Have%20Good%20News",
          }}
          iconSvgPath1="m956.17 780c-61.984 0-116.69 30.133-149.99 76.156l-379.09-222.71c0.22266-3.6406 0.56641-7.2461 0.56641-10.941 0-14.535-1.9492-28.598-5.2734-42.137l414.96-203.15c32.055 26.641 73.488 42.789 118.83 42.789 101.53 0 183.83-80.59 183.83-180s-82.305-180-183.83-180c-101.53 0-183.83 80.59-183.83 180 0 25.277 5.3672 49.309 14.973 71.137l-401.78 196.71c-33.719-39.91-84.676-65.344-141.7-65.344-101.53 0-183.83 80.59-183.83 180 0 99.414 82.305 180 183.83 180 67.637 0 126.59-35.875 158.51-89.148l372.43 218.8c-1.4492 9.1016-2.4219 18.352-2.4219 27.848 0 99.414 82.305 180 183.83 180 101.53 0 183.83-80.59 183.83-180s-82.305-180-183.83-180z"
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
