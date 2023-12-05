import { BasePage } from "../../components/BasePage";
const { expect, context } = require("@playwright/test");
export class EmailPage extends BasePage {
  constructor(page) {
    super(page);
  }
}