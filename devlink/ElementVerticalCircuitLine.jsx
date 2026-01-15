"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { IconSvgWrap } from "./IconSvgWrap";
import * as _utils from "./utils";
import _styles from "./ElementVerticalCircuitLine.module.css";

export function ElementVerticalCircuitLine({
  as: _Component = _Builtin.DOM,
  lineHeight = "height: 100%",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "circuit_connection_wrap")}
      tag="div"
      slot=""
      style={lineHeight}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "circuit_connection_circle", "top")}
        tag="div"
      >
        <IconSvgWrap
          path1="m883.2 657.6h-38.398l-169.2-135.6c23.918-13.387 43.852-32.879 57.766-56.492 13.914-23.613 21.312-50.5 21.434-77.906 0.089844-34.758-11.613-68.516-33.191-95.762-21.578-27.242-51.758-46.367-85.609-54.238v-39.602h82.801c9.5469 0 18.703-3.793 25.453-10.543 6.7539-6.7539 10.547-15.91 10.547-25.457v-105.6c0-9.5469-3.793-18.703-10.547-25.453-6.75-6.7539-15.906-10.547-25.453-10.547h-237.6c-9.5469 0-18.703 3.793-25.453 10.547-6.7539 6.75-10.547 15.906-10.547 25.453v105.6c0 9.5469 3.793 18.703 10.547 25.457 6.75 6.75 15.906 10.543 25.453 10.543h82.801v70.801c-0.33984 9.6484 3.3438 19 10.172 25.828 6.8242 6.8242 16.18 10.512 25.828 10.172 21.961 0 43.02 8.7227 58.547 24.25 15.531 15.527 24.254 36.59 24.254 58.551 0 29.578-15.781 56.914-41.402 71.707-25.617 14.789-57.18 14.789-82.797 0-25.621-14.793-41.402-42.129-41.402-71.707h-72c0.12109 27.406 7.5195 54.293 21.434 77.906 13.914 23.613 33.848 43.105 57.766 56.492l-169.2 135.6h-38.398c-9.4531 0.29688-18.438 4.1875-25.125 10.875s-10.574 15.672-10.875 25.125v450c0 9.5469 3.793 18.703 10.543 25.453 6.75 6.7539 15.91 10.547 25.457 10.547h566.4c9.5469 0 18.707-3.793 25.457-10.547 6.75-6.75 10.543-15.906 10.543-25.453v-450c-0.30078-9.4531-4.1875-18.438-10.875-25.125s-15.672-10.578-25.125-10.875zm-366-531.6v-33.602h165.6v33.602zm135.6 663.6h-105.6v-60h105.6zm-182.4-132 129.6-104.4 129.6 104.4z"
          viewbox="0 0 1200 1200"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "circuit_connection_line")}
        tag="div"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "circuit_connection_circle", "bottom")}
        tag="div"
      />
    </_Component>
  );
}
