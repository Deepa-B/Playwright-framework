import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage';
import { LoginLocators } from '../Locators/LoginLocators';
import ProductPage from '../Pages/ProductPage';
import { BASEURL, USERNAME, PASSWORD } from '../utils/envconfig';


test('user should be able to login successfully', async ({ page }) => {
    const login = new LoginPage(page);
    const product = new ProductPage(page);
    await login.navigateTo(BASEURL);
    await login.waitForPageLoad();
    await login.loginToSauceDemo(USERNAME, PASSWORD);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await product.logout();
});