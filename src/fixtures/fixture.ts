import { createBdd, test as base } from 'playwright-bdd';
import { CheckoutPage } from '../pages/CheckoutPage';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';

type PageFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  }
});

export const { Given, When, Then } = createBdd(test);

export { expect } from '@playwright/test';
