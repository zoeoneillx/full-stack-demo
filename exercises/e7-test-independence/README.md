# E7 — Complete the Suite (Test Independence)

> **Concept:** Each test must be able to run in any order, in parallel, and in isolation. Tests that share state are a ticking time bomb.

## What you need
- App running: `npm start`
- `tests/fixtures/users.fixture.ts` — already written for you

## The problem with the current suite

Open `tests/ui/addUser.spec.ts`. Notice:

```typescript
const testUser = {
  email: `jane.doe+${Date.now()}@example.com`,  // set ONCE when the file loads
  ...
};
```

If two tests run in parallel and both create `testUser`, or if `afterEach` cleanup runs before another test is done, tests can interfere. Also: `afterEach` cleanup only runs on success — a crash leaves dirty data.

## Fix option 1 — use the `createdUser` fixture

The fixture in `tests/fixtures/users.fixture.ts` creates a **unique** user before each test and **always** cleans up (even on failure).

Copy `independent.starter.spec.ts` from this folder to `tests/ui/independent.spec.ts` and complete the TODOs.

## Fix option 2 — seed before each test

```typescript
import { test, expect } from '../fixtures/users.fixture';

test.beforeEach(async ({ seedDatabase }) => {
  // resets to 5-user state before every test
});
```

## Steps

1. Copy `independent.starter.spec.ts` to `tests/ui/independent.spec.ts`.
2. Complete the two TODO test bodies using the `createdUser` fixture.
3. Run with parallel workers to prove isolation:
   ```bash
   npx playwright test tests/ui/independent.spec.ts --workers=4
   ```

## Done when
- [ ] Tests pass with `--workers=4` (parallel)
- [ ] No `afterEach` cleanup block needed — the fixture handles it
- [ ] Deleting the created user in one test doesn't affect the other
