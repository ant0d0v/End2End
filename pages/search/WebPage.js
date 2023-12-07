import { Pagination } from "../../components/Pagination.js";
import { Filters } from "../../components/Filters.js";
import { BasePage } from "../../components/BasePage.js";

export class WebPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagination = new Pagination(page);
    this.filters = new Filters(page)
  }
}
