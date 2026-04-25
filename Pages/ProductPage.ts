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

    async proceedToCheckout() {
        await this.page.click(ProductPageLocators.checkoutBtn);
    }

    // Checkout step one - Enter information
    async enterCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
        await this.page.fill(ProductPageLocators.firstNameInput, firstName);
        await this.page.fill(ProductPageLocators.lastNameInput, lastName);
        await this.page.fill(ProductPageLocators.postalCodeInput, postalCode);
    }

    async clickContinue() {
        await this.page.click(ProductPageLocators.continueBtn);
    }

    // Complete checkout
    async finishCheckout() {
        await this.page.click(ProductPageLocators.finishBtn);
    }

    // Verify order completion
    async verifyOrderComplete() {
        const successMsg = this.page.locator(ProductPageLocators.orderCompleteMsg);
        await expect(successMsg).toBeVisible();
        await expect(successMsg).toHaveText('Thank you for your order!');
    }

    // Full checkout flow
    async completeCheckout(firstName: string, lastName: string, postalCode: string) {
        await this.navigateToCart();
        await this.proceedToCheckout();
        await this.enterCheckoutInfo(firstName, lastName, postalCode);
        await this.clickContinue();
        await this.finishCheckout();
        await this.verifyOrderComplete();
    }
}

  
   