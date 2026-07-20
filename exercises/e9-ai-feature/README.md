# E9 — Testing a Non-Deterministic (AI) Feature

> **Concept:** AI responses vary — you can't assert on exact text. Assert on shape, key facts, and behaviour instead.

## What you need
- App running: `npm start`
- Open `tests/api/summary.spec.ts` — starter tests are already written
- Open the LLM Demo tab: `http://localhost:3000/llm`
- Starter spec for the LLM endpoint: copy `llm.starter.spec.ts` → `tests/api/llm.spec.ts`

## Part 1 — Explore the LLM Demo in the browser

1. Go to `http://localhost:3000/llm`.
2. Click **Generate Response** 5 times. Notice:
   - The question never changes: *"What is the capital of Ireland?"*
   - The answer changes every time
   - The facts are always correct (it's always Dublin)
3. Open DevTools → Network. Watch the `GET /api/llm/ask` request. Look at the JSON response.

## Part 2 — Run the existing summary API tests

```bash
npx playwright test tests/api/summary.spec.ts --reporter=line
```

All 6 tests should pass. Open the file and read each test. Notice:
- ✅ Tests assert on **shape**: `summary` is a string, `keyFacts` is an array
- ✅ Tests assert on **key facts**: name, email, role are always present
- ✅ One test asserts the wording **varies** across calls
- ❌ No test hardcodes an exact sentence

## Part 3 — Write your own tests for the LLM Demo endpoint

The `/api/llm/ask` endpoint returns:
```json
{
  "question": "What is the capital of Ireland?",
  "response": "...",
  "responseIndex": 3,
  "totalVariants": 15,
  "model": "mock-llm-v1"
}
```

Write tests for it in a new file `tests/api/llm.spec.ts`:
- Assert the shape is correct
- Assert `question` is always `"What is the capital of Ireland?"`
- Assert `response` always contains the word `"Dublin"` (case-insensitive)
- Assert `responseIndex` is between 1 and 15
- Assert `totalVariants` is 15
- Assert the wording varies across 10 calls

## Stretch goals
- Assert the response contains no offensive words (build a blocklist)
- Assert `response` length is between 50 and 300 characters
- LLM-as-judge: pass the response to a second model, ask *"Is this a correct answer about the capital of Ireland?"*, assert the score is high

## Done when
- [ ] `npx playwright test tests/api/summary.spec.ts` — all 6 pass
- [ ] Your new `tests/api/llm.spec.ts` tests pass
- [ ] No test asserts on the exact wording of any response
