import { Page, expect } from "@playwright/test";
import { ProductPageLocators } from "../Locators/ProductPageLocators";

export default class CheckoutPage {

    constructor(private page: Page) {
        this.page = page;
    }

    async proceedToCheckout() {
        await this.page.click(ProductPageLocators.checkoutBtn);
    }

    async enterCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
        await this.page.fill(ProductPageLocators.firstNameInput, firstName);
        await this.page.fill(ProductPageLocators.lastNameInput, lastName);
        await this.page.fill(ProductPageLocators.postalCodeInput, postalCode);
    }

    async clickContinue() {
        await this.page.click(ProductPageLocators.continueBtn);
    }

    async finishCheckout() {
        await this.page.click(ProductPageLocators.finishBtn);
    }

    async verifyOrderComplete() {
        const successMsg = this.page.locator(ProductPageLocators.orderCompleteMsg);
        await expect(successMsg).toBeVisible();
        await expect(successMsg).toHaveText('Thank you for your order!');
    }
}