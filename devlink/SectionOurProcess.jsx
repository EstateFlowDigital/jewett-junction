"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import { ElementProcessTimeline } from "./ElementProcessTimeline";
import { ElementOurProcessItem } from "./ElementOurProcessItem";
import { GlobalBackgroundGraphic } from "./GlobalBackgroundGraphic";
import * as _utils from "./utils";
import _styles from "./SectionOurProcess.module.css";

export function SectionOurProcess({
  as: _Component = _Builtin.Section,
  styleTheme = "inherit",
  stylePaddingTop = "main",
  stylePaddingBottom = "main",
  buttonGroupVisibility = true,

  button1Link = {
    href: "#",
  },
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "our_process_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-theme={styleTheme}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "our_process_contain",
          "u-container",
          "u-vflex-center-center",
          "u-gap-medium"
        )}
        tag="div"
        data-padding-top={stylePaddingTop}
        data-padding-bottom={stylePaddingBottom}
      >
        <GlobalContent
          buttonGroupButtonGroupVisibility={buttonGroupVisibility}
          button1Button1Link={button1Link}
          headingStyle="u-text-h1"
          button1Button1Visibility={true}
          variant="Content is Center"
          eyebrowFeaturedText="Process"
          eyebrowEyebrowText={
            <_Builtin.Paragraph>{"Our Approach"}</_Builtin.Paragraph>
          }
          headingHeadingText={
            <_Builtin.Heading tag="h2">
              {"A Clear 7-Step Process to "}
              <_Builtin.Strong>{"Bring Your Vision to Life"}</_Builtin.Strong>
            </_Builtin.Heading>
          }
          paragraphParagraphText={
            <_Builtin.Paragraph>
              {
                "Every successful commercial build starts with a well-defined process. At Jewett Construction, we guide you through seven strategic steps that ensure clarity, efficiency, and excellence at every stage. From initial discovery and planning to final project completion and long-term support, our method is designed to keep your project on time, on budget, and built to last. Explore how our structured, client-focused approach transforms your vision into a space that drives success."
              }
            </_Builtin.Paragraph>
          }
          paragraphParagraphMaxWidth="max-width: 70ch;"
          button1IconVisibility={true}
          button2Button2Text="View Our Projects"
          button2Button2Link={{
            href: "#",
          }}
          eyebrowIconPath1="m1090.6 1052.9c0 64.547-52.547 117.14-117.14 117.14h-746.9c-64.547 0-117.14-52.547-117.14-117.14v-831.19c0-64.547 52.547-117.14 117.14-117.14h97.641v108.09c0 18.516 15 33.516 33.516 33.516h484.6c18.516 0 33.562-15 33.562-33.516v-108.09h97.641c64.547 0 117.14 52.594 117.14 117.14v831.19zm-699.37-1022.9v149.11h417.52v-149.11zm-23.859 361.45c-18.516 0-33.562 15-33.562 33.516s15 33.516 33.562 33.516h579.24c18.516 0 33.516-15 33.516-33.516s-15-33.516-33.516-33.516zm-113.91 499.13c-18.516 0-33.562 15-33.562 33.562 0 18.516 15 33.516 33.609 33.516 18.609 0 33.516-15 33.516-33.516s-14.953-33.562-33.609-33.562zm0-249.56c-18.516 0-33.562 15-33.562 33.516s15 33.516 33.609 33.516c18.609 0 33.516-15 33.516-33.516s-14.953-33.516-33.609-33.516zm0-249.56c-18.516 0-33.562 15-33.562 33.516s15 33.516 33.609 33.516c18.609 0 33.516-15 33.516-33.516s-14.953-33.516-33.609-33.516zm113.91 499.13c-18.516 0-33.562 15-33.562 33.562 0 18.516 15 33.516 33.562 33.516h579.24c18.516 0 33.516-15 33.516-33.516 0-18.516-15-33.562-33.516-33.562zm0-249.56c-18.516 0-33.562 15-33.562 33.516 0 18.516 15 33.516 33.562 33.516h579.24c18.516 0 33.516-15 33.516-33.516 0-18.516-15-33.516-33.516-33.516l-579.24 0.046874z"
          eyebrowEyebrowIconViewbox="0 0 1200 1200"
        />
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "our_process_steps_wrap",
            "u-vflex-center-top",
            "u-gap-large"
          )}
          tag="div"
        >
          <ElementProcessTimeline />
          <ElementOurProcessItem
            button1Link={button1Link}
            visualPositionIsFirst=""
            contentEyebrowText={
              <_Builtin.Paragraph>
                {"Understanding Your Vision"}
              </_Builtin.Paragraph>
            }
            contentHeadingText={
              <>
                <_Builtin.Heading tag="h3">
                  {"Laying the Foundation for Success – "}
                  <_Builtin.Emphasized>{"‍"}</_Builtin.Emphasized>
                </_Builtin.Heading>
                <_Builtin.Heading tag="h4">
                  <_Builtin.Strong>
                    {"Discovery & Consultation"}
                  </_Builtin.Strong>
                </_Builtin.Heading>
              </>
            }
            contentParagraphText={
              <_Builtin.Paragraph>
                {
                  "Every great project starts with a conversation. At Jewett Construction, we take the time to understand your goals, challenges, and vision. Through strategic discussions, site evaluations, and feasibility studies, we align our expertise with your objectives—ensuring a roadmap to success before we even break ground."
                }
              </_Builtin.Paragraph>
            }
            visualImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0fb9_Initial%20Consultation%20%26%20Feasibility%20Analysis%20-%20Klassen%20and%20Smith%20Construction.webp"
            visualCdnImageVisibility={true}
            visualImageVisibility={false}
          />
          <ElementOurProcessItem
            button1Link={button1Link}
            eyebrowFeaturedText="Step 2"
            contentEyebrowText={
              <_Builtin.Paragraph>{"Smart Planning"}</_Builtin.Paragraph>
            }
            contentHeadingText={
              <>
                <_Builtin.Heading tag="h3">
                  {"Turning Ideas into Actionable Plans –"}
                </_Builtin.Heading>
                <_Builtin.Heading tag="h4">
                  <_Builtin.Strong>{"Feasibility & Planning"}</_Builtin.Strong>
                </_Builtin.Heading>
              </>
            }
            contentParagraphText={
              <_Builtin.Paragraph>
                {
                  "A great build begins with a solid plan. We conduct in-depth site analysis, assess budgeting and scheduling constraints, and handle permitting to eliminate roadblocks before they arise. Our proactive approach ensures your project starts with clarity, confidence, and a strategic path forward."
                }
              </_Builtin.Paragraph>
            }
            visualImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0fb8_Design%20and%20build%20construction%20services%20-%20Klassen%20and%20smith.webp"
            visualImageVisibility={false}
            visualCdnImageVisibility={true}
            visualCdnImageUrl="https://picflow.media/images/resized/600x450/76adca65-4a24-4091-80b2-ef0fcff9f933.jpg"
            visualImagePosition="object-position:90% 50%;"
          />
          <ElementOurProcessItem
            button1Link={button1Link}
            visualPositionIsFirst=""
            eyebrowFeaturedText="Step 3"
            contentEyebrowText={
              <_Builtin.Paragraph>
                {"Precision in the Details"}
              </_Builtin.Paragraph>
            }
            contentHeadingText={
              <>
                <_Builtin.Heading tag="h3">
                  {"Streamlining the Build Before It Begins – "}
                </_Builtin.Heading>
                <_Builtin.Heading tag="h4">
                  <_Builtin.Strong>
                    {"Preconstruction Collaboration"}
                  </_Builtin.Strong>
                </_Builtin.Heading>
              </>
            }
            contentParagraphText={
              <_Builtin.Paragraph>
                {
                  "Before construction starts, we align every detail—designs, budgets, and materials—so there are no surprises. By engaging key stakeholders early, we optimize value, minimize risk, and ensure a seamless transition from planning to execution."
                }
              </_Builtin.Paragraph>
            }
            visualImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0fba_Detailed%20Design%20%26%20Engineering%20-%20Klassen%20and%20Smith.webp"
            visualCdnImageUrl="https://picflow.media/images/resized/1920x1080/db7c1980-3622-4fc2-86d2-c1b2e7bd4a7f.jpg"
            visualImageVisibility={false}
            visualCdnImageVisibility={true}
            visualImagePosition="object-position:40% 50%;"
          />
          <ElementOurProcessItem
            button1Link={button1Link}
            eyebrowFeaturedText="Step 4"
            contentEyebrowText={
              <_Builtin.Paragraph>{"Planning & Scheduling"}</_Builtin.Paragraph>
            }
            contentHeadingText={
              <_Builtin.Heading tag="h3">
                {"Mobilizing for a Seamless Start – "}
                <_Builtin.Strong>{"Project Kickoff"}</_Builtin.Strong>
              </_Builtin.Heading>
            }
            contentParagraphText={
              <_Builtin.Paragraph>
                {
                  "With meticulous planning in place, our team sets the stage for success. We coordinate logistics, establish clear timelines, and bring together skilled professionals who are ready to execute—ensuring every aspect of your project is primed for efficiency."
                }
              </_Builtin.Paragraph>
            }
            visualImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0fbb_Pre-Construction%20Planning%20%26%20Scheduling%20-%20Klassen%20and%20Smith.webp"
            visualCdnImageUrl="https://picflow.media/images/resized/720x405/497775b1-f3f0-446a-b130-365a6e2aecc4.jpg"
            visualImageVisibility={false}
            visualCdnImageVisibility={true}
            visualImagePosition="object-position:50% 50%;"
          />
          <ElementOurProcessItem
            button1Link={button1Link}
            visualPositionIsFirst=""
            eyebrowFeaturedText="Step 5"
            contentEyebrowText={
              <_Builtin.Paragraph>
                {"Building with Precision"}
              </_Builtin.Paragraph>
            }
            contentHeadingText={
              <_Builtin.Heading tag="h3">
                {"Excellence in Every Phase – "}
                <_Builtin.Strong>{"Construction Execution"}</_Builtin.Strong>
              </_Builtin.Heading>
            }
            contentParagraphText={
              <_Builtin.Paragraph>
                {
                  "This is where your vision takes shape. Our skilled teams adhere to rigorous safety standards, manage schedules with precision, and deliver high-quality craftsmanship—always staying on time and on budget while keeping your business operational."
                }
              </_Builtin.Paragraph>
            }
            visualImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0fbc_Bid%20Package%20Development%20%26%20Contractor%20Selection%20-%20Klassen%20and%20Smith.webp"
            visualCdnImageUrl="https://picflow.media/images/resized/1920x1080/8b1fc4fc-5ec5-4cbb-8804-a12408d3daf2.jpg"
            visualImageVisibility={false}
            visualCdnImageVisibility={true}
          />
          <ElementOurProcessItem
            button1Link={button1Link}
            eyebrowFeaturedText="Step 6"
            contentEyebrowText={
              <_Builtin.Paragraph>{"Construction & QC"}</_Builtin.Paragraph>
            }
            contentHeadingText={
              <_Builtin.Heading tag="h3">
                {"Ensuring Safety, Efficiency, and Excellence – "}
                <_Builtin.Strong>{"Quality Control & Safety"}</_Builtin.Strong>
              </_Builtin.Heading>
            }
            contentParagraphText={
              <_Builtin.Paragraph>
                {
                  "We don’t just build—we build with certainty of outcome. Through thorough inspections, proactive problem-solving, and a commitment to safety, we maintain the highest standards in the industry, ensuring your project meets and exceeds expectations."
                }
              </_Builtin.Paragraph>
            }
            visualImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0fbd_Construction%20Execution%20%26%20Quality%20Control%20-%20Klassen%20and%20Smith.webp"
            visualCdnImageUrl="https://picflow.media/images/resized/720x405/9def54c5-2179-4a17-b704-9524cf30d2d0.jpg"
            visualImageVisibility={false}
            visualCdnImageVisibility={true}
            visualImagePosition="object-position:55% 50%;"
          />
          <ElementOurProcessItem
            button1Link={button1Link}
            eyebrowFeaturedText="Step 7"
            contentEyebrowText={
              <_Builtin.Paragraph>{"Inspection & Handover"}</_Builtin.Paragraph>
            }
            contentHeadingText={
              <_Builtin.Heading tag="h3">
                {"A Lasting Partnership for the Future – "}
                <_Builtin.Strong>
                  {"Project Completion & Support"}
                </_Builtin.Strong>
              </_Builtin.Heading>
            }
            contentParagraphText={
              <_Builtin.Paragraph>
                {
                  "Our commitment doesn’t end when construction is complete. We provide post-build support, including as-built documentation, training, and long-term maintenance planning—ensuring your new space remains a valuable asset for years to come."
                }
              </_Builtin.Paragraph>
            }
            visualImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0fbe_Final%20Inspection%20%26%20Project%20Handover%20-%20Klassen%20and%20Smith.webp"
            visualPositionIsFirst=""
            visualCdnImageUrl="https://picflow.media/images/resized/1920x1080/a1f36504-d782-44da-bfdb-41618a5c1548.jpg"
            visualImageVisibility={false}
            visualCdnImageVisibility={true}
            visualImagePosition="object-position:50% 50%;"
          />
        </_Builtin.Block>
        <GlobalContent
          buttonGroupButtonGroupVisibility={buttonGroupVisibility}
          variant="Content is Center"
          headingHeadingText={
            <_Builtin.Heading tag="h3">
              {"Ready to "}
              <_Builtin.Strong>{"Bring Your Project"}</_Builtin.Strong>
              {" to Life?"}
            </_Builtin.Heading>
          }
          paragraphParagraphText={
            <_Builtin.Paragraph>
              {
                "Our team is here to simplify your construction journey. We offer a seamless process, transparent communication, and innovative solutions designed to turn your vision into reality. Let’s work together to achieve exceptional results."
              }
            </_Builtin.Paragraph>
          }
          eyebrowEyebrowVisibility={false}
          button2Button2Text="View Our Projects"
          button1IconVisibility={true}
          button2Button2Link={{
            href: "#",
          }}
        />
      </_Builtin.Block>
      <GlobalBackgroundGraphic
        rightGraphicVisibility={false}
        leftGraphicVisibility={false}
        topBackgroundGraphicVisibility={true}
      />
    </_Component>
  );
}
