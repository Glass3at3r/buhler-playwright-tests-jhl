import { test, expect } from '../fixtures/index';
import { standardUser } from '../test-data/users';

test.describe('Logout test', () => {
  // Every test in this block begins on the login page.
  test('Logout from Saucedemo app', async ({ loggedInInventory, header, sideMenu, loginPage }) => {
    await expect(loggedInInventory.inventoryContainer).toBeVisible();
    await header.openMenu();
    await expect(sideMenu.logoutLink).toBeVisible();
    await sideMenu.logout();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
