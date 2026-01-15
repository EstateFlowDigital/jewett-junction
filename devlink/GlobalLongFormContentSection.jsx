"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalSpacer } from "./GlobalSpacer";
import { BtnMain } from "./BtnMain";
import { GlobalContent } from "./GlobalContent";
import { GlobalHeading } from "./GlobalHeading";
import * as _utils from "./utils";
import _styles from "./GlobalLongFormContentSection.module.css";

export function GlobalLongFormContentSection({
  as: _Component = _Builtin.Section,
  longFormContent = "",
  imageFile = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg",
  imageAltText = "__wf_reserved_inherit",
  visualVisibility = true,
  formVisibility = true,
  slot,
  topContentVisibility = false,
  paddingBottom = "small",
  paddingTop = "small",
  slot,
  additionalContentSlotVisibility = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "long_form_content_wrap")}
      tag="section"
      grid={{
        type: "section",
      }}
      data-theme="inherit"
      id="long_form_content_section"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "long_form_content_contain",
          "u-container",
          "u-grid-autofit",
          "u-gap-medium"
        )}
        tag="div"
        data-padding-bottom={paddingBottom}
        data-padding-top={paddingTop}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "long_form_content_layout",
            "u-vflex-stretch-top",
            "u-gap-large"
          )}
          id={_utils.cx(
            _styles,
            "w-node-_07c89d8c-2bc8-1962-65f8-c43d53b54c01-53b54c00"
          )}
          tag="div"
        >
          <_Builtin.NotSupported _atom="Slot" />
          <_Builtin.DOM
            className={_utils.cx(_styles, "long-form-wrapper")}
            tag="div"
            slot=""
            style="max-height:50vh; overflow:hidden; transition:max-height .5s ease;"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fade_overlay")}
              tag="div"
            />
            <_Builtin.RichText
              className={_utils.cx(_styles, "long_form_content", "u-rich-text")}
              tag="div"
              slot=""
              id="long_form_content"
            >
              {longFormContent}
            </_Builtin.RichText>
            <GlobalSpacer
              visibility={additionalContentSlotVisibility}
              variant="large"
            />
            <_Builtin.NotSupported _atom="Slot" />
          </_Builtin.DOM>
          <_Builtin.Block
            className={_utils.cx(_styles, "expand-button")}
            tag="div"
          >
            <BtnMain
              text="Read More Great Info"
              link={{
                href: "#",
              }}
              btnLinkClass=" "
              btnTextClasses="expand_btn_text"
              iconSvgPath1="m600 132c-258 0-468 210-468 468s210 468 468 468 468-210 468-468-210-468-468-468zm188.04 504h-152.04v152.04c0 19.922-16.078 36-36 36s-36-16.078-36-36v-152.04h-152.04c-19.922 0-36-16.078-36-36s16.078-36 36-36h152.04v-152.04c0-19.922 16.078-36 36-36s36 16.078 36 36v152.04h152.04c19.922 0 36 16.078 36 36s-16.199 36-36 36z"
              buttonSizeIsSmall="expand-btn"
            />
          </_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "read_more_expand_script")}
            value="%3Cscript%3E%0Adocument.querySelector('.expand-btn').addEventListener('click'%2C%20function%20(e)%20%7B%0A%20%20e.preventDefault()%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F*%20stop%20href%3D%22%23%22%20jump%20*%2F%0A%0A%20%20const%20wrap%20%20%3D%20document.querySelector('.long-form-wrapper')%3B%0A%20%20const%20lbl%20%20%20%3D%20document.querySelector('.expand_btn_text')%3B%0A%20%20const%20fade%20%20%3D%20document.querySelector('.fade_overlay')%3B%0A%20%20const%20top%20%20%20%3D%20document.getElementById('long_form_content_section')%3B%20%2F*%20%E2%86%90%20back%20here%20*%2F%0A%20%20const%20open%20%20%3D%20this.getAttribute('aria-expanded')%20%3D%3D%3D%20'true'%3B%0A%0A%20%20if%20(open)%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F*%20collapse%20*%2F%0A%20%20%20%20wrap.style.maxHeight%20%3D%20wrap.scrollHeight%20%2B%20'px'%3B%0A%20%20%20%20setTimeout(()%20%3D%3E%20%7B%20wrap.style.maxHeight%20%3D%20'50vh'%3B%20%7D%2C%2010)%3B%0A%20%20%20%20lbl.textContent%20%20%3D%20'Read%20More%20Great%20Info'%3B%0A%20%20%20%20fade.style.display%20%3D%20'block'%3B%0A%20%20%20%20this.setAttribute('aria-expanded'%2C%20'false')%3B%0A%0A%20%20%20%20top.scrollIntoView(%7B%20behavior%3A%20'smooth'%20%7D)%3B%0A%20%20%20%20setTimeout(()%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20%2F*%20optional%205-rem%20upward%20nudge%20*%2F%0A%20%20%20%20%20%20window.scrollBy(0%2C%20-40%20*%20parseFloat(getComputedStyle(document.documentElement).fontSize))%3B%0A%20%20%20%20%7D%2C%20500)%3B%0A%20%20%7D%20else%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F*%20expand%20*%2F%0A%20%20%20%20wrap.style.maxHeight%20%3D%20wrap.scrollHeight%20%2B%20'px'%3B%0A%20%20%20%20wrap.addEventListener('transitionend'%2C%20function%20h()%20%7B%0A%20%20%20%20%20%20wrap.style.maxHeight%20%3D%20'auto'%3B%0A%20%20%20%20%20%20wrap.removeEventListener('transitionend'%2C%20h)%3B%0A%20%20%20%20%7D)%3B%0A%20%20%20%20lbl.textContent%20%20%3D%20'Read%20Less%20Great%20Info'%3B%0A%20%20%20%20fade.style.display%20%3D%20'none'%3B%0A%20%20%20%20this.setAttribute('aria-expanded'%2C%20'true')%3B%0A%20%20%7D%0A%7D)%3B%0A%3C%2Fscript%3E"
          />
        </_Builtin.Block>
        {formVisibility ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "long_form_content_form")}
            id={_utils.cx(
              _styles,
              "w-node-_11569166-c507-4f15-fbfd-106b5ad0a6b8-53b54c00"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "newseltter_form_item",
                "u-vflex-stretch-top",
                "u-gap-small"
              )}
              tag="div"
            >
              <GlobalContent
                headingStyle="u-text-h5"
                headingHeadingText={
                  <_Builtin.Paragraph>
                    <_Builtin.Strong>{"Stay In the Know"}</_Builtin.Strong>
                  </_Builtin.Paragraph>
                }
                eyebrowEyebrowText={
                  <_Builtin.Paragraph>
                    {"Streamlined PCB Assembly"}
                  </_Builtin.Paragraph>
                }
                paragraphParagraphText={
                  <_Builtin.Paragraph>
                    {
                      "Get in touch today to discuss how we can turn your dream project into reality!"
                    }
                  </_Builtin.Paragraph>
                }
                paragraphParagraphMaxWidth="max-width: 70ch;"
                button1Button1Visibility={true}
                button2Button2Visibility={true}
                eyebrowEyebrowVisibility={false}
                button2Button2Link={{
                  href: "#",
                }}
                button1Button1Link={{
                  href: "#",
                }}
                button1Button1Text="Request a Quote"
                button1IconSvgPath1="M70.5 69.898C81.398 69.898 90.301 61 90.301 50S81.403 30.102 70.5 30.102c-6.102 0-11.5 2.7-15.102 7v25.699c3.602 4.398 9 7.098 15.102 7.098zm-2.102-30.699v-2.602c0-.3.301-.601.602-.601h2.898c.301 0 .602.3.602.601V39.2c3.102.3 5.5 2.602 5.898 5.7 0 .398-.199.698-.601.698h-2.899c-.3 0-.5-.199-.601-.5-.2-1-1.2-1.8-2.301-1.8h-3c-1.2 0-2.3.898-2.398 2.101-.102 1.399.898 2.602 2.3 2.602H71.7C75 48 78 50.398 78.4 53.6c.5 3.7-2.301 6.899-5.899 7.2v2.601c0 .301-.3.602-.602.602L69 64c-.3 0-.602-.3-.602-.602v-2.601a6.59 6.59 0 0 1-5.898-5.7c0-.398.2-.699.602-.699H66c.3 0 .5.2.602.5.199 1 1.101 1.801 2.3 1.801H72c1.398 0 2.398-1.2 2.3-2.602-.1-1.199-1.198-2.101-2.398-2.101h-2.699c-3.3 0-6.3-2.399-6.699-5.602A6.48 6.48 0 0 1 68.4 39.2z M70.5 23c-5.602 0-10.801 1.7-15.102 4.602v4.8c4.102-3.5 9.398-5.601 15.102-5.601C83.301 26.8 93.699 37.199 93.699 50S83.301 73.199 70.5 73.199c-5.8 0-11.102-2.102-15.102-5.602v4.801C59.698 75.296 64.898 77 70.5 77c14.898 0 27-12.102 27-27s-12.102-27-27-27m-21.801-6.898H5.398A2.9 2.9 0 0 0 2.5 19v62a2.9 2.9 0 0 0 2.898 2.9h43.301a2.9 2.9 0 0 0 2.898-2.9l.004-62c0-1.699-1.402-2.898-2.902-2.898M15.5 75.399c-2 0-3.602-1.7-3.602-3.602 0-2 1.7-3.601 3.602-3.601 2 0 3.602 1.699 3.602 3.601 0 2.102-1.5 3.602-3.602 3.602m0-11.098c-2 0-3.602-1.7-3.602-3.602 0-2 1.7-3.601 3.602-3.601 2 0 3.602 1.699 3.602 3.601 0 1.903-1.5 3.602-3.602 3.602m0-11.102c-2 0-3.602-1.7-3.602-3.602 0-2 1.7-3.601 3.602-3.601 2 0 3.602 1.699 3.602 3.601S17.602 53.2 15.5 53.2M27 75.398c-2 0-3.602-1.7-3.602-3.602 0-2 1.7-3.601 3.602-3.601 2 0 3.602 1.699 3.602 3.601 0 2.102-1.5 3.602-3.602 3.602M27 64.3c-2 0-3.602-1.7-3.602-3.602 0-2 1.7-3.601 3.602-3.601 2 0 3.602 1.699 3.602 3.601 0 1.903-1.5 3.602-3.602 3.602m0-11.102c-2 0-3.602-1.7-3.602-3.602 0-2 1.7-3.601 3.602-3.601 2 0 3.602 1.699 3.602 3.601s-1.5 3.602-3.602 3.602m11.5 22.199c-2 0-3.602-1.7-3.602-3.602 0-2 1.7-3.601 3.602-3.601 2 0 3.602 1.699 3.602 3.601.097 2.102-1.602 3.602-3.602 3.602m0-11.098c-2 0-3.602-1.7-3.602-3.602 0-2 1.7-3.601 3.602-3.601 2 0 3.602 1.699 3.602 3.601C42.199 62.6 40.5 64.3 38.5 64.3m0-11.102c-2 0-3.602-1.7-3.602-3.602 0-2 1.7-3.601 3.602-3.601 2 0 3.602 1.699 3.602 3.601.097 1.903-1.602 3.602-3.602 3.602M41 39.896H13.102c-1.602 0-2.8-1.2-2.8-2.8v-10.4c0-1.601 1.198-2.8 2.8-2.8h27.801c1.602 0 2.8 1.199 2.8 2.8v10.398h.102c-.004 1.602-1.203 2.801-2.804 2.801z"
                button1IconViewbox="0 0 100 100"
                button1IconVisibility={true}
                button2Button2Text="View Our Projects"
                headingHeadingMaxWidth="max-width: none;"
                buttonGroupButtonGroupVisibility={false}
                paragraphParagraphVisibility={false}
              />
              <_Builtin.FormWrapper
                className={_utils.cx(_styles, "form_main_wrap")}
              >
                <_Builtin.FormForm
                  className={_utils.cx(
                    _styles,
                    "form_main_list",
                    "u-vflex-left-top",
                    "u-gap-main"
                  )}
                  name="wf-form-Newsletter-Form"
                  data-name="Newsletter Form"
                  method="post"
                  id="wf-form-Newsletter-Form"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "form_main_grid_wrap",
                      "u-vflex-left-top",
                      "u-gap-main"
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
                        htmlFor="First-Name-Newsletter-Form"
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
                        id="First-Name-Newsletter-Form"
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
                        htmlFor="Last-Name-Newsletter-Form"
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
                        id="Last-Name-Newsletter-Form"
                      />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "form_main_grid_wrap")}
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
                        htmlFor="Email-Address-Newsletter-Form"
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
                        id="Email-Address-Newsletter-Form"
                      />
                    </_Builtin.Block>
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
                        className={_utils.cx(
                          _styles,
                          "form_main_option_item",
                          "u-text-small"
                        )}
                      >
                        <_Builtin.FormCheckboxInput
                          className={_utils.cx(
                            _styles,
                            "form_main_option_link"
                          )}
                          type="checkbox"
                          name="I-accept-the-terms-of-the-website-2"
                          data-name="I Accept The Terms Of The Website 2"
                          required={true}
                          checked={false}
                          id="I-accept-the-terms-of-the-website-Newsletter-Form"
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
                          {"Iagree to be emailed "}
                        </_Builtin.FormInlineLabel>
                      </_Builtin.FormCheckboxWrapper>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.FormReCaptcha
                    className={_utils.cx(_styles, "recaptcha")}
                    siteKey={process.env.DEVLINK_ENV_GOOGLE_RECAPTCHA_API_KEY}
                  />
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "buttons_wrap",
                      "u-weight-bold"
                    )}
                    tag="div"
                  >
                    <BtnMain
                      typeButtonSubmitReset="submit"
                      text="Subscribe"
                      subtextVisibility={false}
                      iconSvgPath1="M1122.5 277.67a24.669 24.669 0 0 0-28.61 40.195 142.5 142.5 0 0 1 26.16 27.238l-520.01 354.55-517.93-353.13a194 194 0 0 1 27.605-29.469 24.65 24.65 0 0 0 8.977-22.973 24.67 24.67 0 0 0-15.406-19.262 24.67 24.67 0 0 0-24.383 3.715C76 280.847 7.965 336.112 7.965 408.804v641.41a123.5 123.5 0 0 0 36.172 87.18 123.46 123.46 0 0 0 87.176 36.168h937.45a123.46 123.46 0 0 0 87.176-36.168 123.5 123.5 0 0 0 36.172-87.18v-641.41c0-80.898-66.77-129.13-69.613-131.14z M229.95 371.8a37 37 0 0 0 26.168-10.836 37 37 0 0 0 10.836-26.168v-234.36h666.09v234.36a37.003 37.003 0 1 0 74.008 0V91.156a64.8 64.8 0 0 0-64.734-64.734h-684.63a64.8 64.8 0 0 0-45.754 18.98 64.82 64.82 0 0 0-18.98 45.754v243.64a37 37 0 0 0 10.836 26.168 37.02 37.02 0 0 0 26.168 10.836z"
                      link={{
                        href: "#",
                      }}
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
                    <GlobalHeading
                      text={
                        <_Builtin.Heading tag="h2">
                          <_Builtin.Strong>
                            {"Your Submission has been received - thank you!"}
                          </_Builtin.Strong>
                        </_Builtin.Heading>
                      }
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
                    {"If you are still have issues, reach out at "}
                    <_Builtin.Link
                      button={false}
                      target="_blank"
                      block=""
                      options={{
                        href: "mailto:marketing@jewettconstruction.com",
                      }}
                    >
                      <_Builtin.Strong>
                        {"marketing@jewettconstruction.com"}
                      </_Builtin.Strong>
                    </_Builtin.Link>
                  </_Builtin.Block>
                </_Builtin.FormErrorMessage>
              </_Builtin.FormWrapper>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
