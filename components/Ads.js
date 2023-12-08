import { BasePage } from "./BasePage";
const { expect } = require("@playwright/test");

export class Ads extends BasePage {
  constructor(page) {
    super(page);
  }
}
