/**
 * E2 — Locator practice
 *
 * Copy this file to tests/ui/locators.spec.ts to run it.
 *
 * For each TODO, write the recommended Playwright locator.
 * Refer to docs/locators-cheatsheet.md if you get stuck.
 * Do NOT use XPath or CSS class selectors.
 */

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Locator practice — /users (list page)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/users`);
  });

  test('service-name nav link is visible', async ({ page }) => {
    // TODO: replace page.locator('TODO') with page.getByRole(...) using the correct role and name
    const link = page.locator('TODO — replace with page.getByRole()');
    await expect(link).toBeVisible();
  });

  test('Total Users stat displays a number', async ({ page }) => {
    // TODO: locate the user count element using getByTestId
    const count = page.getByTestId('TODO');
    await expect(count).toBeVisible();
    // Bonus: assert the text content is a number greater than 0
  });

  test('role filter radio buttons are present', async ({ page }) => {
    // TODO: replace page.locator('TODO') with page.getByRole('radio', { name: '...' })
    const adminRadio = page.locator('TODO — replace with page.getByRole()');
    await expect(adminRadio).toBeVisible();

    // TODO: locate the "User" radio button
    const userRadio = page.locator('TODO — replace with page.getByRole()');
    await expect(userRadio).toBeVisible();
  });

  test('Alice Johnson appears in the table', async ({ page }) => {
    // TODO: locate a table row that contains "alice@example.com"
    // Hint: page.locator('#users-tbody tr').filter({ hasText: '...' })
    const aliceRow = page.locator('TODO');
    await expect(aliceRow).toBeVisible();
  });

  test('Delete button exists for Alice Johnson', async ({ page }) => {
    // TODO: locate Alice's Delete button — scope to her row first
    const deleteBtn = page.locator('TODO');
    await expect(deleteBtn).toBeVisible();
  });

});

test.describe('Locator practice — /users/new (create form)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/users/new`);
  });

  test('all four form inputs are present via getByLabel', async ({ page }) => {
    // TODO: locate each input using getByLabel — fill in the label text
    await expect(page.getByLabel('TODO')).toBeVisible(); // First Name
    await expect(page.getByLabel('TODO')).toBeVisible(); // Last Name
    await expect(page.getByLabel('TODO')).toBeVisible(); // Email
    await expect(page.getByLabel('TODO')).toBeVisible(); // Password
  });

  test('Create User button is present and disabled initially', async ({ page }) => {
    // TODO: replace page.locator('TODO') with page.getByRole('button', { name: '...' })
    const btn = page.locator('TODO — replace with page.getByRole()');
    await expect(btn).toBeDisabled();
  });

});
