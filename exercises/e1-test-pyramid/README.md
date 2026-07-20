# E1 — Test Pyramid

> **Concept:** Not everything belongs in a browser test. Classify each scenario, then write the right type of test.

## What you need
- App running: `npm start`
- A new file: `tests/api/auth.spec.ts` (copy `auth.starter.spec.ts` from this folder)

## The scenarios — classify each before you look at the answers

| Scenario | Your answer | Correct answer |
|---|---|---|
| A. A wrong password returns 401 from `/api/auth` | ? | **API** |
| B. `formatDate('2026-07-20')` returns `'20 Jul 2026'` | ? | **Unit** |
| C. A user can complete the full add-user journey in the browser | ? | **UI / E2E** |
| D. `POST /api/users` with a missing field returns 400 | ? | **API** |
| E. The Create User button stays disabled until all fields are filled | ? | **UI** |

## Steps

1. Open `utils/dateFormat.test.js`. Run it:
   ```bash
   npm run test:unit
   ```
   All 4 tests should pass. This is a **unit** test — fast, no browser, no network.

2. Copy `auth.starter.spec.ts` into `tests/api/auth.spec.ts`.

3. Open the file. Complete the two TODOs inside it.

4. Run only the API tests:
   ```bash
   npx playwright test tests/api
   ```

5. Run only the UI tests:
   ```bash
   npx playwright test tests/ui
   ```

## Done when
- [ ] `npm run test:unit` — 4 passing
- [ ] `npx playwright test tests/api` — auth tests pass (401 on bad credentials, 200 on good)
- [ ] `npx playwright test tests/ui` — smoke test and button-disabled test pass
