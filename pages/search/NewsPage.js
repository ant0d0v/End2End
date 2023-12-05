import { Pagination } from "../../components/Pagination.js";
const { expect, context } = require("@playwright/test");

export class NewsPage extends Pagination {
  constructor(page) {
    super(page);
  }
}
