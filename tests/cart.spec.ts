import { test, expect } from '../fixtures/index';
import { backpack } from '../test-data/products';

test.describe('Cart page test cases', () => {
    test('Remove product from cart', async ({ cartWithBackpack, header }) => {
        await expect(header.cartBadge).toBeVisible();
        await expect(header.cartBadge).toHaveText('1');
        await cartWithBackpack.removeFromCart(backpack);
        await expect(cartWithBackpack.inventoryItem).toHaveCount(0);
        await expect(cartWithBackpack.removeButton).toHaveCount(0);
        await expect(header.cartBadge).not.toBeVisible();
        await expect(header.cartBadge).toHaveCount(0);
    });

    test('Proceed from cart to checkout', async ({ cartWithBackpack, checkoutPage, header }) => {
        await expect(header.cartBadge).toBeVisible();
        await expect(header.cartBadge).toHaveCount(1);
        await cartWithBackpack.proceedToCheckout();
        await expect(checkoutPage.firstName).toBeVisible();
        await expect(header.cartBadge).toBeVisible();
    });

    test('Return from cart to the shop', async ({ cartWithBackpack, inventoryPage }) => {
        await cartWithBackpack.continueToShop();
        await expect(inventoryPage.inventoryContainer).toBeVisible();
    });
});
