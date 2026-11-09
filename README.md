# SauceDemo – Playwright test automation

[![Playwright Tests](https://github.com/Glass3at3r/buhler-playwright-tests-jhl/actions/workflows/playwright.yml/badge.svg)](https://github.com/Glass3at3r/buhler-playwright-tests-jhl/actions/workflows/playwright.yml)

Automated UI tests for the demo e-commerce site https://www.saucedemo.com,
written in **Playwright** and **TypeScript**.

<!-- TODO: 1–2 sentences: what is tested and what the goal of the project is. -->

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

<!-- TODO: short summary – Page Object Model, custom fixtures, data-driven tests,
     test independence, web-first assertions. -->

## Test scenarios

Full list with priorities and rationale: [docs/test-scenarios.md](docs/test-scenarios.md)

| Priority | Scenario | Type | Implemented in |
|---|---|---|---|
| P1 | Successful login | positive | `tests/login.spec.ts` |
| P1 | Login with invalid data (data-driven) | negative | `tests/login.spec.ts` |
| P1 | Add product to cart | positive | <!-- TODO --> |
| P1 | Complete checkout | positive | <!-- TODO --> |
| P2 | Checkout with missing data (data-driven) | negative | <!-- TODO --> |

<!-- TODO: keep this table in sync with docs/test-scenarios.md. -->

## Project structure

```
pages/         Page Objects (locators and actions, no assertions)
fixtures/      Custom Playwright fixtures (page objects, logged-in user)
test-data/     Test data used by data-driven tests
tests/         Test specifications
docs/          Test scenarios and their priorities
playwright.config.ts
tsconfig.json
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

| Command | Description |
|---|---|
| `npm test` | Run all tests (headless) |
| `npm run test:headed` | Run with a visible browser |
| `npm run test:ui` | Run in Playwright UI mode |
| `npx playwright test login` | Run a single spec file |
| `npm run report` | Open the HTML report |
| `npm run typecheck` | Check TypeScript types |

## CI/CD

<!-- TODO: GitHub Actions workflow (.github/workflows/playwright.yml): triggers,
     steps (npm ci, typecheck, install browser, run tests), HTML report uploaded as an artifact. -->

## Design decisions

<!-- TODO: why Chromium only; why data-test locators (testIdAttribute);
     how setup/teardown works (fixtures, isolated browser context per test);
     why Page Objects contain no assertions. -->

## Possible improvements

<!-- TODO: more browsers, visual tests, API-level setup, other users (problem_user, ...). -->
