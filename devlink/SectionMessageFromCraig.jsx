"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { GlobalVisual } from "./GlobalVisual";
import { ElementAboutTabs } from "./ElementAboutTabs";
import * as _utils from "./utils";
import _styles from "./SectionMessageFromCraig.module.css";

export function SectionMessageFromCraig({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  messageVisibility = true,
  tabsVisibility = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "message_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "message_contain",
          "u-container",
          "u-vflex-stretch-top",
          "u-gap-large"
        )}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        {messageVisibility ? (
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "message_layout",
              "u-grid-autofit",
              "u-gap-large"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "message_content")}
              tag="div"
            >
              <GlobalContent
                headingHeadingText={
                  <_Builtin.Heading tag="h2">
                    {"A message from "}
                    <_Builtin.Strong>{"Craig Jewett"}</_Builtin.Strong>
                  </_Builtin.Heading>
                }
                paragraphParagraphText={
                  <>
                    <_Builtin.Paragraph>
                      {
                        "Since 1972 my family has been providing unparalleled construction services to customers throughout the Northeast. It has been through true grit, work ethic, and good old yankee values that have allowed Jewett to continue for over 50 years."
                      }
                    </_Builtin.Paragraph>
                    <_Builtin.Paragraph>
                      {
                        "As we sprint towards 2025 and beyond, I introduce the core values that our team of incredible associates have identified as our company culture. Values such as "
                      }
                      <_Builtin.Strong>
                        <_Builtin.Emphasized>{"PASSION"}</_Builtin.Emphasized>
                      </_Builtin.Strong>
                      {", "}
                      <_Builtin.Strong>
                        <_Builtin.Emphasized>{"RESPECT"}</_Builtin.Emphasized>
                      </_Builtin.Strong>
                      {", "}
                      <_Builtin.Strong>
                        <_Builtin.Emphasized>{"HONESTY"}</_Builtin.Emphasized>
                      </_Builtin.Strong>
                      {", "}
                      <_Builtin.Strong>
                        <_Builtin.Emphasized>
                          {"SHARED SUCCESS"}
                        </_Builtin.Emphasized>
                      </_Builtin.Strong>
                      {", and "}
                      <_Builtin.Strong>
                        <_Builtin.Emphasized>{"FAMILY"}</_Builtin.Emphasized>
                      </_Builtin.Strong>
                      {
                        "  will be what drives us moving forward. I would like to thank all of our associates for their hard work and dedication.  You have my promise to work hard for shared success and company growth."
                      }
                    </_Builtin.Paragraph>
                    <_Builtin.Paragraph>
                      {
                        "Thank you to our past, present, and future clients. Thank you for the trust. You have my commitment to honor our workmanship. For those of you who have not worked with our team, our Single Source/Trusted Design Build delivery method works. Let us show you how!"
                      }
                    </_Builtin.Paragraph>
                    <_Builtin.Paragraph>
                      {
                        "Thank you to all our Architect, Engineers, Sub-Contractors, and Vendor partners. You are truly part of the Jewett Design Build Family."
                      }
                    </_Builtin.Paragraph>
                    <_Builtin.Paragraph>
                      {
                        "I always say, “The true meaning of success is making others successful”. How can Jewett make you successful?"
                      }
                    </_Builtin.Paragraph>
                    <_Builtin.Heading tag="h3">
                      <_Builtin.Strong>{"WELCOME TO JEWETT! "}</_Builtin.Strong>
                    </_Builtin.Heading>
                  </>
                }
                paragraphStyless="u-text-large u-rich-text"
                buttonGroupButtonGroupVisibility={false}
                headingHeadingMaxWidth="max-width: none;"
                eyebrowEyebrowText={
                  <_Builtin.Paragraph>
                    {"Building on Tradition"}
                  </_Builtin.Paragraph>
                }
                eyebrowFeaturedText="Message"
                eyebrowIconPath1="m276 690.32c-0.09375-0.09375-0.14062-0.23438-0.1875-0.32812l-22.312-38.672-122.86 70.922 160.36 277.78 122.86-70.922-27.375-47.391-0.09375-0.14063-110.44-191.29zm10.453-1.2656c25.781-18.562 48.328-24.891 72.891-31.828 24.938-7.0312 51.844-14.625 86.344-35.531 55.266-18.656 86.438-1.2188 127.64 21.75 50.672 28.312 115.97 64.734 255.71 56.25 6.3281 1.0312 11.344 4.9688 14.953 10.266 2.5781 3.8438 4.4062 8.3906 5.4375 13.125 1.0312 4.7812 1.2656 9.7031 0.60937 14.25-0.89062 6.4688-3.5625 12.141-8.1094 15.188-0.28125 0.1875-0.51563 0.375-0.75 0.60938-38.953 36.141-106.73 31.312-172.26 26.625-16.031-1.125-31.875-2.2969-47.672-2.8125-2.6719-0.09375-4.875 2.0156-4.9688 4.6875-0.09375 2.5312 1.7812 4.6406 4.2656 4.9219 22.406 2.8125 45.375 7.4062 68.531 12.047 47.25 9.4688 95.297 19.078 143.02 14.484 0.28125-0.046875 0.5625-0.09375 0.84375-0.14062 14.859-4.125 38.766-15.047 66.047-27.562 56.625-25.922 128.11-58.688 157.87-48.609 12.609 4.2656 16.922 18.047 7.5469 46.688-41.859 34.922-89.766 59.766-137.72 84.609-24.281 12.609-48.609 25.172-72.094 39.094-37.453 15.609-112.03 15-187.97 14.344-38.484-0.32812-77.297-0.65625-111.94 1.125-44.625-23.25-72.516-26.672-97.828-29.812-20.109-2.4375-38.531-4.7344-62.625-17.156l-107.67-186.52zm202.26-373.74c0.14062 5.3438 0.5625 10.781 1.2188 16.219l0.09375 0.60938c0.046875 0.14062 0.046875 0.28125 0.046875 0.42187 5.3906 40.312 25.922 82.453 59.156 126.05 38.062 49.922 92.625 101.72 160.18 154.92 67.547-53.203 122.11-105 160.18-154.92 33.234-43.641 53.766-85.734 59.156-126.05 0-0.14062 0.046875-0.28125 0.046875-0.42187l0.09375-0.65625c0.70312-5.4375 1.125-10.828 1.2188-16.172v-0.75c0-31.641-12.844-60.328-33.562-81.094-20.766-20.766-49.406-33.562-81.094-33.562-21.75 0-42.094 6.0469-59.391 16.547-17.906 10.875-32.625 26.484-42.328 45.141l-0.14062 0.14063v0.046874c-0.14062 0.1875-0.23438 0.375-0.375 0.5625 0 0-0.046875 0.046876-0.046875 0.046876l-0.046875 0.09375-0.046875 0.046874-0.046875 0.09375v0.046876l-0.09375 0.09375v0.046874l-0.375 0.375h-0.046875l-0.09375 0.09375h-0.046875l-0.14062 0.14063-0.09375 0.046874-0.046875 0.046876c-0.1875 0.14062-0.375 0.28125-0.5625 0.375h-0.046875l-0.09375 0.09375c-0.09375 0.046874-0.14062 0.09375-0.23438 0.09375h-0.046875l-0.1875 0.09375c-0.46875 0.1875-0.98438 0.28125-1.4531 0.32812h-0.65625c-0.46875-0.046874-0.98438-0.14062-1.4531-0.32812l-0.1875-0.09375h-0.046875c-0.09375-0.046876-0.14062-0.09375-0.23438-0.09375l-0.09375-0.09375h-0.046875c-0.1875-0.14063-0.375-0.23438-0.5625-0.375 0 0-0.046875-0.046876-0.046875-0.046876l-0.09375-0.046874-0.046875-0.046876-0.09375-0.046874h-0.046875l-0.375-0.375-0.046875-0.09375v-0.046876l-0.09375-0.09375v-0.046874l-0.14062-0.14063-0.046875-0.09375-0.046875-0.046874c-0.14062-0.1875-0.28125-0.375-0.375-0.60938v-0.046874l-0.14062-0.14063c-9.75-18.656-24.422-34.266-42.328-45.141-17.297-10.5-37.641-16.547-59.391-16.547-31.641 0-60.328 12.844-81.094 33.562-20.766 20.766-33.562 49.406-33.562 81.094v0.75zm46.688 36.422c-0.375-2.625 1.5-5.1094 4.125-5.4375 2.625-0.375 5.1094 1.5 5.4375 4.125 6.375 45.984 54.234 95.766 96.141 139.36l2.625 2.7188c1.8281 1.9219 1.7812 4.9688-0.14062 6.8438-1.9219 1.8281-4.9688 1.7812-6.8438-0.14062l-2.625-2.7188c-42.938-44.672-91.969-95.672-98.766-144.74z"
                eyebrowEyebrowIconViewbox="0 0 1200 1200"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "message_visual", "u-visual-wrap")}
              tag="div"
            >
              <GlobalVisual
                imageImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67b65a3077af404194a7b4a6_Craig%20Jewett.webp"
                position="u-cover-absolute is-position-top"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {tabsVisibility ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "why_jewett_wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "why_jewett_content_list")}
              tag="div"
            >
              <ElementAboutTabs
                globalParagraph={
                  <>
                    <_Builtin.Heading tag="h2">
                      {"Why You Should Choose Jewett"}
                    </_Builtin.Heading>
                    <_Builtin.Paragraph>
                      {
                        "At Jewett Construction, we do more than simply manage commercial construction projects up and down the East Coast, we challenge the status quo to provide our clients and partners with certainty of outcome. Acting as an extension of your team, we approach each job- big or small- with a commitment to overcoming its unique challenges."
                      }
                    </_Builtin.Paragraph>
                    <_Builtin.Paragraph>
                      {
                        "We reject complacency and push the boundaries of what the industry believes is possible. As creators, innovators, and visionaries, we strive not just to build, but to build better, more efficiently, stronger, faster, and more cost-effectively."
                      }
                    </_Builtin.Paragraph>
                    <_Builtin.Paragraph>
                      {
                        "Our ultimate goal is to create spaces that contribute to the success of your business. At Jewett, we're dedicated to not just constructing commercial buildings but enhancing the potential of your business environment."
                      }
                    </_Builtin.Paragraph>
                  </>
                }
                underVisualTextVisibility={false}
                imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c25a84939a2c6ad5eea230_Featured%20Image%203.webp"
                id="why-choose-jewett"
              />
              <ElementAboutTabs
                globalParagraph={
                  <>
                    <_Builtin.Heading tag="h2">
                      {"Experience the Difference"}
                    </_Builtin.Heading>
                    <_Builtin.Paragraph>
                      {
                        "With more than four decades of experience, Jewett Construction's success can be contributed to always putting the client at the forefront of everything we do. We listen to our clients and closely collaborate in a fair and ethical manner, discovering unique solutions for each and every project. This hardworking New England approach has resulted in an impressive 80% repeat/referral rate. The values we were founded on in 1972 remain unchanged - "
                      }
                      <_Builtin.Strong>
                        {"this is the Jewett Experience"}
                      </_Builtin.Strong>
                      {"."}
                    </_Builtin.Paragraph>
                    <_Builtin.Paragraph>
                      {
                        "Our collaborative design-build delivery method combines architectural and engineering design services with commercial construction performance, all under "
                      }
                      <_Builtin.Strong>
                        {"one contract with one dedicated team"}
                      </_Builtin.Strong>
                      {
                        ". This integrated approach ensures the most expedited project timeline and seamless coordination of all aspects, including design/engineering, municipal permitting, and owner-supplied items."
                      }
                    </_Builtin.Paragraph>
                    <_Builtin.Paragraph>
                      {
                        "At Jewett Construction, we do more than manage your project; we provide our clients and partners with "
                      }
                      <_Builtin.Strong>
                        {"certainty of outcome"}
                      </_Builtin.Strong>
                      {". We act as an extension of your team, "}
                      <_Builtin.Strong>
                        {"committed to delivering excellence"}
                      </_Builtin.Strong>
                      {" at every stage - "}
                      <_Builtin.Strong>
                        {"this is the Jewett Difference"}
                      </_Builtin.Strong>
                      {"."}
                    </_Builtin.Paragraph>
                  </>
                }
                underVisualTextVisibility={false}
                imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c8e561338802a1eb87277d_Handshake-Bean-Web.webp"
                id="the-jewett-difference"
              />
              <ElementAboutTabs
                globalParagraph={
                  <>
                    <_Builtin.Heading tag="h2">
                      {"Safety CreatesSuccess"}
                    </_Builtin.Heading>
                    <_Builtin.Paragraph>
                      {
                        "At Jewett Construction, safety is our top priority. We are committed to creating a safe environment that prevents injuries for our employees, clients, subcontractors, and the public on every project and in every workplace, whether in the field or the office."
                      }
                    </_Builtin.Paragraph>
                    <_Builtin.Paragraph>
                      {
                        "We believe that quality, productivity, and safety are not mutually exclusive. From day one, accident prevention is at the forefront of all our work locations. "
                      }
                      <_Builtin.Strong>
                        {
                          "We empower all employees, regardless of their position, to understand and help execute our comprehensive safety plan."
                        }
                      </_Builtin.Strong>
                    </_Builtin.Paragraph>
                    <_Builtin.Paragraph>
                      {"In 2015, we launched our "}
                      <_Builtin.Strong>{"4EverSafe"}</_Builtin.Strong>
                      {
                        " initiative to emphasize and celebrate our corporate commitment to safety, embedding it deeply into our culture. We encourage everyone to maintain a safety-first mindset and to always think before acting."
                      }
                    </_Builtin.Paragraph>
                    <_Builtin.Paragraph>
                      {
                        "To ensure continuous education and training, the Jewett Safety Committee regularly distributes safety bulletins and offers various training opportunities. Our operations personnel have completed "
                      }
                      <_Builtin.Strong>
                        {
                          "OSHA 30, Silica Certification, CPR, AED, and First-Aid training"
                        }
                      </_Builtin.Strong>
                      {
                        ". As we move forward, we remain dedicated to educating and fostering our employees to uphold the "
                      }
                      <_Builtin.Strong>{"4EverSafe"}</_Builtin.Strong>
                      {" philosophy."}
                    </_Builtin.Paragraph>
                    <_Builtin.Paragraph>
                      {
                        "In addition to our employees’ vigilance on-site, we contract with "
                      }
                      <_Builtin.Strong>
                        {"Contractor’s Risk Management (CRM)"}
                      </_Builtin.Strong>
                      {
                        ", a third-party safety inspection company. CRM conducts "
                      }
                      <_Builtin.Strong>
                        {"bi-weekly job site safety inspections"}
                      </_Builtin.Strong>
                      {
                        ", participates in preconstruction planning meetings, and assists our estimating team with job site walk-throughs to identify potential risks as early as possible in a project."
                      }
                    </_Builtin.Paragraph>
                    <_Builtin.Paragraph>
                      <_Builtin.Strong>
                        {
                          "At Jewett Construction, safety is not just a priority; it’s a core value that we live by every day."
                        }
                      </_Builtin.Strong>
                    </_Builtin.Paragraph>
                  </>
                }
                imageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67c8e4caed35df79f04fb343_nick-jewett2.webp"
                id="jewett-safety-promise"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
