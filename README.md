# Playwright-BDD Framework

A TypeScript test automation framework that runs Gherkin scenarios through
[playwright-bdd](https://github.com/vitalets/playwright-bdd) and the native
[Playwright Test](https://playwright.dev/docs/intro) runner.

The included UI and visual test suites exercise the [SauceDemo](https://www.saucedemo.com/) application using Gherkin scenarios and the Page Object Model. The API suite targets [JSONPlaceholder](https://jsonplaceholder.typicode.com/) using Playwright's API request fixture, reusable API clients, payload builders, and Zod schema validation.

## Features

- BDD scenarios written in Gherkin
- Page Object Model for reusable UI interactions
- Native Playwright fixtures and browser lifecycle
- Chromium execution with isolated browser contexts
- Parallel execution and Playwright projects
- Tag-based test selection
- Screenshots, traces, and videos for test runs
- Playwright, Cucumber-style, and Allure HTML reports
- Native Playwright visual comparisons
- API automation with reusable API clients
- API response assertions and Zod schema validation
- Template-based API payload builders
- Environment-based configuration
- TypeScript strict mode

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer
- npm

## Installation

Clone the repository and install its dependencies:

```bash
npm install
npx playwright install chromium
```

## Configuration

Create or update the `.env` file in the project root:

```env
BASE_URL=https://www.saucedemo.com
API_BASE_URL=https://jsonplaceholder.typicode.com
HEADLESS=true
```

| Variable | Description | Default |
| --- | --- | --- |
| `BASE_URL` | Application URL used by browser contexts | `https://www.saucedemo.com` |
| `API_BASE_URL` | Base URL used by API clients | `https://jsonplaceholder.typicode.com` |
| `HEADLESS` | Set to `false` to open the browser UI | `true` |

## Running Tests

Run all scenarios:

```bash
npm test
```

First time, create or update visual baselines:

```bash
npm run test:update-snapshots -- --grep @visual
```

Run visual tests:

```bash
npm run test:visual
```
Run API scenarios tagged with `@api`:

```bash
npm run test:api
```

Run scenarios tagged with `@smoke`:

```bash
npm run test:smoke
```

Run with the browser visible:

```bash
npm run test:headed
```

Pass additional Playwright CLI arguments after `--`:

```bash
npm test -- --grep "successful login"
npm test -- --project chromium
```

Open Playwright UI mode:

```bash
npm run test:ui
```

Run the TypeScript type checker without executing tests:

```bash
npm run typecheck
```

Generate Playwright tests from the feature files without running them:

```bash
npm run bddgen
```

Generated files are written to `.features-gen/` and should not be edited or
committed.

## Reports and Artifacts

Each test run generates the following output:

| Output | Location |
| --- | --- |
| Playwright HTML report | `playwright-report/index.html` |
| Cucumber HTML report | `reports/cucumber-report.html` |
| Screenshots, traces, and videos | `test-results/` |
| Allure raw results | `allure-results/` |

Open the Playwright report:

```bash
npm run report
```

Open the Cucumber report:

```bash
npm run report:cucumber
```

Generate and open the Allure report:

```bash
npm run allure:generate
npm run allure:open
```

Or serve the Allure results directly:

```bash
npm run allure:serve
```

Remove generated tests and Playwright/Cucumber reports:

```bash
npm run clean:reports
```

## Visual Validation

Playwright visual comparisons are available directly in BDD steps:

```ts
Then('the dashboard should match the approved design', async ({ page }) => {
  await expect(page).toHaveScreenshot('dashboard.png', {
    fullPage: true,
    animations: 'disabled'
  });
});
```

Approve or refresh baselines with:

```bash
npm run test:update-snapshots
```

## Project Structure

```text
.
├── src/
│   ├── ui/                   # UI and visual automation
│   │   ├── features/         # UI and visual Gherkin feature files
│   │   ├── step-definitions/ # UI and visual step implementations
│   │   ├── pages/            # Page Object Model classes
│   │   └── test-data/        # UI test data
│   ├── api/                  # API automation
│   │   ├── features/         # API Gherkin feature files
│   │   ├── step-definitions/ # API step implementations
│   │   ├── clients/          # Reusable API clients
│   │   ├── assertions/       # API response assertions
│   │   ├── models/           # TypeScript request/response models
│   │   ├── payloads/         # Template-based request payload builders
│   │   ├── validators/       # Zod validators and schemas
│   │   └── test-data/        # API test data
│   └── shared/               # Shared fixtures and support utilities
│       ├── fixtures/         # Playwright-BDD fixtures and step exports
│       └── support/          # Logging and helper utilities
├── .features-gen/            # Generated native Playwright tests
├── reports/                  # Generated Cucumber-style report
├── playwright-report/        # Generated Playwright HTML report
├── test-results/             # Failure artifacts
├── allure-results/            # Generated Allure test results
├── allure-report/             # Generated Allure HTML report
├── playwright.config.ts      # Playwright-BDD and runner configuration
├── tsconfig.json             # TypeScript configuration
└── package.json
```

## Adding a Test

1. Add a scenario to a `.feature` file under `src/ui/features/` or `src/api/features/`.
2. Implement its steps under `src/ui/step-definitions/` or `src/api/step-definitions/`.
3. Add or update page objects under `src/ui/pages/`, or API clients under `src/api/clients/`.
4. Use Cucumber tags such as `@smoke` when the scenario belongs to a targeted suite.
5. Run the scenario and review its Playwright report and failure artifacts.

Example:

```gherkin
@smoke
Scenario: successful login
  Given I am on the SauceDemo login page
  When I login with username "standard_user" and password "secret_sauce"
  Then I should be redirected to the products dashboard
```

## Troubleshooting

- If Chromium is missing, run `npx playwright install chromium`.
- If generated tests are stale, run `npm run bddgen`.
- If no scenarios are selected, check the `--grep` value and feature tags.
- If the browser UI opens unexpectedly, remove `HEADLESS=false`.
- If a run fails, inspect `playwright-report/` and the matching artifacts under `test-results/`.
