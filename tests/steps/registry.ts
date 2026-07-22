type Keyword = 'Given' | 'When' | 'Then';

export type StepWorld = {
  baseUrl: string;
  memory: Record<string, string>;
  lastResponseStatus?: number;
  lastResponseBody?: unknown;
  collectedResponses?: string[];
};

export type StepHandler = (world: StepWorld, ...args: unknown[]) => Promise<void> | void;

export type StepDefinition = {
  keyword: Keyword;
  pattern: RegExp;
  run: StepHandler;
};

export const stepDefinitions: StepDefinition[] = [];

function register(keyword: Keyword) {
  return (pattern: RegExp, run: StepHandler): void => {
    stepDefinitions.push({ keyword, pattern, run });
  };
}

export const Given = register('Given');
export const When = register('When');
export const Then = register('Then');

export function createWorld(): StepWorld {
  return {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    memory: {},
  };
}

export function toRecord(table: unknown): Record<string, string> {
  if (!Array.isArray(table)) return {};

  const rows = table as unknown[];

  if (rows.length === 0) return {};

  if (Array.isArray(rows[0])) {
    const record: Record<string, string> = {};
    for (const row of rows as unknown[][]) {
      if (!Array.isArray(row) || row.length < 2) continue;
      const key = String(row[0]).trim();
      const value = String(row[1]).trim();
      if (key) record[key] = value;
    }
    return record;
  }

  const first = rows[0] as Record<string, unknown>;
  const record: Record<string, string> = {};
  for (const [k, v] of Object.entries(first)) {
    record[String(k)] = String(v);
  }
  return record;
}

export function toList(table: unknown): string[] {
  if (!Array.isArray(table)) return [];

  const rows = table as unknown[];
  if (rows.length === 0) return [];

  if (Array.isArray(rows[0])) {
    return (rows as unknown[][])
      .map((row) => (Array.isArray(row) ? String(row[0]).trim() : ''))
      .filter(Boolean);
  }

  return rows
    .map((row) => {
      if (typeof row === 'string') return row.trim();
      if (row && typeof row === 'object') {
        const firstValue = Object.values(row as Record<string, unknown>)[0];
        return String(firstValue ?? '').trim();
      }
      return '';
    })
    .filter(Boolean);
}

export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
