import { test } from 'node:test';
import assert from 'node:assert/strict';
import { candyJarStatus, cleanName, parseGuess, guessSlug } from './candy-jar.ts';

test('guessing opens Oct 24 and closes at the end of Oct 31, Eastern', () => {
  assert.equal(candyJarStatus(new Date('2026-10-23T23:59:00-04:00')), 'upcoming');
  assert.equal(candyJarStatus(new Date('2026-10-24T00:00:00-04:00')), 'open');
  assert.equal(candyJarStatus(new Date('2026-10-31T23:59:00-04:00')), 'open');
  assert.equal(candyJarStatus(new Date('2026-11-01T00:00:00-04:00')), 'closed');
});

test('names are trimmed and must look like a name', () => {
  assert.equal(cleanName('  Jane   Doe '), 'Jane Doe');
  assert.equal(cleanName('J'), null);
  assert.equal(cleanName(''), null);
  assert.equal(cleanName(undefined), null);
  assert.equal(cleanName('x'.repeat(81)), null);
});

test('guesses are whole numbers; commas are fine', () => {
  assert.equal(parseGuess('432'), 432);
  assert.equal(parseGuess(' 1,250 '), 1250);
  assert.equal(parseGuess(87), 87);
  assert.equal(parseGuess('0'), 0);
  assert.equal(parseGuess('12.5'), null);
  assert.equal(parseGuess('-3'), null);
  assert.equal(parseGuess('lots'), null);
  assert.equal(parseGuess('12345678'), null);
  assert.equal(parseGuess(''), null);
});

test('the same person always gets the same slug', () => {
  assert.equal(guessSlug("Jane O'Neil"), 'candy-jar-jane-o-neil');
  assert.equal(guessSlug(" jane  o'neil "), 'candy-jar-jane-o-neil');
  assert.equal(guessSlug('José Núñez'), 'candy-jar-jose-nunez');
  assert.equal(guessSlug('!!!'), null);
});
