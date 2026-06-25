import {
  After,
  AfterAll,
  AfterStep,
  Before,
  BeforeAll,
  Status,
  type ITestCaseHookParameter,
  type ITestStepHookParameter
} from '@cucumber/cucumber';
import { chromium, type Browser } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { generateReports } from '../support/generateReports';
import type { ICustomWorld } from './world';

dotenv.config();

let browser: Browser;
const headless = process.env.HEADLESS === 'true';
const videoDir = path.resolve(process.cwd(), 'reports', 'videos');
const traceDir = path.resolve(process.cwd(), 'reports', 'traces');

function sanitizeScenarioName(name: string): string {
  return name.replace(/\s+/g, '-').replace(/[^\w.-]/g, '').toLowerCase();
}

BeforeAll(async function () {
  browser = await chromium.launch({
    headless
  });
});

Before(async function (this: ICustomWorld, scenario: ITestCaseHookParameter) {
  this.browser = browser;
  this.context = await browser.newContext({
    baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
    recordVideo: {
      dir: videoDir
    }
  });

  await this.context.tracing.start({
    title: scenario.pickle.name,
    screenshots: true,
    snapshots: true,
    sources: true
  });

  this.page = await this.context.newPage();

  this.loginPage = new LoginPage(this.page);
  this.dashboardPage = new DashboardPage(this.page);
});

AfterStep(async function (this: ICustomWorld, { result }: ITestStepHookParameter) {
  if (result?.status !== Status.FAILED || !this.page) {
    return;
  }

  fs.mkdirSync(path.resolve(process.cwd(), 'screenshots'), { recursive: true });

  const screenshot = await this.page.screenshot({
    fullPage: true,
    path: `screenshots/${Date.now()}-failed-step.png`
  });

  await this.attach(screenshot, 'image/png');
});

After(async function (this: ICustomWorld, scenario: ITestCaseHookParameter) {
  const scenarioName = sanitizeScenarioName(scenario.pickle.name);
  const tracePath = path.join(traceDir, `${scenarioName}.zip`);
  const relativeTracePath = path.relative(process.cwd(), tracePath);
  const video = this.page?.video();

  if (this.context) {
    try {
      fs.mkdirSync(traceDir, { recursive: true });
      await this.context.tracing.stop({ path: tracePath });
      await this.attach(
        `Playwright trace: ${relativeTracePath}\nView with: npx playwright show-trace ${relativeTracePath}`,
        'text/plain'
      );
    } catch (error) {
      console.warn(`Unable to stop Playwright trace for "${scenario.pickle.name}".`, error);
    }
  }

  await this.page?.close();
  await this.context?.close();

  if (video) {
    try {
      const videoPath = await video.path();
      const relativeVideoPath = path.relative(process.cwd(), videoPath);
      await this.attach(`Playwright video: ${relativeVideoPath}`, 'text/plain');
    } catch (error) {
      console.warn(`Unable to save Playwright video for "${scenario.pickle.name}".`, error);
    }
  }
});

AfterAll(async function () {
  await browser?.close();
  await generateReports();
});
