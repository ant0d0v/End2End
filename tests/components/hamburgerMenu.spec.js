const { test, expect } = require("../../utils/fixtures");
const data = JSON.parse(
  JSON.stringify(require("../../data/header/testData.json"))
);
const testData = JSON.parse(
  JSON.stringify(require("../../data/main-page/testData.json"))
);
const dateTest = JSON.parse(
  JSON.stringify(require("../../data/hamburger/testData.json"))
);

test("Check  login User and display of nickname in hamburger menu", async ({
    mainPage,
    header,
    hamburgerMenu
  }) => {
    //Actions
    await mainPage.inputSearchCriteria(testData.searchCriteria.criteria);
    await mainPage.clickEnterSearchField();
    await header.clickHamburgerMenuButton()
    await hamburgerMenu.clickLoginButtonInHamburgerMenu()
    await header.clickHamburgerMenuButton()
  
    //Assert
    await hamburgerMenu.AssertNicknameUserInHamburgerMenuToHave("TTest")
});
  
test("Check Log Out user and display of login button", async ({
    mainPage,
    header,
    hamburgerMenu
  }) => {
    //Actions
    await mainPage.inputSearchCriteria(testData.searchCriteria.criteria);
    await mainPage.clickEnterSearchField();
    await header.clickHamburgerMenuButton()
    await hamburgerMenu.clickLoginButtonInHamburgerMenu()
    await header.clickHamburgerMenuButton()
    await hamburgerMenu.clickLogoutButtonInHamburgerMenu()
    await header.clickHamburgerMenuButton()
  
    //Assert
    await hamburgerMenu.AssertLoginButtonInHamburgerMenuIsDisplayed()
});
  
test("Texts of the links in the hamburger menu.", async ({
    headerStaticPages,
    hamburgerMenu
  }) => {
    const expectedTextsOfLinks = [ "Set as Startpage", "Make a Default Search Engine", "Who we are", "Media Education",
    "Charity Project", "Our Datacenter","Contact us","Data privacy","Donation","Support" ]
    //Actions
    await headerStaticPages.clickHamburgerMenuButton()
    
    //Assert
    await hamburgerMenu.AssertTextsOfLinksInHamburgerMenu(expectedTextsOfLinks)
});
  
test("Check availability and options of localization dropdown menu in hamburger Menu", async ({
    headerStaticPages,
    hamburgerMenu
  }) => {
    const expectedTextsOfLanguagesDropdown = ["English", "Deutsch", "Español","Français", "Italiano", "Latviešu",
    "Magyar","Nederlands", "Português", "Русский", "Українська"]
    //Actions
    await headerStaticPages.clickHamburgerMenuButton()
    await hamburgerMenu.clickLanguagesDropdownInHamburgerMenu()
    
    //Assert
    await hamburgerMenu.AssertListSize(hamburgerMenu.textsOflanguagesDropdownInHamburgerMenu, 11)
    await hamburgerMenu.AssertTextsOfLanguagesInHamburgerMenu(expectedTextsOfLanguagesDropdown)
});
  
