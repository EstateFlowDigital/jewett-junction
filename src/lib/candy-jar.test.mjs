import { test } from 'node:test';
import assert from 'node:assert/strict';
import { candyJarStatus, cleanNamePart, parseGuess, guessSlug } from './candy-jar.ts';

test('guessing opens Oct 28 and closes Oct 30 at noon, Eastern', () => {
  assert.equal(candyJarStatus(new Date('2026-10-27T23:59:00-04:00')), 'upcoming');
  assert.equal(candyJarStatus(new Date('2026-10-27T21:00:00-07:00')), 'open');
  assert.equal(candyJarStatus(new Date('2026-10-30T11:59:00-04:00')), 'open');
  assert.equal(candyJarStatus(new Date('2026-10-30T12:00:00-04:00')), 'closed');
});

test('first and last names are trimmed and must contain a letter', () => {
  assert.equal(cleanNamePart('  Mary   Ann '), 'Mary Ann');
  assert.equal(cleanNamePart("O'Neil"), "O'Neil");
  assert.equal(cleanNamePart('J'), 'J');
  assert.equal(cleanNamePart('Núñez'), 'Núñez');
  assert.equal(cleanNamePart(''), null);
  assert.equal(cleanNamePart('   '), null);
  assert.equal(cleanNamePart('123'), null);
  assert.equal(cleanNamePart(undefined), null);
  assert.equal(cleanNamePart('x'.repeat(41)), null);
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
