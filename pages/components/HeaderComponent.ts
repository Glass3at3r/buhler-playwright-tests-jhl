import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
    readonly cartLink: Locator;
    readonly cartBadge: Locator;
    readonly burgerMenuButton: Locator;

    constructor(page: Page) {
        this.cartLink = page.getByTestId('shopping-cart-link');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        // burger menu button has no data-test id
        this.burgerMenuButton = page.locator('.bm-burger-button');
    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }

    async openMenu(): Promise<void> {
        await this.burgerMenuButton.click();
    }
}
