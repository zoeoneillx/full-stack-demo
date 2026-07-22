import { When, Then, assert, toRecord, type StepWorld } from './registry';

async function requestJson(world: StepWorld, path: string, init?: RequestInit): Promise<void> {
  const res = await fetch(`${world.baseUrl}${path}`, init);
  world.lastResponseStatus = res.status;
  try {
    world.lastResponseBody = await res.json();
  } catch {
    world.lastResponseBody = undefined;
  }
}

When(/^I PUT to "([^"]+)" with:$/, async (world, path, table) => {
  const payload = toRecord(table);
  await requestJson(world, String(path), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
});

Then(/^the response field "([^"]+)" should equal "([^"]+)"$/, (world, field, expected) => {
  const body = world.lastResponseBody as Record<string, unknown> | undefined;
  assert(!!body, 'Expected response body to be present');
  assert(String(body[String(field)]) === String(expected), `Expected response field ${String(field)} to equal ${String(expected)}`);
});
