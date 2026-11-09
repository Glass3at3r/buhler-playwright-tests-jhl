import { Page, Locator } from '@playwright/test';

export class FinalPage {
    readonly completeContainer: Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backButton: Locator;
    readonly generatePdfButton: Locator;

    constructor(private readonly page: Page) {
        this.completeContainer = page.getByTestId('checkout-complete-container');
        this.completeHeader = page.getByTestId('complete-header');
        this.completeText = page.getByTestId('complete-text');
        this.backButton = page.getByTestId('back-to-products');
        this.generatePdfButton = page.getByTestId('generate-pdf-order')
    }

    async clickOnBackButton(): Promise<void> {
        await this.backButton.click();
    }


}