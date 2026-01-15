"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { IconSvgWrap } from "./IconSvgWrap";
import * as _utils from "./utils";
import _styles from "./IntranetMenuButton.module.css";

export function IntranetMenuButton({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "menu_open_button")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "menu_open_icon_wrap")}
        tag="div"
      >
        <IconSvgWrap
          path1="m972 192.98h-744c-70.688 0-128.02 57.328-128.02 128.02v558c0 33.938 13.5 66.516 37.5 90.516s56.578 37.5 90.516 37.5h744c70.688 0 128.02-57.328 128.02-128.02v-558c0-70.688-57.328-128.02-128.02-128.02zm-801.98 686.02v-558c0-32.016 25.969-57.984 57.984-57.984h243.98v673.97h-243.98c-32.016 0-57.984-25.969-57.984-57.984zm860.02 0h-0.046875c0 32.016-25.969 57.984-57.984 57.984h-429.98v-673.97h429.98c15.375 0 30.141 6.0938 41.016 16.969s16.969 25.641 16.969 41.016zm-158.02-435.98v314.02-0.046875c-0.70312 11.578-8.2969 21.609-19.312 25.359-10.969 3.7031-23.109 0.42188-30.703-8.3438l-114.52-156.98c-7.0312-10.266-7.0312-23.766 0-34.031l112.5-156.98c7.1719-10.453 20.344-14.906 32.391-10.969s20.016 15.328 19.641 27.984z"
          viewbox="0 0 1200 1200"
          iconPath2Visibility={false}
        />
      </_Builtin.Block>
      <_Builtin.Paragraph className={_utils.cx(_styles, "u-text-small")}>
        {"Open"}
      </_Builtin.Paragraph>
    </_Component>
  );
}
