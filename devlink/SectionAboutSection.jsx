"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { BtnPlay } from "./BtnPlay";
import * as _utils from "./utils";
import _styles from "./SectionAboutSection.module.css";

export function SectionAboutSection({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "about_text_content_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "about_text_content_contain",
          "u-container",
          "u-grid-column-2",
          "u-gap-medium"
        )}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "about_text_visual", "u-visual-wrap")}
          id={_utils.cx(
            _styles,
            "w-node-ea0f872b-19b8-bfc9-9825-d9aee5bc8525-1690fbb7"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "intro_section_visual",
              "u-visual-wrap",
              "u-vflex-center-center"
            )}
            id={_utils.cx(
              _styles,
              "w-node-c17a2947-2c89-ce74-95ac-89bb232ce561-1690fbb7"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "open_portfolio_button")}
              tag="div"
              data-lightbox-trigger="intro-video"
            >
              <BtnPlay text="Play Intro Video" />
            </_Builtin.Block>
            <_Builtin.NotSupported _atom="LightboxWrapper" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "about_text_wrap_css")}
            value="%3Cstyle%3E%0A.about_text_wrap_wrap%20%7B%0A%09--about_text_wrap_color-default%3A%20var(--swatch--light-secondary)%3B%20%2F*%20Default%20text%20color%20*%2F%0A%09--about_text_wrap_color-scrolled%3A%20var(--theme--text)%3B%20%2F*%20Scrolled%20text%20color%20*%2F%0A%7D%0A%0A%2F*%20Default%20state%3A%20All%20text%20uses%20light-secondary%20*%2F%0A.about_text_wrap_wrap%20.word%20%7B%0A%09--about_text_wrap-line-width%3A%20100%25%3B%0A%09padding-top%3A%200.6em%3B%0A%09margin-top%3A%20-0.6em%3B%0A%09padding-bottom%3A%200.6em%3B%0A%09margin-bottom%3A%20-0.6em%3B%0A%09color%3A%20var(--about_text_wrap_color-default)%3B%20%2F*%20Default%20color%20*%2F%0A%09background-color%3A%20transparent%3B%0A%09background-clip%3A%20text%3B%0A%09opacity%3A%200.5%3B%20%2F*%20Initial%20transparency%20*%2F%0A%09transform%3A%20translateY(10px)%3B%20%2F*%20Adds%20slight%20movement%20*%2F%0A%09transition%3A%20color%200.6s%20ease%2C%20background-color%200.6s%20ease%2C%20opacity%200.6s%20ease%2C%20transform%200.6s%20ease%3B%0A%09text-decoration%3A%20none%3B%20%2F*%20Remove%20underline%20from%20links%20*%2F%0A%7D%0A%0A%2F*%20On%20scroll%3A%20Regular%20words%20change%20to%20theme%20text%20*%2F%0A.about_text_wrap_wrap%20.word.scrolled%20%7B%0A%09color%3A%20var(--about_text_wrap_color-scrolled)%3B%20%2F*%20Theme%20text%20color%20*%2F%0A%09opacity%3A%201%3B%0A%09transform%3A%20translateY(0)%3B%20%2F*%20Moves%20word%20into%20place%20smoothly%20*%2F%0A%7D%0A%3C%2Fstyle%3E"
          />
          <_Builtin.Heading
            className={_utils.cx(_styles, "about_text_wrap_wrap", "u-text-h3")}
            tag="h2"
          >
            {
              "At Jewett Construction, we do more than construct buildings—we create spaces that elevate businesses and communities. "
            }
            <br />
            <br />
            {
              "As a full-service commercial construction firm, we specialize in design-build, construction management, and general contracting, delivering projects with precision, efficiency, and reliability. "
            }
            <br />
            <br />
            {
              "Serving New England and the East Coast, we bring decades of expertise to industrial, automotive, food & beverage, retail, nonprofit, and beyond. With a people-first approach, we blend cutting-edge technology with expert craftsmanship, ensuring every project is on time, on budget, and built to last. "
            }
          </_Builtin.Heading>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "about_text_wrap_js")}
            value="%3Cscript%20src%3D%22https%3A%2F%2Fcdnjs.cloudflare.com%2Fajax%2Flibs%2Fgsap%2F3.12.2%2Fgsap.min.js%22%3E%3C%2Fscript%3E%0A%3Cscript%20src%3D%22https%3A%2F%2Fcdnjs.cloudflare.com%2Fajax%2Flibs%2Fgsap%2F3.12.2%2FScrollTrigger.min.js%22%3E%3C%2Fscript%3E%0A%3Cscript%20src%3D%22https%3A%2F%2Funpkg.com%2Fsplit-type%22%3E%3C%2Fscript%3E%0A%0A%3Cscript%3E%0Adocument.addEventListener(%22DOMContentLoaded%22%2C%20function%20()%20%7B%0A%20%20document.querySelectorAll(%22.about_text_wrap_wrap%22).forEach(function%20(element)%20%7B%0A%20%20%20%20if%20(element.dataset.scriptInitialized)%20return%3B%0A%20%20%20%20element.dataset.scriptInitialized%20%3D%20%22true%22%3B%0A%0A%20%20%20%20%2F%2F%20Apply%20SplitType%20to%20the%20entire%20block%0A%20%20%20%20new%20SplitType(element%2C%20%7B%20types%3A%20%22words%22%20%7D)%3B%0A%0A%20%20%20%20%2F%2F%20Select%20all%20words%20inside%20the%20element%0A%20%20%20%20const%20words%20%3D%20element.querySelectorAll(%22.word%22)%3B%0A%0A%20%20%20%20%2F%2F%20Create%20GSAP%20timeline%20for%20animation%0A%20%20%20%20const%20tl%20%3D%20gsap.timeline(%7B%0A%20%20%20%20%20%20scrollTrigger%3A%20%7B%0A%20%20%20%20%20%20%20%20trigger%3A%20element%2C%0A%20%20%20%20%20%20%20%20start%3A%20%22top%20center%22%2C%0A%20%20%20%20%20%20%20%20end%3A%20%22bottom%20center%22%2C%0A%20%20%20%20%20%20%20%20scrub%3A%20true%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D)%3B%0A%0A%20%20%20%20%2F%2F%20Animate%20each%20word%20individually%20with%20stagger%0A%20%20%20%20words.forEach((word%2C%20i)%20%3D%3E%20%7B%0A%20%20%20%20%20%20tl.to(word%2C%20%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22--about_text_wrap-line-width%22%3A%20%22100%25%22%2C%20%0A%20%20%20%20%20%20%20%20%20%20opacity%3A%201%2C%20%0A%20%20%20%20%20%20%20%20%20%20transform%3A%20%22translateY(0)%22%2C%0A%20%20%20%20%20%20%20%20%20%20ease%3A%20%22power2.out%22%2C%0A%20%20%20%20%20%20%20%20%7D%2C%20i%20*%200.1)%3B%20%2F%2F%20Stagger%20effect%0A%0A%20%20%20%20%20%20%2F%2F%20Apply%20the%20scrolled%20class%20to%20each%20word%20when%20it%20reaches%20the%20scroll%20trigger%0A%20%20%20%20%20%20ScrollTrigger.create(%7B%0A%20%20%20%20%20%20%20%20trigger%3A%20word%2C%0A%20%20%20%20%20%20%20%20start%3A%20%22top%2085%25%22%2C%20%2F%2F%20Slightly%20earlier%20start%20for%20smoother%20effect%0A%20%20%20%20%20%20%20%20end%3A%20%22top%2030%25%22%2C%0A%20%20%20%20%20%20%20%20scrub%3A%20true%2C%0A%20%20%20%20%20%20%20%20onEnter%3A%20()%20%3D%3E%20word.classList.add(%22scrolled%22)%2C%0A%20%20%20%20%20%20%20%20onLeaveBack%3A%20()%20%3D%3E%20word.classList.remove(%22scrolled%22)%2C%0A%20%20%20%20%20%20%7D)%3B%0A%20%20%20%20%7D)%3B%0A%20%20%7D)%3B%0A%7D)%3B%0A%3C%2Fscript%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
