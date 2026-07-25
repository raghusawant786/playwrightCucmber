import { expect, Given, Then, When } from '../../shared/fixtures/fixture';

Given('I am on the SauceDemo login page', async ({ loginPage }) => {
  await loginPage.goto();
});

When(
  'I login with username {string} and password {string}',
  async ({ loginPage }, username: string, password: string) => {
    await loginPage.login(username, password);
  }
);

Then(
  'I should see login error message {string}',
  async ({ loginPage }, errorMessage: string) => {
    await expect(await loginPage.getErrorMessage()).toBe(errorMessage);
  }
);
