import { test, expect } from '../fixtures/index';
import { LoginPage } from '../pages/LoginPage';
import { standardUser, loginNegativeCases } from '../test-data/users';

test.describe('Login tests', () => {
  // Every test in this block begins on the login page.
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('TS-01: Standard user can log in', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.login(standardUser);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('TS-09: Inventory is not accessible without login', async ({
    loginPage,
    inventoryPage,
    page,
  }) => {
    await page.goto('/inventory.html');
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: You can only access '/inventory.html' when you are logged in.",
    );
    await expect(page).toHaveURL('/');
    await expect(inventoryPage.inventoryContainer).toHaveCount(0);
  });

  test('TS-15: Login error message can be closed', async ({ loginPage }) => {
    await loginPage.login({ username: '', password: '' });
    await expect(loginPage.errorMessage).toBeVisible();
    await loginPage.closeError();
    await expect(loginPage.errorMessage).toHaveCount(0);
  });

  for (const c of loginNegativeCases) {
    test(`TS-02: Login fails: ${c.name}`, async ({ loginPage, page }) => {
      await loginPage.login(c);
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText(c.expectedError);
      await expect(page).toHaveURL('/');
    });
  }
});
