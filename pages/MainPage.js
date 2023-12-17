const { expect } = require("@playwright/test");
import { DefaultSearchPage } from "./static-pages/DefaultSearchPage";
import { BasePage } from "../base/BasePage";

export class MainPage extends BasePage {
  constructor(page) {
    super(page);
    // Locators
    this.logoSwisscows = this.page.getByRole("img", {name: "Swisscows",exact: true,});
    this.blockQuestionsAndAnswers = this.page.getByText(
      "Questions and AnswersWhat distinguishes the anonymous search engine Swisscows fr"
    );
    this.allQuestions = this.page.locator("h3")
      .filter([
        { hasText: 'What distinguishes the anonymous search engine Swisscows from other search engines?' },
        { hasText: 'Who guarantees that my data is really not stored in the private search engine Swisscows?' },
        { hasText: 'Are the search results on the private search engine Swisscows as good as on other search engines?' },
        { hasText: 'How can I switch from another search engine to the anonymous search engine Swisscows?' },
        { hasText: 'How does the anonymous search engine Swisscows earn its money?' },
        { hasText: 'Why is the private search engine Swisscows against surveillance?' },
      ]
      )
    this.allAttributeOfQuestions = this.page.locator("div.faq-wrap div");
    this.fourQuestion = this.page.locator("h3").filter({ hasText: "How can I switch from another search engine to the anonymous search engine Swisscows?" })
    this.linkInTheFourQuestion = this.page.getByRole("link", {name: "instructions",});
    this.popupInstallSwisscowsLink = this.page.getByRole("link", {name: "Stay with us and set",});
    this.installSwisscowsBlock = this.page.getByRole("link", { name: "Install Swisscows The",});
    this.answersToQuestions = this.page.locator("p.answer");
    this.closeButtonOfPopupInstallSwisscowsLink = this.page.locator('div').filter({ hasText: 'Install Swisscows' }).getByRole('button')
    this.widgetMainPage = this.page.locator("widget");
    this.imagesOfServiceBlock = this.page.locator("services-block").and(this.page.getByRole("img"));
    this.serviceBlock = this.page.locator("div.services-blocks");
    this.linksOfServiceBlock = (name) => this.page.getByRole("link", { name: name });
    this.buttonOfServiceBlock = this.page.locator("button-install").filter({hasText: "Install Swisscows" });
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

  getTextsOfAllQuestions = async () => {
    return this.getTextsOfElements(this.answersToQuestions, `answers`);
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

  clickLogoSwisscows = async () => {
    await this.clickElement(
      this.logoSwisscows,
      `logo swisscows on the main page`
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

  expectPopupInstallSwisscowsLinkIsDisplayed = async () => {
    await this.expectIsElementDisplayed(this.popupInstallSwisscowsLink);
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
}
