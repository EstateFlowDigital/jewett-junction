"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import * as _utils from "./utils";
import _styles from "./ElementMainContactForm.module.css";

export function ElementMainContactForm({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "contact_form_wrap_2",
        "u-vflex-left-top",
        "u-gap-large"
      )}
      id={_utils.cx(
        _styles,
        "w-node-ec7e8abb-f67d-9fe4-ed42-067d4c3bb4a7-4c3bb4a7"
      )}
      tag="div"
      data-theme="light"
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "form_main_wrap")}
        value="%3Cscript%20src%3D%22https%3A%2F%2Fjs.hsforms.net%2Fforms%2Fembed%2F48133577.js%22%20defer%3E%3C%2Fscript%3E%0A%3Cdiv%20class%3D%22hs-form-frame%22%20data-region%3D%22na1%22%20data-form-id%3D%225232a6b4-08a3-42e8-b18c-589dc812c315%22%20data-portal-id%3D%2248133577%22%3E%3C%2Fdiv%3E"
      />
    </_Component>
  );
}
