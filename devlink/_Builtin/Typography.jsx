"use client";
import * as React from "react";
import { parseStyleString } from "../utils";
export const Heading = React.forwardRef(function Heading(
  { tag = "h1", style, ...props },
  ref
) {
  return React.createElement(tag, {
    style: parseStyleString(style),
    ...props,
    ref,
  });
});
export const Paragraph = React.forwardRef(function Paragraph({ style, ...props }, ref) {
  return React.createElement("p", {
    style: parseStyleString(style),
    ...props,
    ref,
  });
});
export const Emphasized = React.forwardRef(function Emphasized({ style, ...props }, ref) {
  return React.createElement("em", { style: parseStyleString(style), ...props, ref: ref });
});
export const Strong = React.forwardRef(function Strong({ style, ...props }, ref) {
  return React.createElement("strong", {
    style: parseStyleString(style),
    ...props,
    ref,
  });
});
export const Figure = React.forwardRef(function Figure(
  { className = "", figure, style, ...props },
  ref
) {
  const { type, align } = figure;
  if (align) {
    className += `w-richtext-align-${align} `;
  }
  if (type) {
    className += `w-richtext-align-${type} `;
  }
  return React.createElement("figure", {
    className: className,
    style: parseStyleString(style),
    ...props,
    ref: ref,
  });
});
export const Figcaption = React.forwardRef(function Figcaption({ style, ...props }, ref) {
  return React.createElement("figcaption", { style: parseStyleString(style), ...props, ref: ref });
});
export const Subscript = React.forwardRef(function Subscript({ style, ...props }, ref) {
  return React.createElement("sub", { style: parseStyleString(style), ...props, ref: ref });
});
export const Superscript = React.forwardRef(function Superrscript({ style, ...props }, ref) {
  return React.createElement("sup", { style: parseStyleString(style), ...props, ref: ref });
});
export const RichText = React.forwardRef(function RichText(
  { tag = "div", className = "", style, ...props },
  ref
) {
  return React.createElement(tag, {
    className: className + " w-richtext",
    style: parseStyleString(style),
    ...props,
    ref,
  });
});
