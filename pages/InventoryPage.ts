import { Page, Locator } from '@playwright/test';
import { Product, SortCase } from '../test-data/products';

export class InventoryPage {
    readonly title: Locator;
    readonly productSortContainer: Locator;
    readonly inventoryContainer: Locator;
    readonly inventoryItem: Locator;
    readonly inventoryItemName: Locator;
    readonly inventoryItemPrice: Locator;

    constructor(private readonly page: Page) {
        this.title = page.getByTestId('title');
        this.productSortContainer = page.getByTestId('product-sort-container');
        this.inventoryContainer = page.getByTestId('inventory-container');
        this.inventoryItem = page.getByTestId('inventory-item');
        this.inventoryItemName = page.getByTestId('inventory-item-name');
        this.inventoryItemPrice = page.getByTestId('inventory-item-price');
    }

    async addToCart(product: Pick<Product, 'name'>): Promise<void> {
        await this.inventoryItem
            .filter({ hasText: product.name })
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }

    async sortProductBy(sortCase: Pick<SortCase, 'option'>): Promise<void> {
        await this.productSortContainer.selectOption(sortCase.option);
    }

    async getProductNames(): Promise<string[]> {
        return this.inventoryItemName.allTextContents();
    }

    async getProductPrices(): Promise<number[]> {
        const texts = await this.inventoryItemPrice.allTextContents();
        return texts.map((text) => Number(text.replace('$', '')));
    }
}
