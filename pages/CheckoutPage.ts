import { Page, Locator } from '@playwright/test';
import { CheckoutInfo } from '../test-data/checkout';

export class CheckoutPage {
    readonly checkoutInfoContainer: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;

    constructor(private readonly page: Page) {
        this.checkoutInfoContainer = page.getByTestId('checkout-info-container');
        this.firstName = page.getByTestId('firstName');
        this.lastName = page.getByTestId('lastName');
        this.postalCode = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.cancelButton = page.getByTestId('cancel');
        this.errorMessage = page.getByTestId('error');
    }

    /**
     * Method fills data from fixture with type CheckOutInfo into the checkout form.
     * @param client
     */
    async fillCheckoutForm(
        client: Pick<CheckoutInfo, 'firstName' | 'lastName' | 'postalCode'>,
    ): Promise<void> {
        await this.firstName.fill(client.firstName);
        await this.lastName.fill(client.lastName);
        await this.postalCode.fill(client.postalCode);
    }

    async cancelOrder(): Promise<void> {
        await this.cancelButton.click();
    }

    async continueToCheckOut(): Promise<void> {
        await this.continueButton.click();
    }
}
