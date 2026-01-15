"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { OurCustomersLogosItem } from "./OurCustomersLogosItem";
import * as _utils from "./utils";
import _styles from "./SectionOurCustomers.module.css";

export function SectionOurCustomers({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  styleIsDarkMode = "is-dark-mode",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "our_customers_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "our_customers_contain", "u-container")}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "our_customers_layout",
            "u-vflex-stretch-top",
            "u-gap-small"
          )}
          tag="div"
        >
          <_Builtin.Block tag="div">
            <GlobalContent
              variant="Content is Center"
              eyebrowEyebrowVisibility={false}
              paragraphParagraphVisibility={false}
              buttonGroupButtonGroupVisibility={false}
              headingHeadingText={
                <_Builtin.Heading tag="h2">{"Our Customers"}</_Builtin.Heading>
              }
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "logos_wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "logos_layout")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "logos_track", "is-reversed")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "logos_cms_wrap")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "logos_cms_list")}
                    tag="div"
                  >
                    <OurCustomersLogosItem
                      isDarkMode={styleIsDarkMode}
                      imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c62a16ef1476d2a1254769_bmw-logo.svg"
                    />
                    <OurCustomersLogosItem
                      isDarkMode={styleIsDarkMode}
                      imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c62a16c4d5286f415a5a97_bsa-logo.svg"
                    />
                    <OurCustomersLogosItem
                      isDarkMode={styleIsDarkMode}
                      imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c62a164d13d4450bf28d09_cumberland-farms-logo.svg"
                    />
                    <OurCustomersLogosItem
                      isDarkMode={styleIsDarkMode}
                      imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c62a16dee6bbe0147feffc_bean-group.svg"
                    />
                    <OurCustomersLogosItem
                      isDarkMode={styleIsDarkMode}
                      imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c62a16daa45c7f258b3e23_darlings-logo.svg"
                    />
                    <OurCustomersLogosItem
                      isDarkMode={styleIsDarkMode}
                      imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c62a168e95b7beb20c20d8_dollar-tree-logo.svg"
                    />
                    <OurCustomersLogosItem
                      isDarkMode={styleIsDarkMode}
                      imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c62a16bdb8695024188ffb_chevrolet-logo.svg"
                    />
                    <OurCustomersLogosItem
                      isDarkMode={styleIsDarkMode}
                      imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c62a167174d738477eea21_commonwealth-motors-logo.svg"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "logos_cms_list")}
                    tag="div"
                  >
                    <OurCustomersLogosItem
                      isDarkMode={styleIsDarkMode}
                      imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c62a16ef1476d2a1254769_bmw-logo.svg"
                    />
                    <OurCustomersLogosItem
                      isDarkMode={styleIsDarkMode}
                      imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c62a16c4d5286f415a5a97_bsa-logo.svg"
                    />
                    <OurCustomersLogosItem
                      isDarkMode={styleIsDarkMode}
                      imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c62a164d13d4450bf28d09_cumberland-farms-logo.svg"
                    />
                    <OurCustomersLogosItem
                      isDarkMode={styleIsDarkMode}
                      imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c62a16dee6bbe0147feffc_bean-group.svg"
                    />
                    <OurCustomersLogosItem
                      isDarkMode={styleIsDarkMode}
                      imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c62a16daa45c7f258b3e23_darlings-logo.svg"
                    />
                    <OurCustomersLogosItem
                      isDarkMode={styleIsDarkMode}
                      imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c62a168e95b7beb20c20d8_dollar-tree-logo.svg"
                    />
                    <OurCustomersLogosItem
                      isDarkMode={styleIsDarkMode}
                      imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c62a16bdb8695024188ffb_chevrolet-logo.svg"
                    />
                    <OurCustomersLogosItem
                      isDarkMode={styleIsDarkMode}
                      imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c62a167174d738477eea21_commonwealth-motors-logo.svg"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "logos_embed")}
              value="%3Cstyle%3E%0A%40keyframes%20logos_timeline%20%7B%0A%09from%20%7B%20transform%3A%20translateX(-50%25)%3B%20%7D%0A%09to%20%7B%20transform%3A%20translateX(0)%3B%20%7D%0A%7D%0A%3C%2Fstyle%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
