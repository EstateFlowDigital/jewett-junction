"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GlobalVisual.module.css";

export function GlobalVisual({
  as: _Component = _Builtin.DOM,
  imageImageVisibility = true,
  imageImageFile = "https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg",
  imageImageAltText = "__wf_reserved_inherit",
  videoVideoVisibility = false,
  videoVideoUrl,
  videoVideoLoop = "loop",
  videoVideoAutoplay = "autoplay",
  overlayOverlayVisibility = false,
  overlayOverlayOpacity = "opacity: 40%;",
  videoVideoMuted = "muted",
  imageImageLoading = "lazy",
  visualVisibility = true,
  overlayGradientBackground,
  position = "u-cover-absolute",
  imagePosition = "object-position: 50% 50%;",
  imageCdnImageVisibility = false,
  imageCdnImageUrl,
  imageCdnImageAltText,
}) {
  return visualVisibility ? (
    <_Component
      className={_utils.cx(_styles, "g_visual_wrap", "u-cover-absolute")}
      tag="div"
      slot=""
      style={imagePosition}
    >
      {overlayOverlayVisibility ? (
        <_Builtin.DOM
          className={_utils.cx(
            _styles,
            "g_visual_background",
            "u-cover-absolute"
          )}
          tag="div"
          slot=""
        />
      ) : null}
      {imageImageVisibility ? (
        <_Builtin.Image
          className={_utils.cx(_styles, "g_visual_img")}
          loading={imageImageLoading}
          width="auto"
          height="auto"
          src={imageImageFile}
        />
      ) : null}
      {imageCdnImageVisibility ? (
        <_Builtin.DOM
          className={_utils.cx(_styles, "g_visual_img")}
          tag="img"
          slot=""
          src={imageCdnImageUrl}
          alt={imageCdnImageAltText}
          loading={imageImageLoading}
          _class={position}
        />
      ) : null}
      {videoVideoVisibility ? (
        <_Builtin.DOM
          className={_utils.cx(_styles, "g_visual_video", "u-cover-absolute")}
          tag="video"
          slot=""
          src={videoVideoUrl}
          playsinline=" "
        />
      ) : null}
      {overlayOverlayVisibility ? (
        <_Builtin.DOM
          className={_utils.cx(_styles, "g_visual_overlay", "u-cover-absolute")}
          tag="div"
          slot=""
          style={overlayOverlayOpacity}
          _class={overlayGradientBackground}
        />
      ) : null}
    </_Component>
  ) : null;
}
