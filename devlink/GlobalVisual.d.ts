import * as React from "react";
import * as Types from "./types";

declare function GlobalVisual(props: {
  as?: React.ElementType;
  imageImageVisibility?: Types.Visibility.VisibilityConditions;
  imageImageFile?: Types.Asset.Image;
  imageImageAltText?: Types.Basic.AltText;
  videoVideoVisibility?: Types.Visibility.VisibilityConditions;
  videoVideoUrl?: Types.Builtin.Text;
  videoVideoLoop?: Types.Builtin.Text;
  videoVideoAutoplay?: Types.Builtin.Text;
  overlayOverlayVisibility?: Types.Visibility.VisibilityConditions;
  overlayOverlayOpacity?: Types.Builtin.Text;
  videoVideoMuted?: Types.Builtin.Text;
  imageImageLoading?: Types.Builtin.Text;
  visualVisibility?: Types.Visibility.VisibilityConditions;
  overlayGradientBackground?: Types.Builtin.Text;
  position?: Types.Builtin.Text;
  imagePosition?: Types.Builtin.Text;
  imageCdnImageVisibility?: Types.Visibility.VisibilityConditions;
  imageCdnImageUrl?: Types.Builtin.Text;
  imageCdnImageAltText?: Types.Builtin.Text;
}): React.JSX.Element;
