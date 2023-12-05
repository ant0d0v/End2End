const { expect } = require("@playwright/test");
import { DefaultSearchPage } from "./static-pages/DefaultSearchPage";
import { BasePage } from "../components/BasePage";
import { WebPage } from "./search/WebPage";

export class MainPage extends BasePage {
  constructor(page) {
    super(page);
    // Locators
    this.serviceLinks = this.page.locator("div.services-blocks a");
    this.placeholderMainPage = this.page.getByPlaceholder(
      "Your search. Your business."
    );
    this.logoSwisscows = this.page.getByRole("img", { name: "Swisscows" });
    this.suggestionItems = this.page.locator("ul.suggestions li");
    this.suggest = this.page.locator("ul.suggestions");
    this.blockQuestionsAndAnswers = this.page.getByText(
      "Questions and AnswersWhat distinguishes the anonymous search engine Swisscows fr"
    );
    this.allQuestions = this.page.locator("h3.question");
    this.allAttributeOfQuestions = this.page.locator("div.faq-wrap div");
    this.fourQuestion = this.page
      .locator("div")
      .filter({
        hasText:
          "How can I switch from another search engine to the anonymous search engine Swiss",
      })
      .nth(4);
    this.linkInTheFourQuestion = this.page.getByRole("link", {
      name: "instructions",
    });
    this.popupGoogleInstall = this.page.getByRole("link", {
      name: "Stay with us and set Swisscows as your default search engine.",
    });
    this.containerGoogleInstall = this.page.locator(
      "//a[@class = 'install-sw-block popup']"
    );
    this.answersToQuestions = this.page.locator("p.answer");
    this.closeButtonPopupGoogle = this.page
      .getByRole("banner")
      .locator("div")
      .filter({
        hasText:
          "Install Swisscows at Google ChromeStay with us and set Swisscows as your default",
      })
      .getByRole("button");
    this.widgetMainPage = this.page.locator("//div[@class ='bnnr-widget']");
    this.imagesOfServiceBlock = this.page.locator("div.services-blocks img");
    this.serviceBlock = this.page.locator("div.services-blocks");
    this.linksOfServiceBlock = (name) =>
      page.getByRole("link", { name: name });
  }

  //Actions

  clickAllQuestions = async () => {
    await this.clickAllElementsInList(this.allQuestions,`questions`);
    return this;
  };

  clickLinkInServiceBlock = async (id) => {
    await this.clickElement(this.linksOfServiceBlock(id),`link of service block `);
  };

  clickEnterSearchField = async () => {
    await this.clickEnter(this.placeholderMainPage, `search field`);
    return new WebPage(this.page);
  };

  getTextsOfAllQuestions = async () => {
    return this.getTextsOfElements(this.answersToQuestions, `answers`);
  };
  waitToBeVisibleSuggest = async () => {
    await this.waitElementToBeVisible(this.suggest, `suggest`);
    return this;
  };
  scrollToBlockQuestionsAndAnswers = async () => {
    await this.scrollByVisibleElement(this.blockQuestionsAndAnswers, `accordion menu`);
    return this;
  };
  scrollToContainerGoogleInstall = async () => {
    await this.scrollByVisibleElement(this.containerGoogleInstall,`container google Install`);
    return this;
  };
  scrollToServicesBlock = async () => {
    await this.scrollByVisibleElement(this.serviceBlock, `services block`);
    return this;
  };

  inputSearchCriteria = async (text) => {
    await this.input(this.placeholderMainPage, text,`search field`);
    return this;
  };
  clickLogoSwisscows = async () => {
    await this.clickElement(this.logoSwisscows, `logo swisscows on the main page`);
    return this;
  };
  clickSearchField = async () => {
    await this.clickElement(this.placeholderMainPage,`search field on the main page`);
    return this;
  };
  clickFourQuestion = async () => {
    await this.clickElement(this.fourQuestion, `four question in accordion menu`);
    return new DefaultSearchPage();
  };
  clickLinkInTheFourQuestion = async () => {
    await this.clickElement(this.linkInTheFourQuestion, `link of four question in accordion menu`);
  };
  clickPopupGoogleInstall = async () => {
    await this.clickElement(this.popupGoogleInstall, `popup google install on the main page`);
  };
  clickContainerGoogleInstall = async () => {
    await this.clickElement(this.containerGoogleInstall, `container google install on the main page`);
  };
  clickCloseButtonPopupGoogle = async () => {
    await this.clickElement(this.closeButtonPopupGoogle, `close button of popup google`);
    return this;
  };

  // Verify
  AssertQuestionsAreOpened = async () => {
    await this.AssertAttributeClassAllElements(
      this.allAttributeOfQuestions,
      "faq open"
    );
  };
  AssertQuestionsAreClosed = async () => { 
    await this.AssertAttributeClassAllElements(this.allAttributeOfQuestions,"faq");
  };
  AssertSuggestIsDisplayed = async () => {
    await this.AssertIsElementDisplayed(this.suggest);
  };
  AssertPopupGoogleInstallIsDisplayed = async () => {
    await this.AssertIsElementDisplayed(this.popupGoogleInstall);
  };
  AssertSuggestToHaveCount = async (number) => {
    this.AssertListSize(this.suggestionItems, number);
  };

  AssertScreenMainPage = async () => {
    await this.AssertScreenOfPage(this.widgetMainPage,this.imagesOfServiceBlock );
  };

  AssertTextOfPopupGoogleInstall = async (text) => {
    this.AssertTextOfElement(this.popupGoogleInstall, text);
  };

  AssertImagesOfSrviceBlockAreDisplayed = async () => {
    await this.AssertAreElementsInListDisplayed(this.imagesOfServiceBlock);
  };

  AssertSuggestToContains = async (criteria) => {
    this.AssertTextsToContains(this.suggestionItems, criteria);
  };
}
