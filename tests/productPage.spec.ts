import { test, expect } from '@playwright/test';
import { BASEURL, USERNAME, PASSWORD } from '../utils/envconfig';
import ProductPage from '../Pages/ProductPage';
import LoginPage from '../Pages/LoginPage';
import { LoginLocators } from '../Locators/LoginLocators';
import { ProductPageLocators } from '../Locators/ProductPageLocators';


test.describe('Product Page Validation', () => {
    let productpage: ProductPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productpage = new ProductPage(page);
        await loginPage.navigateTo(BASEURL);
        await loginPage.waitForPageLoad();
        await loginPage.loginToSauceDemo(USERNAME, PASSWORD);

    });

    test('User should be able to logout successfully', async ({ page }) => {
        // Step 1: Click on setting icon
        await productpage.clickSettingIcon();

        // Step 2: Click on logout
        await productpage.clickLogout();

        // Verify logout was successful
        await expect(page.locator(LoginLocators.loginBtn)).toBeVisible();
    });





});


