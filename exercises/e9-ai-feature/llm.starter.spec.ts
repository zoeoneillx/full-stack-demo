/**
 * E9 — Testing the LLM Demo endpoint
 *
 * Copy this file to tests/api/llm.spec.ts to run it.
 *
 * The endpoint: GET /api/llm/ask
 * Response shape:
 *   {
 *     question:      string   // always "What is the capital of Ireland?"
 *     response:      string   // varies each call
 *     responseIndex: number   // 1–15
 *     totalVariants: number   // always 15
 *     model:         string   // "mock-llm-v1"
 *   }
 *
 * Rules:
 *   ✅ Assert on shape, key facts, and numeric ranges
 *   ❌ Do NOT assert on the exact wording of "response"
 *
 * Also see: tests/api/summary.spec.ts for the same pattern on /api/users/:id/summary
 */

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test('GET /api/llm/ask returns 200 with the correct shape @smoke', async ({ request }) => {
  const res = await request.get(`${BASE_URL}/api/llm/ask`);

  // TODO: assert status is 200
  // TODO: parse the body and assert it has: question, response, responseIndex, totalVariants, model
});

test('question is always "What is the capital of Ireland?"', async ({ request }) => {
  const { question } = await request.get(`${BASE_URL}/api/llm/ask`).then(r => r.json());

  // TODO: assert question equals the expected string exactly
});

test('response always mentions Dublin', async ({ request }) => {
  const { response } = await request.get(`${BASE_URL}/api/llm/ask`).then(r => r.json());

  // TODO: assert response contains "Dublin" (case-insensitive)
  // Hint: expect(response.toLowerCase()).toContain(...)
});

test('responseIndex is between 1 and totalVariants', async ({ request }) => {
  const { responseIndex, totalVariants } = await request.get(`${BASE_URL}/api/llm/ask`).then(r => r.json());

  // TODO: assert responseIndex >= 1
  // TODO: assert responseIndex <= totalVariants
  // TODO: assert totalVariants === 15
});

test('response wording varies across multiple calls', async ({ request }) => {
  // Call the endpoint 10 times and collect the responses
  const responses = await Promise.all(
    Array.from({ length: 10 }, () =>
      request.get(`${BASE_URL}/api/llm/ask`).then(r => r.json()).then(b => b.response)
    )
  );

  // TODO: assert that more than 1 distinct response was returned
  // Hint: new Set(responses).size > 1
});

// TODO (stretch): assert response length is between 50 and 300 characters
// TODO (stretch): assert response does not contain any offensive words
