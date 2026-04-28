import { Page, expect, Locator } from "@playwright/test";
import { ProductPageLocators } from "../Locators/ProductPageLocators";

export default class ProductPage {


    constructor(private page: Page) {
        this.page = page;
    }

    // Step 1: Click on setting icon
    async clickSettingIcon() {
        await this.page.click('#react-burger-menu-btn');
    }

    // Step 2: Click on logout
    async clickLogout() {
        await this.page.click('#logout_sidebar_link');
    }

    // Combined logout method
    async logout() {
        await this.clickSettingIcon();
        await this.clickLogout();
    }

    async verifyAddingProductToCart() {
        await this.page.click(ProductPageLocators.product1);
        await this.page.locator(ProductPageLocators.addtocartbtn).click();
        const cartBadge = this.page.locator(ProductPageLocators.cartBadgeIcon);
        await expect(cartBadge).toBeVisible();
        await expect(cartBadge).toHaveText('1');
    }

    // Add multiple items to cart
    async addMultipleItemsToCart(productNames: string[]) {
        for (const productName of productNames) {
            const productLocator = `text=${productName}`;
            await this.page.click(productLocator);
            await this.page.locator(ProductPageLocators.addtocartbtn).click();
            // Go back to product list to add next item
            await this.page.goBack();
        }
    }

    // Verify cart badge shows correct count
    async verifyCartBadgeCount(expectedCount: string) {
        const cartBadge = this.page.locator(ProductPageLocators.cartBadgeIcon);
        await expect(cartBadge).toBeVisible();
        await expect(cartBadge).toHaveText(expectedCount);
    }

    // Cart operations
    async navigateToCart() {
        await this.page.click(ProductPageLocators.cartLink);
    }

    // Remove item from cart
    async removeItemFromCart(itemName: string) {
        await this.navigateToCart();
        // Find the remove button associated with the specific item
        const itemRow = this.page.locator(`text=${itemName}`).locator('..');
        await itemRow.locator(ProductPageLocators.removetext).click();
    }

    // Remove all items from cart
    async clearCart() {
        await this.navigateToCart();
        const removeButtons = this.page.locator(ProductPageLocators.removetext);
        const count = await removeButtons.count();
        for (let i = 0; i < count; i++) {
            await removeButtons.first().click();
        }
    }

   

    
}

  
   