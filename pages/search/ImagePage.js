import { BasePage } from "../../components/BasePage.js";
const { expect, context } = require("@playwright/test");

export class ImagePage extends BasePage {
  constructor(page) {
    super();
    this.page = page;
  }
}
