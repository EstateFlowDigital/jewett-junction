"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ElementFeatureCard } from "./ElementFeatureCard";
import * as _utils from "./utils";
import _styles from "./ElementHeroFeaturesWrap.module.css";

export function ElementHeroFeaturesWrap({
  as: _Component = _Builtin.Block,
  styleTheme = "light",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "hero_interal_features_wrap")}
      tag="div"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "hero_interal_features_contain",
          "u-container",
          "u-grid-autofit"
        )}
        tag="div"
      >
        <ElementFeatureCard
          styleTheme="light"
          clickableText="Explore Indsutry"
        />
        <ElementFeatureCard
          styleTheme="inherit"
          clickableText="Explore Indsutry"
        />
        <ElementFeatureCard
          styleTheme="light"
          clickableText="Explore Indsutry"
        />
      </_Builtin.Block>
    </_Component>
  );
}
