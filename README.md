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

Page Object Model: locators and actions live in pages/, the pages contain no assertions.
Components: shared parts of the UI (header, side menu) are separate classes in pages/components/.
Custom fixtures (fixtures/index.ts): page objects are injected into tests, and chained fixtures (loggedInInventory → cartWithBackpack → checkoutPageOpened) prepare the starting state.
Data-driven tests: negative login, negative checkout and sorting are generated from arrays in test-data/.
Independent tests: every test gets its own browser context, so tests can run in parallel and in any order.
Web-first assertions: expect(locator) with auto-retry, no fixed waits.

## Test scenarios

Full list with priorities and rationale: [docs/test-scenarios.md](docs/test-scenarios.md)

| Priority | Scenario                                 | Type     | Implemented in            |
| -------- | ---------------------------------------- | -------- | ------------------------- |
| P1       | Successful login                         | positive | `tests/login.spec.ts`     |
| P1       | Login with invalid data (data-driven)    | negative | `tests/login.spec.ts`     |
| P1       | Add product to cart                      | positive | `tests/inventory.spec.ts` |
| P1       | Complete checkout                        | positive | `tests/checkout.spec.ts`  |
| P2       | Checkout with missing data (data-driven) | negative | `tests/checkout.spec.ts`  |
| P2       | Removing a product from cart             | positive | `tests/cart.spec.ts`      |
| P3       | Sorting of products (by name/by price)   | positive | `tests/inventory.spec.ts` |
| P3       | Logout                                   | positive | `tests/logout.spec.ts`    |

## Project structure

```
pages/         Page Objects (locators and actions, no assertions)
pages/components    Page Objects components (locators and actions, no assertions)
fixtures/      Custom Playwright fixtures (page objects, logged-in user)
test-data/     Test data used by data-driven tests
tests/         Test specifications
docs/          Test scenarios and their priorities
playwright.config.ts
tsconfig.json
.github/workflows
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

npm ci
npm run typecheck
install Chromium
npx playwright test (1 worker, 2 retries on CI)
the HTML report is uploaded as an artifact playwright-report (kept 30 days)

## Design decisions

Chromium only: keeps the suite fast; other browsers are a one-line addition in playwright.config.ts.
data-test locators: testIdAttribute: 'data-test' is set in the config, so getByTestId() uses the attributes SauceDemo provides. They are more stable than CSS. Where an element has no data-test (burger menu), getByRole or a CSS class is used and commented.
Setup/teardown: Playwright creates a fresh context per test, so no cleanup is needed (cookies and localStorage start empty).
No assertions in Page Objects: tests decide what is verified, page objects can be reused in negative and positive scenarios.

## Possible improvements

more browsers (Firefox, WebKit) and mobile viewports
other users (problem_user, performance_glitch_user)
storageState / API login to speed up setup
visual regression tests
multiple products in the cart and total price calculation
