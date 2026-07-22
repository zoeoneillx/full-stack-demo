import { When, Then, assert, type StepWorld } from './registry';

async function requestJson(world: StepWorld, path: string): Promise<void> {
  const res = await fetch(`${world.baseUrl}${path}`);
  world.lastResponseStatus = res.status;
  try {
    world.lastResponseBody = await res.json();
  } catch {
    world.lastResponseBody = undefined;
  }
}

When(/^I GET "([^"]+)"$/, async (world, path) => {
  await requestJson(world, String(path));
});

Then(/^the response field "([^"]+)" should equal "([^"]+)"$/, (world, field, expected) => {
  const body = world.lastResponseBody as Record<string, unknown> | undefined;
  assert(!!body, 'Expected response body to be present');
  assert(String(body[String(field)]) === String(expected), `Expected ${String(field)} to equal ${String(expected)}`);
});

Then(/^the response array should contain (\d+) users$/, (world, count) => {
  const body = world.lastResponseBody as unknown;
  assert(Array.isArray(body), 'Expected response body to be an array');
  assert(body.length === Number(count), `Expected ${Number(count)} users, got ${body.length}`);
});

Then(/^the response array should include an email "([^"]+)"$/, (world, email) => {
  const body = world.lastResponseBody as Array<{ email?: string }> | undefined;
  assert(Array.isArray(body), 'Expected response body to be an array');
  assert(body.some((user) => user.email === String(email)), `Expected array to include ${String(email)}`);
});
