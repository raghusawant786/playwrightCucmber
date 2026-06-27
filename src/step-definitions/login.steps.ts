import { expect, Given, Then, When } from '../fixtures/fixture';

Given('I am on the SauceDemo login page', async ({ loginPage }) => {
  await loginPage.goto();
});

When(
  'I login with username {string} and password {string}',
  async ({ loginPage }, username: string, password: string) => {
    await loginPage.login(username, password);
  }
);

Then('I should be redirected to the products dashboard', async ({ dashboardPage }) => {
  await expect(await dashboardPage.isLoaded()).toBe(true);
});

Then('I should see the dashboard title {string}', async ({ dashboardPage }, title: string) => {
  await expect(await dashboardPage.getTitle()).toBe(title);
});

Then('select {string} from the products list', async ({ dashboardPage }, productName: string) => {
  await dashboardPage.selectProductFromList(productName);
});

Then('Click on Add to cart button', async ({ dashboardPage }) => {
  await dashboardPage.addSelectedProductToCart();
});

Then('click on the shopping cart icon', async ({ dashboardPage }) => {
  await dashboardPage.openShoppingCart();
});

Then('I should see the product {string} in the cart', async ({ dashboardPage }, productName: string) => {
  await expect(await dashboardPage.isProductInCart(productName)).toBe(true);
});

Then('click on the checkout button', async ({ dashboardPage }) => {
  await dashboardPage.checkout();
});

Then(
  'I should see login error message {string}',
  async ({ loginPage }, errorMessage: string) => {
    await expect(await loginPage.getErrorMessage()).toBe(errorMessage);
  }
);
