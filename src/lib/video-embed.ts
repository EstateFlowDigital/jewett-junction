// Turns the Vimeo or YouTube link someone pastes into the admin (any of the
// share, page or embed forms) into the player URL for an <iframe>, so the video
// plays inside Jewett Junction instead of sending people off to another tab.
// Anything else gives null and the page falls back to its image.
//
// No imports and type-only TypeScript, so video-embed.test.mjs can load this
// file directly under Node's type stripping.

export function videoEmbedUrl(
  raw: string | null | undefined,
  options: { autoplay?: boolean } = {},
): string | null {
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\./, '');
  const parts = url.pathname.split('/').filter(Boolean);

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    // vimeo.com/123, vimeo.com/123/abc12 (unlisted: the hash is the private
    // key), vimeo.com/channels/x/123, player.vimeo.com/video/123?h=abc12
    const idIndex = parts.findIndex((p) => /^\d+$/.test(p));
    if (idIndex === -1) return null;
    const next = parts[idIndex + 1] ?? '';
    const hash = url.searchParams.get('h') || (/^[0-9a-f]+$/i.test(next) ? next : null);
    // Hide Vimeo's title, byline and avatar overlays; don't track viewers.
    const params = new URLSearchParams({ title: '0', byline: '0', portrait: '0', dnt: '1' });
    if (hash) params.set('h', hash);
    // Browsers only allow autoplay with the sound off; viewers unmute in the player.
    if (options.autoplay) {
      params.set('autoplay', '1');
      params.set('muted', '1');
    }
    return `https://player.vimeo.com/video/${parts[idIndex]}?${params}`;
  }

  if (['youtube.com', 'm.youtube.com', 'youtu.be', 'youtube-nocookie.com'].includes(host)) {
    const id =
      host === 'youtu.be'
        ? parts[0]
        : url.searchParams.get('v') || (['embed', 'shorts', 'live'].includes(parts[0]) ? parts[1] : null);
    if (!id || !/^[\w-]{11}$/.test(id)) return null;
    // rel=0 keeps the end-screen suggestions to this channel's own videos.
    return `https://www.youtube-nocookie.com/embed/${id}?rel=0${options.autoplay ? '&autoplay=1&mute=1' : ''}`;
  }

  return null;
}

// True when rich text already contains a Vimeo or YouTube player, e.g. embed
// code pasted into an announcement body instead of the Video URL field. Pass
// the decoded HTML (decodeHtmlEntities), not the raw CMS string.
export function hasEmbeddedVideo(html: string | null | undefined): boolean {
  if (!html) return false;
  return /<iframe[^>]+src=["'][^"']*(player\.vimeo\.com|youtube\.com\/embed|youtube-nocookie\.com\/embed)/i.test(html);
}
