import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class Products extends BasePage {
    readonly productText: Locator;
    readonly productLogo: Locator;

    constructor(page: Page) {
        super(page);
        this.productText = this.page.locator('.title');
        this.productLogo = this.page.locator('.app_logo');
    }

    async verifyProductFieldVisible() {
        await expect(this.productText).toBeVisible();
    }

    async verifyLogoVisible() {
        await expect(this.productLogo).toBeVisible();
    }
}