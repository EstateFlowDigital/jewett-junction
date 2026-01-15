"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ElementVideo.module.css";

export function ElementVideo({
  as: _Component = _Builtin.Block,
  videoUrl = null,
  visibility = true,
}) {
  return visibility ? (
    <_Component className={_utils.cx(_styles, "video_wrap")} tag="div">
      <_Builtin.Video
        className={_utils.cx(_styles, "g_visual_video", "u-cover-absolute")}
        options={videoUrl}
      />
    </_Component>
  ) : null;
}
