import { type Page, type Locator } from '@playwright/test';

/**
 * Page Object Model for the Users List page (/ or /users).
 *
 * This is a COMPLETE reference example — use the pattern here to build your
 * own CreateUserPage.ts.
 *
 * Suggested folder layout:
 *   tests/
 *     pages/
 *       UsersListPage.ts   ← this file (reference)
 *       CreateUserPage.ts  ← your exercise (starter provided)
 *     fixtures/
 *       users.fixture.ts
 *     ui/
 *       addUser.spec.ts
 *     api/
 *       addUser.spec.ts
 *       summary.spec.ts
 */
export class UsersListPage {
  readonly page: Page;

  // ── Nav ──────────────────────────────────────────────────────────────────
  readonly serviceNameLink: Locator;

  // ── Stats ─────────────────────────────────────────────────────────────────
  readonly userCount: Locator;

  // ── Role filter radios ─────────────────────────────────────────────────────
  readonly filterAll:       Locator;
  readonly filterAdmin:     Locator;
  readonly filterModerator: Locator;
  readonly filterUser:      Locator;

  // ── Table ─────────────────────────────────────────────────────────────────
  readonly userTable:     Locator;
  readonly userTableRows: Locator;

  // ── Misc ──────────────────────────────────────────────────────────────────
  readonly statusMessage: Locator;
  readonly addUserLink:   Locator;

  constructor(page: Page) {
    this.page = page;

    this.serviceNameLink = page.getByRole('link', { name: 'User Directory' });
    this.userCount       = page.getByTestId('user-count');

    this.filterAll       = page.getByRole('radio', { name: 'All' });
    this.filterAdmin     = page.getByRole('radio', { name: 'Admin' });
    this.filterModerator = page.getByRole('radio', { name: 'Moderator' });
    this.filterUser      = page.getByRole('radio', { name: 'User' });

    this.userTable     = page.getByTestId('user-table');
    this.userTableRows = page.locator('#users-tbody tr');
    this.statusMessage = page.getByRole('status');
    this.addUserLink   = page.getByRole('link', { name: '+ Add User' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/users');
  }

  /** Returns the table row that contains the given email address. */
  getUserRowByEmail(email: string): Locator {
    return this.page.locator('#users-tbody tr').filter({ hasText: email });
  }

  /** Clicks Delete on the row for the given email and waits for the status message. */
  async deleteUserByEmail(email: string): Promise<void> {
    await this.getUserRowByEmail(email).getByRole('button', { name: 'Delete' }).click();
  }

  /** Selects one of the role filter radio buttons. */
  async filterByRole(role: 'all' | 'admin' | 'moderator' | 'user'): Promise<void> {
    const map: Record<string, Locator> = {
      all:       this.filterAll,
      admin:     this.filterAdmin,
      moderator: this.filterModerator,
      user:      this.filterUser,
    };
    await map[role].click();
  }
}
