import { expect, Then } from '../fixtures/fixture';

Then('the products dashboard should match the approved design', async ({ page, dashboardPage }) => {
  await expect(await dashboardPage.isLoaded()).toBe(true);
  await expect(page).toHaveScreenshot('products-dashboard.png', {
    fullPage: true,
    animations: 'disabled'
  });
});
