import { Pagination } from "../../components/Pagination.js";
const { expect, context } = require("@playwright/test");

export class WebPage extends Pagination {
  constructor(page) {
    super(page);
  }
}
