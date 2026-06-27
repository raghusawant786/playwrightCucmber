import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { cucumberReporter, defineBddConfig } from 'playwright-bdd';

dotenv.config();

const baseURL = process.env.BASE_URL ?? 'https://www.saucedemo.com';
const testDir = defineBddConfig({
  features: 'src/features/**/*.feature',
  steps: ['src/fixtures/fixture.ts', 'src/step-definitions/**/*.ts']
});

export default defineConfig({
  testDir,
  timeout: 60_000,
  fullyParallel: true,
  retries: 0,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    cucumberReporter('html', {
      outputFile: 'reports/cucumber-report.html',
      externalAttachments: true
    })
  ],
  use: {
    baseURL,
    headless: process.env.HEADLESS !== 'false',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
