# AI Context Reference

This project is a TypeScript Playwright-BDD automation framework for SauceDemo.
Use this file as a quick reference before making future AI-assisted changes.

## Project Summary

- Test runner: Playwright Test with `playwright-bdd`.
- Test style: Gherkin feature files mapped to TypeScript step definitions.
- App under test: SauceDemo, default `BASE_URL=https://www.saucedemo.com`.
- Browser project: Chromium desktop.
- Main pattern: Page Object Model under `src/pages`.

## Important Files

- `playwright.config.ts`: Defines BDD feature/step paths, reporters, browser options, and `BASE_URL`.
- `package.json`: npm scripts for generation, tests, visual tests, reports, and type checking.
- `src/features/login.feature`: Main smoke checkout flow.
- `src/features/visual.feature`: Visual validation checkout flow.
- `src/step-definitions/login.steps.ts`: Login page steps only.
- `src/step-definitions/dashboard.steps.ts`: Products dashboard and cart steps.
- `src/step-definitions/checkout.steps.ts`: Checkout information, overview, completion, and back-home steps.
- `src/step-definitions/visual.steps.ts`: Visual screenshot comparison steps.
- `src/pages/LoginPage.ts`: Login page object.
- `src/pages/DashboardPage.ts`: Product dashboard and cart navigation page object.
- `src/pages/CheckoutPage.ts`: Checkout information, overview, finish, and confirmation page object.
- `src/fixtures/fixture.ts`: Custom fixtures exposed to step definitions.

## Common Commands

```bash
npm run typecheck
npm run bddgen
npm test
npm run test:smoke
npm run test:visual
npm run test:update-snapshots -- --grep @visual
```

Notes:

- `bddgen` generates native Playwright tests into `.features-gen/`.
- Do not manually edit `.features-gen/`; update feature files or step definitions instead.
- Visual tests may need network access to SauceDemo and approved baseline snapshots.

## BDD Conventions

- Add scenarios under `src/features/*.feature`.
- Reuse existing step wording when possible.
- Add new step implementations under `src/step-definitions/*.steps.ts`.
- Keep step definitions split by page-object ownership, matching `LoginPage`, `DashboardPage`, and `CheckoutPage`.
- Prefer page object methods for reusable UI actions.
- Keep assertions in step definitions, not in feature files.
- Use tags such as `@smoke` and `@visual` for targeted execution.

## Visual Validation Flow

The `@visual` scenario in `src/features/visual.feature` currently validates:

1. Products dashboard: `products-dashboard.png`
2. Cart page: `cart-page.png`
3. Checkout information page: `checkout-information-page.png`
4. Checkout overview page: `checkout-overview-page.png`
5. Order confirmation page: `order-confirmation-page.png`

The flow ends after confirming:

```gherkin
Then I should see the message "THANK YOU FOR YOUR ORDER"
And the order confirmation page should match the approved design
```

Visual screenshot assertions live in `src/step-definitions/visual.steps.ts` and use:

```ts
{
  fullPage: true,
  animations: 'disabled'
}
```

## Checkout Flow Reference

The full successful checkout path is:

1. Open SauceDemo login page.
2. Login as `standard_user` with password `secret_sauce`.
3. Confirm products dashboard.
4. Select `Sauce Labs Backpack`.
5. Add selected product to cart.
6. Open the shopping cart.
7. Confirm product appears in the cart.
8. Click checkout.
9. Confirm `Checkout: Your Information`.
10. Fill first name, last name, and postal code.
11. Continue to overview.
12. Confirm `Checkout: Overview`.
13. Confirm product appears in overview.
14. Click finish.
15. Confirm `Checkout: Complete!`.
16. Confirm message `THANK YOU FOR YOUR ORDER`.

## Implementation Preferences

- Use `rg` or `rg --files` for searching.
- Keep feature wording consistent with existing step definitions.
- Use `apply_patch` for manual edits.
- Avoid changing unrelated files or generated artifacts.
- Run `npm run typecheck` after TypeScript changes.
- Run `npx bddgen` after feature or step-definition changes.
- Run `npm run test:visual` only when SauceDemo network access and visual baselines are expected to be available.

## Generated And Report Artifacts

These are generated and normally should not be reviewed or edited manually:

- `.features-gen/`
- `playwright-report/`
- `test-results/`
- `reports/cucumber-report.html`
- `reports/cucumber-report/`
- `reports/data/`
- `reports/trace/`
- `screenshots/`
