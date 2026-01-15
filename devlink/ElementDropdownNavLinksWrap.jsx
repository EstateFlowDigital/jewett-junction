"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ElementNavDropdownSublink } from "./ElementNavDropdownSublink";
import * as _utils from "./utils";
import _styles from "./ElementDropdownNavLinksWrap.module.css";

export function ElementDropdownNavLinksWrap({
  as: _Component = _Builtin.Block,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "nav_dropdown_content_wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "nav_dropdown_contain", "u-container")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "nav_dropdown_layout",
            "u-vflex-stretch-top",
            "u-gap-medium"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "footer_nav_wrap",
              "u-weight-bold",
              "u-text-large"
            )}
            tag="nav"
          >
            <_Builtin.List
              className={_utils.cx(
                _styles,
                "footer_nav_list",
                "u-grid-autofit"
              )}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem
                className={_utils.cx(_styles, "nav_list_item")}
              >
                <ElementNavDropdownSublink />
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(_styles, "nav_list_item")}
              >
                <ElementNavDropdownSublink />
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(_styles, "nav_list_item")}
              >
                <ElementNavDropdownSublink />
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(_styles, "nav_list_item")}
              >
                <ElementNavDropdownSublink />
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(_styles, "nav_list_item")}
              >
                <ElementNavDropdownSublink />
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(_styles, "nav_list_item")}
              >
                <ElementNavDropdownSublink />
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(_styles, "nav_list_item")}
              >
                <ElementNavDropdownSublink />
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(_styles, "nav_list_item")}
              >
                <ElementNavDropdownSublink />
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(_styles, "nav_list_item")}
              >
                <ElementNavDropdownSublink />
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(_styles, "nav_list_item")}
              >
                <ElementNavDropdownSublink />
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
