/**
 * E7 — Test independence starter
 *
 * Copy this file to tests/ui/independent.spec.ts, then complete the TODOs.
 * NOTE: import paths below are written for tests/ui/ — TypeScript errors
 *       in the exercises/ folder are expected and resolve once copied.
 *
 * Notice: no afterEach cleanup — the fixture handles it automatically.
 */

import { test, expect } from '../fixtures/users.fixture'; // resolves after copying to tests/ui/

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test('created user appears in the list @smoke', async ({ page, createdUser }) => {
  // createdUser is a unique user created just for this test run
  await page.goto(`${BASE_URL}/users`);

  // TODO: assert createdUser.firstName is visible in the table
  // TODO: assert createdUser.email is visible in the table
});

test('created user can be deleted', async ({ page, createdUser }) => {
  await page.goto(`${BASE_URL}/users`);

  // TODO: find createdUser's row and click Delete
  // TODO: assert the status message confirms the deletion
  // TODO: assert createdUser's row is no longer in the table
});
