"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { GlobalHeading } from "./GlobalHeading";
import { GlobalParagraph } from "./GlobalParagraph";
import { IconArrow } from "./IconArrow";
import { RichTextCapabilities } from "./RichTextCapabilities";
import * as _utils from "./utils";
import _styles from "./ElementKittingContent.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-55":{"id":"e-55","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-13","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-56"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".faq_question_wrap","originalId":"4c5e274e-7890-3e23-2f94-f1e6cf6e575c","appliesTo":"CLASS"},"targets":[{"selector":".faq_question_wrap","originalId":"4c5e274e-7890-3e23-2f94-f1e6cf6e575c","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1730247905384},"e-56":{"id":"e-56","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-14","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-55"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".faq_question_wrap","originalId":"4c5e274e-7890-3e23-2f94-f1e6cf6e575c","appliesTo":"CLASS"},"targets":[{"selector":".faq_question_wrap","originalId":"4c5e274e-7890-3e23-2f94-f1e6cf6e575c","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1730247905384},"e-57":{"id":"e-57","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-13","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-58"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".faq_question_wrap","originalId":"efcf07f1-71c5-b457-a85a-5849850e40c5","appliesTo":"CLASS"},"targets":[{"selector":".faq_question_wrap","originalId":"efcf07f1-71c5-b457-a85a-5849850e40c5","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1738152012982},"e-58":{"id":"e-58","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-14","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-57"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".faq_question_wrap","originalId":"efcf07f1-71c5-b457-a85a-5849850e40c5","appliesTo":"CLASS"},"targets":[{"selector":".faq_question_wrap","originalId":"efcf07f1-71c5-b457-a85a-5849850e40c5","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1738152012982}},"actionLists":{"a-13":{"id":"a-13","title":"FAQ Accordion Arrow","actionItemGroups":[{"actionItems":[{"id":"a-13-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".faq_answer","selectorGuids":["fdd982fb-3713-0c2d-7fe4-0f10b3b1c03d"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-13-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".see_more_details_icon","selectorGuids":["71333d0d-742e-437f-8f16-0ba83f174181"]},"zValue":90,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-13-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":250,"easing":"ease","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".faq_answer","selectorGuids":["fdd982fb-3713-0c2d-7fe4-0f10b3b1c03d"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1626161550593},"a-14":{"id":"a-14","title":"FAQ Accordion Close","actionItemGroups":[{"actionItems":[{"id":"a-14-n","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".see_more_details_icon","selectorGuids":["71333d0d-742e-437f-8f16-0ba83f174181"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-14-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":500,"easing":"ease","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".faq_answer","selectorGuids":["fdd982fb-3713-0c2d-7fe4-0f10b3b1c03d"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626161607847}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ElementKittingContent({
  as: _Component = _Builtin.Block,
  heading = "",
  paragraph = "",
  iconViewbox = "0 0 595.28 544",
  iconPath1 = "M168.875 192.184v-42.617H57.644v42.617h25.519v91.16H57.644v42.617h111.231v-42.617h-25.519v-91.16zm122.75 25.066c-6.875-2-42.25-12.125-48.375-14.125s-11.125-4.875-11.125-8.5 5.625-7.5 17-7.5c35.875 0 53.109 22.125 53.109 22.125s1.942 2.587 2.593 3.515h34.612v-60.363h-37.157v10.982c-2.838-1.96-23.79-15.634-56.282-15.634-42.875 0-66.75 22.25-66.75 55.5s30.125 47 38.5 50.5 41.125 12.75 55.125 17.125 19.125 7.5 19.125 9.75-6.125 8.125-23.625 8.125c-30.483 0-46.181-17.976-48.936-21.457v-.027c-.876-1.174-1.904-2.563-2.253-3.086a220 220 0 0 0-1.991-2.876h-34.612v64.461h38.856v-13.461c4.521 3.009 27.664 17.446 55.436 17.446 31 0 70.5-13.5 70.5-55.625s-46.875-54.875-53.75-56.875m152.41-70.093c-51.678 0-94.062 25.838-94.062 91.795s46.011 90.662 94.288 90.662 93.835-24.479 93.835-89.981-45.556-92.476-94.061-92.476m.454 138.486c-17.68 0-29.013-4.08-29.013-46.917s8.387-47.371 29.692-47.371c12.919 0 28.559.906 28.559 46.011s-11.558 48.277-29.238 48.277M131.76 130.114a194.7 194.7 0 0 1 42.28-44.988 171 171 0 0 0 21.061 13.295c-12.398 13.82-23.506 29.131-25.346 31.693h7.439c4.465-6.018 13.701-18.124 23.44-28.857 10.645 5.233 21.958 9.513 33.762 12.773a255 255 0 0 0-6.911 16.084h6.463a257 257 0 0 1 6.376-14.547c15.058 3.679 30.836 5.741 46.977 6.055v8.493h6v-8.464c16.023-.117 31.714-1.943 46.719-5.374a257 257 0 0 1 6.04 13.837h6.463a256 256 0 0 0-6.543-15.296c12.015-3.126 23.544-7.294 34.402-12.445 9.366 10.448 18.122 21.932 22.433 27.741h7.438c-1.783-2.483-12.316-17.006-24.285-30.505 8.229-4.253 16.031-9.092 23.324-14.483a194.6 194.6 0 0 1 42.28 44.988h7.217c-35.488-54.771-97.142-91.087-167.124-91.087s-131.636 36.316-167.124 91.087zm105.313-21.571c-11.228-3.033-22.001-7.009-32.157-11.873a158 158 0 0 1 4.122-4.138c13.907-13.411 36.781-28.137 41.795-31.307 4.069 2.235 8.509 4.125 13.232 5.625-3.668 4.81-10.87 14.574-18.713 26.959-3.053 4.82-5.834 9.886-8.279 14.734m50.228 7.077c-15.196-.304-30.054-2.196-44.256-5.564 2.221-4.342 4.699-8.81 7.376-13.036 9.036-14.267 17.188-24.979 19.904-28.464a92.4 92.4 0 0 0 16.976 2.341zm6 .03V70.965a93.7 93.7 0 0 0 16.856-1.799c3.104 4.015 10.872 14.339 19.431 27.854 2.816 4.447 5.413 9.161 7.722 13.716-14.152 3.13-28.924 4.802-44.009 4.914m50.024-6.335c-2.537-5.08-5.454-10.43-8.669-15.506-7.438-11.746-14.302-21.136-18.119-26.178 5.023-1.411 9.765-3.245 14.119-5.464 7.039 4.512 27.483 17.992 40.314 30.365a164 164 0 0 1 5.153 5.218c-10.368 4.787-21.358 8.662-32.798 11.565m60.943-27.94c-7.039 5.081-14.56 9.633-22.479 13.635a180 180 0 0 0-6.654-6.797c-12.001-11.573-29.87-23.714-38.625-29.415 2.974-1.928 5.694-4.06 8.119-6.381 21.671 6.192 41.79 16.093 59.639 28.958M291.667 45.027c15.844 0 31.243 1.933 45.988 5.551-11.19 9.089-27.957 14.421-45.988 14.421-18.113 0-34.834-5.315-46.009-14.416a192.8 192.8 0 0 1 46.009-5.556m-52.965 7.39a54 54 0 0 0 6.476 5.294c-7.932 5.104-27.469 18.125-40.304 30.501a174 174 0 0 0-5.567 5.642c-7.099-3.717-13.869-7.88-20.24-12.479 17.846-12.865 37.964-22.765 59.635-28.958m212.88 293.53a194.7 194.7 0 0 1-41.243 44.185c-7.593-5.71-15.743-10.814-24.362-15.272 10.383-11.712 19.686-24.194 23.13-28.912h-7.472c-4.606 6.15-12.669 16.583-21.245 26.15-10.858-5.153-22.386-9.324-34.403-12.449a257 257 0 0 0 5.914-13.701h-6.482a257 257 0 0 1-5.396 12.248c-14.996-3.426-30.685-5.251-46.721-5.367v-6.881h-6v6.908c-16.154.313-31.931 2.373-46.98 6.047a256 256 0 0 1-5.73-12.955h-6.483a256 256 0 0 0 6.283 14.49c-11.807 3.261-23.124 7.535-33.768 12.771-8.944-9.859-17.461-20.872-22.248-27.262h-7.472c3.558 4.875 13.385 18.057 24.197 30.107-7.787 4.17-15.181 8.869-22.106 14.077a194.6 194.6 0 0 1-41.243-44.185h-7.206c35.489 54.771 97.141 91.087 167.122 91.087 69.98 0 131.633-36.315 167.122-91.087zm-108.254 19.208c11.444 2.902 22.434 6.776 32.803 11.565a165 165 0 0 1-5.16 5.226c-12.791 12.333-33.17 25.782-40.262 30.33-4.354-2.228-9.102-4.062-14.141-5.473 3.824-5.051 10.67-14.423 18.088-26.136 3.217-5.077 6.134-10.43 8.672-15.512m-50.027-6.327c15.097.112 29.869 1.779 44.012 4.905-2.31 4.558-4.907 9.273-7.726 13.724-8.547 13.496-16.303 23.809-19.416 27.836-5.4-1.076-11.058-1.683-16.871-1.779zm-6 .03v44.718a93 93 0 0 0-16.997 2.32c-2.735-3.511-10.861-14.193-19.883-28.439-2.679-4.229-5.159-8.7-7.381-13.046 14.194-3.364 29.052-5.25 44.261-5.553m-50.231 7.071c2.446 4.851 5.229 9.917 8.282 14.739 7.837 12.375 15.034 22.133 18.705 26.947-4.73 1.499-9.165 3.391-13.232 5.632-5.033-3.184-27.887-17.899-41.786-31.301a158 158 0 0 1-4.126-4.142c10.154-4.866 20.926-8.843 32.157-11.875m-59.09 27.964c6.687-4.916 13.817-9.348 21.318-13.277a174 174 0 0 0 5.575 5.649c12.832 12.373 32.363 25.391 40.298 30.497-2.827 1.979-5.404 4.155-7.694 6.517-21.642-6.342-41.717-16.382-59.497-29.386m113.687 37.141a192.7 192.7 0 0 1-47.437-5.906c11.086-9.742 28.69-15.649 47.437-15.649 18.724 0 36.345 5.911 47.432 15.65a192.7 192.7 0 0 1-47.432 5.905m54.186-7.755c-2.722-2.805-5.833-5.363-9.304-7.626 8.77-5.711 26.603-17.833 38.586-29.389a180 180 0 0 0 6.657-6.801c8.323 4.21 16.211 9.026 23.561 14.429-17.781 13.006-37.857 23.046-59.5 29.387M69.088 500.668q.4 7.446 5.747 10.293 2.748 1.5 6.196 1.499 6.445 0 10.993-5.371 4.547-5.372 6.446-21.811-2.998 4.746-7.42 6.67t-9.519 1.924q-10.344 0-16.365-6.438-6.022-6.44-6.021-16.573 0-9.733 5.946-17.121c5.946-7.388 9.811-7.388 17.539-7.388q15.64 0 21.586 14.082 3.298 7.74 3.298 19.375 0 13.132-3.947 23.27-6.547 16.878-22.186 16.878-10.495 0-15.94-5.497-5.447-5.496-5.447-13.791h9.094zm23.411-18.208q4.422-3.517 4.422-12.298 0-7.882-3.973-11.749-3.972-3.866-10.118-3.866-6.596 0-10.469 4.415t-3.873 11.799q0 6.985 3.398 11.101 3.397 4.116 10.843 4.115 5.348 0 9.77-3.517m67.682-24.565q4.797 8.845 4.797 24.235 0 14.59-4.347 24.135-6.297 13.69-20.587 13.691-12.892 0-19.188-11.193-5.247-9.344-5.247-25.084 0-12.192 3.148-20.938 5.896-16.289 21.336-16.289 13.892 0 20.088 11.443m-9.051 47.669q4.154-6.195 4.154-23.085 0-12.192-3.003-20.062t-11.662-7.87q-7.959 0-11.637 7.471-3.68 7.47-3.679 22.011 0 10.943 2.352 17.589 3.604 10.144 12.312 10.144 7.007-.001 11.163-6.198m65.965-47.669q4.797 8.845 4.797 24.235 0 14.59-4.347 24.135-6.297 13.69-20.587 13.691-12.893 0-19.188-11.193-5.247-9.344-5.247-25.084 0-12.192 3.148-20.938 5.896-16.289 21.336-16.289 13.892 0 20.088 11.443m-9.051 47.669q4.154-6.195 4.154-23.085 0-12.192-3.003-20.062t-11.662-7.87q-7.959 0-11.637 7.471-3.68 7.47-3.679 22.011 0 10.943 2.352 17.589 3.604 10.144 12.312 10.144 7.007-.001 11.163-6.198m27.989-38.225v-6.896q9.744-.949 13.591-3.173 3.847-2.223 5.747-10.519h7.095v71.255h-9.594v-50.668zm58.464-2.149h10.444v10.893h-10.444zm0 41.923h10.444v10.894h-10.444zm24.109-5.196q3.322-6.845 12.967-12.442l9.594-5.546q6.446-3.749 9.045-6.401 4.096-4.156 4.097-9.513 0-6.258-3.747-9.938-3.748-3.68-9.994-3.68-9.245 0-12.792 7.017-1.9 3.759-2.099 10.423h-9.144q.15-9.344 3.447-15.24 5.846-10.394 20.637-10.394 12.293 0 17.964 6.646t5.672 14.791q0 8.595-6.046 14.69-3.5 3.548-12.543 8.595l-6.846 3.798q-4.897 2.699-7.694 5.146-4.998 4.347-6.297 9.644h39.076v8.495h-49.119q.499-9.245 3.822-16.091m97.664-44.022q4.797 8.845 4.797 24.235 0 14.59-4.347 24.135-6.297 13.69-20.587 13.691-12.893 0-19.188-11.193-5.246-9.344-5.246-25.084 0-12.192 3.147-20.938 5.896-16.289 21.337-16.289 13.89 0 20.087 11.443m-9.051 47.669q4.154-6.195 4.154-23.085 0-12.192-3.004-20.062t-11.661-7.87q-7.959 0-11.637 7.471-3.68 7.47-3.68 22.011 0 10.943 2.353 17.589 3.604 10.144 12.312 10.144 7.008-.001 11.163-6.198m27.989-38.225v-6.896q9.743-.949 13.592-3.173 3.846-2.223 5.746-10.519h7.096v71.255h-9.595v-50.668zm59.762 32.43q.9 7.695 7.146 10.644 3.199 1.499 7.396 1.499 7.995 0 11.843-5.098 3.847-5.095 3.848-11.292 0-7.495-4.572-11.593c-4.572-4.098-6.704-4.098-10.968-4.098q-4.648 0-7.97 1.799-3.324 1.799-5.672 4.997l-7.795-.45 5.448-38.525h37.175v8.694h-30.431l-3.049 19.888q2.499-1.899 4.747-2.849 3.998-1.648 9.244-1.648 9.844 0 16.689 6.346 6.846 6.345 6.846 16.09 0 10.144-6.271 17.889t-20.013 7.745q-8.745-.001-15.465-4.922t-7.521-15.115z",
  imageFile = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg",
  imageAltText = "__wf_reserved_inherit",
  seeMoreDetailsText = "",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(
        _styles,
        "kitting_content_wrap",
        "u-vflex-left-between",
        "u-gap-small"
      )}
      tag="div"
      data-theme="light"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "kitting_text_wrap",
          "u-vflex-left-top",
          "u-gap-small"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "kitting_details_content",
            "u-vflex-left-center",
            "u-gap-xsmall"
          )}
          tag="div"
        >
          <_Builtin.DOM
            className={_utils.cx(
              _styles,
              "kitting_details_content_heading",
              "u-text-h5"
            )}
            tag="div"
            slot=""
          >
            <GlobalHeading text={heading} />
          </_Builtin.DOM>
          <_Builtin.DOM
            className={_utils.cx(_styles, "kitting_details_paragraph")}
            tag="div"
            slot=""
          >
            <GlobalParagraph text={paragraph} />
          </_Builtin.DOM>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.DOM
        className={_utils.cx(
          _styles,
          "kitting_content_dropdown",
          "u-width-full"
        )}
        tag="details"
        slot=""
      >
        <_Builtin.DOM
          className={_utils.cx(
            _styles,
            "kitting_dropdown",
            "u-hflex-between-top",
            "u-weight-bold"
          )}
          tag="summary"
          slot=""
        >
          <_Builtin.DOM
            className={_utils.cx(_styles, "g_paragraph_wrap")}
            tag="div"
            slot=""
            style="max-width: none;"
          >
            <_Builtin.RichText
              className={_utils.cx(_styles, "g_paragraph_rich")}
              tag="div"
              slot=""
            >
              <_Builtin.Paragraph>{"See More Details"}</_Builtin.Paragraph>
            </_Builtin.RichText>
          </_Builtin.DOM>
          <_Builtin.Block
            className={_utils.cx(_styles, "see_more_details_icon")}
            tag="div"
          >
            <IconArrow />
          </_Builtin.Block>
        </_Builtin.DOM>
        <_Builtin.Block
          className={_utils.cx(_styles, "dropdown_content")}
          tag="div"
        >
          <RichTextCapabilities seeMoreDetailsText={seeMoreDetailsText} />
        </_Builtin.Block>
      </_Builtin.DOM>
    </_Component>
  );
}
