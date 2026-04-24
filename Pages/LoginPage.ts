import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { LoginLocators } from "../Locators/LoginLocators";


export default class LoginPage extends BasePage {
    

    constructor(page: Page) {
        super(page);
    }

    async loginToSauceDemo(username: string, password: string) {
        await this.page.locator(LoginLocators.usernameInput).fill(username);
        await this.page.locator(LoginLocators.passwordInput).fill(password);
        await this.page.locator(LoginLocators.loginBtn).click();
    }
}