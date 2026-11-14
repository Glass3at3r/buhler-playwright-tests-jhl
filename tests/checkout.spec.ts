import { test, expect } from '../fixtures/index';
import { backpack } from '../test-data/products';
import { checkoutNegativeCases, ORDER_CONFIRMATION, validCustomer } from '../test-data/checkout';

test.describe('Checkout page test cases', () => {
  /**
   * Data driven tests for failed checkouts with invalid data.
   * Test will fill the checkout form with missing mandatory parameters(firstname, lastname, postalCode)
   */
  for (const c of checkoutNegativeCases) {
    test(`TS-06: Checkout fails with ${c.name}`, async ({ cartWithBackpack, checkoutPage }) => {
      await cartWithBackpack.proceedToCheckout();
      await expect(checkoutPage.firstName).toBeVisible();
      await checkoutPage.fillCheckoutForm(c.customer);
      await checkoutPage.continueToCheckOut();
      await expect(checkoutPage.errorMessage).toHaveText(c.expectedError);
    });
  }

  /**
   * Test of complete checkout from Checkout page to Checkout Complete Page.
   */
  test('TS-04: Complete checkout', async ({
    checkoutPageOpened,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    await expect(checkoutPageOpened.firstName).toBeVisible();
    await checkoutPageOpened.fillCheckoutForm(validCustomer);
    await checkoutPageOpened.continueToCheckOut();
    await expect(checkoutOverviewPage.checkoutSummaryContainer).toBeVisible();
    await checkoutOverviewPage.finishOrder();
    await expect(checkoutCompletePage.completeContainer).toBeVisible();
    await expect(checkoutCompletePage.completeHeader).toHaveText(ORDER_CONFIRMATION);
  });

  /**
   * Tests that summary item subtotal, tax and total values are correct.
   */
  test('TS-05: Order summary shows correct item total, tax and total', async ({
    checkoutPageOpened,
    checkoutOverviewPage,
  }) => {
    await checkoutPageOpened.fillCheckoutForm(validCustomer);
    await checkoutPageOpened.continueToCheckOut();
    await expect(checkoutOverviewPage.checkoutSummaryContainer).toBeVisible();
    const subtotal = await checkoutOverviewPage.getSubtotal();
    const tax = await checkoutOverviewPage.getTax();
    const total = await checkoutOverviewPage.getTotal();
    expect(subtotal).toBe(backpack.price);
    expect(tax).toBeGreaterThan(0);
    // toBeCloseTo avoids floating point errors (e.g. 29.99 + 2.4)
    expect(subtotal + tax).toBeCloseTo(total, 2);
  });

  /**
   * Tests that cart is empty after completed checkout.
   */
  test('TS-10: Cart is empty and shop is displayed after completed order', async ({
    checkoutPageOpened,
    checkoutOverviewPage,
    checkoutCompletePage,
    inventoryPage,
    header,
  }) => {
    await checkoutPageOpened.fillCheckoutForm(validCustomer);
    await checkoutPageOpened.continueToCheckOut();
    await checkoutOverviewPage.finishOrder();
    await expect(checkoutCompletePage.completeHeader).toHaveText(ORDER_CONFIRMATION);
    await expect(header.cartBadge).toHaveCount(0);
    await checkoutCompletePage.clickOnBackButton();
    await expect(inventoryPage.inventoryContainer).toBeVisible();
    await expect(header.cartBadge).toHaveCount(0);
  });
});
