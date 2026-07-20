'use strict';

/**
 * Unit tests for utils/dateFormat.js
 * Run with: npm run test:unit
 *
 * Uses Node's built-in test runner (no extra dependencies needed).
 * Demonstrates E1-B: a pure utility function is the right place for a *unit* test.
 */

const { test } = require('node:test');
const assert   = require('node:assert/strict');
const { formatDate } = require('./dateFormat.js');

test('formatDate turns 2026-07-20 into "20 Jul 2026"', () => {
  assert.equal(formatDate('2026-07-20'), '20 Jul 2026');
});

test('formatDate handles 1 January correctly', () => {
  assert.equal(formatDate('2024-01-01'), '1 Jan 2024');
});

test('formatDate handles 31 December correctly', () => {
  assert.equal(formatDate('2023-12-31'), '31 Dec 2023');
});

test('formatDate handles single-digit day without leading zero', () => {
  assert.equal(formatDate('2025-03-05'), '5 Mar 2025');
});
