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
}

  
   