test("Check  availability and options of region dropdown menu in hamburger menu", async ({
    headerStaticPages,
    hamburgerMenu
  }) => {
    const expectedTextsOfRegionDropdown = [ "Argentina", "Australia", "Austria", "Belgium (FR)", "Belgium (NL)",
    "Brazil", "Canada (EN)", "Canada (FR)", "Chile", "China", "Denmark", "Finland", "France",
    "Germany", "Hong Kong SAR", "Hungary", "India", "Indonesia","Ireland", "Italy", "Japan",
    "Kazakhstan", "Korea", "Latvia", "Malaysia", "Mexico", "Netherlands",
    "New Zealand", "Nigeria", "Norway","Paraguay", "Philippines", "Poland", "Portugal", "Russia", "Saudi Arabia", "South Africa"
    , "Spain", "Sweden", "Switzerland (DE)", "Switzerland (FR)", "Taiwan", "Turkey", "Ukraine", "United Kingdom"
    , "United States (EN)", "United States (ES)", "World-wide"]
    //Actions
    await headerStaticPages.clickHamburgerMenuButton()
    await hamburgerMenu.clickRegionDropdownInHamburgerMenu()
    
    //Assert
    await hamburgerMenu.AssertListSize(hamburgerMenu.textsOfRegionDropdownInHamburgerMenu, 48)
    await hamburgerMenu.AssertTextsOfRegionInHamburgerMenu(expectedTextsOfRegionDropdown)

});
test("Check theme change to dark theme", async ({
    headerStaticPages,
    hamburgerMenu
  }) => {
    const expectedDarkBackground = /rgb\(24, 26, 28\)/;
    //Actions
    await headerStaticPages.clickHamburgerMenuButton()
    await hamburgerMenu.clickThemeDropdownInHamburgerMenu()
    await hamburgerMenu.clickDarkInHamburgerMenu()
    
    //Assert
    await hamburgerMenu.AssertBackgroundColorOfPage(expectedDarkBackground)
  });
  
  test("Check theme change to light theme", async ({
    headerStaticPages,
    hamburgerMenu
  }) => {
    const expectedLightBackground = /rgb\(250, 251, 253\)/;
    //Actions
    await headerStaticPages.clickHamburgerMenuButton()
    await hamburgerMenu.clickThemeDropdownInHamburgerMenu()
    await hamburgerMenu.clickLightInHamburgerMenu()
    
    //Assert
    await hamburgerMenu.AssertBackgroundColorOfPage(expectedLightBackground)
  });
  
  test("Check default theme on first opening the site", async ({
    headerStaticPages,
    hamburgerMenu
  }) => {
    const expectedLightBackground = /rgb\(250, 251, 253\)/;
    //Actions
    await headerStaticPages.clickHamburgerMenuButton()
    await hamburgerMenu.clickThemeDropdownInHamburgerMenu()
  
    //Assert
    await hamburgerMenu.AssertAttributeClassOfElement(hamburgerMenu.defaultThemeInHemburgerMenu, "active")
    await hamburgerMenu.AssertBackgroundColorOfPage(expectedLightBackground)
  });

  for (const {testID, expectedLink,locatorId,expectedTitle,} of  dateTest.languagesLinksOfMainPage) {
    test(`${testID} Check navigation to corresponding pages for  ${locatorId} localization`, async ({
      headerStaticPages,
      hamburgerMenu,
      mainPage,
      page,
    }) => {
      //Actions
      await headerStaticPages.clickHamburgerMenuButton();
      await hamburgerMenu.clickLanguagesDropdownInHamburgerMenu();
      await hamburgerMenu.clickLanguageLinkInDropdown(locatorId);

      //Assert
      await mainPage.AssertHaveUrl(page, expectedLink);
      await mainPage.AssertHaveTitle(page, new RegExp(expectedTitle));
    });
  }

  for (const {testID, expectedLink,locatorId,expectedTitle} of  dateTest.regionLinksOfMainPage) {
    test(`${testID} Check navigation to corresponding pages for ${locatorId} region`, async ({
      headerStaticPages,
      hamburgerMenu,
      mainPage,
      page
    }) => {
      //Actions
      await headerStaticPages.clickHamburgerMenuButton();
      await hamburgerMenu.clickDropdownRegion()
      await hamburgerMenu.clickRegioLinkInDropdown(locatorId)
    
      //Assert
      await mainPage.AssertHaveUrl(page, expectedLink);
      await mainPage.AssertHaveTitle(page,expectedTitle);
    });
  }
  for (const {testID, expectedLink,locatorId,expectedTitle} of  dateTest.staticPagesLinks) {
    test(`${testID}  ${locatorId} content page links navigates to the corresponding page.`, async ({
      headerStaticPages,
      hamburgerMenu,
      page,
    }) => {
      //Actions
      await headerStaticPages.clickHamburgerMenuButton();
      await hamburgerMenu.clickLinkOfStaticPage(locatorId);

      //Assert
      await hamburgerMenu.AssertHaveUrl(page, expectedLink);
      await hamburgerMenu.AssertHaveTitle(page, expectedTitle);
    });
}