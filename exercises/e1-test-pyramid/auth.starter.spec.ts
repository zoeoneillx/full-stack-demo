/**
 * E1-A — Auth endpoint returns 401 on bad credentials
 *
 * Copy this file to tests/api/auth.spec.ts to run it.
 *
 * Demo credentials for seeded users:
 *   email:    alice@example.com  (or any seeded user)
 *   password: password123
 */

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test('POST /api/auth returns 401 for a wrong password @smoke', async ({ request }) => {
  const res = await request.post(`${BASE_URL}/api/auth`, {
    data: { email: 'alice@example.com', password: 'wrongpassword' },
  });

  // TODO: assert the status code is 401
  // TODO: assert the response body has an "error" property
});

test('POST /api/auth returns 200 and a token for valid credentials', async ({ request }) => {
  const res = await request.post(`${BASE_URL}/api/auth`, {
    data: { email: 'alice@example.com', password: 'password123' },
  });

  // TODO: assert the status code is 200
  // TODO: assert the response body has a "token" property
  // TODO: assert the response body has a "user" object containing the email
});

test('POST /api/auth returns 401 for an unknown email', async ({ request }) => {
  const res = await request.post(`${BASE_URL}/api/auth`, {
    data: { email: 'nobody@example.com', password: 'password123' },
  });

  expect(res.status()).toBe(401);
});
