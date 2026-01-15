"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalContent } from "./GlobalContent";
import * as _utils from "./utils";
import _styles from "./ElementSubcontractorForm.module.css";

export function ElementSubcontractorForm({ as: _Component = _Builtin.Block }) {
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
        "w-node-_42afd60b-fbef-1d63-56a3-dc828bd3a8f3-8bd3a8f3"
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
          name="wf-form-Subcontractor-Contact-Form"
          data-name="Subcontractor Contact Form"
          method="post"
          id="wf-form-Subcontractor-Contact-Form"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "form_main_grid_wrap",
              "u-grid-column-2",
              "u-gap-medium"
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
                htmlFor="Company-Name"
              >
                {"Company Name*"}
              </_Builtin.FormBlockLabel>
              <_Builtin.FormTextInput
                className={_utils.cx(_styles, "form_main_field_input")}
                name="Company-Name"
                maxLength={256}
                data-name="Company Name"
                placeholder="ie. AA Construction, Inc."
                disabled={false}
                type="text"
                required={true}
                autoFocus={true}
                id="Company-Name"
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
                htmlFor="Contact-Name"
              >
                {"Contact Name*"}
              </_Builtin.FormBlockLabel>
              <_Builtin.FormTextInput
                className={_utils.cx(_styles, "form_main_field_input")}
                name="Contact-Name"
                maxLength={256}
                data-name="Contact Name"
                placeholder="Jane Smith"
                disabled={false}
                type="text"
                required={true}
                autoFocus={false}
                id="Contact-Name"
              />
            </_Builtin.Block>
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
                htmlFor="Email-Address"
                form1-label=""
                transform-duration=""
              >
                {"Contact Email Address*"}
              </_Builtin.FormBlockLabel>
              <_Builtin.FormTextInput
                className={_utils.cx(_styles, "form_main_field_input")}
                name="Email-Address"
                maxLength={256}
                data-name="Email Address"
                placeholder="email@company.com"
                disabled={false}
                type="email"
                required={true}
                autoFocus={false}
                id="Email-Address"
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
                htmlFor="Phone-Number"
                form1-label=""
                transform-duration=""
              >
                {"Contact Phone Number*"}
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
                id="Phone-Number"
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "form_main_phone_wrap")}
            tag="div"
            form1-fieldgroup=""
          >
            <_Builtin.FormBlockLabel
              className={_utils.cx(_styles, "form_main_label", "u-weight-bold")}
              htmlFor="Company-Service-Area"
              form1-label=""
              transform-duration=""
            >
              {"What State(s) Does Your Company Service?"}
            </_Builtin.FormBlockLabel>
            <_Builtin.FormTextInput
              className={_utils.cx(_styles, "form_main_field_input")}
              name="Company-Service-Area"
              maxLength={256}
              data-name="Company Service Area"
              placeholder="ie. New Hampshire, New York, Maine"
              disabled={false}
              type="text"
              required={false}
              autoFocus={false}
              id="Company-Service-Area"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "form_main_field_wrap")}
            tag="div"
          >
            <_Builtin.FormBlockLabel
              className={_utils.cx(_styles, "form_main_label", "u-weight-bold")}
              htmlFor="Type-of-Work-Performed"
              form1-label=""
              transform-duration=""
            >
              {"Type of Work Performed"}
            </_Builtin.FormBlockLabel>
            <_Builtin.FormTextarea
              className={_utils.cx(
                _styles,
                "form_main_field_input",
                "is-message"
              )}
              name="Type-of-Work-Performed"
              maxLength={5000}
              data-name="Type of Work Performed"
              placeholder="Describe what your company does"
              required={false}
              autoFocus={false}
              id="Type-of-Work-Performed"
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
                  id="I-accept-the-terms-of-the-website-2"
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
