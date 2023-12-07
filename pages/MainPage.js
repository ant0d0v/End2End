const { expect } = require("@playwright/test");
import { DefaultSearchPage } from "./static-pages/DefaultSearchPage";
import { BasePage } from "../components/BasePage";
import { HeaderStaticPages } from "../components/HeaderStaticPages";
import { WebPage } from "./search/WebPage";

export class MainPage extends BasePage {
  constructor(page) {
    super(page);
    // Locators
    this.placeholderMainPage = this.page.getByPlaceholder("Your search. Your business.");
    this.logoSwisscows = this.page.getByRole("img", {name: "Swisscows",exact: true,});
    this.suggestionItems = this.page.locator("ul.suggestions li");
    this.suggest = this.page.locator("ul.suggestions");
    this.blockQuestionsAndAnswers = this.page.getByText(
      "Questions and AnswersWhat distinguishes the anonymous search engine Swisscows fr"
    );
    this.allQuestions = this.page.locator("h3.question");
    this.allAttributeOfQuestions = this.page.locator("div.faq-wrap div");
    this.fourQuestion = this.page.locator("div").filter({ hasText: "How can I switch from another" }).nth(2);
    this.linkInTheFourQuestion = this.page.getByRole("link", {name: "instructions",});
    this.popupInstallSwisscowsLink = this.page.getByRole("link", {name: "Stay with us and set",});
    this.installSwisscowsBlock = this.page.locator("//a[@class = 'install-sw-block popup']");
    this.answersToQuestions = this.page.locator("p.answer");
    this.closeButtonOfPopupInstallSwisscowsLink = this.page.locator("div.home-link-instruction button.erase");
    this.widgetMainPage = this.page.locator("//div[@class ='bnnr-widget']");
    this.imagesOfServiceBlock = this.page.locator("div.services-blocks img");
    this.serviceBlock = this.page.locator("div.services-blocks");
    this.linksOfServiceBlock = (name) => page.getByRole("link", { name: name });
    this.buttonOfServiceBlock = page.locator("a.services-block-link");
  }

  //Actions

  clickAllQuestions = async () => {
    await this.clickAllElementsInList(this.allQuestions, `questions`);
    return this;
  };

  clickLinkInServiceBlock = async (id) => {
    await this.clickElement(
      this.linksOfServiceBlock(id),
      `link of service block `
    );
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
    await this.scrollByVisibleElement(
      this.blockQuestionsAndAnswers,
      `accordion menu`
    );
    return this;
  };
  scrollToInstallSwisscowsBlock = async () => {
    await this.scrollByVisibleElement(
      this.installSwisscowsBlock,
      `block install swisscows Install`
    );
    return this;
  };
  scrollToServicesBlock = async () => {
    await this.scrollByVisibleElement(this.serviceBlock, `services block`);
    return this;
  };

  inputSearchCriteria = async (text) => {
    await this.input(this.placeholderMainPage, text, `search field`);
    return this;
  };
  clickLogoSwisscows = async () => {
    await this.clickElement(
      this.logoSwisscows,
      `logo swisscows on the main page`
    );
    return this;
  };
  clickSearchField = async () => {
    await this.clickElement(
      this.placeholderMainPage,
      `search field on the main page`
    );
    return this;
  };
  clickFourQuestion = async () => {
    await this.clickElement(
      this.fourQuestion,
      `four question in accordion menu`
    );
    return new DefaultSearchPage();
  };
  clickLinkInTheFourQuestion = async () => {
    await this.clickElement(
      this.linkInTheFourQuestion,
      `link of four question in accordion menu`
    );
  };
  clickPopupInstallSwisscowsLink = async () => {
    await this.clickElement(
      this.popupInstallSwisscowsLink,
      `popup install swisscows link on the main page`
    );
  };
  clickInstallSwisscowsBlock = async () => {
    await this.clickElement(
      this.installSwisscowsBlock,
      `container install swisscows block on the main page`
    );
  };
  clickCloseButtonOfPopupInstallSwisscowsLink = async () => {
    await this.clickElement(
      this.closeButtonOfPopupInstallSwisscowsLink,
      `close button of popup install swisscows link`
    );
    return this;
  };

  // Verify
  expectQuestionsAreOpened = async () => {
    await this.expectAttributeClassAllElements(
      this.allAttributeOfQuestions,
      "faq open"
    );
  };
  expectQuestionsAreClosed = async () => {
    await this.expectAttributeClassAllElements(
      this.allAttributeOfQuestions,
      "faq"
    );
  };
  expectSuggestIsDisplayed = async () => {
    await this.expectIsElementDisplayed(this.suggest);
  };
  expectPopupInstallSwisscowsLinkIsDisplayed = async () => {
    await this.expectIsElementDisplayed(this.popupInstallSwisscowsLink);
  };
  expectSuggestToHaveCount = async (number) => {
    this.expectListSize(this.suggestionItems, number);
  };

  expectScreenMainPage = async () => {
    await this.expectScreenOfPage(
      this.widgetMainPage,
      this.imagesOfServiceBlock
    );
  };

  expectTextOfPopupInstallSwisscowsLink = async (text) => {
    this.expectTextOfElement(this.popupInstallSwisscowsLink, text);
  };

  expectImagesOfSrviceBlockAreDisplayed = async () => {
    await this.expectAreElementsInListDisplayed(this.imagesOfServiceBlock);
  };

  expectSuggestToContains = async (criteria) => {
    this.expectTextsToContains(this.suggestionItems, criteria);
  };
}
