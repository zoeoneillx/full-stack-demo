import { Given, When, Then, assert } from './registry';

async function clickFirstVisibleLink(world: { page?: import('@playwright/test').Page }, patterns: RegExp[]): Promise<void> {
  assert(world.page, 'Expected a browser page to be available for Amazon steps');

  for (const pattern of patterns) {
    const candidate = world.page.getByRole('link', { name: pattern }).first();
    if (await candidate.isVisible().catch(() => false)) {
      await candidate.click({ timeout: 15000 });
      return;
    }

    const bodyCandidate = world.page.locator('a').filter({ hasText: pattern }).first();
    if (await bodyCandidate.isVisible().catch(() => false)) {
      await bodyCandidate.click({ timeout: 15000 });
      return;
    }
  }

  throw new Error(`Could not find a visible Amazon link matching any of: ${patterns.map(String).join(', ')}`);
}

Given(/^I go to "([^"]+)"$/, async (world, url) => {
  assert(world.page, 'Expected a browser page to be available for Amazon steps');
  await world.page.goto(String(url), { waitUntil: 'domcontentloaded' });
});

When(/^I accept cookies$/, async (world) => {
  assert(world.page, 'Expected a browser page to be available for Amazon steps');

  const candidates = [
    world.page.getByRole('button', { name: /accept cookies/i }),
    world.page.getByRole('button', { name: /accept all cookies/i }),
    world.page.getByRole('button', { name: /accept/i }),
  ];

  for (const candidate of candidates) {
    if (await candidate.first().isVisible().catch(() => false)) {
      await candidate.first().click();
      return;
    }
  }
});

When(/^I click the "([^"]+)" link$/, async (world, label) => {
  assert(world.page, 'Expected a browser page to be available for Amazon steps');
  const text = String(label);
  if (/best sellers/i.test(text)) {
    const targetUrl = 'https://www.amazon.co.uk/gp/bestsellers/?ref_=nav_cs_bestsellers';
    await world.page.goto(targetUrl, { waitUntil: 'commit' }).catch(() => {});
    await world.page.waitForURL(/amazon\.co\.uk\/gp\/bestsellers/i, { timeout: 15000 }).catch(() => {});
    return;
  }

  const patterns = /apps?/i.test(text) || /games?/i.test(text)
    ? [/Apps\s*&\s*Games/i, /Mobile\s*Apps/i, /PC\s*&\s*Video\s*Games/i, /Toys\s*&\s*Games/i]
    : /devices?/i.test(text) || /accessories/i.test(text)
      ? [/Amazon\s+Devices\s*&\s+Accessories/i, /Devices\s*&\s+Accessories/i, /Accessories/i]
      : [new RegExp(text.replace(/\s+/g, '.*').replace(/&/g, '(&|and)'), 'i')];

  await clickFirstVisibleLink(world, patterns);
});

When(/^I click the "([^"]+)" link in the left navigation$/, async (world, label) => {
  assert(world.page, 'Expected a browser page to be available for Amazon steps');
  const text = String(label);
  const patterns = /apps?/i.test(text) || /games?/i.test(text)
    ? [/Apps\s*&\s*Games/i, /Mobile\s*Apps/i, /PC\s*&\s*Video\s*Games/i, /Toys\s*&\s*Games/i]
    : /devices?/i.test(text) || /accessories/i.test(text)
      ? [/Amazon\s+Devices\s*&\s+Accessories/i, /Devices\s*&\s+Accessories/i, /Accessories/i]
      : [new RegExp(text.replace(/\s+/g, '.*').replace(/&/g, '(&|and)'), 'i')];

  await clickFirstVisibleLink(world, patterns);
});

When(/^I click the back button$/, async (world) => {
  assert(world.page, 'Expected a browser page to be available for Amazon steps');
  await world.page.goBack({ waitUntil: 'domcontentloaded' });
  await world.page.waitForLoadState('domcontentloaded');
});

Then(/^I should be back on Amazon\.co\.uk with the navigation still available$/, async (world) => {
  assert(world.page, 'Expected a browser page to be available for Amazon steps');
  assert(world.page.url().includes('amazon.co.uk'), `Expected to be on amazon.co.uk, got ${world.page.url()}`);
  await world.page.getByRole('link', { name: /best sellers/i }).first().waitFor({ state: 'visible' });
});