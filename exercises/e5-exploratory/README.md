# E5 — Exploratory Testing → Automate One Flow

> **Concept:** Good testers explore before they automate. Find an untested flow, understand it, then write the test.

## What you need
- App running: `npm start`
- A new test file in `tests/ui/` or `tests/api/`

## Explore first (5 minutes)

Open `http://localhost:3000/users` and try these manually:

| What to try | What to observe |
|---|---|
| Click a **Delete** button | A green status message appears, then fades. Row is gone. |
| Click the **Admin** radio | Table updates to show only Alice. Count changes. |
| Check the **Total Users** count | Does it update after adding or deleting? |
| Navigate to `/llm` | Click Generate Response several times — answer changes |
| Try `POST /api/auth` with wrong password | Returns 401 |

## Pick one flow and automate it

Choose from the flows below. Copy the corresponding starter spec from this folder.

| Flow | Starter file | Copy to |
|---|---|---|
| Delete a user | `deleteUser.starter.spec.ts` | `tests/ui/deleteUser.spec.ts` |
| Filter by role | See `exercises/e4-ai-framework/` | `tests/ui/roleFilter.spec.ts` |
| Auth — bad password | See `exercises/e1-test-pyramid/` | `tests/api/auth.spec.ts` |

## Steps

1. Copy your chosen starter to `tests/`.
2. Fill in the TODO test bodies.
3. Run with:
   ```bash
   npx playwright test tests/ui/deleteUser.spec.ts --headed
   ```
4. Make sure the test fails for the right reason if you break the app (try commenting out the delete call).

## Done when
- [ ] At least one new test passes for a flow not already covered
- [ ] The test would catch a real bug (verify by temporarily breaking the feature)
