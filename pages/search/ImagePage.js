import { BasePage } from "../../components/BasePage.js";
const { expect, context } = require("@playwright/test");
import { Filters } from "../../components/Filters.js";

export class ImagePage extends BasePage {
  constructor(page) {
    super(page);
    this.filters = new Filters(page);
  }
}
