
import { BasePage } from './BasePage';
const { expect} = require("@playwright/test");
export class HeaderStaticPages extends BasePage {
  constructor(page) {
    super(page);

    //Locators
    this.linksOfHeader = (name) =>  this.page.locator(`a.badge-${name}`);
    this.hamburgerMenu = this.page.locator("header button.hamburger-menu");
    this.charitySearchCounter = this.page.locator("div.badge span");
    this.badgeEmail = this.page.getByRole("link", { name: "Email" });
    this.searchCounter = this.page.locator("//div[@class= 'badge']");
    this.popupCharitySearchCounter = this.page.getByText(
      "Charity ProjectThis is the"
    );
  }

  //Actions

  clickLinkInHeader = async (id) => {
    await this.clickElement(this.linksOfHeader(id), `link in the header`);
  };
  clickHamburgerMenuButton = async () => {
    await this.clickElement(
      this.hamburgerMenu,
      `hamburger menu in the header static pages`
    );
  };
  clickSearchCounter = async () => {
    await this.clickElement(
      this.searchCounter,
      `charity search counter  in the header`
    );
  };
  clickBadgeEmail = async () => {
    await this.clickElement(this.badgeEmail, `badge email in the header`);
  };

  // Verify

  expectTextCharitySearchCounterToHave = async (text) => {
    await this.expectTextOfElement(this.charitySearchCounter, text);
  };
  expectPopupCharitySearchCounterToHaveText = async (text) => {
    await this.expectTextOfElement(this.popupCharitySearchCounter, text);
  };
}