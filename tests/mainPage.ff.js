// @ts-check
const { test, expect } = require("../utils/fixtures");
const testData = JSON.parse(
  JSON.stringify(require("../data/main-page/testData.json"))
);

test('Check that popup "firefox install" redirect to the corresponding page @firefox', async ({
  mainPage,
  context,
}) => {
  await mainPage.expectPopupInstallSwisscowsLinkIsDisplayed();
  await mainPage.clickPopupInstallSwisscowsLink();

  const newPage = await mainPage.switchToAnotherWindow(context);

  //Assert
  await mainPage.expectHaveUrl(newPage,new RegExp(testData.url.extensionFirefoxInstall));
  await mainPage.expectHaveTitle(newPage, /Swisscows/);
});

test("Check that popup firefox install Is Dysplaed", async ({ mainPage }) => {
  const expectedText =
    "Stay with us and set Swisscows as your default search engine. ";

  //Assert
  await mainPage.expectPopupInstallSwisscowsLinkIsDisplayed();
  await mainPage.expectTextOfPopupInstallSwisscowsLink(expectedText);
});

test('Check that the "Install Swisscows Block" button redirect to coresponding URL.', async ({
  mainPage,
  context,
}) => {
  await mainPage.scrollToInstallSwisscowsBlock();
  await mainPage.clickInstallSwisscowsBlock();

  const externalPage = await mainPage.switchToAnotherWindow(context);

  //Assert
  await mainPage.expectHaveUrl(externalPage,new RegExp(testData.url.extensionFirefoxInstall));
  await mainPage.expectHaveTitle(externalPage, /Swisscows/);
});
