import { test, expect } from '@playwright/test';
import { BASEURL, USERNAME, PASSWORD } from '../utils/envconfig';
import ProductPage from '../Pages/ProductPage';
import CheckoutPage from '../Pages/CheckoutPage';
import LoginPage from '../Pages/LoginPage';
import { LoginLocators } from '../Locators/LoginLocators';


test.describe('End to End Checkout Flow', () => {
    let productpage: ProductPage;
    let checkoutpage: CheckoutPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productpage = new ProductPage(page);
        checkoutpage = new CheckoutPage(page);
        await loginPage.navigateTo(BASEURL);
        await loginPage.waitForPageLoad();
        await loginPage.loginToSauceDemo(USERNAME, PASSWORD);
    });

    test.afterEach('User should be able to logout successfully', async ({ page }) => {
        await productpage.clickSettingIcon();
        await productpage.clickLogout();
        await expect(page.locator(LoginLocators.loginBtn)).toBeVisible();
    });

    test('Complete full checkout flow', async ({ page }) => {
        // Add product to cart
        await productpage.verifyAddingProductToCart();

        // Navigate to cart and complete checkout
        await productpage.navigateToCart();
        await checkoutpage.proceedToCheckout();
        await checkoutpage.enterCheckoutInfo('John', 'Doe', '12345');
        await checkoutpage.clickContinue();
        await checkoutpage.finishCheckout();
        await checkoutpage.verifyOrderComplete();
    });
});