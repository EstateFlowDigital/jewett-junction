"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalLogoMain } from "./GlobalLogoMain";
import * as _utils from "./utils";
import _styles from "./GlobalLoader.module.css";

export function GlobalLoader({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "loading_wrap")}
      tag="div"
      data-theme="light"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "loading-container", "u-container")}
        tag="div"
      >
        <GlobalLogoMain isLoader="is-loader" />
        <_Builtin.Block
          className={_utils.cx(_styles, "loading_circle_spacing")}
          tag="div"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "loading-spinner")}
          tag="div"
        />
        <_Builtin.Block className={_utils.cx(_styles, "main-text")} tag="div">
          <_Builtin.Block tag="div">
            <_Builtin.Span>{'"Delivering Quality,'}</_Builtin.Span>{" "}
            <_Builtin.Span>{"Innovation,"}</_Builtin.Span>{" "}
            <_Builtin.Span>{"and Precision,"}</_Builtin.Span>{" "}
            <_Builtin.Span>{'with Absolute Integrity."'}</_Builtin.Span>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "loader_css", "u-embed-css")}
        value="%3Cstyle%3E%0A%0A%2F*%20Ensure%20loading_wrap%20fully%20covers%20the%20viewport%20*%2F%0A.loading_wrap%20%7B%0A%20%20position%3A%20fixed%3B%20%2F*%20Ensure%20it%20stays%20above%20all%20content%20*%2F%0A%20%20top%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20width%3A%20100%25%3B%0A%20%20height%3A%20100%25%3B%0A%20%20z-index%3A%201000%3B%20%2F*%20Keep%20it%20above%20other%20content%20*%2F%0A%20%20display%3A%20flex%3B%20%2F*%20Center%20content%20*%2F%0A%20%20justify-content%3A%20center%3B%0A%20%20align-items%3A%20center%3B%0A%20%20overflow%3A%20hidden%3B%0A%7D%0A%0A%2F*%20Container%20Styles%20*%2F%0A.loading-container%20%7B%0A%20%20display%3A%20flex%3B%0A%20%20justify-content%3A%20center%3B%0A%20%20align-items%3A%20center%3B%0A%20%20flex-direction%3A%20column%3B%0A%20%20height%3A%20100vh%3B%0A%20%20font-family%3A%20var(--font--secondary-family%2C%20'Montserrat')%2C%20sans-serif%3B%0A%20%20text-align%3A%20center%3B%0A%20%20overflow%3A%20hidden%3B%0A%7D%0A%0A%2F*%20Spinner%20Styles%20*%2F%0A.loading-spinner%20%7B%0A%20%20width%3A%2050px%3B%0A%20%20height%3A%2050px%3B%0A%20%20border%3A%205px%20solid%20var(--swatch--light-secondary%2C%20%23dadada)%3B%20%2F*%20Light%20gray%20*%2F%0A%20%20border-top%3A%205px%20solid%20var(--swatch--brand%2C%20%23ee2957)%3B%20%2F*%20Accent%20color%20*%2F%0A%20%20border-radius%3A%2050%25%3B%0A%20%20margin-bottom%3A%2020px%3B%0A%7D%0A%0A%0A%2F*%20Loading%20Text%20*%2F%0A.loading-text%20%7B%0A%20%20margin-bottom%3A%2020px%3B%0A%7D%0A%0A%0A%2F*%20Main%20Text%20(Words%20Animation)%20*%2F%0A.main-text%20%7B%0A%20%20font-size%3A%20var(--h4--font-size%2C%201.5rem)%3B%20%2F*%20Default%3A%20medium%20size%20for%20the%20main%20message%20*%2F%0A%20%20display%3A%20flex%3B%0A%20%20gap%3A%200.5rem%3B%0A%20%20flex-wrap%3A%20wrap%3B%0A%20%20justify-content%3A%20center%3B%0A%7D%0A%0A.main-text%20span%20%7B%0A%20%20opacity%3A%200%3B%20%2F*%20Ensure%20all%20words%20are%20hidden%20initially%20*%2F%0A%20%20display%3A%20inline-block%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
