import { test } from 'node:test';
import assert from 'node:assert/strict';
import { videoEmbedUrl, hasEmbeddedVideo } from './video-embed.ts';

const VIMEO = 'https://player.vimeo.com/video/123456789?title=0&byline=0&portrait=0&dnt=1';

test('Vimeo page and share links', () => {
  assert.equal(videoEmbedUrl('https://vimeo.com/123456789'), VIMEO);
  assert.equal(videoEmbedUrl('https://www.vimeo.com/123456789'), VIMEO);
  assert.equal(videoEmbedUrl('  https://vimeo.com/channels/staffpicks/123456789  '), VIMEO);
});

test('Vimeo unlisted links keep their private hash', () => {
  assert.equal(videoEmbedUrl('https://vimeo.com/123456789/abc12def34'), `${VIMEO}&h=abc12def34`);
  assert.equal(videoEmbedUrl('https://player.vimeo.com/video/123456789?h=abc12def34'), `${VIMEO}&h=abc12def34`);
});

test('Vimeo embed links are normalised', () => {
  assert.equal(videoEmbedUrl('https://player.vimeo.com/video/123456789?autoplay=1'), VIMEO);
});

test('YouTube watch, short, share and embed links', () => {
  const yt = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0';
  assert.equal(videoEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s'), yt);
  assert.equal(videoEmbedUrl('https://youtu.be/dQw4w9WgXcQ?si=abc'), yt);
  assert.equal(videoEmbedUrl('https://www.youtube.com/embed/dQw4w9WgXcQ'), yt);
  assert.equal(videoEmbedUrl('https://youtube.com/shorts/dQw4w9WgXcQ'), yt);
});

test('anything else falls back to the image', () => {
  assert.equal(videoEmbedUrl(''), null);
  assert.equal(videoEmbedUrl(undefined), null);
  assert.equal(videoEmbedUrl('not a url'), null);
  assert.equal(videoEmbedUrl('https://vimeo.com/showcase'), null);
  assert.equal(videoEmbedUrl('https://www.youtube.com/watch?v=short'), null);
  assert.equal(videoEmbedUrl('https://example.com/video/123456789'), null);
});

test('autoplay starts muted, the only way browsers allow it', () => {
  assert.equal(videoEmbedUrl('https://vimeo.com/123456789', { autoplay: true }), `${VIMEO}&autoplay=1&muted=1`);
  assert.equal(
    videoEmbedUrl('https://youtu.be/dQw4w9WgXcQ', { autoplay: true }),
    'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&autoplay=1&mute=1',
  );
});

test('spots a Vimeo or YouTube player pasted into rich text', () => {
  // Vimeo's own embed code, as Hailley pasted it into the Business Update body
  const vimeo = '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1233779126?badge=0&amp;autoplay=1&amp;muted=1" frameborder="0"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>';
  assert.equal(hasEmbeddedVideo(vimeo), true);
  assert.equal(hasEmbeddedVideo('<iframe width="560" src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>'), true);
  assert.equal(hasEmbeddedVideo('<p>Watch on <a href="https://vimeo.com/123">Vimeo</a></p>'), false);
  assert.equal(hasEmbeddedVideo('<iframe src="https://forms.hubspot.com/x"></iframe>'), false);
  assert.equal(hasEmbeddedVideo(undefined), false);
});
