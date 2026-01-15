"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { ElementServicesTabContentServicePage } from "./ElementServicesTabContentServicePage";
import * as _utils from "./utils";
import _styles from "./SectionServicesServicesPage.module.css";

export function SectionServicesServicesPage({
  as: _Component = _Builtin.Section,
  servicesSectionId = "explore-all-services",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "services_tab_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme="dark"
      id={servicesSectionId}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "services_contain",
          "u-container",
          "u-vflex-center-top",
          "u-gap-large"
        )}
        tag="div"
        data-padding-top="main"
        data-padding-bottom="main"
      >
        <GlobalContent headingStyle="u-text-display" />
        <_Builtin.Block
          className={_utils.cx(_styles, "services_collection_wrap")}
          tag="div"
        >
          <_Builtin.NotSupported _atom="DynamoWrapper" />
        </_Builtin.Block>
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "style_hide_psuedo_element_tab")}
          value="%3Cstyle%3E.w-tabs%3Abefore%2C%20.w-tabs%3Aafter%20%7B%0A%20%20%20%20content%3A%20%22%22%3B%0A%20%20%20%20display%3A%20none%3B%0A%7D%0A%0A%3C%2Fstyle%3E%0A%0A%3Cstyle%3E%20%0A%40media%20(max-width%3A%20768px)%20%7B%0A%0A%20%20.layout496_tabs-menu%20%7B%0A%20%20%20%20order%3A%201%3B%0A%20%20%7D%0A%20%20.layout496_tabs-pane%20%7B%0A%20%20%20%20order%3A%202%3B%0A%20%20%7D%0A%7D%0A%3C%2Fstyle%3E"
        />
      </_Builtin.Block>
    </_Component>
  );
}
