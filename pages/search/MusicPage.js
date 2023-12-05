import { BasePage} from "../../components/BasePage.js";
const { expect, context } = require("@playwright/test");

export class MusicPage extends BasePage {
  constructor(page) {
    super(page);
  }
}
