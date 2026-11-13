import { Page, Locator } from '@playwright/test';
import { Product } from '../test-data/products';
import { parsePrice } from '../utils/price';

export class CartPage {
  readonly cartList: Locator;
  readonly inventoryItem: Locator;
  readonly inventoryItemName: Locator;
  readonly inventoryItemPrice: Locator;
  readonly removeButton: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(private readonly page: Page) {
    this.cartList = page.getByTestId('cart-list');
    this.inventoryItem = this.cartList.getByTestId('inventory-item');
    this.inventoryItemName = this.inventoryItem.getByTestId('inventory-item-name');
    this.inventoryItemPrice = this.inventoryItem.getByTestId('inventory-item-price');
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

  async getItemPrice(product: Pick<Product, 'name'>): Promise<number> {
    const priceText = await this.inventoryItem
      .filter({ hasText: product.name })
      .getByTestId('inventory-item-price')
      .textContent();

    if (priceText === null) {
      throw new Error(`Price of "${product.name}" was not found in the cart`);
    }

    return parsePrice(priceText);
  }
}
