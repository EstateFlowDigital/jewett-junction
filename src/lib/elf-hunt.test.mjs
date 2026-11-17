import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  elfHuntStatus,
  elfWeekLabel,
  cleanName,
  isUploadedPhotoUrl,
  easternTimestamp,
} from './elf-hunt.ts';

test('the hunt runs Monday Nov 30 through Wednesday Dec 23, Eastern', () => {
  assert.equal(elfHuntStatus(new Date('2026-11-30T04:59:59Z')), 'upcoming'); // 11:59 PM Nov 29 Eastern
  assert.equal(elfHuntStatus(new Date('2026-11-30T05:00:00Z')), 'open');
  assert.equal(elfHuntStatus(new Date('2026-12-24T04:59:59Z')), 'open'); // 11:59 PM Dec 23 Eastern
  assert.equal(elfHuntStatus(new Date('2026-12-24T05:00:00Z')), 'closed');
});

test('photos are filed under the Monday that starts their week, Eastern', () => {
  assert.equal(elfWeekLabel(new Date('2026-11-30T05:00:00Z')), 'Nov 30');
  assert.equal(elfWeekLabel(new Date('2026-12-07T04:30:00Z')), 'Nov 30'); // 11:30 PM Sunday Dec 6 Eastern
  assert.equal(elfWeekLabel(new Date('2026-12-07T05:00:00Z')), 'Dec 7');
  assert.equal(elfWeekLabel(new Date('2026-12-11T18:00:00Z')), 'Dec 7');
  assert.equal(elfWeekLabel(new Date('2026-12-23T22:00:00Z')), 'Dec 21');
});

test('names are trimmed and need a letter', () => {
  assert.equal(cleanName('  Jane   Doe '), 'Jane Doe');
  assert.equal(cleanName('   '), null);
  assert.equal(cleanName('1234'), null);
  assert.equal(cleanName('x'.repeat(81)), null);
});

test('only photos stored in the site asset library are accepted', () => {
  assert.equal(isUploadedPhotoUrl('https://cdn.prod.website-files.com/67a4/abc_elf-hunt.jpg'), true);
  assert.equal(isUploadedPhotoUrl('https://example.com/elf.jpg'), false);
  assert.equal(isUploadedPhotoUrl('https://cdn.prod.website-files.com/a"onerror=x'), false);
  assert.equal(isUploadedPhotoUrl(undefined), false);
});

test('timestamps are Eastern, to the second', () => {
  assert.match(easternTimestamp(new Date('2026-12-07T14:03:09Z')), /Mon, Dec 7.*9:03:09\s?AM/);
});
