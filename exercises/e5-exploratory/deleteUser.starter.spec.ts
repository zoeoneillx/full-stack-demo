/**
 * E5 — Delete user starter
 *
 * Copy this file to tests/ui/deleteUser.spec.ts, then complete the TODOs.
 *
 * Useful locators:
 *   page.locator('#users-tbody tr').filter({ hasText: 'alice@example.com' })
 *   page.getByRole('status')   ← the green success message
 */

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.beforeEach(async ({ request }) => {
  // Reset to seed data before each test so deletes don't cascade
  await request.post(`${BASE_URL}/api/seed`);
});

test('deleting a user shows a confirmation message @smoke', async ({ page }) => {
  await page.goto(`${BASE_URL}/users`);

  // TODO: find Alice Johnson's row and click her Delete button
  // TODO: assert the status message contains her name and "deleted"
});

test('deleting a user removes the row from the table', async ({ page }) => {
  await page.goto(`${BASE_URL}/users`);

  // TODO: delete Alice Johnson
  // TODO: assert her row is no longer visible in the table
});

// TODO (stretch): assert the Total Users count decreases by 1 after deletion
