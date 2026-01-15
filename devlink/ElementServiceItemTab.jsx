"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { IconSvgWrap } from "./IconSvgWrap";
import * as _utils from "./utils";
import _styles from "./ElementServiceItemTab.module.css";

export function ElementServiceItemTab({
  as: _Component = _Builtin.Block,
  isActive,
  tabsServiceTabText = "",
  iconSvgPath1 = "M525 712.5h-37.5c-41.438 0-75-33.562-75-75v-75c0-41.438 33.562-75 75-75H525c41.438 0 75-33.562 75-75s-33.562-75-75-75H150c-41.438 0-75 33.562-75 75s33.562 75 75 75h37.5c19.875 0 38.953 7.922 53.016 21.984S262.5 542.625 262.5 562.5v75c0 19.875-7.922 38.953-21.984 53.016S207.375 712.5 187.5 712.5H150c-41.438 0-75 33.562-75 75s33.562 75 75 75h375c41.438 0 75-33.562 75-75s-33.562-75-75-75 M1050 712.5h-37.5c-41.438 0-75-33.562-75-75v-75c0-41.438 33.562-75 75-75h37.5c41.438 0 75-33.562 75-75s-33.562-75-75-75H654a146.36 146.36 0 0 1 21 75c0 39.797-15.797 77.953-43.922 106.08s-66.281 43.922-106.08 43.922h-37.5v75h37.5c39.797 0 77.953 15.797 106.08 43.922S675 747.705 675 787.504a146.36 146.36 0 0 1-21 75h396c41.438 0 75-33.562 75-75s-33.562-75-75-75z",
  serviceName = "Heading",
  lineVisibility = true,
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "services_swiper_item",
        "u-hflex-between-stretch"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "services_slider_thumb_layout",
          "u-vflex-left-center",
          "u-gap-small"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "services_slider_thumb_visual_wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "services_slider_thumb_visual")}
            tag="div"
          >
            <IconSvgWrap path1={iconSvgPath1} viewbox="0 0 1200 1200" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "services_slider_thumb_heading")}
          tag="div"
        >
          <_Builtin.Heading tag="h2">{serviceName}</_Builtin.Heading>
        </_Builtin.Block>
      </_Builtin.Block>
      {lineVisibility ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "vertical_divider")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
