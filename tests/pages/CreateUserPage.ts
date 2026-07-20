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
  readonly firstNameInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByLabel('First Name');
    // TODO: assign the remaining locators here
  }

  async goto() {
    await this.page.goto('/users/new');
  }

  // TODO: add a fillForm() method that accepts user details and fills in all fields

  // TODO: add a submit() method that clicks the Create User button

  // TODO: add a getAlert() method that returns the alert element for error checking
}
