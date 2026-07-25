import type { APIResponse } from '@playwright/test';
import { createBdd, test as base } from 'playwright-bdd';
import { ApiClient } from '../../api/clients/ApiClient';
import { CheckoutPage } from '../../ui/pages/CheckoutPage';
import { DashboardPage } from '../../ui/pages/DashboardPage';
import { LoginPage } from '../../ui/pages/LoginPage';

type ApiScenarioContext = {
  response?: APIResponse;
  body?: unknown;
};

type TestFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  checkoutPage: CheckoutPage;
  apiBaseUrl: string;
  apiClient: ApiClient;
  apiContext: ApiScenarioContext;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  apiBaseUrl: async ({}, use) => {
    await use(process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com');
  },
  apiClient: async ({ request, apiBaseUrl }, use) => {
    await use(new ApiClient(request, apiBaseUrl));
  },
  apiContext: async ({}, use) => {
    await use({});
  }
});

export const { Given, When, Then } = createBdd(test);

export { expect } from '@playwright/test';
