// @ts-check
const { defineConfig, devices } = require("@playwright/test");


const qaseConfig = {
  apiToken: 'd7517d0c2dc7a115756c1bd5666180768965912c7b00c3f38d821d27469e6260',
  projectCode: 'SWISSCOWS',
  runComplete: true,
  basePath: 'https://api.qase.io/v1',
  logging: true,
  uploadAttachments: true,
  environmentId: 1,
  rootSuiteTitle: "End2End",
};


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  snapshotDir: "./tests/snapshots",
  // globalSetup: 'utils/globalSetup.js',
  testDir: "./tests",
  timeout: 5 * 60 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"], ["list"], ["playwright-qase-reporter", qaseConfig]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: "https://dev.swisscows.com/",
    actionTimeout: 10 * 1000,
    locale: "en-GB",
    colorScheme: "light",
    screenshot: "only-on-failure",
    // video: 'retain-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
  expect: {
    toHaveScreenshot: { maxDiffPixels: 15 },
    timeout: 10 * 1000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.js/,
      teardown: "cleanup",
    },
    {
      name: "api",
      testMatch: /.*\.api\.js/,
    },
    {
      name: "ui",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "./data/auth/user.json",
        headless: false,
        viewport: { width: 1360, height: 900 },
        screenshot: "only-on-failure",
      },
      dependencies: ["setup"],
    },
    {
      name: "cleanup",
      testMatch: /.*\.teardown\.js/,
    },
   
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     headless: false,
    //     viewport: { width: 1360, height: 900 },
    //     screenshot : 'on',
    //     trace : 'retain-on-failure'
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     headless: true,
    //     viewport: { width: 1360, height: 600 },
    //     screenshot : 'on',
    //     trace : 'retain-on-failure'
    //   },
    // },
    // {
    //   name: "chromium",
    //   use: { ...devices["Desktop Chrome"] },
    // }

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
