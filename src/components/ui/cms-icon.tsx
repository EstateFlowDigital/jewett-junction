import * as React from 'react';

/**
 * Renders a CMS-uploaded icon as a CSS mask so the admin-picked `color`
 * actually tints it. The default `<img>` tag treats the source as opaque
 * pixels — there's no DOM tree to retarget fill/stroke against — so the
 * color picker is decorative. Mask-image keeps the silhouette and paints
 * the requested color on top.
 *
 * Pass any single-color SVG (or PNG with transparency) as `url`. Multi-color
 * SVGs collapse to a single tint, which is exactly the intent here.
 */
export interface CmsIconProps {
  url: string;
  color?: string;
  size?: number;
  className?: string;
  ariaLabel?: string;
}

export function CmsIcon({
  url,
  color,
  size = 20,
  className = '',
  ariaLabel,
}: CmsIconProps) {
  // The mask color defaults to currentColor when no color is supplied, so
  // surrounding text-color utility classes still tint the icon naturally.
  const backgroundColor =
    color && /^#[0-9a-fA-F]{6}$/.test(color) ? color : 'currentColor';

  return (
    <span
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      className={`inline-block shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor,
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  );
}
