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



    test('User should be able to navigate to about page and navigate back', async ({ page }) => {
        await productpage.openAboutPage();
        await expect(page.locator(ProductPageLocators.requestdemobtn)).toBeVisible();
        await expect(page.locator(ProductPageLocators.tryItFreebtn)).toBeVisible();
        await page.waitForLoadState('load');
        await page.goBack();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('User should be able to logout successfully', async ({ page }) => {
        await productpage.logout();
        await expect(page.locator(LoginLocators.loginBtn)).toBeVisible();

    });
});


