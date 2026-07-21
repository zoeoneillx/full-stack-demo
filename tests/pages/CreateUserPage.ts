import { type Page, type Locator } from '@playwright/test';

/**
 * Page Object Model for the Create User page (/users/new).
 *
 * TODO: Add the remaining locators and methods to complete this POM.
 * Hint: use page.getByLabel(), page.getByRole(), page.getByTestId()
 */
export class CreateUserPage {
  readonly page: Page;

  // TODO: add locators for the other fields and the submit button
  // ── Form fields ───────────────────────────────────────────────────────────
  readonly firstNameInput: Locator;
  readonly lastNameInput:  Locator;
  readonly emailInput:     Locator;
  readonly passwordInput:  Locator;

  // ── Actions ───────────────────────────────────────────────────────────────
  readonly submitButton: Locator;

  // ── Feedback ──────────────────────────────────────────────────────────────
  readonly formAlert:    Locator;
  readonly errorSummary: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.getByLabel('First Name');
    this.lastNameInput  = page.getByLabel('Last Name');
    this.emailInput     = page.getByLabel('Email');
    this.passwordInput  = page.getByLabel('Password');

    this.submitButton = page.getByRole('button', { name: 'Create User' });

    this.formAlert    = page.getByRole('alert').first();
    this.errorSummary = page.locator('#error-summary');

    // TODO: assign the remaining locators here
    // TODO: add any additional locators you want to assert error summary link behavior.
  }

  async goto(): Promise<void> {
    await this.page.goto('/users/new');
  }

  // TODO: add a fillForm() method that accepts user details and fills in all fields
  async fillForm(user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<void> {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
  }

  // TODO: add a submit() method that clicks the Create User button
  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  // TODO: add a getAlert() method that returns the alert element for error checking
  getAlert(): Locator {
    return this.formAlert;
  }

  // TODO: add helpers for partial form fills if you want per-field validation tests.
}
