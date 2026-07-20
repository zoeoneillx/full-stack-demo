# Locators Cheatsheet

Maps every on-screen element in the User Directory app to the recommended Playwright locator.
Use this alongside E2 (locator rewriting) and E3 (Pick Locator).

---

## Navigation

| On-screen element | XPath (brittle — do not use) | Playwright (preferred) |
|---|---|---|
| "User Directory" service-name link | `//a[contains(@class,"service-name")]` | `page.getByRole('link', { name: 'User Directory' })` |
| "Home" nav link | `//nav//a[text()='Home']` | `page.getByRole('link', { name: 'Home' })` |

---

## User list page (`/` or `/users`)

| On-screen element | XPath (brittle — do not use) | Playwright (preferred) |
|---|---|---|
| Total Users count value | `//p[text()='Total Users']/following-sibling::p` | `page.getByTestId('user-count')` |
| "All" role filter radio | `//*[@id="role-all"]` | `page.getByRole('radio', { name: 'All' })` |
| "Admin" role filter radio | `//*[@id="role-admin"]` | `page.getByRole('radio', { name: 'Admin' })` |
| "Moderator" role filter radio | `//*[@id="role-moderator"]` | `page.getByRole('radio', { name: 'Moderator' })` |
| "User" role filter radio | `//*[@id="role-user"]` | `page.getByRole('radio', { name: 'User' })` |
| User table | `//table[@data-testid="user-table"]` | `page.getByTestId('user-table')` |
| All user rows | `//tbody[@id="users-tbody"]/tr` | `page.locator('#users-tbody tr')` |
| Row containing a specific email | `//td[text()='alice@example.com']/..` | `page.locator('#users-tbody tr').filter({ hasText: 'alice@example.com' })` |
| Delete button for a specific row | `//td[text()='alice@example.com']/..//button` | `page.locator('#users-tbody tr').filter({ hasText: 'alice@example.com' }).getByRole('button', { name: 'Delete' })` |
| Delete status message | `//p[@role="status"]` | `page.getByRole('status')` |
| "+ Add User" link | `//a[text()='+ Add User']` | `page.getByRole('link', { name: '+ Add User' })` |

---

## Create user form (`/users/new`)

| On-screen element | XPath (brittle — do not use) | Playwright (preferred) |
|---|---|---|
| Error summary box (client-side validation) | `//div[contains(@class,"error-summary")]` | `page.locator('.error-summary')` |
| Links inside the error summary | `//div[contains(@class,"error-summary")]//a` | `page.locator('.error-summary').getByRole('link')` |
| "First Name" input | `//*[@id="firstName-input"]` | `page.getByLabel('First Name')` |
| "Last Name" input | `//*[@id="lastName-input"]` | `page.getByLabel('Last Name')` |
| "Email" input | `//*[@id="email-input"]` | `page.getByLabel('Email')` |
| "Password" input | `//*[@id="password-input"]` | `page.getByLabel('Password')` |
| "Create User" submit button | `//button[@type="submit"]` | `page.getByRole('button', { name: 'Create User' })` |
| Server-side error alert (e.g. duplicate email) | `//*[@role="alert" and @id="form-alert"]` | `page.getByRole('alert')` *(visible only on error)* |

---

## Why avoid XPath?

| Problem | Example |
|---|---|
| Breaks on class rename | `contains(@class,"govuk-error-summary")` breaks if class changes to `error-box` |
| Hardcodes element ID | `//*[@id="f_radio_1-2"]` breaks if ID is auto-generated or renamed |
| Position-dependent | `//p[2]` breaks if a `<p>` is inserted above |
| Not readable | A new team member can't tell what the locator represents |

Prefer **role + accessible name** (`getByRole`) because it tests the same thing a screen reader would — if the locator breaks, the app is probably broken for keyboard users too.

---

## Quick reference: Playwright locator methods

```typescript
page.getByRole('button', { name: 'Create User' })   // semantic — preferred
page.getByLabel('Email')                             // form fields
page.getByText('Alice Johnson', { exact: true })     // visible text
page.getByTestId('user-count')                       // data-testid fallback
page.locator('#users-tbody tr').filter({ hasText: 'alice@example.com' })  // scoped
```
