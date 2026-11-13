import { Page, Locator } from '@playwright/test';
import { Product } from '../test-data/products';

export class CartPage {
  readonly cartList: Locator;
  readonly inventoryItem: Locator;
  readonly inventoryItemName: Locator;
  readonly removeButton: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(private readonly page: Page) {
    this.cartList = page.getByTestId('cart-list');
    this.inventoryItem = this.cartList.getByTestId('inventory-item');
    this.inventoryItemName = this.inventoryItem.getByTestId('inventory-item-name');
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async removeFromCart(product: Pick<Product, 'name'>): Promise<void> {
    await this.inventoryItem.filter({ hasText: product.name }).locator(this.removeButton).click();
  }

  async continueToShop(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}
