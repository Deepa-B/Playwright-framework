import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage';
import { Products } from '../Pages/ProductPage';
import  {LoginLocators} from '../Locators/LoginLocators';
import { BASEURL, USERNAME, PASSWORD } from '../utils/envconfig';


test('user should be able to login successfully', async ({ page }) => {
    const login = new LoginPage(page);
    const product = new Products(page);
    await login.navigateTo(BASEURL);
    await login.waitForPageLoad();
    await login.loginToSauceDemo(USERNAME, PASSWORD);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    await product.logout();

    /*await product.verifyProductFieldVisible();
    await product.verifyLogoVisible();*/
});