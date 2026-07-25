import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { cucumberReporter, defineBddConfig } from 'playwright-bdd';

dotenv.config();

const baseURL = process.env.BASE_URL ?? 'https://www.saucedemo.com';
const testDir = defineBddConfig({
  features: ['src/ui/features/**/*.feature', 'src/api/features/**/*.feature'],
  steps: [
    'src/shared/fixtures/fixture.ts',
    'src/ui/step-definitions/**/*.ts',
    'src/api/step-definitions/**/*.ts'
  ]
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
    trace: 'on',
    screenshot: 'on',
    video: 'on'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
