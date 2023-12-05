import { BasePage } from './BasePage';
const { expect } = require('@playwright/test');

export class Slider extends BasePage {
    constructor(page) {
        super(page);
    }
}