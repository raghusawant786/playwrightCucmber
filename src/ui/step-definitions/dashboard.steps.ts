import { expect, Then } from '../../shared/fixtures/fixture';

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
