"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ElementServicesTabContentServicePage } from "./ElementServicesTabContentServicePage";
import * as _utils from "./utils";
import _styles from "./ElementServicesTabs.module.css";

export function ElementServicesTabs({
  as: _Component = _Builtin.TabsWrapper,

  elementServicesTabContentServicePageServicesPageLink = {
    href: "#",
  },
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "services_tabs",
        "u-hflex-left-top",
        "u-gap-xsmall",
        "u-width-full"
      )}
      data-duration-in="400"
      data-duration-out="200"
      data-theme="light"
      current="Tab 1"
      easing="ease"
      fadeIn={500}
      fadeOut={300}
    >
      <_Builtin.TabsMenu
        className={_utils.cx(
          _styles,
          "services_nav_tab",
          "u-grid-autofit",
          "u-weight-semibold"
        )}
        id={_utils.cx(
          _styles,
          "w-node-_5b7c9845-f2b4-cc97-3a6e-da53ce2bb727-ce2bb726"
        )}
        tag="div"
      >
        <_Builtin.TabsLink
          className={_utils.cx(_styles, "services_tab_link")}
          data-w-tab="Tab 1"
          block="inline"
        >
          <_Builtin.Heading className={_utils.cx(_styles, "no-wrap")} tag="h3">
            {"Expert Materials Procurement"}
          </_Builtin.Heading>
        </_Builtin.TabsLink>
        <_Builtin.TabsLink
          className={_utils.cx(_styles, "services_tab_link")}
          data-w-tab="Tab 6"
          block="inline"
        >
          <_Builtin.Heading className={_utils.cx(_styles, "no-wrap")} tag="h3">
            {"Quick-Turn PCB Assembly"}
          </_Builtin.Heading>
        </_Builtin.TabsLink>
        <_Builtin.TabsLink
          className={_utils.cx(_styles, "services_tab_link", "tab-color-blue")}
          data-w-tab="Tab 7"
          block="inline"
        >
          <_Builtin.Heading className={_utils.cx(_styles, "no-wrap")} tag="h3">
            {"Consigned PCB Assembly"}
          </_Builtin.Heading>
        </_Builtin.TabsLink>
        <_Builtin.TabsLink
          className={_utils.cx(_styles, "services_tab_link")}
          data-w-tab="Tab 8"
          block="inline"
        >
          <_Builtin.Heading className={_utils.cx(_styles, "no-wrap")} tag="h3">
            {"Turnkey PCB Assembly Services"}
          </_Builtin.Heading>
        </_Builtin.TabsLink>
        <_Builtin.TabsLink
          className={_utils.cx(_styles, "services_tab_link")}
          data-w-tab="Tab 9"
          block="inline"
        >
          <_Builtin.Heading className={_utils.cx(_styles, "no-wrap")} tag="h3">
            {"Inline Aqueous PCB Cleaning"}
          </_Builtin.Heading>
        </_Builtin.TabsLink>
        <_Builtin.TabsLink
          className={_utils.cx(_styles, "services_tab_link")}
          data-w-tab="Tab 10"
          block="inline"
        >
          <_Builtin.Heading className={_utils.cx(_styles, "no-wrap")} tag="h3">
            {"AOI & Visual PCB Inspection"}
          </_Builtin.Heading>
        </_Builtin.TabsLink>
        <_Builtin.TabsLink
          className={_utils.cx(_styles, "services_tab_link")}
          data-w-tab="Tab 11"
          block="inline"
        >
          <_Builtin.Heading className={_utils.cx(_styles, "no-wrap")} tag="h3">
            {"BGA Rework & Reballing"}
          </_Builtin.Heading>
        </_Builtin.TabsLink>
        <_Builtin.TabsLink
          className={_utils.cx(_styles, "services_tab_link")}
          data-w-tab="Tab 12"
          block="inline"
        >
          <_Builtin.Heading className={_utils.cx(_styles, "no-wrap")} tag="h3">
            {"Prototype PCB Assembly"}
          </_Builtin.Heading>
        </_Builtin.TabsLink>
        <_Builtin.TabsLink
          className={_utils.cx(_styles, "services_tab_link")}
          data-w-tab="Tab 13"
          block="inline"
        >
          <_Builtin.Heading className={_utils.cx(_styles, "no-wrap")} tag="h3">
            {"Functional Testing Services"}
          </_Builtin.Heading>
        </_Builtin.TabsLink>
      </_Builtin.TabsMenu>
      <_Builtin.TabsContent
        className={_utils.cx(_styles, "services_tabs_pane_wrap")}
        tag="div"
      >
        <_Builtin.TabsPane
          className={_utils.cx(_styles, "services_tabs_pane")}
          tag="div"
          data-w-tab="Tab 1"
        >
          <ElementServicesTabContentServicePage
            contentLayoutClasses="u-vflex-left-top"
            tabImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0f62_Expert%20Materials%20Procurement%20-%20Surface%20Mount%20Solutions.webp"
            servicesPageLink={{
              href: "/services/expert-materials-procurement",
            }}
          />
        </_Builtin.TabsPane>
        <_Builtin.TabsPane
          className={_utils.cx(_styles, "services_tabs_pane")}
          tag="div"
          data-w-tab="Tab 6"
        >
          <ElementServicesTabContentServicePage
            tabHeadingText={
              <_Builtin.Paragraph>
                {"Quick-Turn PCB Assembly"}
              </_Builtin.Paragraph>
            }
            tabParagraphText={
              <_Builtin.Paragraph>
                {
                  "SMS delivers rapid PCB assembly services to meet tight deadlines without compromising on precision or quality, ensuring your project stays on schedule."
                }
              </_Builtin.Paragraph>
            }
            tabImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0f65_Quick-Turn%20PCB%20Assembly%20-%20Surface%20Mount%20Solutions.webp"
            contentLayoutClasses="u-vflex-left-top"
            servicesPageLink={{
              href: "/services/quick-turn-pcb-assembly",
            }}
          />
        </_Builtin.TabsPane>
        <_Builtin.TabsPane
          className={_utils.cx(_styles, "services_tabs_pane")}
          tag="div"
          data-w-tab="Tab 7"
        >
          <ElementServicesTabContentServicePage
            tabHeadingText={
              <_Builtin.Heading tag="h4">
                {"Consigned PCB Assembly"}
              </_Builtin.Heading>
            }
            tabParagraphText={
              <_Builtin.Paragraph>
                {
                  "Integrate customer-supplied components into precision assemblies, ensuring seamless production using trusted parts."
                }
              </_Builtin.Paragraph>
            }
            tabImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0f4d_Consigned%20PCB%20Assembly%20-%20Surface%20Mount%20Solutions.webp"
            contentLayoutClasses="u-vflex-left-top"
            servicesPageLink={{
              href: "/services/consigned-pcb-assembly",
            }}
          />
        </_Builtin.TabsPane>
        <_Builtin.TabsPane
          className={_utils.cx(_styles, "services_tabs_pane")}
          tag="div"
          data-w-tab="Tab 8"
        >
          <ElementServicesTabContentServicePage
            tabHeadingText={
              <_Builtin.Heading tag="h4">
                {"Turnkey PCB Assembly Services"}
              </_Builtin.Heading>
            }
            tabParagraphText={
              <_Builtin.Paragraph>
                {
                  "End-to-end solutions including sourcing, assembly, and testing to streamline the manufacturing process."
                }
              </_Builtin.Paragraph>
            }
            tabImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0f67_Turnkey%20PCB%20Assembly%20Services%20-%20Surface%20Mount%20Solutions.webp"
            contentLayoutClasses="u-vflex-left-top"
            servicesPageLink={{
              href: "/services/turnkey-pcb-assembly-services",
            }}
          />
        </_Builtin.TabsPane>
        <_Builtin.TabsPane
          className={_utils.cx(_styles, "services_tabs_pane")}
          tag="div"
          data-w-tab="Tab 9"
        >
          <ElementServicesTabContentServicePage
            tabHeadingText={
              <_Builtin.Heading tag="h4">
                {"Inline Aqueous PCB Cleaning"}
              </_Builtin.Heading>
            }
            tabParagraphText={
              <_Builtin.Paragraph>
                {
                  "Advanced water-based cleaning processes to remove contaminants and improve overall product reliability."
                }
              </_Builtin.Paragraph>
            }
            tabImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0f1f_Assembly%20Line%20Reflow%20View.webp"
            contentLayoutClasses="u-vflex-left-top"
            servicesPageLink={{
              href: "/services/inline-aqueous-pcb-cleaning",
            }}
          />
        </_Builtin.TabsPane>
        <_Builtin.TabsPane
          className={_utils.cx(_styles, "services_tabs_pane")}
          tag="div"
          data-w-tab="Tab 10"
        >
          <ElementServicesTabContentServicePage
            tabHeadingText={
              <_Builtin.Heading tag="h4">
                {"AOI & Visual PCB Inspection"}
              </_Builtin.Heading>
            }
            tabParagraphText={
              <_Builtin.Paragraph>
                {
                  "Automated Optical Inspection (AOI) and visual checks to identify defects, ensuring the highest level of quality assurance."
                }
              </_Builtin.Paragraph>
            }
            tabImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0f68_AOI%20%26%20Visual%20PCB%20Inspection%20-%20Surface%20Mount%20Solutions.webp"
            contentLayoutClasses="u-vflex-left-top"
            servicesPageLink={{
              href: "/services/aoi-visual-pcb-inspection",
            }}
          />
        </_Builtin.TabsPane>
        <_Builtin.TabsPane
          className={_utils.cx(_styles, "services_tabs_pane")}
          tag="div"
          data-w-tab="Tab 11"
        >
          <ElementServicesTabContentServicePage
            tabHeadingText={
              <_Builtin.Heading tag="h4">
                {"BGA Rework & Reballing"}
              </_Builtin.Heading>
            }
            tabParagraphText={
              <_Builtin.Paragraph>
                {
                  "Specialized services for repairing and reballing Ball Grid Array (BGA) components with precision and accuracy."
                }
              </_Builtin.Paragraph>
            }
            tabImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0f2c_BGA%20Rework%20%26%20Reballing%20-%20Surface%20Mount%20Solutions.webp"
            contentLayoutClasses="u-vflex-left-top"
            servicesPageLink={{
              href: "/services/bga-rework-reballing",
            }}
          />
        </_Builtin.TabsPane>
        <_Builtin.TabsPane
          className={_utils.cx(_styles, "services_tabs_pane")}
          tag="div"
          data-w-tab="Tab 12"
        >
          <ElementServicesTabContentServicePage
            tabHeadingText={
              <_Builtin.Heading tag="h4">
                {"Prototype PCB Assembly"}
              </_Builtin.Heading>
            }
            tabParagraphText={
              <_Builtin.Paragraph>
                {
                  "Rapid prototyping services to bring new designs to life and support product development needs."
                }
              </_Builtin.Paragraph>
            }
            tabImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0f4e_Phase%203.webp"
            contentLayoutClasses="u-vflex-left-top"
            servicesPageLink={{
              href: "/services/prototype-pcb-assembly",
            }}
          />
        </_Builtin.TabsPane>
        <_Builtin.TabsPane
          className={_utils.cx(_styles, "services_tabs_pane")}
          tag="div"
          data-w-tab="Tab 13"
        >
          <ElementServicesTabContentServicePage
            tabHeadingText={
              <_Builtin.Heading tag="h4">
                {"Functional Testing Services"}
              </_Builtin.Heading>
            }
            tabParagraphText={
              <_Builtin.Paragraph>
                {
                  "Comprehensive testing solutions to verify the performance and functionality of assembled PCBs before delivery."
                }
              </_Builtin.Paragraph>
            }
            tabImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0f4f_Functional%20Testing%20Services%20-%20Surface%20Mount%20Solutions.webp"
            contentLayoutClasses="u-vflex-left-top"
            servicesPageLink={{
              href: "/services/functional-testing-services",
            }}
          />
        </_Builtin.TabsPane>
      </_Builtin.TabsContent>
    </_Component>
  );
}
