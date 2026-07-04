import { expect, Then } from '../fixtures/fixture';

Then('I should see the checkout Your Information title {string}', async ({ checkoutPage }, title: string) => {
  await expect(await checkoutPage.getTitle()).toBe(title);
});

Then(
  'I fill in the checkout information with first name {string}, last name {string}, and postal code {string}',
  async ({ checkoutPage }, firstName: string, lastName: string, postalCode: string) => {
    await checkoutPage.fillInformation(firstName, lastName, postalCode);
  }
);

Then('click on the continue button', async ({ checkoutPage }) => {
  await checkoutPage.continueCheckout();
});

Then('I should see the checkout Overview title {string}', async ({ checkoutPage }, title: string) => {
  await expect(await checkoutPage.getTitle()).toBe(title);
});

Then('I should see the product {string} in the overview', async ({ checkoutPage }, productName: string) => {
  await expect(await checkoutPage.isProductInOverview(productName)).toBe(true);
});

Then('click on the finish button', async ({ checkoutPage }) => {
  await checkoutPage.finish();
});

Then('I should see the checkout Complete title {string}', async ({ checkoutPage }, title: string) => {
  await expect(await checkoutPage.getTitle()).toBe(title);
});

Then('I should see the message {string}', async ({ checkoutPage }, message: string) => {
  const normalizeMessage = (text: string) => text.replace(/[!.]/g, '').trim().toUpperCase();

  await expect(normalizeMessage(await checkoutPage.getCompleteMessage())).toBe(normalizeMessage(message));
});

Then('I click on the back home button', async ({ checkoutPage }) => {
  await checkoutPage.backHome();
});
