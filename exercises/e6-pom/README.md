# E6 — Page Object Model

> **Concept:** A POM centralises locators in one place. When the UI changes, you update the POM — not every test.

## What you need
- App running: `npm start`
- Open `tests/pages/UsersListPage.ts` — this is a **complete, working** reference POM
- Open `tests/pages/CreateUserPage.ts` — this is your **exercise** (skeleton provided)
- Starter spec: copy `pom.starter.spec.ts` → `tests/ui/pom.spec.ts`

## Read the reference first

Open `tests/pages/UsersListPage.ts`. Notice:
- Locators are declared as `readonly` class properties in the constructor
- Methods like `goto()`, `deleteUserByEmail()`, and `filterByRole()` hide the implementation
- Tests that use this POM read like plain English

## Steps

1. Open `tests/pages/CreateUserPage.ts`. It has `firstNameInput` and `goto()` already.

2. **Add the missing locators:**
   - `lastNameInput`
   - `emailInput`
   - `passwordInput`
   - `submitButton`
   - `formAlert` (the error alert for duplicate email etc.)
   - `errorSummary` (the validation error summary box)

3. **Implement the methods:**
   ```typescript
   async fillForm(user: { firstName: string; lastName: string; email: string; password: string }): Promise<void>
   async submit(): Promise<void>
   getAlert(): Locator
   ```

4. **Refactor one test** in `tests/ui/addUser.spec.ts` to use your POM:
   - Import `CreateUserPage`
   - Replace raw `page.getByLabel(...)` calls with POM method calls

5. Run the refactored test:
   ```bash
   npx playwright test tests/ui/addUser.spec.ts --headed
   ```

## Done when
- [ ] `CreateUserPage` has all locators and methods implemented
- [ ] At least one test uses the POM (no raw locators in the test body)
- [ ] `npx playwright test tests/ui` — all tests still pass
