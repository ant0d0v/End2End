const base = require("@playwright/test");
const { MainPage } = require("../pages/MainPage");
const { EmailPage } = require("../pages/static-pages/EmailPage");
const { Header } = require("../components/Header");
const { HeaderStaticPages } = require("../components/HeaderStaticPages");
const { ImagePage } = require("../pages/search/ImagePage");
const { MusicPage } = require("../pages/search/MusicPage");
const { VideoPage } = require("../pages/search/VideoPage");
const { WebPage } = require("../pages/search/WebPage");
const { HamburgerMenu } = require("../components/HamburgerMenu");
const { BotsProtection } = require("../api/BotsProtection");
const {
  DefaultSearchPage,
} = require("../pages/static-pages/DefaultSearchPage");

exports.test = base.test.extend({
  mainPage: async ({ page }, use) => {
    await page.goto(process.env.WEB_URL);
    await use(new MainPage(page));
  },
  defaultSearchPage: async ({ page }, use) => {
    await use(new DefaultSearchPage(page));
  },
  emailPage: async ({ page }, use) => {
    await use(new EmailPage(page));
  },
  header: async ({ page }, use) => {
    await page.goto(process.env.WEB_URL);
    await use(new Header(page));
  },
  headerStaticPages: async ({ page }, use) => {
    await page.goto(process.env.WEB_URL);
    await use(new HeaderStaticPages(page));
  },
  imagePage: async ({ page }, use) => {
    await use(new ImagePage(page));
  },
  musicPage: async ({ page }, use) => {
    await use(new MusicPage(page));
  },
  videoPage: async ({ page }, use) => {
    await use(new VideoPage(page));
  },
  webPage: async ({ page }, use) => {
    await use(new WebPage(page));
  },
  hamburgerMenu: async ({ page }, use) => {
    await use(new HamburgerMenu(page));
  },
  botsProtection: async ({ request }, use) => {
    await use(new BotsProtection(request));
  },
});

exports.expect = base.expect;
