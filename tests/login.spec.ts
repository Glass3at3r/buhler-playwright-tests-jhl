import { test, expect } from '../fixtures/index';
import { standardUser, loginNegativeCases } from '../test-data/users';

test.describe('Login tests', () => {
  // Every test in this block begins on the login page.
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('Standard user can log in', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.login(standardUser);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  for (const c of loginNegativeCases) {
    test(`Login fails: ${c.name}`, async ({ loginPage, page }) => {
      await loginPage.login(c);
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText(c.expectedError);
      await expect(page).toHaveURL('/');
    });
  }
});
