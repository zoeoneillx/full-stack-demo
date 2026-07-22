import { Given, When, Then, assert, toList, type StepWorld } from './registry';

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

When(/^I GET "([^"]+)"$/, async (world, path) => {
  await getJson(world, String(path));
});

Then(/^the response should include keys:$/, (world, table) => {
  const keys = toList(table);
  const body = world.lastResponseBody as Record<string, unknown> | undefined;
  assert(!!body, 'Expected response body to be present');
  for (const key of keys) {
    assert(Object.prototype.hasOwnProperty.call(body, key), `Expected key ${key} in response body`);
  }
});

Then(/^the question should equal "([^"]+)"$/, (world, question) => {
  const body = world.lastResponseBody as { question?: string } | undefined;
  assert(body?.question === String(question), `Expected question to equal ${String(question)}`);
});

Then(/^the response should contain "([^"]+)" case-insensitive$/, (world, word) => {
  const body = world.lastResponseBody as { response?: string } | undefined;
  const response = String(body?.response ?? '').toLowerCase();
  assert(response.includes(String(word).toLowerCase()), `Expected response to contain ${String(word)}`);
});

Then(/^responseIndex should be between (\d+) and (\d+)$/, (world, min, max) => {
  const body = world.lastResponseBody as { responseIndex?: number } | undefined;
  const index = Number(body?.responseIndex);
  const lower = Number(min);
  const upper = Number(max);
  assert(Number.isFinite(index), 'Expected responseIndex to be a number');
  assert(index >= lower && index <= upper, `Expected responseIndex in [${lower}, ${upper}], got ${index}`);
});

Then(/^totalVariants should be (\d+)$/, (world, expected) => {
  const body = world.lastResponseBody as { totalVariants?: number } | undefined;
  const actual = Number(body?.totalVariants);
  assert(actual === Number(expected), `Expected totalVariants ${Number(expected)}, got ${actual}`);
});

When(/^I call "([^"]+)" (\d+) times and collect responses$/, async (world, path, times) => {
  const total = Number(times);
  const responses: string[] = [];
  for (let i = 0; i < total; i += 1) {
    const res = await fetch(`${world.baseUrl}${String(path)}`);
    const body = (await res.json()) as { response?: string };
    responses.push(String(body.response ?? ''));
  }
  world.collectedResponses = responses;
});

Then(/^there should be more than 1 distinct response$/, (world) => {
  const responses = world.collectedResponses ?? [];
  assert(new Set(responses).size > 1, 'Expected more than one distinct LLM response');
});
