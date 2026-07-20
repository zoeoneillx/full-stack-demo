import type { QFlowConfig } from '@qflow/core';

const config: QFlowConfig = {
  runner: {
    type: 'playwright',
    configFile: 'playwright.config.ts',
  },

  llm: {
    provider: 'github-copilot',
    apiKey: process.env.GITHUB_TOKEN ?? '',
    model: 'claude-sonnet-4.6',
  },

  dashboard: {
    githubPages: true,
    branch: 'gh-pages',
  },

  flakiness: {
    quarantineThreshold: 0.2,
    historyDepth: 10,
  },

  smartSelection: {
    enabled: true,
  },
};

export default config;
