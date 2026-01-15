"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { IconSvgWrap } from "./IconSvgWrap";
import { GlobalContent } from "./GlobalContent";
import * as _utils from "./utils";
import _styles from "./ElementFaqSummaryDetailsItem.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-55":{"id":"e-55","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-13","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-56"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".faq_question_wrap","originalId":"4c5e274e-7890-3e23-2f94-f1e6cf6e575c","appliesTo":"CLASS"},"targets":[{"selector":".faq_question_wrap","originalId":"4c5e274e-7890-3e23-2f94-f1e6cf6e575c","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1730247905384},"e-56":{"id":"e-56","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-14","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-55"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".faq_question_wrap","originalId":"4c5e274e-7890-3e23-2f94-f1e6cf6e575c","appliesTo":"CLASS"},"targets":[{"selector":".faq_question_wrap","originalId":"4c5e274e-7890-3e23-2f94-f1e6cf6e575c","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1730247905384},"e-57":{"id":"e-57","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-13","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-58"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".faq_question_wrap","originalId":"efcf07f1-71c5-b457-a85a-5849850e40c5","appliesTo":"CLASS"},"targets":[{"selector":".faq_question_wrap","originalId":"efcf07f1-71c5-b457-a85a-5849850e40c5","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1738152012982},"e-58":{"id":"e-58","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-14","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-57"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".faq_question_wrap","originalId":"efcf07f1-71c5-b457-a85a-5849850e40c5","appliesTo":"CLASS"},"targets":[{"selector":".faq_question_wrap","originalId":"efcf07f1-71c5-b457-a85a-5849850e40c5","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1738152012982}},"actionLists":{"a-13":{"id":"a-13","title":"FAQ Accordion Arrow","actionItemGroups":[{"actionItems":[{"id":"a-13-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".faq_answer","selectorGuids":["fdd982fb-3713-0c2d-7fe4-0f10b3b1c03d"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-13-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".see_more_details_icon","selectorGuids":["71333d0d-742e-437f-8f16-0ba83f174181"]},"zValue":90,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-13-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":250,"easing":"ease","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".faq_answer","selectorGuids":["fdd982fb-3713-0c2d-7fe4-0f10b3b1c03d"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1626161550593},"a-14":{"id":"a-14","title":"FAQ Accordion Close","actionItemGroups":[{"actionItems":[{"id":"a-14-n","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".see_more_details_icon","selectorGuids":["71333d0d-742e-437f-8f16-0ba83f174181"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-14-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":500,"easing":"ease","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".faq_answer","selectorGuids":["fdd982fb-3713-0c2d-7fe4-0f10b3b1c03d"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626161607847}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ElementFaqSummaryDetailsItem({
  as: _Component = _Builtin.Block,
  faqLongAnswer = "",
  globalFaqQuestion = "",

  btnFullAnswerLink = {
    href: "#",
  },

  questionText = "Heading",
  globalFaqShortAnswer = "",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "faq_item_wrap")} tag="div">
      <_Builtin.DOM
        className={_utils.cx(_styles, "faq_item", "u-width-full")}
        tag="details"
        slot=""
      >
        <_Builtin.DOM
          className={_utils.cx(
            _styles,
            "faq_question_wrap",
            "u-hflex-between-bottom",
            "u-gap-small"
          )}
          tag="summary"
          slot=""
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "faq_question_text",
              "u-weight-bold",
              "u-text-h6"
            )}
            tag="div"
          >
            <_Builtin.Heading tag="h2">{questionText}</_Builtin.Heading>
          </_Builtin.Block>
          <_Builtin.DOM
            className={_utils.cx(_styles, "faq_toggle_icon")}
            tag="span"
            slot=""
          >
            <IconSvgWrap
              viewbox="0 0 1200 1200"
              path1="m206.25 431.25c-44.738 0.050781-87.633 17.844-119.27 49.48s-49.43 74.531-49.48 119.27c-0.035156 3.1328 0.125 6.2617 0.48828 9.375 2.332 41.359 19.816 80.41 49.109 109.7 29.289 29.293 68.344 46.773 109.7 49.109 3.1328 0.39062 6.2891 0.57812 9.4492 0.5625 44.754 0 87.676-17.777 119.32-49.426 31.648-31.648 49.426-74.57 49.426-119.32s-17.777-87.676-49.426-119.32c-31.648-31.648-74.57-49.426-119.32-49.426zm51.113 246.96c0-1.0703 0.26172-2.1172 0.26172-3.207-0.035156-33.508-13.359-65.629-37.055-89.32-23.691-23.695-55.812-37.02-89.32-37.055-1.1445 0-2.2695 0.26172-3.4141 0.28125 15.363-23.691 40.602-39.176 68.68-42.145s55.996 6.8984 75.973 26.852c19.977 19.953 29.875 47.859 26.941 75.941-2.9375 28.082-18.395 53.336-42.066 68.727zm342.64-246.96c-44.738 0.050781-87.633 17.844-119.27 49.48s-49.43 74.531-49.48 119.27c-0.035156 3.1328 0.125 6.2617 0.48828 9.375 2.332 41.359 19.816 80.41 49.109 109.7 29.289 29.293 68.344 46.773 109.7 49.109 3.1328 0.39062 6.2891 0.57812 9.4492 0.5625 44.754 0 87.676-17.777 119.32-49.426 31.648-31.648 49.426-74.57 49.426-119.32s-17.777-87.676-49.426-119.32c-31.648-31.648-74.57-49.426-119.32-49.426zm51.113 246.96c0-1.0703 0.26172-2.1172 0.26172-3.207-0.035156-33.508-13.359-65.629-37.055-89.32-23.691-23.695-55.812-37.02-89.32-37.055-1.1445 0-2.2695 0.26172-3.4141 0.28125 15.363-23.691 40.602-39.176 68.68-42.145s55.996 6.8984 75.973 26.852c19.977 19.953 29.875 47.859 26.941 75.941-2.9375 28.082-18.395 53.336-42.066 68.727zm342.64-246.96c-44.738 0.050781-87.633 17.844-119.27 49.48s-49.43 74.531-49.48 119.27c-0.035156 3.1328 0.125 6.2617 0.48828 9.375 2.332 41.359 19.816 80.41 49.109 109.7 29.289 29.293 68.344 46.773 109.7 49.109 3.1328 0.39062 6.2891 0.57812 9.4492 0.5625 44.754 0 87.676-17.777 119.32-49.426 31.648-31.648 49.426-74.57 49.426-119.32s-17.777-87.676-49.426-119.32c-31.648-31.648-74.57-49.426-119.32-49.426zm51.113 246.96c0-1.0703 0.26172-2.1172 0.26172-3.207-0.035156-33.508-13.359-65.629-37.055-89.32-23.691-23.695-55.812-37.02-89.32-37.055-1.1445 0-2.2695 0.26172-3.4141 0.28125 15.363-23.691 40.602-39.176 68.68-42.145s55.996 6.8984 75.973 26.852c19.977 19.953 29.875 47.859 26.941 75.941-2.9375 28.082-18.395 53.336-42.066 68.727z"
            />
          </_Builtin.DOM>
        </_Builtin.DOM>
        <_Builtin.DOM
          className={_utils.cx(_styles, "faq_answer")}
          tag="div"
          slot=""
        >
          <GlobalContent
            button1Button1Link={btnFullAnswerLink}
            paragraphParagraphText={globalFaqShortAnswer}
            eyebrowEyebrowVisibility={false}
            headingHeadingVisibility={false}
            button1Button1Text="See Detailed Answer"
            button1IconVisibility={true}
            button1IconSvgPath1="m600 60c-298.18 0-540 241.82-540 540s241.82 540 540 540 540-241.82 540-540-241.82-540-540-540zm-3.0469 869.39c-29.859 0-54-24.141-54-54 0-29.719 24.141-53.812 54-53.812 29.719 0 53.812 24.141 53.812 53.812 0.046875 29.859-24.094 54-53.812 54zm104.81-325.5c-37.312 32.719-54.516 62.109-54.516 92.297 0 27.656-22.594 50.297-50.297 50.297-27.844 0-50.297-22.594-50.297-50.297 0-60.422 29.016-115.27 88.594-167.72 53.156-46.734 59.906-76.266 53.672-106.12-6.0938-29.719-43.547-51.141-88.922-51.141-3.1875 0-78.469 0.65625-92.156 61.078-6.0938 27-32.906 44.203-60.094 37.781-27-6.0938-44.062-32.906-37.969-60.094 25.031-110.02 131.34-139.36 190.22-139.36 94.312 0 171.47 54 187.5 131.29 19.734 96-39.516 161.29-85.734 201.98z"
            button1IconViewbox="0 0 1200 1200"
            button2Button2Visibility={false}
          />
        </_Builtin.DOM>
      </_Builtin.DOM>
    </_Component>
  );
}
