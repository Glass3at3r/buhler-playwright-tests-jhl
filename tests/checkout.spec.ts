import { test, expect } from '../fixtures/index';
import { checkoutNegativeCases, ORDER_CONFIRMATION, validCustomer } from '../test-data/checkout';

test.describe('Checkout page test cases', () => {
    /**
     * Data driven tests for failed checkouts with invalid data.
     * Test will fill the checkout form with missing mandatory parameters(firstname, lastname, postalCode)
     */
    for (const c of checkoutNegativeCases) {
        test(`Checkout fails with ${c.name}`, async ({ cartWithBackpack, checkoutPage }) => {
            await cartWithBackpack.proceedToCheckout();
            await expect(checkoutPage.firstName).toBeVisible();
            await checkoutPage.fillCheckoutForm(c.customer);
            await checkoutPage.continueToCheckOut();
            await expect(checkoutPage.errorMessage).toHaveText(c.expectedError);
        });
    }

    test('Complete checkout', async ({
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
});
