import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import type { ICustomWorld } from '../hooks/world';

Given('I am on the SauceDemo login page', async function (this: ICustomWorld) {
  if (!this.loginPage) {
    throw new Error('LoginPage was not initialized.');
  }

  await this.loginPage.goto();
});

When(
  'I login with username {string} and password {string}',
  async function (this: ICustomWorld, username: string, password: string) {
    if (!this.loginPage) {
      throw new Error('LoginPage was not initialized.');
    }

    await this.loginPage.login(username, password);
  }
);

Then('I should be redirected to the products dashboard', async function (this: ICustomWorld) {
  if (!this.dashboardPage) {
    throw new Error('DashboardPage was not initialized.');
  }

  await expect(await this.dashboardPage.isLoaded()).toBe(true);
});

Then('I should see the dashboard title {string}', async function (this: ICustomWorld, title: string) {
  if (!this.dashboardPage) {
    throw new Error('DashboardPage was not initialized.');
  }

  await expect(await this.dashboardPage.getTitle()).toBe(title);
});

Then('select {string} from the products list', async function (this: ICustomWorld, productName: string) {
  if (!this.dashboardPage) {
    throw new Error('DashboardPage was not initialized.');
  }

  await this.dashboardPage.selectProductFromList(productName);
});

Then('Click on Add to cart button', async function (this: ICustomWorld) {
  if (!this.dashboardPage) {
    throw new Error('DashboardPage was not initialized.');
  }

  await this.dashboardPage.addSelectedProductToCart();
});

Then('click on the shopping cart icon', async function (this: ICustomWorld) {
  if (!this.dashboardPage) {
    throw new Error('DashboardPage was not initialized.');
  }

  await this.dashboardPage.openShoppingCart();
});

Then('I should see the product {string} in the cart', async function (this: ICustomWorld, productName: string) {
  if (!this.dashboardPage) {
    throw new Error('DashboardPage was not initialized.');
  }

  await expect(await this.dashboardPage.isProductInCart(productName)).toBe(true);
});

Then('click on the checkout button', async function (this: ICustomWorld) {
  if (!this.dashboardPage) {
    throw new Error('DashboardPage was not initialized.');
  }

  await this.dashboardPage.checkout();
});

Then(
  'I should see login error message {string}',
  async function (this: ICustomWorld, errorMessage: string) {
    if (!this.loginPage) {
      throw new Error('LoginPage was not initialized.');
    }

    await expect(await this.loginPage.getErrorMessage()).toBe(errorMessage);
  }
);
