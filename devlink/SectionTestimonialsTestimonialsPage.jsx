"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SectionTestimonialsTestimonialsPage.module.css";

export function SectionTestimonialsTestimonialsPage({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  eyebrowContentRichText = "",
  headingContentRichText = "",
  paragraphContentRichText = "",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "testimonials_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "testimonials_page_contain",
          "u-container",
          "u-vflex-left-top",
          "u-gap-medium"
        )}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "testimonials_layout",
            "u-vflex-center-top"
          )}
          tag="div"
          data-theme=""
        >
          <_Builtin.DOM
            className={_utils.cx(
              _styles,
              "elfsight-app-3797bcd0-3415-481f-80d2-dcb0d51c1d0f"
            )}
            tag="div"
            slot=""
          />
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "elsight_reviews_script")}
            value="%3Cscript%20src%3D%22https%3A%2F%2Fstatic.elfsight.com%2Fplatform%2Fplatform.js%22%20data-use-service-core%20defer%3E%3C%2Fscript%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
