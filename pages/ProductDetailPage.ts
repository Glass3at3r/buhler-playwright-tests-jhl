import { Page, Locator } from '@playwright/test';

export class ProductDetailPage {
  readonly detailContainer: Locator;
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.detailContainer = page.getByTestId('inventory-item');
    this.name = page.getByTestId('inventory-item-name');
    this.description = page.getByTestId('inventory-item-desc');
    this.price = page.getByTestId('inventory-item-price');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.backButton = page.getByTestId('back-to-products');
  }

  async backToProducts(): Promise<void> {
    await this.backButton.click();
  }
}
