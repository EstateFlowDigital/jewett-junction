"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalParagraph } from "./GlobalParagraph";
import { GlobalVisual } from "./GlobalVisual";
import * as _utils from "./utils";
import _styles from "./ElementAboutTabs.module.css";

export function ElementAboutTabs({
  as: _Component = _Builtin.Block,
  imageFile = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg",
  globalParagraph = "",
  globalImageAltText = "__wf_reserved_inherit",
  underVisualTextVisibility = true,
  id,
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "why_jewett_content_item",
        "u-grid-custom",
        "u-gap-medium"
      )}
      tag="div"
      data-theme="invert"
      id={id}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "why_jewett_content_left",
          "u-vflex-stretch-top",
          "u-gap-medium"
        )}
        id={_utils.cx(
          _styles,
          "w-node-_2b968d69-70cb-b437-5496-6b416ae639fb-49dbee5e"
        )}
        tag="div"
      >
        {underVisualTextVisibility ? (
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "under_visual_text",
              "u-rich-text",
              "u-text-large"
            )}
            tag="div"
          >
            <GlobalParagraph
              text={
                <>
                  <_Builtin.Paragraph>
                    <_Builtin.Emphasized>
                      {
                        '"Safety is and always has been the cornerstone of everything we do at Jewett Construction. As a third-generation member of this family business, I’m proud to carry forward our unwavering commitment to ensuring that every team member, subcontractor, and client goes home safely at the end of the day. It’s not just a priority—it’s a promise we’ve upheld for over 50 years." '
                      }
                    </_Builtin.Emphasized>
                    <_Builtin.Strong>
                      <_Builtin.Emphasized>
                        {"– Nick Jewett "}
                      </_Builtin.Emphasized>
                    </_Builtin.Strong>
                  </_Builtin.Paragraph>
                  <_Builtin.Paragraph>
                    <_Builtin.Strong>
                      <_Builtin.Emphasized>
                        {"Have additional safety questions?"}
                      </_Builtin.Emphasized>
                    </_Builtin.Strong>
                  </_Builtin.Paragraph>
                  <_Builtin.Paragraph>
                    <_Builtin.Link
                      button={false}
                      block=""
                      options={{
                        href: "mailto:njewett@jewettconstruction.com",
                      }}
                    >
                      {"Email Nick Jewett"}
                    </_Builtin.Link>
                    {","}
                    <br />
                    {"Estimator,"}
                    <br />
                    {"Chairman of Jewett Construction’s Safety Committee"}
                  </_Builtin.Paragraph>
                </>
              }
            />
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "why_jewett_content_visual",
            "u-visual-wrap"
          )}
          tag="div"
        >
          <GlobalVisual
            imageImageFile={imageFile}
            imageImageAltText={globalImageAltText}
            position="is-position-top"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "why_jewett_content_paragraph",
          "u-rich-text",
          "u-text-large"
        )}
        id={_utils.cx(
          _styles,
          "w-node-_849f6409-5e29-93ce-1f8e-568c29feb9d4-49dbee5e"
        )}
        tag="div"
      >
        <GlobalParagraph text={globalParagraph} />
      </_Builtin.Block>
    </_Component>
  );
}
