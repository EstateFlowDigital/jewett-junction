"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./IntranetMenuOpenAndClose.module.css";

export function IntranetMenuOpenAndClose({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "button_code_wrap")} tag="div">
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "close_open_menu_css")}
        value="%3Cstyle%3E%0A%0A%2F*%20Default%20state%3A%20menu%20visible%2C%20close%20button%20showing%2C%20open%20button%20hidden%20*%2F%0A.intranet_menu_wrap%20%7B%0A%20%20transition%3A%20transform%200.3s%20ease%3B%0A%20%20transform%3A%20translateX(0)%3B%0A%7D%0A%0A.menu_close_button%20%7B%0A%20%20display%3A%20block%3B%0A%7D%0A%0A.menu_open_button%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A%2F*%20When%20the%20menu%20is%20closed%2C%20move%20it%20out%20of%20view%20*%2F%0A.intranet_menu_wrap.menu-closed%20%7B%0A%20%20transform%3A%20translateX(-100%25)%3B%0A%7D%0A%0A%2F*%20Hide%20the%20close%20button%20when%20menu%20is%20closed%20*%2F%0A.intranet_menu_wrap.menu-closed%20.menu_close_button%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A%2F*%20When%20the%20menu%20is%20closed%2C%20show%20the%20open%20button%20*%2F%0A%2F*%20This%20assumes%20the%20open%20button%20is%20a%20sibling%20following%20the%20menu%20container%20*%2F%0A.intranet_menu_wrap.menu-closed%20~%20.menu_open_button%20%7B%0A%20%20display%3A%20block%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "close_open_menu_js")}
        value="%3Cscript%3E%0A%0Adocument.addEventListener(%22DOMContentLoaded%22%2C%20function()%20%7B%0A%20%20%2F%2F%20Select%20the%20menu%20container%20and%20the%20buttons.%0A%20%20var%20menu%20%3D%20document.querySelector(%22.intranet_menu_wrap%22)%3B%0A%20%20var%20closeBtn%20%3D%20menu.querySelector(%22.menu_close_button%22)%3B%0A%20%20var%20openBtn%20%3D%20document.querySelector(%22.menu_open_button%22)%3B%0A%0A%20%20%2F%2F%20When%20the%20close%20button%20is%20clicked%2C%20add%20the%20class%20to%20slide%20the%20menu%20out.%0A%20%20closeBtn.addEventListener(%22click%22%2C%20function()%20%7B%0A%20%20%20%20menu.classList.add(%22menu-closed%22)%3B%0A%20%20%7D)%3B%0A%0A%20%20%2F%2F%20When%20the%20open%20button%20is%20clicked%2C%20remove%20the%20class%20to%20slide%20the%20menu%20back%20in.%0A%20%20openBtn.addEventListener(%22click%22%2C%20function()%20%7B%0A%20%20%20%20menu.classList.remove(%22menu-closed%22)%3B%0A%20%20%7D)%3B%0A%7D)%3B%0A%0A%0A%3C%2Fscript%3E"
      />
    </_Component>
  );
}
