# E4 — Build a Framework from Scratch with AI

> **Concept:** Use GitHub Copilot to scaffold a test, review what it generates, fix any issues, then commit.

## What you need
- App running: `npm start`
- GitHub Copilot active in VS Code

## Steps

1. Copy `roleFilter.starter.spec.ts` from this folder into `tests/ui/roleFilter.spec.ts`.

2. Open the file. It has one TODO test body. Prompt Copilot:
   > *"Write a Playwright test that navigates to /users, clicks the Admin radio button, and asserts only Alice Johnson appears in the table"*

3. Review what Copilot generates. Ask yourself:
   - Does it use `getByRole` or fragile XPath/CSS selectors?
   - Does it wait for the table to update before asserting?
   - Would the test catch a bug where the filter silently fails?

4. Fix any issues. Run the test:
   ```bash
   npx playwright test tests/ui/roleFilter.spec.ts --headed
   ```

5. Now ask Copilot to add a second test:
   > *"Add a test that filters by 'User' role and asserts there are exactly 3 rows"*

6. Run again. Commit both tests once green.

## Copilot prompting tips
- Be specific about the element names ("the Admin radio button", "the user table")
- Ask Copilot to use `getByRole` explicitly if it doesn't
- If a test is flaky, ask Copilot: *"Why might this test fail intermittently? How would you fix it?"*

## Done when
- [ ] `npx playwright test tests/ui/roleFilter.spec.ts` — both tests pass
- [ ] No raw CSS selectors or XPath in the test body
- [ ] Changes are committed
