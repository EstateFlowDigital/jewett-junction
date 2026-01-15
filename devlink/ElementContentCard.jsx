"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalVisual } from "./GlobalVisual";
import { GlobalContent } from "./GlobalContent";
import { GlobalClickable } from "./GlobalClickable";
import * as _utils from "./utils";
import _styles from "./ElementContentCard.module.css";

export function ElementContentCard({
  as: _Component = _Builtin.Block,
  textHeadingText = "",
  textParagraphText = "",
  buttonButtonText = "Button Text",

  buttonButtonUrl = {
    href: "#",
  },

  textEyebrowText = "Name",
  eyebrowText = "",
  eyebrowFeaturedText = "New",
  styleTheme = "dark",
  cdnImageUrl,
  cdnImageAltText,
  mainImageVisibility = false,
  mainVisual = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg",
  cdnImageVisibility = true,
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "tabs_item_wrap",
        "u-vflex-left-top",
        "u-gap-xsmall"
      )}
      tag="div"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "tab_item_visual", "u-visual-wrap")}
        tag="div"
      >
        <GlobalVisual
          imageCdnImageUrl={cdnImageUrl}
          imageCdnImageAltText={cdnImageAltText}
          imageImageVisibility={mainImageVisibility}
          imageCdnImageVisibility={cdnImageVisibility}
          imageImageFile={mainVisual}
          position="is-position-top"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "tab_item_content",
          "u-vflex-left-between",
          "u-gap-medium"
        )}
        tag="div"
      >
        <GlobalContent
          eyebrowEyebrowText={eyebrowText}
          eyebrowFeaturedText={eyebrowFeaturedText}
          headingHeadingText={textHeadingText}
          paragraphParagraphText={textParagraphText}
          button1Button1Text={buttonButtonText}
          button1Button1Link={buttonButtonUrl}
          eyebrowPlainText={textEyebrowText}
          headingStyle="u-text-h4"
          button1SubtextVisibility={false}
          button2Button2Visibility={false}
          eyebrowPlainTextVisibiliity={true}
          eyebrowRichTextVisibility={false}
          eyebrowEyebrowIconViewbox="0 0 1200 1200"
          eyebrowIconPath1="M982.78 150v42c0 34.781-28.781 62.391-63.609 62.391H908.39c-34.781 0-62.391-27.609-62.391-62.391v-42h-492v42c0 34.781-27.609 62.391-62.391 62.391h-10.781c-34.781 0-63.609-27.609-63.609-62.391v-42H29.998v900h1140V150zM1086 966H114V345.61h972zM290.39 285.61h-10.781c-51.609 0-93.609-42-93.609-93.609V117.61c1.219-51.609 42-93.609 93.609-93.609h10.781c51.609 0 93.609 42 93.609 93.609v74.391c0 51.609-42 93.609-93.609 93.609M279.609 84c-18 0-33.609 14.391-33.609 33.609V192c0 18 14.391 33.609 33.609 33.609h10.781c18 0 33.609-14.391 33.609-33.609v-74.391c0-18-14.391-33.609-33.609-33.609zM920.39 285.61h-10.781c-51.609 0-93.609-42-93.609-93.609V117.61c0-51.609 42-93.609 93.609-93.609h10.781c51.609 0 93.609 42 93.609 93.609v74.391c-1.219 51.609-42 93.609-93.609 93.609M909.609 84C890.39 84 876 99.609 876 117.609V192c0 18 14.391 33.609 33.609 33.609h10.781c18 0 33.609-14.391 33.609-33.609v-74.391c0-18-14.391-33.609-33.609-33.609zM426 397.22h129.61v129.61H426zm218.39 0H774v129.61H644.39zm218.39 0h129.61v129.61H862.78zm-654 193.17h129.61V720H208.78zm217.22 0h129.61V720H426zm218.39 0H774V720H644.39zm218.39 0h129.61V720H862.78zm-654 194.39h129.61v129.61H208.78zm217.22 0h129.61v129.61H426zm218.39 0H774v129.61H644.39z"
          button1IconVisibility={true}
          button1IconSvgPath1="m934.87 564.84h-669.74v-63.75h669.71v63.75zm-441.89-272.02h587.02v728.53c0 13.266-10.828 24.094-24.094 24.094l-911.76 0.046875c-13.078 0-24.094-11.062-24.094-24.094v-673.6h324.1c7.7812 0 15.047-3.8906 19.359-10.406l29.484-44.531zm2.1562 387.66c0-12.844-10.406-23.203-23.203-23.203h-229.97c-12.844 0-23.203 10.406-23.203 23.203v229.92c0 12.844 10.406 23.203 23.203 23.203h229.97c12.844 0 23.203-10.406 23.203-23.203zm486.19 198.24c0-12.844-10.406-23.203-23.203-23.203h-366.98c-12.844 0-23.203 10.406-23.203 23.203 0 12.844 10.406 23.203 23.203 23.203h366.98c12.844 0 23.203-10.406 23.203-23.203zm0-84.984c0-12.844-10.406-23.203-23.203-23.203h-366.98c-12.844 0-23.203 10.406-23.203 23.203 0 12.844 10.406 23.203 23.203 23.203h366.98c12.844 0 23.203-10.406 23.203-23.203zm0-81.609c0-12.844-10.406-23.203-23.203-23.203h-366.98c-12.844 0-23.203 10.406-23.203 23.203 0 12.844 10.406 23.203 23.203 23.203h366.98c12.844 0 23.203-10.406 23.203-23.203zm-23.203-257.48h-716.21c-12.844 0-23.203 10.406-23.203 23.203v110.2c0 12.844 10.406 23.203 23.203 23.203h716.16c12.844 0 23.203-10.406 23.203-23.203v-110.2c0-12.844-10.406-23.203-23.203-23.203zm121.87-276.1v67.781h-599.48c-7.7812 0-15.047 3.8906-19.359 10.406l-29.484 44.531-311.63 0.046875v-122.72c0-13.266 10.828-24.094 24.094-24.094h911.76c13.266 0 24.094 10.828 24.094 24.094zm-840.89 49.312c0-12.797-10.406-23.203-23.203-23.203s-23.203 10.406-23.203 23.203 10.406 23.203 23.203 23.203 23.203-10.406 23.203-23.203zm72.844 0c0-12.797-10.5-23.203-23.297-23.203s-23.203 10.406-23.203 23.203 10.406 23.203 23.203 23.203 23.297-10.406 23.297-23.203zm72.797 0c0-12.797-10.406-23.203-23.297-23.203-12.844 0-23.203 10.406-23.203 23.203s10.406 23.203 23.203 23.203 23.297-10.406 23.297-23.203zm-119.58 659.26h183.52v-183.47h-183.52z"
          button1IconViewbox="0 0 1200 1200"
          headingHeadingMaxWidth="max-width: none;"
          buttonGroupButtonGroupVisibility={false}
        />
        <GlobalContent
          eyebrowEyebrowText={eyebrowText}
          eyebrowFeaturedText={eyebrowFeaturedText}
          headingHeadingText={textHeadingText}
          paragraphParagraphText={textParagraphText}
          button1Button1Text={buttonButtonText}
          button1Button1Link={buttonButtonUrl}
          eyebrowPlainText={textEyebrowText}
          headingStyle="u-text-h4"
          button1SubtextVisibility={false}
          button2Button2Visibility={false}
          eyebrowPlainTextVisibiliity={false}
          eyebrowRichTextVisibility={false}
          eyebrowEyebrowIconViewbox="0 0 1200 1200"
          eyebrowIconPath1="M982.78 150v42c0 34.781-28.781 62.391-63.609 62.391H908.39c-34.781 0-62.391-27.609-62.391-62.391v-42h-492v42c0 34.781-27.609 62.391-62.391 62.391h-10.781c-34.781 0-63.609-27.609-63.609-62.391v-42H29.998v900h1140V150zM1086 966H114V345.61h972zM290.39 285.61h-10.781c-51.609 0-93.609-42-93.609-93.609V117.61c1.219-51.609 42-93.609 93.609-93.609h10.781c51.609 0 93.609 42 93.609 93.609v74.391c0 51.609-42 93.609-93.609 93.609M279.609 84c-18 0-33.609 14.391-33.609 33.609V192c0 18 14.391 33.609 33.609 33.609h10.781c18 0 33.609-14.391 33.609-33.609v-74.391c0-18-14.391-33.609-33.609-33.609zM920.39 285.61h-10.781c-51.609 0-93.609-42-93.609-93.609V117.61c0-51.609 42-93.609 93.609-93.609h10.781c51.609 0 93.609 42 93.609 93.609v74.391c-1.219 51.609-42 93.609-93.609 93.609M909.609 84C890.39 84 876 99.609 876 117.609V192c0 18 14.391 33.609 33.609 33.609h10.781c18 0 33.609-14.391 33.609-33.609v-74.391c0-18-14.391-33.609-33.609-33.609zM426 397.22h129.61v129.61H426zm218.39 0H774v129.61H644.39zm218.39 0h129.61v129.61H862.78zm-654 193.17h129.61V720H208.78zm217.22 0h129.61V720H426zm218.39 0H774V720H644.39zm218.39 0h129.61V720H862.78zm-654 194.39h129.61v129.61H208.78zm217.22 0h129.61v129.61H426zm218.39 0H774v129.61H644.39z"
          button1IconVisibility={true}
          button1IconSvgPath1="m934.87 564.84h-669.74v-63.75h669.71v63.75zm-441.89-272.02h587.02v728.53c0 13.266-10.828 24.094-24.094 24.094l-911.76 0.046875c-13.078 0-24.094-11.062-24.094-24.094v-673.6h324.1c7.7812 0 15.047-3.8906 19.359-10.406l29.484-44.531zm2.1562 387.66c0-12.844-10.406-23.203-23.203-23.203h-229.97c-12.844 0-23.203 10.406-23.203 23.203v229.92c0 12.844 10.406 23.203 23.203 23.203h229.97c12.844 0 23.203-10.406 23.203-23.203zm486.19 198.24c0-12.844-10.406-23.203-23.203-23.203h-366.98c-12.844 0-23.203 10.406-23.203 23.203 0 12.844 10.406 23.203 23.203 23.203h366.98c12.844 0 23.203-10.406 23.203-23.203zm0-84.984c0-12.844-10.406-23.203-23.203-23.203h-366.98c-12.844 0-23.203 10.406-23.203 23.203 0 12.844 10.406 23.203 23.203 23.203h366.98c12.844 0 23.203-10.406 23.203-23.203zm0-81.609c0-12.844-10.406-23.203-23.203-23.203h-366.98c-12.844 0-23.203 10.406-23.203 23.203 0 12.844 10.406 23.203 23.203 23.203h366.98c12.844 0 23.203-10.406 23.203-23.203zm-23.203-257.48h-716.21c-12.844 0-23.203 10.406-23.203 23.203v110.2c0 12.844 10.406 23.203 23.203 23.203h716.16c12.844 0 23.203-10.406 23.203-23.203v-110.2c0-12.844-10.406-23.203-23.203-23.203zm121.87-276.1v67.781h-599.48c-7.7812 0-15.047 3.8906-19.359 10.406l-29.484 44.531-311.63 0.046875v-122.72c0-13.266 10.828-24.094 24.094-24.094h911.76c13.266 0 24.094 10.828 24.094 24.094zm-840.89 49.312c0-12.797-10.406-23.203-23.203-23.203s-23.203 10.406-23.203 23.203 10.406 23.203 23.203 23.203 23.203-10.406 23.203-23.203zm72.844 0c0-12.797-10.5-23.203-23.297-23.203s-23.203 10.406-23.203 23.203 10.406 23.203 23.203 23.203 23.297-10.406 23.297-23.203zm72.797 0c0-12.797-10.406-23.203-23.297-23.203-12.844 0-23.203 10.406-23.203 23.203s10.406 23.203 23.203 23.203 23.297-10.406 23.297-23.203zm-119.58 659.26h183.52v-183.47h-183.52z"
          button1IconViewbox="0 0 1200 1200"
          headingHeadingMaxWidth="max-width: none;"
          eyebrowEyebrowVisibility={false}
          headingHeadingVisibility={false}
          paragraphParagraphVisibility={false}
        />
      </_Builtin.Block>
      <GlobalClickable text={buttonButtonText} link={buttonButtonUrl} />
    </_Component>
  );
}
