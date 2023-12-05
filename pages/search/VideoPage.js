import { BasePage } from "../../components/BasePage.js";
const { expect, context } = require("@playwright/test");

export class VideoPage extends BasePage {
  constructor(page) {
    super(page);
  }
}
