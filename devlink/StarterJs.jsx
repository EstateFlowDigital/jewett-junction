"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./StarterJs.module.css";

export function StarterJs({ as: _Component = _Builtin.HtmlEmbed }) {
  return (
    <_Component
      className={_utils.cx(_styles, "u-embed-js")}
      value="%3Cscript%3E%0ApageFunctions.addFunction('yourFunctionName'%2C%20function()%20%7B%0A%09%2F%2F%20your%20code%0A%7D)%3B%0A%3C%2Fscript%3E"
    />
  );
}
