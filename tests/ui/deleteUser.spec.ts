import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.beforeEach(async ({ request }) => {
	// Reset to seed data before each test so deletes don't cascade.
	await request.post(`${BASE_URL}/api/seed`);
});

test('deleting a user shows a confirmation message @smoke', async ({ page }) => {
	await page.goto(`${BASE_URL}/users`);

	const aliceRow = page.locator('#users-tbody tr').filter({ hasText: 'alice@example.com' });
	await aliceRow.getByRole('button', { name: 'Delete' }).click();

	await expect(page.getByRole('status')).toContainText('Alice Johnson');
	await expect(page.getByRole('status')).toContainText('deleted');
});

test('deleting a user removes the row from the table', async ({ page }) => {
	await page.goto(`${BASE_URL}/users`);

	const aliceRow = page.locator('#users-tbody tr').filter({ hasText: 'alice@example.com' });
	await aliceRow.getByRole('button', { name: 'Delete' }).click();

	await expect(aliceRow).toHaveCount(0);
});

test('deleting a user decreases the Total Users count by 1', async ({ page }) => {
	await page.goto(`${BASE_URL}/users`);

	const countEl = page.getByTestId('user-count');
	const beforeCount = Number((await countEl.textContent())?.trim());

	const aliceRow = page.locator('#users-tbody tr').filter({ hasText: 'alice@example.com' });
	await aliceRow.getByRole('button', { name: 'Delete' }).click();

	await expect(countEl).toHaveText(String(beforeCount - 1));
});
