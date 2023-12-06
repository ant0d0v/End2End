// @ts-check
const { test, expect } = require("../utils/fixtures");
const testData = JSON.parse(
  JSON.stringify(require("../data/main-page/testData.json"))
);


  test("Check that suggest is displayed", async ({ mainPage }) => {
    
    await mainPage.inputSearchCriteria(testData.searchCriteria.criteria);
    await mainPage.clickLogoSwisscows();
    await mainPage.clickSearchField();
    await mainPage.waitToBeVisibleSuggest();
  
    //Assert
    await mainPage.expectSuggestIsDisplayed();
    await mainPage.expectSuggestToHaveCount(5);
    await mainPage.expectSuggestToContains(testData.searchCriteria.criteria);
  });

  test("Check that all questions were opened on the main page.", async ({
    mainPage,
  }) => {
    await mainPage.scrollToBlockQuestionsAndAnswers();
    await mainPage.clickAllQuestions();
    
    //Assert
    await mainPage.expectQuestionsAreOpened();
  });
  
  test("Check that a question and answer can be opened and closed on the main page.", async ({
    mainPage,
  }) => {
    await mainPage.scrollToBlockQuestionsAndAnswers();
    await mainPage.clickAllQuestions();
    
    //Assert
    await mainPage.expectQuestionsAreOpened();

    await mainPage.clickAllQuestions();

     //Assert
    await mainPage.expectQuestionsAreClosed();
  });

  test("Check that the link in the fourth question leads to the expected URL.", async ({
    mainPage,
    context,
    defaultSearchPage 
  }) => {
    const expectedH1text = "How to use Swisscows as default search";

    await mainPage.scrollToBlockQuestionsAndAnswers();
    await mainPage.clickFourQuestion();
    await mainPage.clickLinkInTheFourQuestion();
    const DefaultSearchPage = await mainPage.switchToAnotherWindow(context);
   
    //Assert
    await defaultSearchPage.expectHaveUrl(DefaultSearchPage, testData.url.defaultSearchPage);
    await defaultSearchPage.expectH1Text(DefaultSearchPage, expectedH1text);
  });

  test("Check that popup google install Is Dysplaed", async ({ mainPage }) => {
    const expectedText = "Stay with us and set Swisscows as your default search engine. ";
    
     //Assert
    await mainPage.expectPopupInstallSwisscowsLinkIsDisplayed();;
    await mainPage.expectTextOfPopupInstallSwisscowsLink(expectedText);
  });

  test('Check that popup "google install" redirect to the corresponding page', async ({
    mainPage,
    context,
  }) => {
  
     await mainPage.expectPopupInstallSwisscowsLinkIsDisplayed();
     await mainPage.clickPopupInstallSwisscowsLink();

     const newPage = await mainPage.switchToAnotherWindow(context);
    
     //Assert
    await mainPage.expectHaveUrl( newPage, new RegExp(testData.url.extensionGoogleInstall));
    await mainPage.expectHaveTitle(newPage, /Swisscows/);
  });
  
  test('Check that the "Install Google Block" button redirect to coresponding URL.', async ({
    mainPage,
    context,
  }) => {
    await mainPage.scrollToInstallSwisscowsBlock();
    await mainPage.clickInstallSwisscowsBlock();
    
    const externalPage = await mainPage.switchToAnotherWindow(context);;
     
    //Assert
    await mainPage.expectHaveUrl(externalPage,new RegExp(testData.url.extensionGoogleInstall));
    await mainPage.expectHaveTitle(externalPage, /Swisscows/);
  });

  test("Check the texts of questions on the main page.", async ({
    mainPage,
  }) => {
    const expectedAnswers = ["Our anonymous search engine protects the privacy of our users when searching and from inappropriate content when finding it. We do not use cookies or other tracking technologies, with us each search query remains anonymous and each user a guest without a user profile.",
      "Protecting our users' data is an essential part of our DNA and thus a core promise of the anonymous search engine Swisscows. We do not store data, build search history or deliver ads based on collected data. Our technology is built in such a way that the storage of user data is not even possible.",
      "With us you are sure to find what you are looking for! Thanks to the cooperation of our anonymous search engine with Bing, as well as over 20 years of experience and research in the field of search technologies and a constant development, there are hardly any search requests that we cannot fulfill. The index-based country search and Swisscow's semantics ensure intelligent and fast finding.",
      "Switching is possible at any time. To use the anonymous search engine Swisscows as the default search engine in the browser (Chrome, Edge, Firefox, etc.), simply click on the link that appears below the search box and follow the browser-specific instructions. This is as simple and safe as searching with the anonymous search engine Swisscows.",
      "We earn money with search ads delivered by Bing. Swisscows has an exclusive cooperation agreement with Bing. These ads appear exclusively based on your own search query, which is submitted to Bing. The anonymous search engine Swisscows does not collect personal data and accordingly cannot transmit any data. From each click on an ad, Swisscows receives a share of the advertising revenue from Bing. In this way, we continue to invest in our technology and support social projects.", "Our vision is that every user can be online without fear of surveillance, annoying advertising and unwanted data storage. We have been working towards this goal for over 20 years. Fortunately, data security has now become a relevant topic and many people have understood what all happens to their data completely without their knowledge.We don't want to share our users' data, we want to value it. That's why we developed Swisscows, the anonymous search engine, and other products: • TeleGuard - our data secure messenger (WhatsApp alternative) • Swisscows - works like a firewall and also helps to visit websites anonymously • GetDigest - an AI-based program that helps summarize web content and text documents and quickly delivers the relevant information.Our growing team continues to develop and research innovations that protect users and their privacy on the World Wide Web."]
   
    await mainPage.scrollToBlockQuestionsAndAnswers();
    await mainPage.clickAllQuestions();
    const actualAnswers = await mainPage.getTextsOfAllQuestions();
  
     //Assert
    await mainPage.expectArraySize(actualAnswers, 6);
    await mainPage.expectTextsToEqual(actualAnswers, expectedAnswers);
  });
  
  
  test("Check that buttons have hover over the services block on main page", async ({
    mainPage
  }) => {
    const expectedColorWhenHovering = "rgb(223, 93, 93)"
    await mainPage.scrollToServicesBlock();
    
     //Assert
    await mainPage.expectColorsLinksWhenHovering(mainPage.buttonOfServiceBlock, expectedColorWhenHovering);
  });

  test("Check design of the main page ", async ({ mainPage }) => {
    await mainPage.clickCloseButtonOfPopupInstallSwisscowsLink();
    
    //Assert
    await mainPage.expectScreenMainPage();
  });

  test("Check design dark theme of the main page ", async ({ mainPage, headerStaticPages, hamburgerMenu }) => {
    //Actions
  
    await headerStaticPages.clickHamburgerMenuButton()
    await hamburgerMenu.clickThemeDropdownInHamburgerMenu()
    await hamburgerMenu.clickDarkInHamburgerMenu()

    //Assert
    await mainPage.expectScreenMainPage();
  });

  test("Check that images are dysplaed of the service block", async ({ mainPage }) => {
    await mainPage.scrollToServicesBlock();
     
    //Assert
    await mainPage.expectImagesOfSrviceBlockAreDisplayed();
  });
  
  for (const {testID, expectedLink, locatorId, expectedTitle} of testData.servicesBlockLinks) {
    test(`${testID} Check that the ${locatorId} link navigate to the corresponding page.`, async ({
      mainPage,
    }) => {
      await mainPage.scrollToServicesBlock();
      await mainPage.clickLinkInServiceBlock(locatorId);
      const newPage = await mainPage.switchToAnotherWindow();

      //Assert

      await mainPage.expectHaveUrl(newPage, expectedLink);
      await mainPage.expectHaveTitle(newPage, expectedTitle);
    });
  }
  
