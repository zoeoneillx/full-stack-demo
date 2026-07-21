/**
 * E4 — Role filter starter
 *
 * Copy this file to tests/ui/roleFilter.spec.ts, then use GitHub Copilot
 * to complete the test bodies (see exercises/e4-ai-framework/README.md).
 */

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test('filtering by Admin role shows only Alice Johnson', async ({ page }) => {
  await page.request.post(`${BASE_URL}/api/seed`);
  await page.goto(`${BASE_URL}/users`);

  const rows = page.locator('[data-testid="user-table"] tbody tr');
  await expect(rows).toHaveCount(5);

  // TODO: click the Admin radio button
  await Promise.all([
    page.waitForResponse((res) =>
      res.url().includes('/api/users?role=admin') && res.request().method() === 'GET'
    ),
    page.getByRole('radio', { name: 'Admin' }).check(),
  ]);

  // TODO: wait for the table to update
  await expect(rows).toHaveCount(1);

  // TODO: assert Alice Johnson is visible
  const onlyRow = rows.first();
  await expect(onlyRow).toContainText('Alice');
  await expect(onlyRow).toContainText('Johnson');

  // TODO: assert no other users are visible (hint: count the rows)
  await expect(onlyRow).toContainText('alice@example.com');
  await expect(onlyRow).toContainText('admin');
});

// TODO (stretch): add a test for the User role filter — expect 3 rows
test("filtering by 'User' role shows exactly 3 rows", async ({ page }) => {
  await page.request.post(`${BASE_URL}/api/seed`);
  await page.goto(`${BASE_URL}/users`);

  const rows = page.locator('[data-testid="user-table"] tbody tr');
  await expect(rows).toHaveCount(5);

  await Promise.all([
    page.waitForResponse((res) =>
      res.url().includes('/api/users?role=user') && res.request().method() === 'GET'
    ),
    page.getByRole('radio', { name: 'User' }).check(),
  ]);

  await expect(rows).toHaveCount(3);
});
