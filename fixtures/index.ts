import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { standardUser } from '../test-data/users';
import { backpack } from '../test-data/products';

type Fixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    
    /** Inventory page is opened by already logged in standard_user */
    loggedInInventory: InventoryPage;
    cartWithBackpack: CartPage;
};

export const test = base.extend<Fixtures>({
    loginPage: async({ page }, use) => { await use(new LoginPage(page));},
    inventoryPage: async({ page }, use) => { await use(new InventoryPage(page));},
    cartPage: async({ page }, use) => { await use(new CartPage(page));},
    checkoutPage: async({ page}, use)=> { await use(new CheckoutPage(page));},

    loggedInInventory: async({ page, loginPage, inventoryPage }, use) => {
        await loginPage.open();
        await loginPage.login(standardUser);
        await use(inventoryPage);
        //Teardown: Playwright creates new context for every test, so cookies and localStorage are cleansed automatically.
    },

    cartWithBackpack: async({ loggedInInventory, cartPage }, use) => {
        await loggedInInventory.addToCart(backpack);
        await loggedInInventory.goToCart();
        await use(cartPage);
    }

});

export { expect } from '@playwright/test';
