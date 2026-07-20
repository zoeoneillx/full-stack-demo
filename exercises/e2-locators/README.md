# E2 — Finding the Locator

> **Concept:** XPath locators are brittle. Playwright's semantic locators (`getByRole`, `getByLabel`, `getByText`) describe what the user sees — they're far more resilient to code changes.

## What you need
- App running: `npm start`
- Open `docs/locators-cheatsheet.md` alongside this exercise
- Starter spec: copy `locators.starter.spec.ts` → `tests/ui/locators.spec.ts`

## Background

The slides show XPath expressions like:

```
//p[text()='Total Projects']/following-sibling::p
//div[contains(@class,"govuk-error-summary")]//a
//*[@id="f_radio_1-2"]
//a[@class="govuk-header__link govuk-header__service-name"]
```

Each of these has a better equivalent. The cheatsheet maps every on-screen element in this app to its recommended Playwright locator.

## Steps

1. **Open the app** at `http://localhost:3000/users` in Chrome.

2. **Find each element** from the table below on screen:

   | What you see on screen | Find it with |
   |---|---|
   | The **"5"** next to "Total Users" | `page.getByTestId('user-count')` |
   | The **"Admin"** radio button | `page.getByRole('radio', { name: 'Admin' })` |
   | The **"User Directory"** nav link | `page.getByRole('link', { name: 'User Directory' })` |
   | Alice's **Delete** button | `page.locator('#users-tbody tr').filter({ hasText: 'alice@example.com' }).getByRole('button', { name: 'Delete' })` |

3. **Go to `/users/new`**, submit the form without filling any fields. The error summary appears.

4. Write a Playwright locator for one of the error links inside the error summary. Check the cheatsheet.

5. **Discussion:** why does `page.getByRole('radio', { name: 'Admin' })` beat `//*[@id="role-admin"]`?

## Done when
- [ ] You can explain why `getByRole` is preferred over XPath
- [ ] You've written a locator for every element in the cheatsheet without looking
