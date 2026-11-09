import { Page, Locator } from '@playwright/test';
import { Product } from '../test-data/products';

export class InventoryPage {
    readonly title: Locator;
    readonly productSortContainer: Locator;
    readonly inventoryItem: Locator;
    readonly inventoryItemName: Locator;
    readonly inventoryItemPrice: Locator;
    readonly shoppingCartLink: Locator;
    readonly shoppingCartBadge: Locator;
    readonly burgerMenu: Locator;


    constructor(private readonly page: Page) {
        this.title = page.getByTestId('title');
        this.productSortContainer = page.getByTestId('product-sort-container');
        this.inventoryItem = page.getByTestId('inventory-item');
        this.inventoryItemName = page.getByTestId('inventory-item-name');
        this.inventoryItemPrice = page.getByTestId('inventory-item-price');
        this.shoppingCartLink = page.getByTestId('shopping-cart-link');
        this.shoppingCartBadge = page.getByTestId('');
        this.burgerMenu = page.getByTestId('');
    }

    async addToCart(product: Pick<Product, 'name'>): Promise<void> {
        await this.inventoryItem.filter({ hasText: product.name }).getByRole('button').click();
    }

    async goToCart(): Promise<void> {
        await this.shoppingCartLink.click();
    }

}
