const { test, expect } = require("../../utils/fixtures");
const data = JSON.parse(
  JSON.stringify(require("../../data/header/testData.json"))
);
const testData = JSON.parse(
  JSON.stringify(require("../../data/main-page/testData.json"))
);

test("Clicking on the swisscows's logo leads to the main page.", async ({
  mainPage,
  header,
}) => {
  //Actions
  await mainPage.inputSearchCriteria(testData.searchCriteria.criteria);
  await mainPage.clickEnterSearchField();
  await header.clickSwisscowsLogo();

  //Assert
  await mainPage.expectHaveUrl(mainPage.page, process.env.WEB_URL + "en");
  await mainPage.expectHaveTitle(mainPage.page,"Your private and anonymous search engine Swisscows");
});

test("Check query counter value when searching for images ", async ({
  mainPage,
  header,
}) => {
  //Actions
  await mainPage.inputSearchCriteria(testData.searchCriteria.criteria);
  await mainPage.clickEnterSearchField();
  await header.clickImageSearchButton();

  //Assert
  await header.expectTextCharitySearchCounterToHave("2");
});

test("Check query counter value when searching for video ", async ({
  mainPage,
  header,
}) => {
  //Actions
  await mainPage.inputSearchCriteria(testData.searchCriteria.criteria);
  await mainPage.clickEnterSearchField();
  await header.clickVideoSearchButton();

  //Assert
  await header.expectTextCharitySearchCounterToHave("2");
});

test.use({ retries: 3 })
test("Check query counter value when searching for music", async ({
  mainPage,
  header,
}) => {
  //Actions
  await mainPage.inputSearchCriteria(testData.searchCriteria.criteria);
  await mainPage.clickEnterSearchField();
  await header.clickMusicSearchButton();

  //Assert
  await header.expectTextCharitySearchCounterToHave("2");
});

test("Check query counter value when searching for news", async ({
  mainPage,
  header,
  hamburgerMenu
}) => {
  //Actions
  await mainPage.inputSearchCriteria(testData.searchCriteria.criteria);
  await mainPage.clickEnterSearchField();
  await hamburgerMenu.selectGermanyRegion()
  await header.clickNewsSearchButton();
  
  //Assert
  await header.expectTextCharitySearchCounterToHave("3");
});

test("Check query counter value when searching for shopping", async ({
  mainPage,
  header,
  hamburgerMenu
}) => {
  //Actions
  await mainPage.inputSearchCriteria(testData.searchCriteria.criteria);
  await mainPage.clickEnterSearchField();
  await hamburgerMenu.selectGermanyRegion()
  await header.clickShoppingSearchButton();
  
  //Assert
  await header.expectTextCharitySearchCounterToHave("3");
});

for (const {testID, expectedLink,locatorId,expectedTitle,} of data.headerLinks) {
  test(`${testID} Check that header menu links on the search pages navigate to corresponding pages`, async ({
    mainPage,
    header,
    context,
  }) => {
    //Actions
    await mainPage.inputSearchCriteria(testData.searchCriteria.criteria);
    await mainPage.clickEnterSearchField();
    await header.expectTextCharitySearchCounterToHave("1");
    await header.clickLinkInHeader(locatorId);
    const currentPage = await header.switchToAnotherWindow(context);

    //Assert
    await header.expectHaveUrl(currentPage, expectedLink);
    await header.expectHaveTitle(currentPage, new RegExp(expectedTitle));
  });
}

test("Check that email icon navigates to login page if user logged in on the search page ", async ({
  mainPage,
  header,
  hamburgerMenu,
  context
}) => {
  //Actions
  await mainPage.inputSearchCriteria(testData.searchCriteria.criteria);
  await mainPage.clickEnterSearchField();
  await header.clickHamburgerMenuButton()
  await hamburgerMenu.clickLoginButtonInHamburgerMenu()
  await header.clickHamburgerMenuButton()
  await header.clickBadgeEmail()
  const currentPage = await header.switchToAnotherWindow(context);

  //Assert
  await header.expectHaveUrl(currentPage, new RegExp("/accounts.swisscows.com/login\\?ReturnUrl=.*"));
  await header.expectHaveTitle(currentPage, /Login - Swisscows Accounts/);
});

test("Check that display of heart icon message in the header", async ({
  header,
  mainPage
}) => {
  //Actions
  await mainPage.inputSearchCriteria(testData.searchCriteria.criteria);
  await mainPage.clickEnterSearchField();
  await header.expectTextCharitySearchCounterToHave("1");
  await header.clickSearchCounter()

 //Assert
  await header.expectPopupCharitySearchCounterToHaveText("Charity ProjectThis is the number of your Swisscows searches. On average, 50 search queries finance a children's meal. Register and receive newsletters.");
});
