import { test as setup, expect } from '@playwright/test';
const authFile = "./data/auth/user.json";
setup('Login to swisscows site', async ({ page }) => {
  await page.goto(process.env.WEB_URL);
  await page.locator("header button.hamburger-menu").click();
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByPlaceholder("Username or email").fill(process.env.USERNAME);
  await page.getByPlaceholder("Password").fill(process.env.PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();
 
  // Wait until the page actually signs in.
  await expect(page.getByRole('img', { name: 'Swisscows', exact: true })).toBeVisible();
  await page.context().storageState({ path: authFile });
});