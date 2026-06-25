import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly productList: Locator;
  private readonly cartList: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly checkoutButton: Locator;
  private selectedProductName?: string;

  constructor(page: Page) {
    super(page);
    this.pageTitle = this.page.locator('[data-test="title"]');
    this.productList = this.page.locator('[data-test="inventory-list"]');
    this.cartList = this.page.locator('[data-test="cart-list"]');
    this.shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');
    this.checkoutButton = this.page.locator('[data-test="checkout"]');
  }

  async getTitle(): Promise<string> {
    await this.waitForElement(this.pageTitle);
    return (await this.pageTitle.textContent())?.trim() ?? '';
  }

  async isLoaded(): Promise<boolean> {
    await this.waitForURL(/.*inventory\.html/);
    return this.productList.isVisible();
  }

  async selectProductFromList(productName: string): Promise<void> {
    const product = this.productByName(productName);

    await this.waitForElement(product);
    this.selectedProductName = productName;
  }

  async addSelectedProductToCart(): Promise<void> {
    if (!this.selectedProductName) {
      throw new Error('No product was selected before clicking Add to cart.');
    }

    await this.productByName(this.selectedProductName).locator('button', { hasText: 'Add to cart' }).click();
  }

  async openShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
    await this.waitForURL(/.*cart\.html/);
  }

  async isProductInCart(productName: string): Promise<boolean> {
    const cartProduct = this.cartList.locator('[data-test="inventory-item"]').filter({
      hasText: productName
    });

    await this.waitForElement(cartProduct);
    return cartProduct.isVisible();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
    await this.waitForURL(/.*checkout-step-one\.html/);
  }

  private productByName(productName: string): Locator {
    return this.productList.locator('[data-test="inventory-item"]').filter({
      hasText: productName
    });
  }
}
