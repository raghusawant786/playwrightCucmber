import { chromium, type Browser, type BrowserContext, type Page } from '@playwright/test';

const headless = process.env.HEADLESS === 'true';

export interface BrowserSession {
  browser: Browser;
  context: BrowserContext;
  page: Page;
}

export async function createBrowserSession(): Promise<BrowserSession> {
  const browser = await chromium.launch({
    headless
  });
  const context = await browser.newContext({
    baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
    recordVideo: {
      dir: 'reports/videos'
    }
  });
  const page = await context.newPage();

  return { browser, context, page };
}
