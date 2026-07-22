import { Given, When, Then, assert, toRecord, type StepWorld } from './registry';

async function getJson(world: StepWorld, path: string, init?: RequestInit): Promise<void> {
  const res = await fetch(`${world.baseUrl}${path}`, init);
  world.lastResponseStatus = res.status;
  try {
    world.lastResponseBody = await res.json();
  } catch {
    world.lastResponseBody = undefined;
  }
}

Given(/^the User Directory app is running$/, async (world) => {
  await getJson(world, '/health');
  assert(world.lastResponseStatus === 200, 'Expected /health to return 200');
});

Given(/^the database is reset to seed data$/, async (world) => {
  await getJson(world, '/api/seed', { method: 'POST' });
  assert(world.lastResponseStatus === 200, 'Expected /api/seed to return 200');
});

When(/^I POST to "([^"]+)" with:$/, async (world, path, table) => {
  const payload = toRecord(table);
  await getJson(world, String(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
});

Then(/^the response status should be (\d+)$/, (world, status) => {
  const expected = Number(status);
  assert(world.lastResponseStatus === expected, `Expected status ${expected}, got ${world.lastResponseStatus}`);
});

Then(/^the response should include "([^"]+)"$/, (world, key) => {
  const body = world.lastResponseBody as Record<string, unknown> | undefined;
  assert(body && Object.prototype.hasOwnProperty.call(body, String(key)), `Expected response to include key ${String(key)}`);
});

Then(/^the response user email should be "([^"]+)"$/, (world, email) => {
  const body = world.lastResponseBody as { user?: { email?: string } } | undefined;
  assert(body?.user?.email === String(email), `Expected user.email to be ${String(email)}`);
});

Then(/^the response error should contain "([^"]+)"$/, (world, text) => {
  const body = world.lastResponseBody as { error?: string; message?: string } | undefined;
  const message = String(body?.error ?? body?.message ?? '');
  assert(message.toLowerCase().includes(String(text).toLowerCase()), `Expected error message to contain ${String(text)}`);
});
