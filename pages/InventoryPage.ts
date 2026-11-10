import { Page, Locator } from '@playwright/test';
import { Product, SortCase } from '../test-data/products';

export class InventoryPage {
    readonly title: Locator;
    readonly productSortContainer: Locator;
    readonly inventoryItem: Locator;
    readonly inventoryItemName: Locator;
    readonly inventoryItemPrice: Locator;
    readonly shoppingCartLink: Locator;
    readonly shoppingCartBadge: Locator;
    readonly burgerMenuButton: Locator;
    readonly burgerMenu: Locator;
    readonly allItemsMenuItem: Locator;
    readonly dynamicCatalogMenuItem: Locator;
    readonly aboutMenuItem: Locator;
    readonly logoutMenuItem: Locator;
    readonly resetAppMenuItem: Locator;
    readonly closeMenuButton: Locator;


    constructor(private readonly page: Page) {
        this.title = page.getByTestId('title');
        this.productSortContainer = page.getByTestId('product-sort-container');
        this.inventoryItem = page.getByTestId('inventory-item');
        this.inventoryItemName = page.getByTestId('inventory-item-name');
        this.inventoryItemPrice = page.getByTestId('inventory-item-price');
        this.shoppingCartLink = page.getByTestId('shopping-cart-link');
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
        this.burgerMenuButton = page.getByTestId('open-menu');
        // element with burger menu does not have own data-test id
        this.burgerMenu = page.locator('.bm-menu');
        this.allItemsMenuItem = this.burgerMenu.getByTestId('inventory-sidebar-link')
        this.dynamicCatalogMenuItem = this.burgerMenu.getByTestId('dynamic-catalog-sidebar-link');
        this.aboutMenuItem = this.burgerMenu.getByTestId('about-sidebar-link');
        this.logoutMenuItem = this.burgerMenu.getByTestId('logout-sidebar-link');
        this.resetAppMenuItem = this.burgerMenu.getByTestId('reset-sidebar-link');
        this.closeMenuButton = this.burgerMenu.getByTestId('close-menu');
    }

    async addToCart(product: Pick<Product, 'name'>): Promise<void> {
        await this.inventoryItem.filter({ hasText: product.name }).getByRole('button', { 'name': 'Add to cart'}).click();
    }

    async goToCart(): Promise<void> {
        await this.shoppingCartLink.click();
    }

    async openMenu(): Promise<void> {
        await this.burgerMenuButton.click();
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
