import { BasePage } from "../../components/BasePage";
const { expect, context } = require("@playwright/test");
export class DefaultSearchPage extends BasePage {
  constructor(page) {
    super(page);
  }
}
