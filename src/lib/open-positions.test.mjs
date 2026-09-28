import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractOpenPositions, POSITION_FIELD } from './open-positions.ts';

const form = (options) => ({
  fieldGroups: [
    { fields: [{ name: 'email', options: [] }] },
    { fields: [{ name: POSITION_FIELD, options }] },
  ],
});

test('returns the labels the form shows, in display order', () => {
  const positions = extractOpenPositions(form([
    { label: 'Assistant Project Manager', value: 'Assistant Project Manager', displayOrder: 1 },
    { label: 'Assistant Superintendent', value: 'Assistant Superintendent', displayOrder: 0 },
  ]));
  assert.deepEqual(positions, ['Assistant Superintendent', 'Assistant Project Manager']);
});

test('uses the label, not the stored value', () => {
  const positions = extractOpenPositions(form([
    { label: 'Construction Superintendent - CT', value: 'Superintendent', displayOrder: 0 },
  ]));
  assert.deepEqual(positions, ['Construction Superintendent - CT']);
});

test('drops blank options', () => {
  const positions = extractOpenPositions(form([
    { label: '  ', value: '', displayOrder: 0 },
    { label: 'Estimator', value: 'Estimator', displayOrder: 1 },
  ]));
  assert.deepEqual(positions, ['Estimator']);
});

test('no roles turned on gives an empty list', () => {
  assert.deepEqual(extractOpenPositions(form([])), []);
});

test('missing position field gives null', () => {
  assert.equal(extractOpenPositions({ fieldGroups: [{ fields: [{ name: 'email' }] }] }), null);
  assert.equal(extractOpenPositions({}), null);
});
