import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly overviewList: Locator;
  private readonly finishButton: Locator;
  private readonly completeMessage: Locator;
  private readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = this.page.locator('[data-test="title"]');
    this.firstNameInput = this.page.locator('[data-test="firstName"]');
    this.lastNameInput = this.page.locator('[data-test="lastName"]');
    this.postalCodeInput = this.page.locator('[data-test="postalCode"]');
    this.continueButton = this.page.locator('[data-test="continue"]');
    this.overviewList = this.page.locator('[data-test="checkout-summary-container"]');
    this.finishButton = this.page.locator('[data-test="finish"]');
    this.completeMessage = this.page.locator('[data-test="complete-header"]');
    this.backHomeButton = this.page.locator('[data-test="back-to-products"]');
  }

  async getTitle(): Promise<string> {
    await this.waitForElement(this.pageTitle);
    return (await this.pageTitle.textContent())?.trim() ?? '';
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueCheckout(): Promise<void> {
    await this.continueButton.click();
    await this.waitForURL(/.*checkout-step-two\.html/);
  }

  async isProductInOverview(productName: string): Promise<boolean> {
    const product = this.overviewList.locator('[data-test="inventory-item"]').filter({
      hasText: productName
    });

    await this.waitForElement(product);
    return product.isVisible();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
    await this.waitForURL(/.*checkout-complete\.html/);
  }

  async getCompleteMessage(): Promise<string> {
    await this.waitForElement(this.completeMessage);
    return (await this.completeMessage.textContent())?.trim() ?? '';
  }

  async backHome(): Promise<void> {
    await this.backHomeButton.click();
    await this.waitForURL(/.*inventory\.html/);
  }
}
