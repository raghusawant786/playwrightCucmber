# Playwright-BDD Framework

A TypeScript test automation framework that runs Gherkin scenarios through
[playwright-bdd](https://github.com/vitalets/playwright-bdd) and the native
[Playwright Test](https://playwright.dev/docs/intro) runner.

The included test suite exercises the [SauceDemo](https://www.saucedemo.com/) application using Gherkin scenarios and the Page Object Model.

## Features

- BDD scenarios written in Gherkin
- Page Object Model for reusable UI interactions
- Native Playwright fixtures and browser lifecycle
- Chromium execution with isolated browser contexts
- Parallel execution and Playwright projects
- Tag-based test selection
- Screenshots, traces, and videos retained for failures
- Playwright HTML and Cucumber-style HTML reports
- Native Playwright visual comparisons
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
HEADLESS=true
```

| Variable | Description | Default |
| --- | --- | --- |
| `BASE_URL` | Application URL used by browser contexts | `https://www.saucedemo.com` |
| `HEADLESS` | Set to `false` to open the browser UI | `true` |

## Running Tests

Run all scenarios:

```bash
npm test
```

First time, create/update screenshot baseline:
```bash
npm run test:update-snapshots -- --grep @visual
```
run visual test
```bash
npm run test:visual
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
| Failure screenshots, traces, and videos | `test-results/` |

Open the Playwright report:

```bash
npm run report
```

Open the Cucumber report:

```bash
npm run report:cucumber
```

Remove generated tests and reports:

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
│   ├── features/             # Gherkin feature files
│   ├── step-definitions/     # Cucumber step implementations
│   ├── pages/                # Page Object Model classes
│   ├── fixtures/             # Playwright-BDD fixtures and step exports
│   └── support/              # Logging and helper utilities
├── test-data/                # Reusable JSON test data
├── .features-gen/            # Generated native Playwright tests
├── reports/                  # Generated Cucumber-style report
├── playwright-report/        # Generated Playwright HTML report
├── test-results/             # Failure artifacts
├── playwright.config.ts      # Playwright-BDD and runner configuration
├── tsconfig.json             # TypeScript configuration
└── package.json
```

## Adding a Test

1. Add a scenario to a `.feature` file under `src/features/`.
2. Implement its steps under `src/step-definitions/`.
3. Add or update page objects under `src/pages/`.
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
