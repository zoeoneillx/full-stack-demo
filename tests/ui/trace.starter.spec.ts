/**
 * E10 — Trace Viewer practice
 *
 * Copy this file to tests/ui/trace.spec.ts to run it.
 *
 * This file contains one intentionally FAILING test so you can practice
 * reading a trace. The passing tests are there to show what a good trace
 * looks like by comparison.
 *
 * Run with traces enabled:
 *   npx playwright test tests/ui/trace.spec.ts --trace on
 *
 * Open a trace:
 *   npx playwright show-trace test-results/<folder>/trace.zip
 *
 * In the trace viewer:
 *   - Step through each action using the timeline
 *   - Find the screenshot at the moment the assertion failed
 *   - Check the network panel to see the API calls that were made
 */

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test('users page loads with a heading @smoke', async ({ page }) => {
  await page.goto(`${BASE_URL}/users`);

  // TODO: assert the "User Management" heading is visible
});

test('Total Users count is greater than zero', async ({ page }) => {
  await page.goto(`${BASE_URL}/users`);

  // TODO: get the user count element and assert its text content is not "0"
});

test('INTENTIONAL FAILURE — inspect this trace to see what went wrong', async ({ page }) => {
  await page.goto(`${BASE_URL}/users`);

  // This assertion is deliberately wrong — the heading says "User Management"
  // but we're asserting something different. Change the expected value to fix it.
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('User Management');
});
