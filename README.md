# SauceDemo – Playwright test automation

[![Playwright Tests](https://github.com/Glass3at3r/buhler-playwright-tests-jhl/actions/workflows/playwright.yml/badge.svg)](https://github.com/Glass3at3r/buhler-playwright-tests-jhl/actions/workflows/playwright.yml)

Automated UI tests for the demo e-commerce site https://www.saucedemo.com,
written in **Playwright** and **TypeScript**.

End-to-end UI tests of the main purchase flow of the demo shop: login, adding products to the cart, checkout and logout. The goal is a small, readable and stable test suite that demonstrates Page Object Model, custom fixtures and data-driven testing.

## Contents

- [Approach](#approach)
- [Test scenarios](#test-scenarios)
- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the tests](#running-the-tests)
- [CI/CD](#cicd)
- [Design decisions](#design-decisions)
- [Possible improvements](#possible-improvements)

## Approach

- **Page Object Model:** locators and actions live in pages/, the pages contain no assertions.
- **Components:** shared parts of the UI (header, side menu) are separate classes in pages/components/.
- **Custom fixtures (fixtures/index.ts):** page objects are injected into tests, and chained fixtures (loggedInInventory → cartWithBackpack → checkoutPageOpened) prepare the starting state.
- **Data-driven tests:** negative login, negative checkout and sorting are generated from arrays in test-data/.
- **Independent tests:** every test gets its own browser context, so tests can run in parallel and in any order.
- **Web-first assertions:** expect(locator) with auto-retry, no fixed waits.

## Test scenarios

Full list with priorities and rationale: [docs/test-scenarios.md](docs/test-scenarios.md)

| ID    | Priority | Scenario                                | Type                  | Implemented in            |
| ----- | -------- | --------------------------------------- | --------------------- | ------------------------- |
| TS-01 | P1       | Successful login                        | positive              | `tests/login.spec.ts`     |
| TS-02 | P1       | Login with invalid data                 | negative, data-driven | `tests/login.spec.ts`     |
| TS-03 | P1       | Add product to cart                     | positive              | `tests/inventory.spec.ts` |
| TS-04 | P1       | Complete checkout                       | positive              | `tests/checkout.spec.ts`  |
| TS-05 | P1       | Order summary: item total, tax, total   | positive              | `tests/checkout.spec.ts`  |
| TS-06 | P2       | Checkout with missing data              | negative, data-driven | `tests/checkout.spec.ts`  |
| TS-07 | P2       | Removing a product from cart            | positive              | `tests/cart.spec.ts`      |
| TS-08 | P2       | Adding multiple products to cart        | positive              | `tests/inventory.spec.ts` |
| TS-09 | P2       | Inventory not accessible without login  | negative              | `tests/login.spec.ts`     |
| TS-10 | P2       | State after completed order             | positive              | `tests/checkout.spec.ts`  |
| TS-11 | P2       | Removing a product on inventory page    | positive              | `tests/inventory.spec.ts` |
| TS-12 | P2       | Checkout with empty cart (known defect) | negative              | `tests/cart.spec.ts`      |
| TS-13 | P3       | Sorting of products (by name/by price)  | positive, data-driven | `tests/inventory.spec.ts` |
| TS-14 | P3       | Product detail                          | positive              | `tests/inventory.spec.ts` |
| TS-15 | P3       | Closing of login error message          | positive              | `tests/login.spec.ts`     |
| TS-16 | P3       | Logout                                  | positive              | `tests/logout.spec.ts`    |

## Project structure

```
pages/                Page Objects (locators and actions, no assertions)
pages/components/     Reusable UI components (header, side menu)
fixtures/             Custom Playwright fixtures (page objects, logged-in user)
test-data/            Test data used by data-driven tests
utils/                Small helpers (price parsing, sorting)
tests/                Test specifications
docs/                 Test scenarios and their priorities
playwright.config.ts  Playwright configuration
tsconfig.json         TypeScript configuration
.github/workflows/    CI pipeline (GitHub Actions)
```

## Prerequisites

- Node.js >= 20
- npm

## Installation

```bash
npm ci
npx playwright install chromium
```

## Running the tests

| Command                     | Description                |
| --------------------------- | -------------------------- |
| `npm test`                  | Run all tests (headless)   |
| `npm run test:headed`       | Run with a visible browser |
| `npm run test:ui`           | Run in Playwright UI mode  |
| `npx playwright test login` | Run a single spec file     |
| `npm run report`            | Open the HTML report       |
| `npm run typecheck`         | Check TypeScript types     |

## CI/CD

Workflow .github/workflows/playwright.yml runs on every push and pull request to main:

- npm ci
- npm run typecheck
- install Chromium
- npx playwright test (1 worker, 2 retries on CI)
- the HTML report is uploaded as an artifact playwright-report (kept 30 days)

## Design decisions

- **Chromium only:** keeps the suite fast; other browsers are a one-line addition in playwright.config.ts.
- **data-test locators:** testIdAttribute: 'data-test' is set in the config, so getByTestId() uses the attributes SauceDemo provides. They are more stable than CSS. Where an element has no data-test (burger menu), getByRole or a CSS class is used and commented.
- **Setup/teardown:** setup is done by chained fixtures in fixtures/index.ts (login → cart with product → checkout form) and by `beforeEach` in the login tests, so each test starts from exactly the state it needs. Teardown is handled by Playwright: every test runs in a fresh browser context (empty cookies and localStorage), and SauceDemo keeps no server-side data, so no explicit cleanup of test data is necessary.
- **No assertions in Page Objects:** tests decide what is verified, page objects can be reused in negative and positive scenarios.

## Possible improvements

- more browsers (Firefox, WebKit) and mobile viewports
- other users (problem_user, performance_glitch_user)
- storageState / API login to speed up setup
- visual regression tests
- more scenarios: menu (reset app state, about), cancelling checkout, cart persistence
