"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { StarterWhyUsSubItemHomepage } from "./StarterWhyUsSubItemHomepage";
import { GlobalBackgroundGraphic } from "./GlobalBackgroundGraphic";
import * as _utils from "./utils";
import _styles from "./SectionWhyUsSimple.module.css";

export function SectionWhyUsSimple({
  as: _Component = _Builtin.Section,
  heading = "",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "why_us_wrap")}
      tag="section"
      grid={{
        type: "section",
      }}
      data-theme="light"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "why_us_contain",
          "u-container",
          "u-vflex-center-center",
          "u-gap-medium"
        )}
        tag="div"
        data-padding-top="small"
        data-padding-bottom="small"
      >
        <GlobalContent
          buttonGroupButtonGroupVisibility={false}
          eyebrowFeaturedText="Let's Connect"
          button1IconSvgPath1="m783.79 379.08c31.875-11.391 66.984 5.25 78.375 37.172 11.391 31.875-5.25 66.984-37.125 78.375-43.594 15.562-89.109 52.594-129.14 102-42.094 51.844-77.062 116.39-97.359 184.08-13.406 44.906-69.75 58.266-102.09 25.875l-144.24-144.24c-23.953-23.953-23.953-62.812 0-86.766s62.812-23.953 86.766 0l77.859 77.859c54.891-115.27 152.95-233.63 267.05-274.31zm-183.79-331.26c-304.97 0-552.19 247.22-552.19 552.19s247.22 552.19 552.19 552.19 552.19-247.22 552.19-552.19-247.22-552.19-552.19-552.19zm0 122.72c-237.19 0-429.47 192.28-429.47 429.47 0 237.19 192.28 429.47 429.47 429.47s429.47-192.28 429.47-429.47c0-237.19-192.28-429.47-429.47-429.47z"
          eyebrowIconPath1="m783.79 379.08c31.875-11.391 66.984 5.25 78.375 37.172 11.391 31.875-5.25 66.984-37.125 78.375-43.594 15.562-89.109 52.594-129.14 102-42.094 51.844-77.062 116.39-97.359 184.08-13.406 44.906-69.75 58.266-102.09 25.875l-144.24-144.24c-23.953-23.953-23.953-62.812 0-86.766s62.812-23.953 86.766 0l77.859 77.859c54.891-115.27 152.95-233.63 267.05-274.31zm-183.79-331.26c-304.97 0-552.19 247.22-552.19 552.19s247.22 552.19 552.19 552.19 552.19-247.22 552.19-552.19-247.22-552.19-552.19-552.19zm0 122.72c-237.19 0-429.47 192.28-429.47 429.47 0 237.19 192.28 429.47 429.47 429.47s429.47-192.28 429.47-429.47c0-237.19-192.28-429.47-429.47-429.47z"
          eyebrowEyebrowIconViewbox="0 0 1200 1200"
          eyebrowEyebrowText={
            <_Builtin.Paragraph>
              {"Ready to Upgrade Your Auto Dealership?"}
            </_Builtin.Paragraph>
          }
          headingHeadingText={
            <_Builtin.Heading tag="h2">
              {"Here's Why Jewett Constructionis "}
              <_Builtin.Strong>
                {"Your Ideal COnstruction Partner"}
              </_Builtin.Strong>
            </_Builtin.Heading>
          }
          paragraphParagraphText={
            <>
              <_Builtin.Paragraph>
                {
                  "Jewett Construction delivers OEM-compliant, phased construction for active automotive dealerships—keeping sales and service running while we build. "
                }
                <_Builtin.Strong>
                  <_Builtin.Emphasized>
                    {"Complete the form to get started."}
                  </_Builtin.Emphasized>
                </_Builtin.Strong>
              </_Builtin.Paragraph>
              <_Builtin.List tag="ul" unstyled={false}>
                <_Builtin.ListItem>
                  <_Builtin.Strong>{"Phone: "}</_Builtin.Strong>
                  <_Builtin.Link
                    button={false}
                    block=""
                    options={{
                      href: "tel:603.895.2412",
                    }}
                  >
                    {"603.895.2412"}
                  </_Builtin.Link>
                  <_Builtin.Strong>{"‍"}</_Builtin.Strong>
                </_Builtin.ListItem>
                <_Builtin.ListItem>
                  <_Builtin.Strong>{"General Inquiries:"}</_Builtin.Strong>{" "}
                  <_Builtin.Link
                    button={false}
                    block=""
                    options={{
                      href: "mailto:ReadytoBuild@jewettconstruction.com",
                    }}
                  >
                    {"ReadytoBuild@jewettconstruction.com"}
                  </_Builtin.Link>
                </_Builtin.ListItem>
              </_Builtin.List>
            </>
          }
          paragraphStyless="u-rich-text"
          variant="Content is Center"
          paragraphParagraphVisibility={false}
          eyebrowEyebrowVisibility={false}
          headingHeadingMaxWidth="max-width: 30ch;"
        />
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "why_us_item_layout",
            "u-grid-column-2"
          )}
          id={_utils.cx(
            _styles,
            "w-node-ce5db733-2572-74ee-c9e2-37b8d65fcb19-d65fcb17"
          )}
          tag="div"
        >
          <StarterWhyUsSubItemHomepage
            styleTheme="invert"
            item1TextRichText={
              <_Builtin.Paragraph>{"Item 1"}</_Builtin.Paragraph>
            }
            iconViewbox="0 0 8 13"
            iconPath1="M0.506958 0.552979L6.50696 6.05298L0.506958 11.553"
            iconPath2=""
            iconPath3=""
            iconPath2Visibility={false}
            iconPath3Visibility={false}
            iconPath4Visibility={false}
            iconPath4=""
            iconFill=""
            iconStrokeOrFill="fill"
            iconStrokeOrFillColor="currentColor"
            textClass=""
            slot={
              <>
                <GlobalHeading
                  classes="u-text-h3"
                  text={
                    <_Builtin.Heading tag="h3">
                      <_Builtin.Strong>
                        {"Built for Active Dealerships"}
                      </_Builtin.Strong>
                    </_Builtin.Heading>
                  }
                />
                <GlobalSpacer variant="xsmall" />
                <GlobalParagraph
                  classes="u-color-faded"
                  text={
                    <_Builtin.Paragraph>
                      {
                        "Our phased construction approach allows your dealership to remain open, safe, and profitable throughout renovation or expansion."
                      }
                    </_Builtin.Paragraph>
                  }
                />
                <GlobalSpacer variant="small" />
                <ElementButtonsWrap
                  slot={
                    <BtnMain
                      text="See More Information"
                      link={{
                        href: "https://www.jewettconstruction.com/industries/automotive",
                      }}
                      iconIconVisibility={false}
                    />
                  }
                />
              </>
            }
          />
          <StarterWhyUsSubItemHomepage
            styleTheme="invert"
            item1TextRichText={
              <_Builtin.Paragraph>{"Item 1"}</_Builtin.Paragraph>
            }
            iconViewbox="0 0 8 13"
            iconPath1="M0.506958 0.552979L6.50696 6.05298L0.506958 11.553"
            iconPath2=""
            iconPath3=""
            iconPath2Visibility={false}
            iconPath3Visibility={false}
            iconPath4Visibility={false}
            iconPath4=""
            iconFill=""
            iconStrokeOrFill="fill"
            iconStrokeOrFillColor="currentColor"
            textClass=""
            slot={
              <>
                <GlobalHeading
                  classes="u-text-h3"
                  text={
                    <_Builtin.Heading tag="h3">
                      <_Builtin.Strong>
                        {"OEM & Brand Standard Expertise"}
                      </_Builtin.Strong>
                    </_Builtin.Heading>
                  }
                />
                <GlobalSpacer variant="xsmall" />
                <GlobalParagraph
                  classes="u-color-faded"
                  text={
                    <_Builtin.Paragraph>
                      {
                        "We understand manufacturer facility requirements and deliver projects that meet strict brand and design standards."
                      }
                    </_Builtin.Paragraph>
                  }
                />
                <GlobalSpacer variant="small" />
                <ElementButtonsWrap
                  slot={
                    <BtnMain
                      text="See More Information"
                      link={{
                        href: "https://www.jewettconstruction.com/industries/automotive",
                      }}
                      iconIconVisibility={false}
                    />
                  }
                />
              </>
            }
          />
          <StarterWhyUsSubItemHomepage
            styleTheme="invert"
            item1TextRichText={
              <_Builtin.Paragraph>{"Item 1"}</_Builtin.Paragraph>
            }
            iconViewbox="0 0 8 13"
            iconPath1="M0.506958 0.552979L6.50696 6.05298L0.506958 11.553"
            iconPath2=""
            iconPath3=""
            iconPath2Visibility={false}
            iconPath3Visibility={false}
            iconPath4Visibility={false}
            iconPath4=""
            iconFill=""
            iconStrokeOrFill="fill"
            iconStrokeOrFillColor="currentColor"
            textClass=""
            slot={
              <>
                <GlobalHeading
                  classes="u-text-h3"
                  text={
                    <_Builtin.Heading tag="h3">
                      <_Builtin.Strong>
                        {"On-Time, On-Budget Delivery"}
                      </_Builtin.Strong>
                    </_Builtin.Heading>
                  }
                />
                <GlobalSpacer variant="xsmall" />
                <GlobalParagraph
                  classes="u-color-faded"
                  text={
                    <_Builtin.Paragraph>
                      {
                        "Strategic preconstruction planning helps prevent delays, cost overruns, and operational disruption."
                      }
                    </_Builtin.Paragraph>
                  }
                />
                <GlobalSpacer variant="small" />
                <ElementButtonsWrap
                  slot={
                    <BtnMain
                      text="See More Information"
                      link={{
                        href: "https://www.jewettconstruction.com/industries/automotive",
                      }}
                      iconIconVisibility={false}
                    />
                  }
                />
              </>
            }
          />
          <StarterWhyUsSubItemHomepage
            styleTheme="invert"
            item1TextRichText={
              <_Builtin.Paragraph>{"Item 1"}</_Builtin.Paragraph>
            }
            iconViewbox="0 0 8 13"
            iconPath1="M0.506958 0.552979L6.50696 6.05298L0.506958 11.553"
            iconPath2=""
            iconPath3=""
            iconPath2Visibility={false}
            iconPath3Visibility={false}
            iconPath4Visibility={false}
            iconPath4=""
            iconFill=""
            iconStrokeOrFill="fill"
            iconStrokeOrFillColor="currentColor"
            textClass=""
            slot={
              <>
                <GlobalHeading
                  classes="u-text-h3"
                  text={
                    <_Builtin.Heading tag="h3">
                      <_Builtin.Strong>
                        {"Service-Focused Design"}
                      </_Builtin.Strong>
                    </_Builtin.Heading>
                  }
                />
                <GlobalSpacer variant="xsmall" />
                <GlobalParagraph
                  classes="u-color-faded"
                  text={
                    <_Builtin.Paragraph>
                      {
                        "We build efficient service and parts environments that support long-term revenue growth."
                      }
                    </_Builtin.Paragraph>
                  }
                />
                <GlobalSpacer variant="small" />
                <ElementButtonsWrap
                  slot={
                    <BtnMain
                      text="See More Information"
                      link={{
                        href: "https://www.jewettconstruction.com/industries/automotive",
                      }}
                      iconIconVisibility={false}
                    />
                  }
                />
              </>
            }
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <GlobalBackgroundGraphic
        leftGraphicVisibility={false}
        rightGraphicVisibility={true}
      />
    </_Component>
  );
}
