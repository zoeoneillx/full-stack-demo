# E8 — Break the App (The False-Green Lesson)

> **Concept:** A test that never goes red is worthless. This exercise proves your tests are actually checking something by intentionally breaking the app.

## What you need
- All Playwright tests currently passing: `npx playwright test`
- Starter spec: copy `breakApp.starter.spec.ts` → `tests/ui/breakApp.spec.ts`

## Steps

1. **Run the suite in its normal state** — confirm everything is green:
   ```bash
   npx playwright test --reporter=line
   ```

2. **Break the app** by starting it with `DEMO_BREAK=1`:
   ```bash
   # Stop your current server (Ctrl+C), then:
   DEMO_BREAK=1 npm start
   ```
   This replaces the **"Create User"** button label with **"Add User"** on all pages.

3. **Run the suite again:**
   ```bash
   npx playwright test --reporter=line
   ```
   You should see failures in tests that assert `getByRole('button', { name: 'Create User' })`.

4. **Open the trace** for a failing test:
   ```bash
   npx playwright test --trace on
   npx playwright show-trace test-results/<failing-test-folder>/trace.zip
   ```
   In the trace viewer, step through the test. You can see exactly what the DOM looked like when the assertion failed.

5. **Restore the app:**
   ```bash
   npm start   # (no DEMO_BREAK)
   ```
   Run the suite again — everything should go green.

## Discussion
- Which tests caught the break? Which didn't?
- If a test didn't catch it — was it actually testing the button label at all?
- What does this tell you about AI-generated tests that pass without being reviewed?

## Done when
- [ ] You've seen at least one test go red under `DEMO_BREAK=1`
- [ ] You've opened the trace and identified the exact failing assertion
- [ ] Tests are green again after restoring the app
