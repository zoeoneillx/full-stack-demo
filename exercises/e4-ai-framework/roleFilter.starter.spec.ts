/**
 * E4 — Role filter starter
 *
 * Copy this file to tests/ui/roleFilter.spec.ts, then use GitHub Copilot
 * to complete the test bodies (see exercises/e4-ai-framework/README.md).
 */

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test('filtering by Admin role shows only Alice Johnson', async ({ page }) => {
  await page.goto(`${BASE_URL}/users`);

  // TODO: click the Admin radio button
  // TODO: wait for the table to update
  // TODO: assert Alice Johnson is visible
  // TODO: assert no other users are visible (hint: count the rows)
});

// TODO (stretch): add a test for the User role filter — expect 3 rows
