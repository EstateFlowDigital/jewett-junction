"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { IconSvgWrap } from "./IconSvgWrap";
import * as _utils from "./utils";
import _styles from "./ElementProcessTimeline.module.css";

export function ElementProcessTimeline({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "timeline_wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "timeline_circle")}
        id={_utils.cx(
          _styles,
          "w-node-b885dd4f-8509-b5a4-780c-e4d7b201da4d-b201da4c"
        )}
        tag="div"
      >
        <IconSvgWrap
          viewbox="0 0 1200 1200"
          path1="m1200 900.34v-37.164h-107.27l-359.51-138.28c-5.9609 11.531-13.406 22.145-22.051 31.707l277.09 106.57-776.51 0.003906 277.09-106.57c-8.625-9.5625-16.07-20.176-22.051-31.707l-359.51 138.28h-107.27v37.164l37.5-0.003906v112.5h-37.5v37.164h1200v-37.164h-37.5v-112.5z"
          path2="m470.74 460.37 91.762 45.883v43.93c-47.324 16.762-80.176 64.367-74.324 118.52 5.3438 49.52 44.398 90.824 93.582 98.605 68.062 10.742 127.24-39.977 130.59-105.23 1.0703-20.773-12.375-40.781-33.039-43.086-22.238-2.4766-41.137 14.512-41.793 36.094-0.58203 18.977-14.137 36.188-33 38.398-24.227 2.8516-44.625-17.57-41.738-41.793 2.2109-18.637 19.07-32.664 37.82-32.945 20.438-0.32031 36.898-16.988 36.898-37.5v-75l91.762-45.883c12.711-6.3555 20.738-19.332 20.738-33.543v-126.82c0-20.719-16.781-37.5-37.5-37.5v-112.5h-37.5v112.5h-150v-112.5h-37.5v112.5c-20.719 0-37.5 16.781-37.5 37.5v126.82c0 14.211 8.0234 27.188 20.738 33.543z"
          iconPath2Visibility={true}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "timeline", "white")}
        tag="div"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "timeline", "red")}
        tag="div"
      />
    </_Component>
  );
}
