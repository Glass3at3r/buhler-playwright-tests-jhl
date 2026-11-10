import { test, expect  } from '../fixtures/index'
import { backpack } from '../test-data/products';

test.describe('Cart page test cases', () => {
    test('Remove product from cart', async({ cartWithBackpack }) => {
        await cartWithBackpack.removeFromCart(backpack);
        await expect(cartWithBackpack.inventoryItem).toHaveCount(0);
        await expect(cartWithBackpack.removeButton).toHaveCount(0);
    });
});