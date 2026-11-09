import { Page, Locator } from '@playwright/test'
import { CheckoutInfo } from '../test-data/checkout';

export class CheckoutPage{
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly error: Locator;

    constructor(private readonly page: Page){
        this.firstName = page.getByTestId('firstName');
        this.lastName = page.getByTestId('lastName');
        this.postalCode = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.cancelButton = page.getByTestId('cancel');
        this.error = page.getByTestId('error')
    }

    async fillCheckoutForm(client: Pick<CheckoutInfo, 'firstName' | 'lastName' | 'postalCode'>): Promise<void> {
        await this.firstName.fill(client.firstName);
        await this.lastName.fill(client.lastName);
        await this.postalCode.fill(client.postalCode);
    }
}