import { test, expect } from '../fixtures/index';
import { backpack, bikeLight, sortCases } from '../test-data/products';
import { sorted } from '../utils/sorting';

test.describe('Inventory test cases', () => {
  /**
   * Tests adding of product to the cart and check if it's in.
   */
  test('TS-03: Add product to cart', async ({ loggedInInventory, cartPage, header }) => {
    await loggedInInventory.addToCart(backpack);
    await expect(header.cartBadge).toBeVisible();
    await expect(header.cartBadge).toHaveText('1');
    await header.openCart();
    await expect(cartPage.inventoryItem).toBeVisible();
    await expect(cartPage.inventoryItem).toHaveCount(1);
    await expect(cartPage.inventoryItemName).toHaveText(backpack.name);
    const priceNumber = await cartPage.getItemPrice(backpack);
    expect(priceNumber).toEqual(backpack.price);
  });

  /**
   * Tests adding of two products to the cart and checks that both are in with correct prices.
   */
  test('TS-08: Add multiple products to cart', async ({ loggedInInventory, cartPage, header }) => {
    await loggedInInventory.addToCart(backpack);
    await loggedInInventory.addToCart(bikeLight);
    await expect(header.cartBadge).toHaveText('2');
    await header.openCart();
    await expect(cartPage.inventoryItem).toHaveCount(2);
    await expect(cartPage.inventoryItemName).toHaveText([backpack.name, bikeLight.name]);
    expect(await cartPage.getItemPrice(backpack)).toBe(backpack.price);
    expect(await cartPage.getItemPrice(bikeLight)).toBe(bikeLight.price);
  });

  /**
   * Tests removing of product directly on the inventory page (button changes back, badge disappears).
   */
  test('TS-11: Remove product from cart on inventory page', async ({
    loggedInInventory,
    header,
  }) => {
    await loggedInInventory.addToCart(backpack);
    await expect(header.cartBadge).toHaveText('1');
    await expect(loggedInInventory.productButton(backpack, 'Remove')).toBeVisible();
    await loggedInInventory.removeFromCart(backpack);
    await expect(loggedInInventory.productButton(backpack, 'Add to cart')).toBeVisible();
    await expect(loggedInInventory.productButton(backpack, 'Remove')).toHaveCount(0);
    await expect(header.cartBadge).toHaveCount(0);
  });

  /**
   * Tests that product detail shows the same name and price as the inventory list.
   */
  test('TS-14: Product detail shows correct data', async ({
    loggedInInventory,
    productDetailPage,
    page,
  }) => {
    await loggedInInventory.openProductDetail(backpack);
    await expect(page).toHaveURL(/inventory-item\.html\?id=/);
    await expect(productDetailPage.name).toHaveText(backpack.name);
    await expect(productDetailPage.price).toHaveText(`$${backpack.price}`);
    await expect(productDetailPage.description).not.toBeEmpty();
    await productDetailPage.backToProducts();
    await expect(loggedInInventory.inventoryContainer).toBeVisible();
  });

  /**
   * For loop runs 4 tests for product sorting (by name(A-Z, Z-A), by price(ascending, descending))
   */
  for (const sortCase of sortCases) {
    test(`TS-13: Products are sorted by ${sortCase.label}`, async ({ loggedInInventory }) => {
      if (sortCase.by === 'name') {
        const before = await loggedInInventory.getProductNames();
        await loggedInInventory.sortProductBy(sortCase);
        await expect
          .poll(() => loggedInInventory.getProductNames())
          .toEqual(sorted(before, sortCase.direction));
      } else {
        const before = await loggedInInventory.getProductPrices();
        await loggedInInventory.sortProductBy(sortCase);
        await expect
          .poll(() => loggedInInventory.getProductPrices())
          .toEqual(sorted(before, sortCase.direction));
      }
    });
  }
});
