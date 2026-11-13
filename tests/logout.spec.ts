import { test, expect } from '../fixtures/index';

test.describe('Logout test', () => {
  // Every test in this block begins on the inventory page as a logged-in user.
  test('TS-16: Logout from Saucedemo app', async ({
    loggedInInventory,
    header,
    sideMenu,
    loginPage,
    page,
  }) => {
    await expect(loggedInInventory.inventoryContainer).toBeVisible();
    await header.openMenu();
    await expect(sideMenu.logoutLink).toBeVisible();
    await sideMenu.logout();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(page).toHaveURL('/');
  });
});
