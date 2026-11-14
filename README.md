# SauceDemo – Playwright test automation

[![Playwright Tests](https://github.com/Glass3at3r/buhler-playwright-tests-jhl/actions/workflows/playwright.yml/badge.svg)](https://github.com/Glass3at3r/buhler-playwright-tests-jhl/actions/workflows/playwright.yml)

Automated UI tests for the demo e-commerce site https://www.saucedemo.com,
written in **Playwright** and **TypeScript**.

End-to-end UI tests of the main purchase flow of the demo shop: login, adding products to the cart, checkout and logout. The goal is a small, readable and stable test suite that demonstrates Page Object Model, custom fixtures and data-driven testing.

## Contents

- [Approach](#approach)
- [Data-driven testing](#data-driven-testing)
- [Setup and teardown](#setup-and-teardown)
- [Test scenarios](#test-scenarios)
- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the tests](#running-the-tests)
- [CI/CD](#cicd)
- [Design decisions](#design-decisions)
- [Possible improvements](#possible-improvements)
- [Author](#author)

## Approach

- **Page Object Model:** locators and actions live in pages/, the pages contain no assertions.
- **Components:** shared parts of the UI (header, side menu) are separate classes in pages/components/.
- **Custom fixtures (fixtures/index.ts):** page objects are injected into tests, and chained fixtures (loggedInInventory → cartWithBackpack → checkoutPageOpened) prepare the starting state.
- **Data-driven tests:** negative login, negative checkout and sorting are generated from arrays in test-data/.
- **Independent tests:** every test gets its own browser context, so tests can run in parallel and in any order.
- **Web-first assertions:** expect(locator) with auto-retry, no fixed waits.
- **Code conventions:** test titles start with the scenario ID (`TS-04: Complete checkout`), so a test is easy to find in the report and in [docs/test-scenarios.md](docs/test-scenarios.md). Tests and non-trivial steps are commented (JSDoc above the test, a short comment where the reason is not obvious). Assertions are only in tests, never in page objects. Locators and actions have descriptive names.

## Data-driven testing

Test data lives in test-data/, separated from the test logic. A test is generated for each item of an array with a `for ... of` loop, and the item's `name` or `label` becomes part of the test title.

| Data set                | File                    | Generated tests                                                                                  |
| ----------------------- | ----------------------- | ------------------------------------------------------------------------------------------------ |
| `loginNegativeCases`    | `test-data/users.ts`    | TS-02: wrong password, unknown user, locked out user, empty username, empty password, both empty |
| `checkoutNegativeCases` | `test-data/checkout.ts` | TS-06: missing first name, last name or postal code, each with its expected error message        |
| `sortCases`             | `test-data/products.ts` | TS-13: name A-Z, name Z-A, price low-high, price high-low                                        |

Adding a new case means adding one item to the array, no new test code is needed.

## Setup and teardown

- **Setup:** chained fixtures in fixtures/index.ts prepare the starting state: `loggedInInventory` (logged-in user) → `cartWithBackpack` (product in the cart) → `checkoutPageOpened` (checkout form). A test requests only the fixture it needs. The login tests open the login page in `beforeEach`.
- **Teardown:** every test runs in its own browser context with empty cookies and localStorage, which Playwright discards after the test. SauceDemo keeps no server-side data, so no cleanup of test data is necessary and tests are independent and can run in parallel.

## Test scenarios

Full list with steps, expected results and rationale: [docs/test-scenarios.md](docs/test-scenarios.md)

**How the scenarios are prioritized**

- **P1 - critical path:** login, adding a product to the cart, completing the order and a correct order total. Without them the shop cannot be used, so they are tested first.
- **P2 - important:** negative cases and variations of the main flow (form validation, access control, cart manipulation, state after an order). A failure causes wrong data or a security gap, but does not block every user.
- **P3 - supporting:** convenience functions (sorting, product detail, closing an error message, logout, navigation back to the shop). A failure is visible, but the purchase can still be completed.

The table is ordered by priority, not by ID: IDs were assigned in the order the scenarios were identified, and later additions (TS-17, TS-18) were placed into the priority group they belong to.

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
| TS-17 | P2       | Proceed from cart to checkout           | positive              | `tests/cart.spec.ts`      |
| TS-13 | P3       | Sorting of products (by name/by price)  | positive, data-driven | `tests/inventory.spec.ts` |
| TS-14 | P3       | Product detail                          | positive              | `tests/inventory.spec.ts` |
| TS-15 | P3       | Closing of login error message          | positive              | `tests/login.spec.ts`     |
| TS-16 | P3       | Logout                                  | positive              | `tests/logout.spec.ts`    |
| TS-18 | P3       | Return from cart to the shop            | positive              | `tests/cart.spec.ts`      |

**Known defect (TS-12):** SauceDemo allows the checkout with an empty cart. The test describes the correct behavior and is marked `test.fail()`, so it is shown as `✘` (expected failure) in the report while the whole run stays green. When the application is fixed, the test starts failing and the mark has to be removed.

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

- Node.js >= 20 and npm
- Internet access: the tests run against the live site https://www.saucedemo.com
- Chromium browser, installed by Playwright (see Installation)

Dependencies (installed by `npm ci`, versions in package.json and package-lock.json):

- `@playwright/test` - test framework and browser automation
- `typescript` and `@types/node` - TypeScript compiler and Node types
- `prettier` - code formatting

**Credentials:** the tests use the public demo accounts of SauceDemo (shown on its login page), stored in `test-data/users.ts`. Nothing needs to be configured and the repository contains no secrets.

## Installation

```bash
npm ci
npx playwright install chromium
```

## Running the tests

| Command                          | Description                       |
| -------------------------------- | --------------------------------- |
| `npm test`                       | Run all tests (headless)          |
| `npm run test:headed`            | Run with a visible browser        |
| `npm run test:ui`                | Run in Playwright UI mode         |
| `npx playwright test login`      | Run a single spec file            |
| `npx playwright test -g "TS-04"` | Run a scenario by its ID or title |
| `npm run report`                 | Open the HTML report              |
| `npm run typecheck`              | Check TypeScript types            |

**Expected result:** 28 tests run in about 10 seconds and Playwright reports `28 passed`. TS-12 is marked `✘` in the list because it is an expected failure (known defect, see Test scenarios), but it counts as passed. Tests use the live site, so a rare network timeout can fail a single test; re-run it. CI retries failed tests twice.

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
- **Setup/teardown:** see [Setup and teardown](#setup-and-teardown).
- **No assertions in Page Objects:** tests decide what is verified, page objects can be reused in negative and positive scenarios.

## Possible improvements

- more browsers (Firefox, WebKit) and mobile viewports
- other users (problem_user, performance_glitch_user)
- storageState / API login to speed up setup
- visual regression tests
- more scenarios: menu (reset app state, about), cancelling checkout, cart persistence

## Author

**Jan Hlavacek** - [GitHub](https://github.com/Glass3at3r)

**Context:** this project is my solution of the test automation task for Bühler Prague: automate the testing of the demo e-commerce site https://www.saucedemo.com using Playwright and TypeScript. It covers the identification and prioritization of test scenarios, their implementation (positive and negative, data-driven) with the Page Object Model, and setup and teardown of the tests.

**Note on my approach:** the task asks for tests of selected scenarios, not for a full framework, so I focused on the main purchase flow (login, cart, checkout, logout), which carries the highest business risk, and added a few lower-priority scenarios to show the breadth of the approach. I kept the structure small and readable: page objects without assertions, fixtures for the starting state, test data separated from the test logic. I deliberately left out cross-browser runs, other demo users and visual tests; they are listed in [Possible improvements](#possible-improvements) as the next steps.

**AI usage in project:** Created with the help of Claude Code, reviewed and verified by the author.
