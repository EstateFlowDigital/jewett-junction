"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./LinkedInLinkIcon.module.css";

export function LinkedInLinkIcon({
  as: _Component = _Builtin.List,

  linkedInIconUrl = {
    href: "#",
    target: "_blank",
  },
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "footer_social_list",
        "u-hflex-left-center",
        "u-hflex-wrap",
        "u-gap-xsmall"
      )}
      tag="ul"
      unstyled={true}
    >
      <_Builtin.ListItem className={_utils.cx(_styles, "footer_social_item")}>
        <_Builtin.Link
          className={_utils.cx(
            _styles,
            "footer_social_link",
            "u-vflex-center-center",
            "u-border-main"
          )}
          button={false}
          aria-label="Linked In"
          block="inline"
          options={linkedInIconUrl}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "footer_social_icon")}
            tag="div"
          >
            <_Builtin.DOM
              tag="svg"
              slot=""
              width="100%"
              viewBox="0 0 46 46"
              aria-hidden="true"
            >
              <_Builtin.DOM
                tag="path"
                slot=""
                d="M11 5.5C11 8.6 8.6 11 5.5 11C2.4 11 0 8.5 0 5.5C0 2.5 2.5 0 5.5 0C8.5 0 11 2.5 11 5.5Z"
                fill="currentColor"
              />
              <_Builtin.DOM
                tag="path"
                slot=""
                d="M10.2998 15.1992H0.799805V45.6992H10.2998V15.1992Z"
                fill="currentColor"
              />
              <_Builtin.DOM
                tag="path"
                slot=""
                d="M45.8002 29V45.7H36.3002V30.9C36.3002 27.4 36.2002 22.8 31.4002 22.8C26.6002 22.8 25.7002 26.7 25.7002 30.6V45.7H16.2002V15.2H25.3002V19.4H25.4002C26.7002 17 29.8002 14.5 34.4002 14.5C44.0002 14.5 45.8002 20.8 45.8002 29Z"
                fill="currentColor"
              />
            </_Builtin.DOM>
          </_Builtin.Block>
        </_Builtin.Link>
      </_Builtin.ListItem>
    </_Component>
  );
}
