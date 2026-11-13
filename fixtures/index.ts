import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { standardUser } from '../test-data/users';
import { backpack, TOTAL_PRODUCTS } from '../test-data/products';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { HeaderComponent } from '../pages/components/HeaderComponent';
import { SideMenuComponent } from '../pages/components/SideMenuComponent';

type Fixtures = {
  loginPage: LoginPage;
  header: HeaderComponent;
  sideMenu: SideMenuComponent;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;

  /** Inventory page is opened by already logged in standard_user */
  loggedInInventory: InventoryPage;
  cartWithBackpack: CartPage;
  checkoutPageOpened: CheckoutPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  header: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  sideMenu: async ({ page }, use) => {
    await use(new SideMenuComponent(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },

  loggedInInventory: async ({ page, loginPage, inventoryPage }, use) => {
    await loginPage.open();
    await loginPage.login(standardUser);
    await expect(inventoryPage.inventoryItem).toHaveCount(TOTAL_PRODUCTS);
    await use(inventoryPage);
    //Teardown: Playwright creates new context for every test, so cookies and localStorage are cleansed automatically.
  },

  cartWithBackpack: async ({ loggedInInventory, cartPage, header }, use) => {
    await loggedInInventory.addToCart(backpack);
    await header.openCart();
    await use(cartPage);
  },

  checkoutPageOpened: async ({ cartWithBackpack, checkoutPage }, use) => {
    await cartWithBackpack.proceedToCheckout();
    await use(checkoutPage);
  },
});

export { expect } from '@playwright/test';
