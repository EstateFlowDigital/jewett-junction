"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import * as _utils from "./utils";
import _styles from "./ElementMainContactFormContactPage.module.css";

export function ElementMainContactFormContactPage({
  as: _Component = _Builtin.Block,
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "contact_form_wrap",
        "u-vflex-left-top",
        "u-gap-large"
      )}
      id={_utils.cx(
        _styles,
        "w-node-e9580ff0-d349-f4fe-ee9e-624c8e597753-8e597753"
      )}
      tag="div"
      data-theme="light"
    >
      <_Builtin.FormWrapper className={_utils.cx(_styles, "form_main_wrap")}>
        <_Builtin.FormForm
          className={_utils.cx(
            _styles,
            "form_main_list",
            "u-vflex-left-top",
            "u-gap-medium"
          )}
          name="wf-form-contact-us-page-form-2"
          data-name="contact-us-page-form"
          method="post"
          id="wf-form-contact-us-page-form-2"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "form_main_grid_wrap",
              "u-grid-column-2"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "form_main_field_wrap")}
              tag="div"
            >
              <_Builtin.FormBlockLabel
                className={_utils.cx(
                  _styles,
                  "form_main_label",
                  "u-weight-bold"
                )}
                htmlFor="First-Name-contact-us-page-form"
              >
                {"Full Name*"}
              </_Builtin.FormBlockLabel>
              <_Builtin.FormTextInput
                className={_utils.cx(_styles, "form_main_field_input")}
                name="First-Name"
                maxLength={256}
                data-name="First Name"
                placeholder="John"
                disabled={false}
                type="text"
                required={true}
                autoFocus={false}
                id="First-Name-contact-us-page-form"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "form_main_field_wrap")}
              tag="div"
            >
              <_Builtin.FormBlockLabel
                className={_utils.cx(
                  _styles,
                  "form_main_label",
                  "u-weight-bold"
                )}
                htmlFor="Last-Name-contact-us-page-form"
              >
                {"Last Name*"}
              </_Builtin.FormBlockLabel>
              <_Builtin.FormTextInput
                className={_utils.cx(_styles, "form_main_field_input")}
                name="Last-Name"
                maxLength={256}
                data-name="Last Name"
                placeholder="Smith"
                disabled={false}
                type="text"
                required={true}
                autoFocus={false}
                id="Last-Name-contact-us-page-form"
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "form_main_grid_wrap",
              "u-grid-column-2"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "form_main_field_wrap")}
              tag="div"
              form1-fieldgroup=""
            >
              <_Builtin.FormBlockLabel
                className={_utils.cx(
                  _styles,
                  "form_main_label",
                  "u-weight-bold"
                )}
                htmlFor="Email-Address-contact-us-page-form"
                form1-label=""
                transform-duration=""
              >
                {"Email Address*"}
              </_Builtin.FormBlockLabel>
              <_Builtin.FormTextInput
                className={_utils.cx(_styles, "form_main_field_input")}
                name="Email-Address"
                maxLength={256}
                data-name="Email Address"
                placeholder="email@gmail.com"
                disabled={false}
                type="email"
                required={true}
                autoFocus={false}
                id="Email-Address-contact-us-page-form"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "form_main_phone_wrap")}
              tag="div"
              form1-fieldgroup=""
            >
              <_Builtin.FormBlockLabel
                className={_utils.cx(
                  _styles,
                  "form_main_label",
                  "u-weight-bold"
                )}
                htmlFor="Phone-Number-contact-us-page-form"
                form1-label=""
                transform-duration=""
              >
                {"Phone Number"}
              </_Builtin.FormBlockLabel>
              <_Builtin.FormTextInput
                className={_utils.cx(_styles, "form_main_field_input")}
                name="Phone-Number"
                maxLength={256}
                data-name="Phone Number"
                placeholder="(555) 555-5555"
                disabled={false}
                type="tel"
                required={false}
                autoFocus={false}
                id="Phone-Number-contact-us-page-form"
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "form_main_grid_wrap",
              "u-grid-column-2"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "form_main_field_wrap")}
              tag="div"
            >
              <_Builtin.FormBlockLabel
                className={_utils.cx(
                  _styles,
                  "form_main_label",
                  "u-weight-bold"
                )}
                htmlFor="How-Can-We-Help-You-contact-us-page-form"
                form1-label=""
                transform-duration=""
              >
                {"How Can We Help You?*"}
              </_Builtin.FormBlockLabel>
              <_Builtin.FormSelect
                className={_utils.cx(_styles, "form_main_field_input")}
                name="How-Can-We-Help-You"
                data-name="How Can We Help You"
                required={true}
                multiple={false}
                id="How-Can-We-Help-You-contact-us-page-form"
                options={[
                  {
                    t: "Select one...",
                    v: "",
                  },
                  {
                    t: "New customer looking to get started",
                    v: "New customer looking to get started",
                  },
                  {
                    t: "Seeking an estimate",
                    v: "Seeking an estimate",
                  },
                  {
                    t: "Inquiry about an existing job",
                    v: "Inquiry about an existing job",
                  },
                  {
                    t: "Help with something else",
                    v: "Help with something else",
                  },
                ]}
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "form_main_field_wrap")}
              tag="div"
            >
              <_Builtin.FormBlockLabel
                className={_utils.cx(
                  _styles,
                  "form_main_label",
                  "u-weight-bold"
                )}
                htmlFor="What-Is-Your-Industry-contact-us-page-form"
                form1-label=""
                transform-duration=""
              >
                {"What Is Your Industry?*"}
              </_Builtin.FormBlockLabel>
              <_Builtin.FormSelect
                className={_utils.cx(_styles, "form_main_field_input")}
                name="What-Is-Your-Industry"
                data-name="What Is Your Industry"
                required={true}
                multiple={false}
                id="What-Is-Your-Industry-contact-us-page-form"
                options={[
                  {
                    t: "Select one...",
                    v: "",
                  },
                  {
                    t: "Aerospace & Defense",
                    v: "Aerospace & Defense",
                  },
                  {
                    t: "Automotive",
                    v: "Automotive",
                  },
                  {
                    t: "Cannabis Facilities",
                    v: "Cannabis Facilities",
                  },
                  {
                    t: "Education",
                    v: "Education",
                  },
                  {
                    t: "Energy & Sustainability",
                    v: "Energy & Sustainability",
                  },
                  {
                    t: "Financial & Banking",
                    v: "Financial & Banking",
                  },
                  {
                    t: "Food & Beverage",
                    v: "Food & Beverage",
                  },
                  {
                    t: "Government & Municipal",
                    v: "Government & Municipal",
                  },
                  {
                    t: "Healthcare",
                    v: "Healthcare",
                  },
                  {
                    t: "Hospitality",
                    v: "Hospitality",
                  },
                  {
                    t: "Industrial",
                    v: "Industrial",
                  },
                  {
                    t: "Manufacturing",
                    v: "Manufacturing",
                  },
                  {
                    t: "Nonprofit",
                    v: "Nonprofit",
                  },
                  {
                    t: "Recreation & Entertainment",
                    v: "Recreation & Entertainment",
                  },
                  {
                    t: "Retail",
                    v: "Retail",
                  },
                  {
                    t: "Technology & Data Centers",
                    v: "Technology & Data Centers",
                  },
                  {
                    t: "Warehouse & Distribution",
                    v: "Warehouse & Distribution",
                  },
                  {
                    t: "Other",
                    v: "Other",
                  },
                ]}
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "form_main_field_wrap")}
            tag="div"
          >
            <_Builtin.FormBlockLabel
              className={_utils.cx(_styles, "form_main_label", "u-weight-bold")}
              htmlFor="Your-Message-contact-us-page-form"
              form1-label=""
              transform-duration=""
            >
              {"Message"}
            </_Builtin.FormBlockLabel>
            <_Builtin.FormTextarea
              className={_utils.cx(
                _styles,
                "form_main_field_input",
                "is-message"
              )}
              name="Your-Message"
              maxLength={5000}
              data-name="Your Message"
              placeholder="Your Message"
              required={false}
              autoFocus={false}
              id="Your-Message-contact-us-page-form"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "form_main_option_wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "form_main_option_list",
                "u-gap-small",
                "u-hflex-left-center",
                "u-hflex-wrap"
              )}
              tag="div"
            >
              <_Builtin.FormCheckboxWrapper
                className={_utils.cx(_styles, "form_main_option_item")}
              >
                <_Builtin.FormCheckboxInput
                  className={_utils.cx(_styles, "form_main_option_link")}
                  type="checkbox"
                  name="I-accept-the-terms-of-the-website-2"
                  data-name="I Accept The Terms Of The Website 2"
                  required={true}
                  checked={false}
                  id="I-accept-the-terms-of-the-website-contact-us-page-form"
                  form={{
                    type: "checkbox-input",
                    name: "I Accept The Terms Of The Website 2",
                  }}
                  inputType="custom"
                  customClassName="w-checkbox-input--inputType-custom"
                />
                <_Builtin.FormInlineLabel
                  className={_utils.cx(
                    _styles,
                    "form_main_label",
                    "u-weight-medium"
                  )}
                >
                  {"Iaccept the "}
                  <_Builtin.Link
                    className={_utils.cx(
                      _styles,
                      "terms_link",
                      "u-weight-bold"
                    )}
                    button={false}
                    block=""
                    options={{
                      href: "#",
                    }}
                  >
                    {"terms"}
                  </_Builtin.Link>
                  {" of the website"}
                </_Builtin.FormInlineLabel>
              </_Builtin.FormCheckboxWrapper>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.FormReCaptcha
            className={_utils.cx(_styles, "recaptcha")}
            siteKey={process.env.DEVLINK_ENV_GOOGLE_RECAPTCHA_API_KEY}
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "buttons_wrap", "u-weight-bold")}
            tag="div"
          >
            <_Builtin.FormButton
              className={_utils.cx(
                _styles,
                "btn_main_wrap",
                "u-button-style",
                "u-position-relative",
                "u-display-inline-block"
              )}
              type="submit"
              value="Submit"
              data-wait="Please wait..."
            />
          </_Builtin.Block>
        </_Builtin.FormForm>
        <_Builtin.FormSuccessMessage
          className={_utils.cx(
            _styles,
            "form_main_success_wrap",
            "u-vflex-left-top",
            "u-gap-medium",
            "_w-form-done"
          )}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "form_main_success_content")}
            tag="div"
          >
            <GlobalContent
              eyebrowEyebrowVisibility={false}
              headingStyle="u-text-h2"
              headingHeadingText={
                <_Builtin.Heading tag="h3">
                  <_Builtin.Strong>{"Thank you!"}</_Builtin.Strong>
                </_Builtin.Heading>
              }
              button2Button2Visibility={false}
              button1Button1Text="Get Instant Estimate"
              variant="Content is Center"
              paragraphParagraphText={
                <_Builtin.Paragraph>
                  {"We will be in touch soon. "}
                </_Builtin.Paragraph>
              }
              button1Button1Visibility={true}
              buttonGroupButtonGroupVisibility={false}
            />
          </_Builtin.Block>
        </_Builtin.FormSuccessMessage>
        <_Builtin.FormErrorMessage
          className={_utils.cx(_styles, "form_main_error_wrap")}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "form_main_error_text")}
            tag="div"
          >
            <_Builtin.Emphasized>
              {"Oops! Something went wrong while submitting the form. "}
              <br />
            </_Builtin.Emphasized>
            <br />
            <_Builtin.Strong>{"Troubleshooting tips:"}</_Builtin.Strong>
            <br />
            {"- Are all required forms completed?"}
            <br />
            {
              "- Did you accept the terms of the website by clicking the checkbox field?"
            }
            <br />
            {
              "- Did you confirm you aren't a robot by checking the reCAPTCHA checkbox?"
            }
            <br />
            <br />
            {"If you are still have issues, reach out to "}
            <_Builtin.Link
              button={false}
              block=""
              options={{
                href: "#",
              }}
            >
              {"nweeks@jewettconstruction.com"}
            </_Builtin.Link>
          </_Builtin.Block>
        </_Builtin.FormErrorMessage>
      </_Builtin.FormWrapper>
    </_Component>
  );
}
