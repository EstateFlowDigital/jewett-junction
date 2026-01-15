import * as React from "react";
import * as Types from "./types";

declare function GlobalContentWSlots(props: {
  as?: React.ElementType;
  eyebrowStyles?: Types.Builtin.Text;
  eyebrowEyebrowVisibility?: Types.Visibility.VisibilityConditions;
  eyebrowEyebrowMaxWidth?: Types.Builtin.Text;
  eyebrowEyebrowText?: Types.Basic.RichTextChildren;
  headingStyle?: Types.Builtin.Text;
  headingHeadingVisibility?: Types.Visibility.VisibilityConditions;
  headingHeadingText?: Types.Basic.RichTextChildren;
  headingHeadingMaxWidth?: Types.Builtin.Text;
  paragraphParagraphVisibility?: Types.Visibility.VisibilityConditions;
  paragraphParagraphText?: Types.Basic.RichTextChildren;
  paragraphParagraphMaxWidth?: Types.Builtin.Text;
  buttonGroupButtonGroupVisibility?: Types.Visibility.VisibilityConditions;
  button1Button1Visibility?: Types.Visibility.VisibilityConditions;
  button1Button1Text?: React.ReactNode;
  button1Button1Link?: Types.Basic.Link;
  button2Button2Visibility?: Types.Visibility.VisibilityConditions;
  button2Button2Text?: React.ReactNode;
  button2Button2Link?: Types.Basic.Link;
  paragraphStyless?: Types.Builtin.Text;
  eyebrowEyebrowIsLeftAligned?: Types.Builtin.Text;
  button1Subtext?: React.ReactNode;
  button1SubtextVisibility?: Types.Visibility.VisibilityConditions;
  button1IconVisibility?: Types.Visibility.VisibilityConditions;
  button2Button2Subtext?: React.ReactNode;
  button2Button2SubtextVisibility?: Types.Visibility.VisibilityConditions;
  button2Button2IconVisibility?: Types.Visibility.VisibilityConditions;
  button1IconViewbox?: Types.Builtin.Text;
  button1IconSvgPath1?: Types.Builtin.Text;
  button2Button2IconViewbox?: Types.Builtin.Text;
  button2Button2SvgPath1?: Types.Builtin.Text;
  eyebrowPlainText?: React.ReactNode;
  eyebrowPlainTextVisibiliity?: Types.Visibility.VisibilityConditions;
  eyebrowRichTextVisibility?: Types.Visibility.VisibilityConditions;
  eyebrowFeaturedText?: React.ReactNode;
  eyebrowEyebrowIconViewbox?: Types.Builtin.Text;
  eyebrowIconPath1?: Types.Builtin.Text;
  eyebrowFeaturedTextVisibility?: Types.Visibility.VisibilityConditions;
  eyebrowEyebrowFeaturedIconVisibility?: Types.Visibility.VisibilityConditions;
  variant?:
    | "Base"
    | "Content is Center"
    | "Content is Center Hero"
    | "v-flex-between";
  slot?: Types.Slots.SlotContent;
  slot?: Types.Slots.SlotContent;
  slot?: Types.Slots.SlotContent;
  slot?: Types.Slots.SlotContent;
}): React.JSX.Element;
