import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('GET /api/llm/ask', () => {
  test('returns 200 with the correct shape @smoke', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/llm/ask`);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('question');
    expect(body).toHaveProperty('response');
    expect(body).toHaveProperty('responseIndex');
    expect(body).toHaveProperty('totalVariants');
    expect(body).toHaveProperty('model');

    expect(typeof body.question).toBe('string');
    expect(typeof body.response).toBe('string');
    expect(typeof body.responseIndex).toBe('number');
    expect(typeof body.totalVariants).toBe('number');
    expect(typeof body.model).toBe('string');
  });

  test('question is always the expected prompt', async ({ request }) => {
    const { question } = await request.get(`${BASE_URL}/api/llm/ask`).then(r => r.json());
    expect(question).toBe('What is the capital of Ireland?');
  });

  test('response always mentions Dublin (case-insensitive)', async ({ request }) => {
    const { response } = await request.get(`${BASE_URL}/api/llm/ask`).then(r => r.json());
    expect(response.toLowerCase()).toContain('dublin');
  });

  test('responseIndex is in range and totalVariants is 15', async ({ request }) => {
    const { responseIndex, totalVariants } = await request.get(`${BASE_URL}/api/llm/ask`).then(r => r.json());

    expect(totalVariants).toBe(15);
    expect(responseIndex).toBeGreaterThanOrEqual(1);
    expect(responseIndex).toBeLessThanOrEqual(15);
  });

  test('wording varies across 10 calls', async ({ request }) => {
    const responses = await Promise.all(
      Array.from({ length: 10 }, () =>
        request.get(`${BASE_URL}/api/llm/ask`).then(r => r.json()).then(b => b.response)
      )
    );

    expect(new Set(responses).size).toBeGreaterThan(1);
  });

  test('stretch: response contains no blocked words', async ({ request }) => {
    const { response } = await request.get(`${BASE_URL}/api/llm/ask`).then(r => r.json());
    const blocked = ['hate', 'slur', 'kill', 'terrorist'];
    const lower = response.toLowerCase();

    for (const word of blocked) {
      expect(lower).not.toContain(word);
    }
  });

  test('stretch: response length is between 50 and 300 chars', async ({ request }) => {
    const { response } = await request.get(`${BASE_URL}/api/llm/ask`).then(r => r.json());
    expect(response.length).toBeGreaterThanOrEqual(50);
    expect(response.length).toBeLessThanOrEqual(300);
  });
});
