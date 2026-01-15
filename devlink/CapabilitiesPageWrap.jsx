"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GridGuide } from "./GridGuide";
import { CustomCode } from "./CustomCode";
import { GlobalNavbar } from "./GlobalNavbar";
import { SectionHeroInternalPage } from "./SectionHeroInternalPage";
import { SectionStaggeredSections } from "./SectionStaggeredSections";
import { SectionKittingRequirements } from "./SectionKittingRequirements";
import { SectionOurProcess } from "./SectionOurProcess";
import { SectionServices } from "./SectionServices";
import { SectionIndustriesMarkets } from "./SectionIndustriesMarkets";
import { SectionWhyChooseUs } from "./SectionWhyChooseUs";
import { SectionTestimonials } from "./SectionTestimonials";
import { SectionCta } from "./SectionCta";
import { GlobalFooter } from "./GlobalFooter";
import * as _utils from "./utils";
import _styles from "./CapabilitiesPageWrap.module.css";

export function CapabilitiesPageWrap({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <GridGuide />
      <CustomCode />
      <_Builtin.Block
        className={_utils.cx(_styles, "page_main")}
        tag="main"
        id="main"
      >
        <GlobalNavbar />
        <SectionHeroInternalPage
          stylesTheme="dark"
          headingStyle="u-text-h1"
          headingHeadingText={
            <_Builtin.Heading tag="h2">
              {"Advanced PCB Assembly & "}
              <_Builtin.Strong>{"Full Turnkey Solutions"}</_Builtin.Strong>
            </_Builtin.Heading>
          }
          paragraphParagraphText={
            <_Builtin.Paragraph>
              {
                "Surface Mount Solutions offers a complete suite of PCB assembly services, from quick-turn assembly in as little as 2-4 days to full turnkey solutions that cover the entire production lifecycle. Tailored solutions meet the demands of industries such as tech, aerospace, biotech, and more, ensuring that projects are delivered on time and with the highest quality standards."
              }
            </_Builtin.Paragraph>
          }
          button1Button1Text="Explore All Services"
          button2Button2Text="Get Instant Estimate"
          mainVisualMainImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0f67_Turnkey%20PCB%20Assembly%20Services%20-%20Surface%20Mount%20Solutions.webp"
          eyebrowEyebrowText={
            <_Builtin.Paragraph>
              {"Industry-Leading PCB Assembly"}
            </_Builtin.Paragraph>
          }
        />
        <SectionStaggeredSections />
        <SectionKittingRequirements styleTheme="dark" />
        <SectionOurProcess styleTheme="inherit" />
        <SectionServices
          stylesSectionHeight=""
          headingStyle="u-text-h1"
          stylesTheme="dark"
          headingHeadingText={
            <_Builtin.Heading tag="h2">
              {"Solutions Tailored to Meet Your "}
              <_Builtin.Strong>
                {"Electronics Manufacturing Needs"}
              </_Builtin.Strong>
            </_Builtin.Heading>
          }
          eyebrowEyebrowText={
            <_Builtin.Paragraph>
              {"Expert PCB Assembly &Electronic Solutions"}
            </_Builtin.Paragraph>
          }
          paragraphParagraphText={
            <_Builtin.Paragraph>
              {
                "When it comes to PCB assembly and electronics manufacturing, having the right solutions in place can make all the difference. Our services are built to address common manufacturing challenges, ensuring efficient production, high-quality results, and minimized lead times. Whether you need rapid quick-turn PCB assembly or reliable materials procurement, we offer comprehensive solutions to support every stage of your project."
              }
            </_Builtin.Paragraph>
          }
          tab1HeadingRichTe={
            <_Builtin.Heading tag="h3">
              {"Seamless Materials Procurement for Efficient PCB Assembly"}
            </_Builtin.Heading>
          }
          tab1ParagraphRichTe={
            <_Builtin.Paragraph>
              {
                "At SMS, our materials procurement service ensures a smooth and reliable supply chain for your PCB assembly projects. We handle every step, from sourcing high-quality components to managing kitting, so your assembly process remains uninterrupted. Our procurement experts ensure on-time delivery and compliance with your project requirements."
              }
            </_Builtin.Paragraph>
          }
          tab2HeadingRichText={
            <_Builtin.Heading tag="h3">
              {"Quick-Turn PCB Assembly for Fast and Reliable Delivery"}
            </_Builtin.Heading>
          }
          tab2ParagraphRichText={
            <_Builtin.Paragraph>
              {"Reliable, on-time delivery every time."}
            </_Builtin.Paragraph>
          }
          tab3HeadingRichTex={
            <_Builtin.Heading tag="h3">
              {
                "Consigned PCB Assembly for Precise, Customer-Supplied Component Integration"
              }
            </_Builtin.Heading>
          }
          tab3ParagraphRichTex={
            <_Builtin.Paragraph>
              {
                "SMS provides expert consigned PCB assembly, working with customer-supplied components to ensure your project meets exact specifications. Our experienced team carefully handles your materials, offering precision assembly and strict quality control throughout the process. Whether it's prototypes or large-scale production, we guarantee reliable, high-quality results."
              }
            </_Builtin.Paragraph>
          }
          tab4HeadingRich={
            <_Builtin.Heading tag="h3">
              {"Complete Turnkey PCB Assembly for End-to-End Solutions"}
            </_Builtin.Heading>
          }
          tab4ParagraphRichT={
            <_Builtin.Paragraph>
              {
                "SMS offers comprehensive turnkey PCB assembly services, handling every step from design and materials procurement to final assembly and testing. Our all-in-one solution ensures that your project is managed efficiently, saving you time and reducing costs. With our expertise in sourcing, assembly, and quality control, we deliver high-quality, ready-to-use PCBs, tailored to your exact specifications."
              }
            </_Builtin.Paragraph>
          }
          tab5HeadingRichT={
            <_Builtin.Heading tag="h3">
              {"Inline Aqueous PCB Cleaning for Superior Contaminant Removal"}
            </_Builtin.Heading>
          }
          tab5ParagraphRich={
            <_Builtin.Paragraph>
              {
                "Our advanced inline aqueous PCB cleaning services ensure your boards are free from flux residues and contaminants, enhancing their reliability and longevity. SMS uses state-of-the-art cleaning systems that are environmentally friendly and RoHS compliant, guaranteeing the highest standards of cleanliness and performance for every assembly."
              }
            </_Builtin.Paragraph>
          }
          tab6HeadingRic={
            <_Builtin.Heading tag="h3">
              {"AOI & Visual PCB Inspection for Precise Quality Assurance"}
            </_Builtin.Heading>
          }
          tab6ParagraphRic={
            <_Builtin.Paragraph>
              {
                "At SMS, we use Automated Optical Inspection (AOI) and visual inspection to ensure that every PCB assembly meets the highest standards of accuracy and quality. Our advanced AOI systems quickly detect any defects, while our skilled technicians perform thorough visual checks to guarantee flawless results. With our comprehensive inspection processes, we ensure that your PCBs are reliable and ready for deployment."
              }
            </_Builtin.Paragraph>
          }
          tab7HeadingRichTextt={
            <_Builtin.Heading tag="h3">
              {"Expert BGA Rework & Reballing for Complex PCB Repairs"}
            </_Builtin.Heading>
          }
          tab7ParagraphRichTextt={
            <_Builtin.Paragraph>
              {
                "SMS specializes in BGA rework and reballing, providing precise solutions for even the most challenging PCB repairs. Our skilled technicians use advanced equipment to remove, reball, and reattach BGAs with accuracy, ensuring your assemblies meet performance standards. Whether you're facing alignment issues or need a component replaced, we offer fast and reliable rework services that restore your PCBs to full functionality."
              }
            </_Builtin.Paragraph>
          }
          tab1BannerLeftTextRichText={
            <_Builtin.Paragraph>
              {"Efficient sourcing and kitting."}
            </_Builtin.Paragraph>
          }
          tab1BannerRightTextRichText={
            <_Builtin.Paragraph>
              {"Ensuring timely, high-quality materials."}
            </_Builtin.Paragraph>
          }
          tab2LeftBannerTextRichText={
            <_Builtin.Paragraph>
              {"Fast assembly for urgent deadlines."}
            </_Builtin.Paragraph>
          }
          tab3LeftTextRichText={
            <_Builtin.Paragraph>
              {"We assemble your supplied components."}
            </_Builtin.Paragraph>
          }
          tab3RightTextRichText={
            <_Builtin.Paragraph>
              {"Precision integration, quality guaranteed."}
            </_Builtin.Paragraph>
          }
          tab4LeftBannerTextRichTex={
            <_Builtin.Paragraph>
              {"Full assembly from design to delivery."}
            </_Builtin.Paragraph>
          }
          tab4RightTextRichText={
            <_Builtin.Paragraph>
              {"All-in-one PCB solutions with expertise."}
            </_Builtin.Paragraph>
          }
          tab5LeftParagraphRichT={
            <_Builtin.Paragraph>
              {"Advanced cleaning for contaminant-free PCBs."}
            </_Builtin.Paragraph>
          }
          tab6LeftBannerTextRichT={
            <_Builtin.Paragraph>
              {"Automated optical inspection for precision."}
            </_Builtin.Paragraph>
          }
          tab6RightRichText={
            <_Builtin.Paragraph>
              {"Thorough visual checks for flawless quality."}
            </_Builtin.Paragraph>
          }
          tab7LeftBannerTextRichTextt={
            <_Builtin.Paragraph>
              {"Expert rework for BGA components."}
            </_Builtin.Paragraph>
          }
          tab7RightBannerTextRichText={
            <_Builtin.Paragraph>
              {"Restoring PCBs to full functionality."}
            </_Builtin.Paragraph>
          }
          tab5RightTextRichTe={
            <_Builtin.Paragraph>
              {"RoHS-compliant, reliable cleaning processes."}
            </_Builtin.Paragraph>
          }
          button1Button1Text="See All Services"
          button2Button2Text="Get Instant Estimate"
        />
        <SectionIndustriesMarkets />
        <SectionWhyChooseUs
          paragraphContentRichText={
            <_Builtin.Paragraph>
              {
                "Our turnkey PCB solutions guarantee precise PCB assembly and on-time delivery. With over 20 years of experience, we offer tailored services to meet your needs, with competitive pricing and quality you can rely on."
              }
            </_Builtin.Paragraph>
          }
          headingContentRichText={
            <_Builtin.Heading tag="h2">
              {"Why Trust SMS for "}
              <_Builtin.Strong>{"PCB Manufacturing?"}</_Builtin.Strong>
            </_Builtin.Heading>
          }
          styleTheme="dark"
        />
        <SectionTestimonials
          styleTheme="inherit"
          headingContentRichText={
            <_Builtin.Heading tag="h2">
              <_Builtin.Strong>{"Trusted by Leading Brands"}</_Builtin.Strong>
              {" for PCB Assembly"}
            </_Builtin.Heading>
          }
        />
        <SectionCta
          styleTheme="dark"
          headingContentRichText={
            <_Builtin.Heading tag="h2">
              <_Builtin.Strong>{"Need Fast, Reliable"}</_Builtin.Strong>
              {" PCB Assembly?"}
            </_Builtin.Heading>
          }
        />
        <GlobalFooter stylePaddingTop="small" stylePaddingBottom="small" />
      </_Builtin.Block>
    </_Component>
  );
}
