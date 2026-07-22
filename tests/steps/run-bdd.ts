import fs from 'fs';
import path from 'path';
import { createWorld, stepDefinitions } from './index';

type Step = {
  keyword: string;
  text: string;
  table?: string[][];
};

type Scenario = {
  name: string;
  isOutline: boolean;
  steps: Step[];
  examples: Record<string, string>[];
};

type ParsedFeature = {
  name: string;
  background: Step[];
  scenarios: Scenario[];
};

function parsePipeRow(line: string): string[] {
  return line
    .trim()
    .slice(1, -1)
    .split('|')
    .map((cell) => cell.trim());
}

function parseFeatureFile(content: string): ParsedFeature {
  const lines = content.split(/\r?\n/);
  let featureName = 'Unnamed Feature';
  const background: Step[] = [];
  const scenarios: Scenario[] = [];

  let section: 'none' | 'background' | 'scenario' | 'examples' = 'none';
  let currentScenario: Scenario | null = null;
  let lastStep: Step | null = null;
  let previousKeyword = '';

  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i];
    const trimmed = raw.trim();

    if (!trimmed || trimmed.startsWith('#')) continue;

    if (trimmed.startsWith('Feature:')) {
      featureName = trimmed.slice('Feature:'.length).trim();
      continue;
    }

    if (trimmed.startsWith('Background:')) {
      section = 'background';
      currentScenario = null;
      lastStep = null;
      previousKeyword = '';
      continue;
    }

    const scenarioMatch = trimmed.match(/^Scenario(?: Outline)?:\s*(.+)$/);
    if (scenarioMatch) {
      const isOutline = trimmed.startsWith('Scenario Outline:');
      currentScenario = {
        name: scenarioMatch[1].trim(),
        isOutline,
        steps: [],
        examples: [],
      };
      scenarios.push(currentScenario);
      section = 'scenario';
      lastStep = null;
      previousKeyword = '';
      continue;
    }

    if (trimmed.startsWith('Examples:')) {
      section = 'examples';
      lastStep = null;
      continue;
    }

    if (section === 'examples' && currentScenario && trimmed.startsWith('|')) {
      const header = parsePipeRow(trimmed);
      const rows: Record<string, string>[] = [];
      let j = i + 1;
      while (j < lines.length && lines[j].trim().startsWith('|')) {
        const values = parsePipeRow(lines[j].trim());
        const row: Record<string, string> = {};
        header.forEach((key, idx) => {
          row[key] = values[idx] ?? '';
        });
        rows.push(row);
        j += 1;
      }
      currentScenario.examples = rows;
      i = j - 1;
      continue;
    }

    if (trimmed.startsWith('|') && lastStep) {
      lastStep.table = lastStep.table ?? [];
      lastStep.table.push(parsePipeRow(trimmed));
      continue;
    }

    const stepMatch = trimmed.match(/^(Given|When|Then|And|But)\s+(.+)$/);
    if (stepMatch) {
      const keyword = stepMatch[1];
      const text = stepMatch[2];
      let effectiveKeyword = keyword;
      if ((keyword === 'And' || keyword === 'But') && previousKeyword) {
        effectiveKeyword = previousKeyword;
      }

      const step: Step = {
        keyword: effectiveKeyword,
        text,
      };

      if (section === 'background') {
        background.push(step);
      } else if (currentScenario) {
        currentScenario.steps.push(step);
      }

      lastStep = step;
      previousKeyword = effectiveKeyword;
    }
  }

  return {
    name: featureName,
    background,
    scenarios,
  };
}

function applyPlaceholders(text: string, values: Record<string, string>): string {
  return text.replace(/<([^>]+)>/g, (_full, key: string) => values[key] ?? `<${key}>`);
}

async function runStep(world: ReturnType<typeof createWorld>, step: Step): Promise<void> {
  for (const def of stepDefinitions) {
    const match = step.text.match(def.pattern);
    if (!match) continue;

    const args: unknown[] = match.slice(1);
    if (step.table) args.push(step.table);
    await def.run(world, ...args);
    return;
  }

  throw new Error(`No step definition found for: ${step.keyword} ${step.text}`);
}

async function ensureAppIsReachable(baseUrl: string): Promise<void> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${baseUrl}/health`, { signal: controller.signal });
    clearTimeout(timer);

    if (res.status !== 200) {
      throw new Error(`Health check returned ${res.status}`);
    }
  } catch {
    throw new Error(`App is not reachable at ${baseUrl}. Start the app first with: npm start`);
  }
}

async function runScenario(
  featureName: string,
  scenarioName: string,
  background: Step[],
  scenarioSteps: Step[]
): Promise<void> {
  const world = createWorld();

  for (const step of background) {
    await runStep(world, step);
  }

  for (const step of scenarioSteps) {
    await runStep(world, step);
  }

  process.stdout.write(`PASS ${featureName} :: ${scenarioName}\n`);
}

async function runFeatureFile(filePath: string): Promise<{ passed: number; failed: number }> {
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = parseFeatureFile(content);

  let passed = 0;
  let failed = 0;

  for (const scenario of parsed.scenarios) {
    if (scenario.isOutline && scenario.examples.length > 0) {
      for (let idx = 0; idx < scenario.examples.length; idx += 1) {
        const values = scenario.examples[idx];
        const name = `${scenario.name} [example ${idx + 1}]`;
        const steps = scenario.steps.map((s) => ({
          ...s,
          text: applyPlaceholders(s.text, values),
        }));

        try {
          await runScenario(parsed.name, name, parsed.background, steps);
          passed += 1;
        } catch (err) {
          failed += 1;
          process.stderr.write(`FAIL ${parsed.name} :: ${name}\n${String(err)}\n`);
        }
      }
      continue;
    }

    try {
      await runScenario(parsed.name, scenario.name, parsed.background, scenario.steps);
      passed += 1;
    } catch (err) {
      failed += 1;
      process.stderr.write(`FAIL ${parsed.name} :: ${scenario.name}\n${String(err)}\n`);
    }
  }

  return { passed, failed };
}

async function main(): Promise<void> {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  await ensureAppIsReachable(baseUrl);

  const featuresDir = path.resolve(process.cwd(), 'tests/features');
  const files = fs
    .readdirSync(featuresDir)
    .filter((f) => f.endsWith('.feature'))
    .sort()
    .map((f) => path.join(featuresDir, f));

  if (files.length === 0) {
    process.stdout.write('No feature files found in tests/features\n');
    return;
  }

  let totalPassed = 0;
  let totalFailed = 0;

  for (const file of files) {
    const result = await runFeatureFile(file);
    totalPassed += result.passed;
    totalFailed += result.failed;
  }

  process.stdout.write(`\nBDD summary: passed=${totalPassed}, failed=${totalFailed}\n`);

  if (totalFailed > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  process.stderr.write(`Fatal error running BDD: ${String(err)}\n`);
  process.exitCode = 1;
});
