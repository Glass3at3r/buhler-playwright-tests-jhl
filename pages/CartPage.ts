import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly cartList: Locator;
    readonly inventoryItemName: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(private readonly page: Page){
        this.cartList = page.getByTestId('cart-list');
        this.inventoryItemName = page.getByTestId('title-link');
        this.checkoutButton = page.getByTestId('checkout');
        this.continueShoppingButton = page.getByTestId('continue-shopping');
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

}