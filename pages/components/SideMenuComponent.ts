import { Locator, Page } from '@playwright/test';

export class SideMenuComponent {
    readonly root: Locator;
    readonly allItemsLink: Locator;
    readonly aboutLink: Locator;
    readonly logoutLink: Locator;
    readonly resetAppStateLink: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        // side-menu elemetn has no data-test id
        this.root = page.locator('.bm-menu');
        this.allItemsLink = this.root.getByTestId('inventory-sidebar-link');
        this.aboutLink = this.root.getByTestId('about-sidebar-link');
        this.logoutLink = this.root.getByTestId('logout-sidebar-link');
        this.resetAppStateLink = this.root.getByTestId('reset-sidebar-link');
        this.closeButton = this.root.getByTestId('close-menu');
    }

    async logout(): Promise<void> {
        await this.logoutLink.click();
    }
}
