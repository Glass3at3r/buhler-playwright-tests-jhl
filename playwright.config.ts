import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for the SauceDemo test suite.
 * Docs: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  /* Tests are independent, so they can run in parallel (faster feedback). */
  fullyParallel: true,

  /* Fail the CI build if a forgotten test.only is left in the code. */
  forbidOnly: !!process.env.CI,

  /* Retry only on CI, where flakiness from shared runners is more likely. */
  retries: process.env.CI ? 2 : 0,

  /* One worker on CI = more stable results on small shared runners. */
  workers: process.env.CI ? 1 : undefined,

  /* Console output for quick feedback + HTML report that never blocks the terminal/CI. */
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    /* Lets tests use relative paths: page.goto('/') or page.goto('/inventory.html'). */
    baseURL: 'https://www.saucedemo.com',

    /* SauceDemo marks elements with data-test, so getByTestId() targets them. */
    testIdAttribute: 'data-test',

    /* Trace is collected only when a test is retried (small overhead, rich debug info). */
    trace: 'retain-on-failure',

    /* Screenshot only for failed tests. */
    screenshot: 'only-on-failure',
  },

  /* Single browser keeps the suite fast and focused; more can be added later. */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
