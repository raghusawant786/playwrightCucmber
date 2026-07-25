import { expect, Then } from '../../shared/fixtures/fixture';

const screenshotOptions = {
  fullPage: true,
  animations: 'disabled' as const
};

Then('the products dashboard should match the approved design', async ({ page, dashboardPage }) => {
  await expect(await dashboardPage.isLoaded()).toBe(true);
  await expect(page).toHaveScreenshot('products-dashboard.png', screenshotOptions);
});

Then('the cart page should match the approved design', async ({ page }) => {
  await page.waitForURL(/.*cart\.html/);
  await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
  await expect(page).toHaveScreenshot('cart-page.png', screenshotOptions);
});

Then('the checkout information page should match the approved design', async ({ page }) => {
  await page.waitForURL(/.*checkout-step-one\.html/);
  await expect(page.locator('[data-test="checkout-info-container"]')).toBeVisible();
  await expect(page).toHaveScreenshot('checkout-information-page.png', screenshotOptions);
});

Then('the checkout overview page should match the approved design', async ({ page }) => {
  await page.waitForURL(/.*checkout-step-two\.html/);
  await expect(page.locator('[data-test="checkout-summary-container"]')).toBeVisible();
  await expect(page).toHaveScreenshot('checkout-overview-page.png', screenshotOptions);
});

Then('the order confirmation page should match the approved design', async ({ page }) => {
  await page.waitForURL(/.*checkout-complete\.html/);
  await expect(page.locator('[data-test="checkout-complete-container"]')).toBeVisible();
  await expect(page).toHaveScreenshot('order-confirmation-page.png', screenshotOptions);
});
