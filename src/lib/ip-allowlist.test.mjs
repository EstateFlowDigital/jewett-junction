import { test } from 'node:test';
import assert from 'node:assert/strict';

function ipv4ToInt(ip) {
  const parts = ip.split('.');
  if (parts.length !== 4) return null;
  let result = 0;
  for (const part of parts) {
    const n = Number(part);
    if (!Number.isInteger(n) || n < 0 || n > 255) return null;
    result = (result << 8 >>> 0) + n;
  }
  return result >>> 0;
}

function matchesCidr(ip, cidr) {
  const [range, bitsStr] = cidr.split('/');
  const bits = bitsStr === undefined ? 32 : Number(bitsStr);
  if (!Number.isInteger(bits) || bits < 0 || bits > 32) return false;
  const ipInt = ipv4ToInt(ip);
  const rangeInt = ipv4ToInt(range);
  if (ipInt === null || rangeInt === null) return false;
  if (bits === 0) return true;
  const mask = (0xffffffff << (32 - bits)) >>> 0;
  return (ipInt & mask) === (rangeInt & mask);
}

function parseAllowlist(raw) {
  if (!raw) return [];
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
}

function isAllowedIp(ip, allowlist) {
  if (!ip) return false;
  for (const entry of allowlist) {
    if (matchesCidr(ip, entry)) return true;
  }
  return false;
}

test('matchesCidr single host /32', () => {
  assert.equal(matchesCidr('1.2.3.4', '1.2.3.4/32'), true);
  assert.equal(matchesCidr('1.2.3.5', '1.2.3.4/32'), false);
});

test('matchesCidr /24 range', () => {
  assert.equal(matchesCidr('10.0.0.7', '10.0.0.0/24'), true);
  assert.equal(matchesCidr('10.0.1.7', '10.0.0.0/24'), false);
});

test('matchesCidr /0 matches any valid ipv4', () => {
  assert.equal(matchesCidr('192.168.1.1', '0.0.0.0/0'), true);
});

test('matchesCidr rejects malformed inputs', () => {
  assert.equal(matchesCidr('not-an-ip', '10.0.0.0/24'), false);
  assert.equal(matchesCidr('1.2.3.4', '10.0.0.0/33'), false);
});

test('matchesCidr bare ip defaults to /32', () => {
  assert.equal(matchesCidr('1.2.3.4', '1.2.3.4'), true);
  assert.equal(matchesCidr('1.2.3.5', '1.2.3.4'), false);
});

test('parseAllowlist splits, trims, ignores empties', () => {
  assert.deepEqual(parseAllowlist('  10.0.0.0/8 , , 192.168.1.1 '), ['10.0.0.0/8', '192.168.1.1']);
  assert.deepEqual(parseAllowlist(undefined), []);
});

test('isAllowedIp short-circuits on null ip', () => {
  assert.equal(isAllowedIp(null, ['0.0.0.0/0']), false);
});

test('isAllowedIp matches any entry', () => {
  assert.equal(isAllowedIp('10.5.5.5', ['192.168.0.0/16', '10.0.0.0/8']), true);
  assert.equal(isAllowedIp('172.20.0.1', ['192.168.0.0/16', '10.0.0.0/8']), false);
});
