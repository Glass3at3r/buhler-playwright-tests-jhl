import { Page, Locator } from '@playwright/test';
import { parsePrice } from '../utils/price';

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

  /** Item total (without tax) as a number, e.g. "Item total: $29.99" -> 29.99. */
  async getSubtotal(): Promise<number> {
    return parsePrice(await this.summarySubtotalLabel.innerText());
  }

  /** Tax as a number, e.g. "Tax: $2.40" -> 2.4. */
  async getTax(): Promise<number> {
    return parsePrice(await this.summaryTaxLabel.innerText());
  }

  /** Total including tax as a number, e.g. "Total: $32.39" -> 32.39. */
  async getTotal(): Promise<number> {
    return parsePrice(await this.summaryTotalLabel.innerText());
  }

  async cancelOrder(): Promise<void> {
    await this.cancelButton.click();
  }
}
