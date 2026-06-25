import reporter from 'cucumber-html-reporter';
import fs from 'node:fs';
import path from 'node:path';

const GENERATE_NOW_ARG = '--generate-now';

export async function generateReports(): Promise<void> {
  if (!process.argv.includes(GENERATE_NOW_ARG)) {
    return;
  }

  const reportsDir = path.resolve(process.cwd(), 'reports');
  const jsonFile = path.join(reportsDir, 'cucumber-report.json');
  const htmlFile = path.join(reportsDir, 'cucumber-report.html');
  const tracesDir = path.join(reportsDir, 'traces');
  const jsonReady = await waitForJsonReport(jsonFile);

  if (!jsonReady) {
    console.warn(`Cucumber JSON report was not ready at ${jsonFile}.`);
    return;
  }

  reporter.generate({
    theme: 'bootstrap',
    jsonFile,
    output: htmlFile,
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: false,
    metadata: {
      Browser: 'Chromium',
      Platform: process.platform,
      Executed: 'Local',
      'Test Runner': 'Cucumber + Playwright'
    }
  });

  console.log(`Cucumber HTML report generated: ${htmlFile}`);

  if (fs.existsSync(tracesDir)) {
    const traces = fs.readdirSync(tracesDir).filter((fileName) => fileName.endsWith('.zip'));

    if (traces.length > 0) {
      console.log(`Playwright traces generated: ${tracesDir}`);
      console.log('View a trace with: npx playwright show-trace reports/traces/<scenario-name>.zip');
      return;
    }
  }

  console.log('No Playwright traces were generated.');
}

async function waitForJsonReport(jsonFile: string): Promise<boolean> {
  const timeoutAt = Date.now() + 30_000;

  while (Date.now() < timeoutAt) {
    if (fs.existsSync(jsonFile)) {
      try {
        const report = fs.readFileSync(jsonFile, 'utf-8');
        JSON.parse(report);
        return true;
      } catch {
        await wait(250);
      }
    } else {
      await wait(250);
    }
  }

  return false;
}

async function wait(milliseconds: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

if (process.argv.includes(GENERATE_NOW_ARG)) {
  generateReports().catch((error: unknown) => {
    console.error('Failed to generate reports.', error);
    process.exitCode = 1;
  });
}
