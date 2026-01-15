import * as React from "react";
import * as Types from "./types";

declare function ElementVideo(props: {
  as?: React.ElementType;
  videoUrl?: Types.Embed.Video;
  visibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
