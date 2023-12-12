const { expect, context, test } = require('@playwright/test');

export class BasePage {
  constructor(page) {
    this.page = page;
    this.h1Text = (page) => page.locator("//h1");
  }

  //Actions

  async clickElement(element, nameElement) {
    await test.step(`Click on the ${nameElement}`, async () => {
      await element.click();
    });
  }
  async clickEnter(element, nameElement) {
    await test.step(`Press enter on the ${nameElement}`, async () => {
      await element.press("Enter");
    });
  }
  async clickAllElementsInList(elements, nameElements) {
    await test.step(`Click on the all ${nameElements}`, async () => {
      for (const element of await elements.all()) {
        await element.click();
      }
    });
  }
  async getTextsOfElements(elements, nameElements) {
    return await test.step(`Get texts the all ${nameElements} `, async () => {
      return await elements.allTextContents();
    });
  }
  async switchToAnotherWindow() {
    return test.step("Switch to another tab and wait for page to be loaded", async () => {
      const [newPage] = await Promise.all([
        this.page.context().waitForEvent("page"),
      ]);
      await newPage.waitForLoadState("domcontentloaded");
      return newPage;
    });
  }

  async scrollByVisibleElement(element, nameElement) {
    await test.step(`Scroll to by visible ${nameElement} on the page`, async () => {
      await element.scrollIntoViewIfNeeded();
    });
  }
  async waitElementToBeVisible(element, nameElement) {
    await test.step(`Wait ${nameElement} to be visible`, async () => {
      await element.waitFor();
    });
  }
  async reloadPage() {
    await test.step("Refresh current page", async () => {
      await this.page.reload("domcontentloaded");
    });
  }
  async input(element, text, nameElement) {
    await test.step(`Input text in to the ${nameElement}`, async () => {
      await element.type(text, { delay: 100 });
    });
  }
  async waitForUrlContains(Url) {
    await test.step(`Wait for url ${Url}`, async () => {
      await this.page.waitForURL(Url);
    });
  }

  async selectOption(element, text) {
    await test.step("Waits until all specified options are present in the <select> element and selects these options. ", async () => {
      await element.selectOption(text);
    });
  }
  async goBack() {
    await test.step("Navigate to the previous page in history.", async () => {
      await this.page.goBack();
    });
  }

  // Verify

  async expectHaveTitle(newPage, title) {
    await test.step('Expect a title "to have" a substring', async () => {
      await expect(newPage).toHaveTitle(title);
    });
  }

  async expectHaveUrl(newPage, url) {
    await test.step('Expect a URL "to have" a string', async () => {
      await expect(newPage).toHaveURL(url);
    });
  }

  async expectTextOfElement(element, text) {
    await test.step('Expect the Element "to have" a string', async () => {
      await expect(element).toHaveText(text);
    });
  }
  async expectHaveValue(element, value) {
    await test.step('Expect the Element "to have" a value', async () => {
      await expect(element).toHaveValue(value);
    });
  }
  async expectListSize(elements, number) {
    await test.step('Expect the elements in the array to "have" a count', async () => {
      await expect(elements).toHaveCount(number);
    });
  }
  async expectArraySize(elements, number) {
    await test.step('Expect the elements in the array to "eqaul" a count', async () => {
      await expect(elements.length).toEqual(number);
    });
  }
  async expectElementToBeEditable(element) {
    await test.step("Expect the element points to an editable element.", async () => {
      const locator = this.page.locator(element);
      await expect(locator).toBeEditable();
    });
  }
  async expectColorsLinksWhenHovering(elements, expectedValue) {
    await test.step('Expect the elements in the array to "have" css color with value', async () => {
      for (const link of await elements.all()) {
        await link.hover();
        await expect(link).toHaveCSS("color", expectedValue);
      }
    });
  }

  async expectAttributeClassAllElements(elements, value) {
    await test.step('Expect the elements in the array to "have" attribute class with value', async () => {
      for (const attribute of await elements.all()) {
        await expect(attribute).toHaveAttribute("class", value);
      }
    });
  }
  async expectAttributeClassOfElement(element, value) {
    await test.step('Expect the element  to "have" attribute class with value ', async () => {
      await expect(element).toHaveAttribute("class", value);
    });
  }
  async expectAttributeToHaveValue(element, attribute, value) {
    await test.step(`Expect the element  to "have" attribute ${value} with value `, async () => {
      await expect(element).toHaveAttribute(attribute, value);
    });
  }
  async expectIsElementDisplayed(element) {
    await test.step('Expect the element  to "be" visible', async () => {
      await expect(element).toBeVisible();
    });
  }
  async expectElemenToBeHidden(element) {
    await test.step('Expect the element  to "be" hidden', async () => {
      await expect(element).toBeHidden;
    });
  }

  async expectAreElementsInListDisplayed(elements) {
    await test.step('Expect the element in the array to "be" visible', async () => {
      for (const image of await elements.all()) {
        await expect(image).toBeVisible();
      }
    });
  }
  async expectTextsToContains(elements, criteria) {
    await test.step('Expect the elements in the array "to contain" a string', async () => {
      for (const element of await elements.all()) {
        await expect(element).toContainText(criteria);
      }
    });
  }
  async expectH1Text(newPage, text) {
    await test.step('Expect the page  "to have" h1 text with text', async () => {
      await this.expectTextOfElement(this.h1Text(newPage), text);
    });
  }
  async expectTextsToEqual(elements, expectedText) {
    await test.step('Expect all elements to array "to equal" a string', async () => {
      await expect(elements).toEqual(expectedText);
    });
  }
  async expectScreenOfPage(element1, element2) {
    await test.step('Expect all elements to array "to equal" a string', async () => {
      await expect(this.page).toHaveScreenshot({
        fullPage: true,
        timeout: 4000,
        mask: [await element1, await element2],
      });
    });
  }
}