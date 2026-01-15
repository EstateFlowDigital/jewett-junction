"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalLogoMain } from "./GlobalLogoMain";
import { GlobalParagraph } from "./GlobalParagraph";
import { SocialMediaIcons } from "./SocialMediaIcons";
import { ElementHorizontalLineDivider } from "./ElementHorizontalLineDivider";
import { ElementNavDropdownSublink } from "./ElementNavDropdownSublink";
import { AccoladesLogo } from "./AccoladesLogo";
import * as _utils from "./utils";
import _styles from "./GlobalFooter.module.css";

export function GlobalFooter({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "footer_wrap")}
      tag="footer"
      grid={{
        type: "section",
      }}
      data-theme={styleTheme}
    >
      <_Builtin.Heading
        className={_utils.cx(_styles, "footer_title", "u-sr-only")}
        tag="h2"
      >
        {"Footer"}
      </_Builtin.Heading>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "footer_contain",
          "u-container",
          "u-vflex-stretch-top",
          "u-gap-medium"
        )}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "footer_layout",
            "u-hflex-between-center",
            "u-hflex-wrap",
            "u-gap-medium"
          )}
          tag="nav"
        >
          <GlobalLogoMain
            navbarLogoVisibility={false}
            footerLogoVisibility={true}
            variant="Footer"
          />
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "veterns_wrap",
              "u-weight-bold",
              "u-vflex-center-center",
              "u-gap-small"
            )}
            tag="div"
          >
            <GlobalParagraph
              text={
                <_Builtin.Paragraph>
                  {"Jewett Proudly Employs and Supports Our "}
                  <_Builtin.Strong>
                    {"Veterans and Active Duty Service Members"}
                  </_Builtin.Strong>
                </_Builtin.Paragraph>
              }
            />
            <_Builtin.Image
              className={_utils.cx(_styles, "flag_image")}
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/6859f5510adf55b84b0fb2b9_SVG%20American%20Flag.svg"
            />
          </_Builtin.Block>
          <SocialMediaIcons />
        </_Builtin.Block>
        <ElementHorizontalLineDivider />
        <_Builtin.Block
          className={_utils.cx(_styles, "nav_dropdown_content_wrap")}
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
              <_Builtin.List
                className={_utils.cx(
                  _styles,
                  "footer_nav_list",
                  "u-grid-autofit"
                )}
                tag="ul"
                unstyled={false}
              >
                <_Builtin.ListItem
                  className={_utils.cx(_styles, "nav_list_item")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_0987d50e-4bbc-0b00-1123-ec1104005104-5a65d634"
                  )}
                >
                  <ElementNavDropdownSublink
                    text="Home"
                    link={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(_styles, "nav_list_item")}
                >
                  <ElementNavDropdownSublink
                    text="About Us"
                    link={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(_styles, "nav_list_item")}
                >
                  <ElementNavDropdownSublink
                    text="Services"
                    link={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(_styles, "nav_list_item")}
                >
                  <ElementNavDropdownSublink
                    text="Our Work"
                    link={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(_styles, "nav_list_item")}
                >
                  <ElementNavDropdownSublink
                    text="Service Areas"
                    link={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(_styles, "nav_list_item")}
                >
                  <ElementNavDropdownSublink
                    text="Industries"
                    link={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(_styles, "nav_list_item")}
                >
                  <ElementNavDropdownSublink
                    text="Testimonials"
                    link={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(_styles, "nav_list_item")}
                >
                  <ElementNavDropdownSublink
                    text="FAQs"
                    link={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(_styles, "nav_list_item")}
                >
                  <ElementNavDropdownSublink
                    text="Blog"
                    link={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(_styles, "nav_list_item")}
                >
                  <ElementNavDropdownSublink
                    text="Contact us"
                    link={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(_styles, "nav_list_item")}
                >
                  <ElementNavDropdownSublink
                    text="Careers"
                    link={{
                      href: "https://jewett-careers.webflow.io/",
                      target: "_blank",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(_styles, "nav_list_item")}
                >
                  <ElementNavDropdownSublink
                    text="The Jewett Experience"
                    link={{
                      href: "/about#jewett-experience",
                      target: "_blank",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(_styles, "nav_list_item")}
                >
                  <ElementNavDropdownSublink
                    text="The Jewett Safety Promise"
                    link={{
                      href: "/about#jewett-safety-promise",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(_styles, "nav_list_item")}
                >
                  <ElementNavDropdownSublink
                    text="Jewett Trade Scholarships"
                    link={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(_styles, "nav_list_item")}
                >
                  <ElementNavDropdownSublink
                    text="Subcontractors"
                    link={{
                      href: "#",
                    }}
                  />
                </_Builtin.ListItem>
              </_Builtin.List>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "footer_bottom_wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "footer_bottom_contain", "u-container")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "safe_logo_wrap")}
            tag="div"
          >
            <_Builtin.Grid
              className={_utils.cx(
                _styles,
                "accolades_list_2",
                "u-grid-column-2"
              )}
              id={_utils.cx(
                _styles,
                "w-node-_71ce7596-8a07-8f69-aadf-29edbed78750-5a65d634"
              )}
              tag="div"
            >
              <_Builtin.Block
                id={_utils.cx(
                  _styles,
                  "w-node-_71ce7596-8a07-8f69-aadf-29edbed78751-5a65d634"
                )}
                tag="div"
              >
                <AccoladesLogo accoladesLogo="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c61e772cfde3b3b16586c4_tca-certified-logo.webp" />
              </_Builtin.Block>
              <_Builtin.Block
                id={_utils.cx(
                  _styles,
                  "w-node-_71ce7596-8a07-8f69-aadf-29edbed78755-5a65d634"
                )}
                tag="div"
              >
                <AccoladesLogo accoladesLogo="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c621a6e65dae9f89432dae_eversafelogo_final_white-no-inc.webp" />
              </_Builtin.Block>
            </_Builtin.Grid>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "disclosure_wrap", "u-weight-bold")}
            tag="div"
          >
            <GlobalParagraph
              text={
                <_Builtin.Paragraph>
                  {
                    'Jewett Construction through its licensed division Jewett Design LLC ("Jewett") provides architectural services.'
                  }
                </_Builtin.Paragraph>
              }
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "footer_bottom_layout",
              "u-hflex-between-center",
              "u-hflex-wrap",
              "u-gap-small",
              "u-hflex-between-center"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "footer_bottom_text",
                "u-text-small"
              )}
              tag="div"
            >
              {"© 2025 Copyright. All Rights Reserved."}
            </_Builtin.Block>
            <_Builtin.List
              className={_utils.cx(
                _styles,
                "footer_bottom_list",
                "u-hflex-left-center",
                "u-hflex-wrap",
                "u-hflex-left-center",
                "u-gap-small"
              )}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem
                className={_utils.cx(_styles, "footer_bottom_item")}
              >
                <_Builtin.Link
                  className={_utils.cx(_styles, "footer_bottom_link_wrap")}
                  button={false}
                  block="inline"
                  options={{
                    href: "#",
                  }}
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "footer_bottom_link_text",
                      "u-text-small"
                    )}
                    tag="div"
                  >
                    {"Privacy Policy"}
                  </_Builtin.Block>
                </_Builtin.Link>
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(_styles, "footer_bottom_item")}
              >
                <_Builtin.Link
                  className={_utils.cx(_styles, "footer_bottom_link_wrap")}
                  button={false}
                  block="inline"
                  options={{
                    href: "#",
                  }}
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "footer_bottom_link_text",
                      "u-text-small"
                    )}
                    tag="div"
                  >
                    {"Accessibility"}
                  </_Builtin.Block>
                </_Builtin.Link>
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(_styles, "footer_bottom_item")}
              >
                <_Builtin.Link
                  className={_utils.cx(_styles, "footer_bottom_link_wrap")}
                  button={false}
                  aria-label="Business ID Details Opens in new Tab"
                  block="inline"
                  options={{
                    href: "https://quickstart.sos.nh.gov/online/BusinessInquire/BusinessInformation?businessID=XmH9Fe6%2BlVo%3D",
                    target: "_blank",
                  }}
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "footer_bottom_link_text",
                      "u-text-small"
                    )}
                    tag="div"
                  >
                    {"Business ID - 8779"}
                  </_Builtin.Block>
                </_Builtin.Link>
              </_Builtin.ListItem>
            </_Builtin.List>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "footer_bottom_text",
                "u-text-small"
              )}
              tag="div"
            >
              {"Website Designed & Developed by "}
              <_Builtin.Link
                button={false}
                block=""
                options={{
                  href: "#",
                  target: "_blank",
                }}
              >
                <_Builtin.Strong>{"Infinite Views"}</_Builtin.Strong>
              </_Builtin.Link>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
