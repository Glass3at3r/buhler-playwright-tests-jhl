import { test, expect } from '../fixtures/index';
import { backpack, sortCases } from '../test-data/products';

/**
 * Function returns sorted copy of values; `desc` reverses the order
 * @param values
 * @param direction
 * @returns
 */
function sorted<T extends string | number>(values: T[], direction: 'asc' | 'desc'): T[] {
    const copy = [...values].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    return direction === 'desc' ? copy.reverse() : copy;
}

test.describe('Inventory test cases', () => {
    /**
     * Tests adding of product to the cart and check if it's in.
     */
    test('Add product to cart', async ({ loggedInInventory, cartPage, header }) => {
        await loggedInInventory.addToCart(backpack);
        await expect(header.cartBadge).toBeVisible();
        await expect(header.cartBadge).toHaveText('1');
        await header.openCart();
        await expect(cartPage.inventoryItem).toBeVisible();
        await expect(cartPage.inventoryItem).toHaveCount(1);
        await expect(cartPage.inventoryItemName).toHaveText(backpack.name);
    });

    /**
     * For loop runs 4 tests for product sorting (by name(A-Z, Z-A), by price(ascending, descending))
     */
    for (const sortCase of sortCases) {
        test(`Products are sorted by ${sortCase.label}`, async ({ loggedInInventory }) => {
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
