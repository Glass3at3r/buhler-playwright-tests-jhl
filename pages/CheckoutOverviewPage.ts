import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly checkoutSummaryContainer: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly summarySubtotalLabel: Locator;
  readonly summaryTaxLabel: Locator;
  readonly summaryTotalLabel: Locator;

  constructor(page: Page) {
    this.checkoutSummaryContainer = page.getByTestId('checkout-summary-container');
    this.cancelButton = page.getByTestId('cancel');
    this.finishButton = page.getByTestId('finish');
    this.summarySubtotalLabel = page.getByTestId('subtotal-label');
    this.summaryTaxLabel = page.getByTestId('tax-label');
    this.summaryTotalLabel = page.getByTestId('total-label');
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  async cancelOrder(): Promise<void> {
    await this.cancelButton.click();
  }
}
