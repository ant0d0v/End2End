const { test, expect } = require("../../utils/fixtures");
const data = JSON.parse(
  JSON.stringify(require("../../data/header/testData.json"))
);
const testData = JSON.parse(
  JSON.stringify(require("../../data/main-page/testData.json"))
);
 
for (const {testID, expectedLink,locatorId,expectedTitle,} of data.headerLinks) {
    test(`${testID} Check that header  static pages menu links navigate to corresponding pages`, async ({
      headerStaticPages,
      context
    }) => {
      //Actions
      await headerStaticPages.clickLinkInHeader(locatorId);
      const currentPage = await headerStaticPages.switchToAnotherWindow(context);
  
      //Assert
      await headerStaticPages.AssertHaveUrl(currentPage, expectedLink);
      await headerStaticPages.AssertHaveTitle(currentPage, new RegExp(expectedTitle));
    });
}
test("Check charity query counter value at the Beginning", async ({
    headerStaticPages
  }) => {
    //Assert
    await headerStaticPages.AssertTextCharitySearchCounterToHave("0");
});
  
test("Check charity query counter value after refresh page ", async ({
  mainPage,
  headerStaticPages
}) => {
    //Actions
    await mainPage.reloadPage();

    //Assert
    await headerStaticPages.AssertTextCharitySearchCounterToHave("0");
});

test("Check charity query counter value after search and go back to main bage ", async ({
    mainPage,
    headerStaticPages,
    header,
    webPage
  }) => {
     //Actions
    await mainPage.inputSearchCriteria(testData.searchCriteria.criteria);
    await mainPage.clickEnterSearchField();
    await header.AssertTextCharitySearchCounterToHave("1");
    await webPage.goBack()
  
    //Assert
    await headerStaticPages.AssertTextCharitySearchCounterToHave("1");

});
test("Check that display of heart icon message in the header static pages", async ({
  headerStaticPages
}) => {
  //Actions
  await headerStaticPages.clickSearchCounter()

  //Assert
  await headerStaticPages.AssertPopupCharitySearchCounterToHaveText("Charity ProjectThis is the number of your Swisscows searches. On average, 50 search queries finance a children's meal. Register and receive newsletters.");

});

