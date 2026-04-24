import { Page, expect, Locator } from "@playwright/test";
import { ProductPageLocators } from "../Locators/ProductPageLocators";

export default class ProductPage  {
    

    constructor(private page: Page) {
        this.page=page;
       
    }

    async openMenu() {
    await this.page.locator(ProductPageLocators.settingsicon).click();
}

    async logout()
    {
       await this.openMenu();
        await this.page.locator(ProductPageLocators.logoutLink).click();
    }

    async openAboutPage(){
        await this.openMenu();
        await this.page.locator(ProductPageLocators.aboutLink).click();
    }


   /* async verifyProductFieldVisible() {
         this.productText = await this.page.locator('.title');
        this.productLogo = this.page.locator('.app_logo');
        await expect(this.productText).toBeVisible();
    }

    async verifyLogoVisible() {
        await expect(this.productLogo).toBeVisible();
    }*/
}