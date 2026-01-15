"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { IconSvgWrap } from "./IconSvgWrap";
import { ElementContentCard } from "./ElementContentCard";
import { BtnMain } from "./BtnMain";
import { GlobalBackgroundGraphic } from "./GlobalBackgroundGraphic";
import * as _utils from "./utils";
import _styles from "./SectionIndustriesMarkets.module.css";

export function SectionIndustriesMarkets({
  as: _Component = _Builtin.Section,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "features_tabs_content")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme="dark"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "features_tabs_contain",
          "u-container",
          "u-vflex-stretch-center",
          "u-gap-large"
        )}
        tag="div"
      >
        <GlobalContent variant="Content is Center" />
        <_Builtin.Block
          className={_utils.cx(_styles, "features_tab_wrap")}
          tag="div"
        >
          <_Builtin.TabsWrapper
            className={_utils.cx(
              _styles,
              "features_tab",
              "u-vflex-left-top",
              "u-gap-small"
            )}
            data-duration-in="400"
            data-duration-out="200"
            current="Tab 1"
            easing="ease"
            fadeIn={500}
            fadeOut={300}
          >
            <_Builtin.TabsMenu
              className={_utils.cx(
                _styles,
                "featured_tab_wrap",
                "u-grid-autofit",
                "u-width-full"
              )}
              id={_utils.cx(
                _styles,
                "w-node-_9d2e0ce3-15d6-80ea-2f26-80dc201a7a32-201a7a23"
              )}
              tag="div"
            >
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "features_tab_link")}
                data-w-tab="Tab 1"
                block="inline"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "tab_wrap",
                    "u-hflex-left-top",
                    "u-gap-small"
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "features_tab_image",
                      "u-visual-wrap"
                    )}
                    tag="div"
                  >
                    <IconSvgWrap
                      path1="M6.5 24h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1m0 2h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1m0 2h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1M22 9h3a1.5 1.5 0 0 0 0-3h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5.5.5 0 0 0-1 0A1.5 1.5 0 0 0 22 9M3 8a.5.5 0 0 0 .5-.5v-.766A2.737 2.737 0 0 1 6.234 4H15a2.5 2.5 0 0 0 2.5-2.5v-1a.5.5 0 0 0-1 0v1A1.5 1.5 0 0 1 15 3H6.234A3.74 3.74 0 0 0 2.5 6.734V7.5A.5.5 0 0 0 3 8m6.5 0v.5a.5.5 0 0 0 1 0V8a2 2 0 0 1 2-2H18a.5.5 0 0 1 0 1 .5.5 0 0 0 0 1 1.5 1.5 0 0 0 0-3h-5.5a3 3 0 0 0-3 3M7 7a.5.5 0 0 0 0 1 1.5 1.5 0 0 0 0-3H6a1.5 1.5 0 0 0-1.5 1.5.5.5 0 0 0 1 0A.5.5 0 0 1 6 6h1a.5.5 0 0 1 0 1m15-3h5a1.5 1.5 0 0 0 0-3h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 1 0 1h-5a.5.5 0 0 0 0 1m.5 15h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1m4 2h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1m-4 0h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1m4-2h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1m-8 0h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1m10-3H27v-1.5a1.5 1.5 0 0 0-1.5-1.5h-7a1.5 1.5 0 0 0-1.5 1.5V16h-1.5a1.5 1.5 0 0 0-1.5 1.5V21h-2.023l-.383-8.418.017-.082a.5.5 0 0 0-.026-.13l-.085-1.892A.5.5 0 0 0 11 10H9a.5.5 0 0 0-.5.478l-.085 1.892a.5.5 0 0 0-.026.13l.017.082L8.023 21H5.98l-.395-9.473c0-.01.005-.018.005-.027s-.007-.027-.008-.041L5.5 9.479A.5.5 0 0 0 5 9H3a.5.5 0 0 0-.5.479l-.082 1.98c0 .014-.008.027-.008.041s0 .018.005.027L2 21.479V30.5A1.5 1.5 0 0 0 3.5 32h25a1.5 1.5 0 0 0 1.5-1.5v-13a1.5 1.5 0 0 0-1.5-1.5M18 14.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V16h-8ZM9.478 11h1.045l.045 1H9.432Zm-.091 2h1.227l.363 8H9.023Zm-5.908-3h1.042l.042 1H3.438ZM3.4 12h1.2l.375 9H3.021ZM17 31H3.5a.5.5 0 0 1-.5-.5V22h13.5a.5.5 0 0 1 .5.5Zm7 0h-3v-6h3Zm5-.5a.5.5 0 0 1-.5.5H25v-6.5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5V31h-2v-8.5a1.5 1.5 0 0 0-.092-.5h.592a.5.5 0 0 0 0-1H15v-3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5ZM14.5 24h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1m-4 2h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1m0 2h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1m0-4h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1m4 2h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1m0 2h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1"
                      viewbox="0 0 32 32"
                      iconStrokeWidth=""
                      iconNoStrokeNeededDelete=""
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "tab_link_text_wrap")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "faetures_tab_link_layout",
                        "u-hflex-left-center",
                        "u-gap-xsmall"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "faetures_tab_heading_wrap",
                          "u-weight-bold"
                        )}
                        tag="div"
                      >
                        <_Builtin.Heading
                          className={_utils.cx(
                            _styles,
                            "no-wrap",
                            "u-text-h5",
                            "u-weight-bold"
                          )}
                          tag="h3"
                        >
                          {"Industries"}
                        </_Builtin.Heading>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "features_tab_link_paragraph"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "")}
                        tag="div"
                      >
                        {"PCB solutions for diverse sectors"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "features_tab_link")}
                data-w-tab="Tab 2"
                block="inline"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "tab_wrap",
                    "u-hflex-left-top",
                    "u-gap-small"
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "features_tab_image",
                      "u-visual-wrap"
                    )}
                    tag="div"
                  >
                    <IconSvgWrap
                      path1="M20.022 23.75H12.44a.3.3 0 0 1-.093 0h-.89a.2.2 0 0 1-.047 0H.676a.25.25 0 0 1-.25-.25V8.9a.2.2 0 0 1 .02-.09.3.3 0 0 1 .06-.087l2.537-2.35a.25.25 0 0 1 .34 0l2.537 2.35a.3.3 0 0 1 .059.084.2.2 0 0 1 .021.1V12.3h2.037V8.633a.25.25 0 0 1 .138-.223l.858-.43V4.631a.25.25 0 0 1 .138-.223l.947-.477V1.537a.25.25 0 0 1 .073-.177L11.228.323a.25.25 0 0 1 .354 0l1.036 1.037a.25.25 0 0 1 .073.177v2.394l.948.477a.25.25 0 0 1 .137.223V7.98l.5.249v-.845a.25.25 0 0 1 .25-.25h.866a1.9 1.9 0 0 1 3.768 0h.865a.25.25 0 0 1 .25.25v1.41a.2.2 0 0 1 0 .045.2.2 0 0 1 0 .044v1.505l2.377 2.377.01.009.841.842a.25.25 0 1 1-.353.353l-.419-.419v9.95a.25.25 0 0 1-.25.25zm-15.9-.5h7.038v-8.93H4.117Zm-3.191 0h2.686v-1.587H.926ZM14.773 9.089V23.25h.679v-2.6a.25.25 0 0 1 .25-.25h3.142a.25.25 0 0 1 .25.25v2.6h.678V9.089ZM15.952 20.9v2.35h1.071V20.9Zm1.571 0v2.352h1.071V20.9Zm2.749 1.536v.816h1.956v-.815Zm-6.576.813h.577V8.886a.3.3 0 0 1 0-.094l-.858-.43a.25.25 0 0 1-.139-.223V4.785l-.947-.477a.25.25 0 0 1-.138-.224V1.64l-.786-.786-.787.786v2.444a.25.25 0 0 1-.138.224l-.947.477v3.35a.25.25 0 0 1-.138.223l-.858.43V12.3h.577V9.233a.25.25 0 0 1 .5 0V12.3h.55V8.74a.25.25 0 0 1 .5 0v3.56h.491V8.226a.25.25 0 1 1 .5 0V12.5a.3.3 0 0 1 .005.052v10.7h.484v-6.168a.25.25 0 0 1 .5 0v6.162h.556v-6.159a.25.25 0 0 1 .5 0Zm6.576-1.313h1.956v-.816h-1.956ZM.926 21.163h2.691v-1.584H.926Zm19.346-.546h1.956V19.8h-1.956Zm0-1.317h1.956v-.817h-1.956ZM.926 19.079h2.691v-1.585H.926Zm19.346-1.1h1.956v-.816h-1.956ZM.926 16.994h2.691V15.41H.926Zm19.346-.327h1.956v-.817h-1.956Zm0-1.317h1.956v-.817h-1.956ZM.926 14.91h2.691v-1.584H.926Zm19.346-.877h1.956v-.983l-1.956-1.95ZM4.117 13.82h7.043V12.8H4.117Zm-3.191-.994h2.691v-.277a.25.25 0 0 1 .25-.25H5.5v-1.058H.926Zm0-2.085H5.5V9.157H.926Zm.388-2.084h3.8L3.213 6.9Zm13.459-.068h5v-.955h-5ZM15.9 7.134h2.756a1.4 1.4 0 0 0-2.756 0M9.883 21.179a.25.25 0 0 1-.25-.25v-.708a.25.25 0 0 1 .5 0v.708a.25.25 0 0 1-.25.25m-1.489 0a.25.25 0 0 1-.25-.25v-.708a.25.25 0 0 1 .5 0v.708a.25.25 0 0 1-.25.25m-1.49 0a.25.25 0 0 1-.25-.25v-.708a.25.25 0 0 1 .5 0v.708a.25.25 0 0 1-.254.25Zm-1.489 0a.25.25 0 0 1-.25-.25v-.708a.25.25 0 0 1 .5 0v.708a.25.25 0 0 1-.25.25m13.43-1.395a.25.25 0 0 1-.25-.25v-.973a.25.25 0 0 1 .5 0v.973a.25.25 0 0 1-.25.25m-1.048 0a.25.25 0 0 1-.25-.25v-.973a.25.25 0 0 1 .5 0v.973a.25.25 0 0 1-.247.25Zm-1.048 0a.25.25 0 0 1-.25-.25v-.973a.25.25 0 0 1 .5 0v.973a.25.25 0 0 1-.25.25m-1.049 0a.25.25 0 0 1-.25-.25v-.973a.25.25 0 0 1 .5 0v.973a.25.25 0 0 1-.25.25m-5.817-.164a.25.25 0 0 1-.25-.25v-.708a.25.25 0 0 1 .5 0v.708a.25.25 0 0 1-.25.25m-1.489 0a.25.25 0 0 1-.25-.25v-.708a.25.25 0 0 1 .5 0v.708a.25.25 0 0 1-.25.25m-1.49 0a.25.25 0 0 1-.25-.25v-.708a.25.25 0 0 1 .5 0v.708a.25.25 0 0 1-.254.25Zm-1.489 0a.25.25 0 0 1-.25-.25v-.708a.25.25 0 0 1 .5 0v.708a.25.25 0 0 1-.25.25m4.468-1.559a.25.25 0 0 1-.25-.25V17.1a.25.25 0 0 1 .5 0v.708a.25.25 0 0 1-.25.253m-1.489 0a.25.25 0 0 1-.25-.25V17.1a.25.25 0 0 1 .5 0v.708a.25.25 0 0 1-.25.253m-1.49 0a.25.25 0 0 1-.25-.25V17.1a.25.25 0 0 1 .5 0v.708a.25.25 0 0 1-.254.253Zm-1.489 0a.25.25 0 0 1-.25-.25V17.1a.25.25 0 0 1 .5 0v.708a.25.25 0 0 1-.25.253m13.43-.415a.25.25 0 0 1-.25-.25v-.974a.25.25 0 1 1 .5 0v.978a.25.25 0 0 1-.25.246m-1.048 0a.25.25 0 0 1-.25-.25v-.974a.25.25 0 0 1 .5 0v.978a.25.25 0 0 1-.247.246Zm-1.048 0a.25.25 0 0 1-.25-.25v-.974a.25.25 0 0 1 .5 0v.978a.25.25 0 0 1-.25.246m-1.049 0a.25.25 0 0 1-.25-.25v-.974a.25.25 0 0 1 .5 0v.978a.25.25 0 0 1-.25.246M9.883 16.5a.25.25 0 0 1-.25-.25v-.708a.25.25 0 0 1 .5 0v.708a.25.25 0 0 1-.25.25m-1.489 0a.25.25 0 0 1-.25-.25v-.708a.25.25 0 0 1 .5 0v.708a.25.25 0 0 1-.25.25m-1.49 0a.25.25 0 0 1-.25-.25v-.708a.25.25 0 0 1 .5 0v.708a.25.25 0 0 1-.254.25Zm-1.489 0a.25.25 0 0 1-.25-.25v-.708a.25.25 0 0 1 .5 0v.708a.25.25 0 0 1-.25.25m8.031-.61a.25.25 0 0 1-.25-.25V9.233a.25.25 0 0 1 .5 0v6.408a.25.25 0 0 1-.25.25Zm-1.05 0a.25.25 0 0 1-.25-.25v-6.9a.25.25 0 0 1 .5 0v6.9a.25.25 0 0 1-.246.251Zm6.449-.385a.25.25 0 0 1-.25-.25v-.973a.25.25 0 0 1 .5 0v.973a.25.25 0 0 1-.25.251Zm-1.048 0a.25.25 0 0 1-.25-.25v-.973a.25.25 0 1 1 .5 0v.973a.25.25 0 0 1-.247.251Zm-1.048 0a.25.25 0 0 1-.25-.25v-.973a.25.25 0 1 1 .5 0v.973a.25.25 0 0 1-.25.251Zm-1.049 0a.25.25 0 0 1-.25-.25v-.973a.25.25 0 1 1 .5 0v.973a.25.25 0 0 1-.25.251Zm3.145-2.139a.25.25 0 0 1-.25-.25v-.973a.25.25 0 1 1 .5 0v.973a.25.25 0 0 1-.25.251Zm-1.048 0a.25.25 0 0 1-.25-.25v-.973a.25.25 0 0 1 .5 0v.973a.25.25 0 0 1-.247.251Zm-1.048 0a.25.25 0 0 1-.25-.25v-.973a.25.25 0 0 1 .5 0v.973a.25.25 0 0 1-.25.251Zm-1.049 0a.25.25 0 0 1-.25-.25v-.973a.25.25 0 0 1 .5 0v.973a.25.25 0 0 1-.25.251Zm3.145-2.139a.25.25 0 0 1-.25-.25v-.973a.25.25 0 0 1 .5 0v.973a.25.25 0 0 1-.25.251Zm-1.048 0a.25.25 0 0 1-.25-.25v-.973a.25.25 0 1 1 .5 0v.973a.25.25 0 0 1-.247.251Zm-1.048 0a.25.25 0 0 1-.25-.25v-.973a.25.25 0 1 1 .5 0v.973a.25.25 0 0 1-.25.251Zm-1.049 0a.25.25 0 0 1-.25-.25v-.973a.25.25 0 1 1 .5 0v.973a.25.25 0 0 1-.25.251ZM12.4 7.64a.25.25 0 0 1-.25-.25V5.236a.25.25 0 0 1 .5 0V7.39a.25.25 0 0 1-.25.25m-1.982 0a.25.25 0 0 1-.25-.25V5.236a.25.25 0 1 1 .5 0V7.39a.25.25 0 0 1-.254.25Zm.991-.246a.25.25 0 0 1-.25-.25V4.99a.25.25 0 0 1 .5 0v2.154a.25.25 0 0 1-.254.25Zm0-3.236a.25.25 0 0 1-.25-.25V1.754a.25.25 0 1 1 .5 0v2.154a.25.25 0 0 1-.254.25Z"
                      viewbox="0 0 24 24"
                      iconStrokeWidth=""
                      iconNoStrokeNeededDelete=""
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "tab_link_text_wrap")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "faetures_tab_link_layout",
                        "u-hflex-left-center",
                        "u-gap-xsmall"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "faetures_tab_heading_wrap",
                          "u-weight-bold"
                        )}
                        tag="div"
                      >
                        <_Builtin.Heading
                          className={_utils.cx(
                            _styles,
                            "no-wrap",
                            "u-text-h5",
                            "u-weight-bold"
                          )}
                          tag="h3"
                        >
                          {"Markets"}
                        </_Builtin.Heading>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "features_tab_link_paragraph"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "")}
                        tag="div"
                      >
                        {"Global support for top tech hubs"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.TabsLink>
            </_Builtin.TabsMenu>
            <_Builtin.TabsContent
              className={_utils.cx(_styles, "features_tabs_pane_wrap")}
              tag="div"
            >
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "feautred_tabs_pane")}
                tag="div"
                data-w-tab="Tab 1"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "tabs_content_wrap")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "tabs_content_contain",
                      "u-vflex-stretch-top",
                      "u-gap-medium"
                    )}
                    tag="div"
                  >
                    <_Builtin.NotSupported _atom="DynamoWrapper" />
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "tab_button_wrap",
                        "u-hflex-center-center",
                        "u-gap-small",
                        "u-weight-semibold"
                      )}
                      tag="div"
                    >
                      <BtnMain visibility={true} />
                      <BtnMain buttonStyle="secondary" visibility={true} />
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.TabsPane>
              <_Builtin.TabsPane tag="div" data-w-tab="Tab 2">
                <_Builtin.Block
                  className={_utils.cx(_styles, "tabs_content_wrap")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "tabs_content_contain",
                      "u-vflex-stretch-top",
                      "u-gap-medium"
                    )}
                    tag="div"
                  >
                    <_Builtin.NotSupported _atom="DynamoWrapper" />
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "tab_button_wrap",
                        "u-hflex-center-center",
                        "u-gap-small",
                        "u-weight-semibold"
                      )}
                      tag="div"
                    >
                      <BtnMain
                        visibility={true}
                        link={{
                          href: "#",
                        }}
                      />
                      <BtnMain
                        buttonStyle="secondary"
                        visibility={true}
                        link={{
                          href: "#",
                        }}
                      />
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.TabsPane>
            </_Builtin.TabsContent>
          </_Builtin.TabsWrapper>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "style_hide_psuedo_element_tab")}
            value="%3Cstyle%3E.w-tabs%3Abefore%2C%20.w-tabs%3Aafter%20%7B%0A%20%20%20%20content%3A%20%22%22%3B%0A%20%20%20%20display%3A%20none%3B%0A%7D%0A%0A%3C%2Fstyle%3E%0A%0A%3Cstyle%3E%20%0A%40media%20(max-width%3A%20768px)%20%7B%0A%0A%20%20.layout496_tabs-menu%20%7B%0A%20%20%20%20order%3A%201%3B%0A%20%20%7D%0A%20%20.layout496_tabs-pane%20%7B%0A%20%20%20%20order%3A%202%3B%0A%20%20%7D%0A%7D%0A%3C%2Fstyle%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <GlobalBackgroundGraphic
        leftGraphicVisibility={false}
        rightGraphicVisibility={false}
        topBackgroundGraphicVisibility={true}
      />
    </_Component>
  );
}
