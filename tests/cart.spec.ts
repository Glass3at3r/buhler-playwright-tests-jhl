import { test, expect } from '../fixtures/index';
import { backpack } from '../test-data/products';

test.describe('Cart page test cases', () => {
  /**
   * Known SauceDemo defect: checkout with an empty cart is allowed. The test describes the expected
   * behavior and is marked test.fail(), so it turns red (and reminds us to remove the mark) once fixed.
   */
  test('TS-12: Checkout is not possible with empty cart', async ({
    loggedInInventory,
    header,
    cartPage,
    checkoutPage,
    page,
  }) => {
    test.fail(true, 'SauceDemo lets the user continue to checkout with an empty cart');
    await expect(header.cartBadge).toHaveCount(0);
    await header.openCart();
    await expect(cartPage.inventoryItem).toHaveCount(0);
    await cartPage.proceedToCheckout();
    // URL is checked first: it changes synchronously on click, so the absence check below cannot pass too early.
    await expect(page).toHaveURL(/cart\.html/);
    await expect(checkoutPage.firstName).toHaveCount(0);
  });

  /**
   * Tests removing of product from cart and checks if cart is empty and badge is null.
   */
  test('TS-07: Remove product from cart', async ({ cartWithBackpack, header }) => {
    await expect(header.cartBadge).toHaveText('1');
    await cartWithBackpack.removeFromCart(backpack);
    await expect(cartWithBackpack.inventoryItem).toHaveCount(0);
    await expect(cartWithBackpack.removeButton).toHaveCount(0);
    await expect(header.cartBadge).toHaveCount(0);
  });

  /**
   * Tests transfer from cart to checkout page and checks if cart badge is still displayed.
   */
  test('TS-17: Proceed from cart to checkout', async ({
    cartWithBackpack,
    checkoutPage,
    header,
  }) => {
    await expect(header.cartBadge).toHaveText('1');
    await cartWithBackpack.proceedToCheckout();
    await expect(checkoutPage.firstName).toBeVisible();
    await expect(header.cartBadge).toHaveText('1');
  });

  /**
   * Tests return from cart to the inventory page and checks if inventory page is displayed.
   */
  test('TS-18: Return from cart to the shop', async ({ cartWithBackpack, inventoryPage }) => {
    await cartWithBackpack.continueToShop();
    await expect(inventoryPage.inventoryContainer).toBeVisible();
  });
});
