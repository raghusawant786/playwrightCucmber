# Playwright Cucumber Framework

A TypeScript test automation framework that combines [Playwright](https://playwright.dev/) with [Cucumber](https://cucumber.io/) for behavior-driven development (BDD).

The included test suite exercises the [SauceDemo](https://www.saucedemo.com/) application using Gherkin scenarios and the Page Object Model.

## Features

- BDD scenarios written in Gherkin
- Page Object Model for reusable UI interactions
- Chromium execution with isolated browser contexts
- Parallel scenario execution
- Tag-based test selection
- Screenshots attached for failed steps
- Playwright traces and videos for every scenario
- Cucumber JSON and HTML reports
- Environment-based configuration
- TypeScript strict mode

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
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
TAGS=
```

| Variable | Description | Default |
| --- | --- | --- |
| `BASE_URL` | Application URL used by browser contexts | `https://www.saucedemo.com` |
| `HEADLESS` | Set to `true` to run without opening the browser UI | `false` |
| `TAGS` | Optional Cucumber tag expression, such as `@smoke` | All scenarios |

## Running Tests

Run all scenarios:

```bash
npm test
```

Run scenarios tagged with `@smoke`:

```bash
npm run test:smoke
```

Run with the browser visible:

```bash
npm run test:headed
```

Pass additional Cucumber CLI arguments after `--`:

```bash
npm test -- --tags "@smoke"
npm test -- --name "successful login"
```

You can also configure a run with environment variables:

```bash
HEADLESS=true TAGS="@smoke" npm test
```

By default, Cucumber runs up to two scenarios in parallel.

## Reports and Artifacts

Each test run generates the following output:

| Output | Location |
| --- | --- |
| Cucumber HTML report | `reports/cucumber-report.html` |
| Cucumber JSON report | `reports/cucumber-report.json` |
| Playwright traces | `reports/traces/` |
| Test videos | `reports/videos/` |
| Failure screenshots | `screenshots/` |

Open the Cucumber report:

```bash
npm run report:cucumber
```

Open a specific Playwright trace:

```bash
npx playwright show-trace reports/traces/<scenario-name>.zip
```

Remove generated Cucumber reports and traces:

```bash
npm run clean:reports
```

## Project Structure

```text
.
├── src/
│   ├── features/             # Gherkin feature files
│   ├── step-definitions/     # Cucumber step implementations
│   ├── pages/                # Page Object Model classes
│   ├── hooks/                # Browser lifecycle and custom Cucumber world
│   ├── fixtures/             # Playwright fixtures and fixture data
│   └── support/              # Reporting, browser, logging, and helper utilities
├── test-data/                # Reusable JSON test data
├── reports/                  # Generated reports, traces, and videos
├── screenshots/              # Screenshots captured on failed steps
├── cucumber.config.ts        # Cucumber configuration
├── cucumber.js               # Cucumber TypeScript configuration loader
├── playwright.config.ts      # Playwright configuration
├── tsconfig.json             # TypeScript configuration
└── package.json
```

## Adding a Test

1. Add a scenario to a `.feature` file under `src/features/`.
2. Implement its steps under `src/step-definitions/`.
3. Add or update page objects under `src/pages/`.
4. Use Cucumber tags such as `@smoke` when the scenario belongs to a targeted suite.
5. Run the scenario and review its HTML report, trace, video, or failure screenshot.

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
- If no scenarios are selected, check the `TAGS` value in `.env` and any `--tags` argument.
- If the browser UI opens unexpectedly, set `HEADLESS=true`.
- If a run fails, inspect the Cucumber report and the matching trace under `reports/traces/`.
