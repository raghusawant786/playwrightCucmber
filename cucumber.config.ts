import dotenv from 'dotenv';

dotenv.config();

const tags = process.env.TAGS?.trim();

type CucumberProfile = {
  paths: string[];
  requireModule: string[];
  require: string[];
  format: string[];
  formatOptions: {
    snippetInterface: 'async-await';
  };
  parallel: number;
  tags?: string;
};

const defaultProfile: CucumberProfile = {
  paths: ['src/features/**/*.feature'],
  requireModule: ['ts-node/register'],
  require: ['src/hooks/**/*.ts', 'src/step-definitions/**/*.ts'],
  format: [
    'progress-bar',
    'json:reports/cucumber-report.json',
    'html:reports/cucumber-report.html'
  ],
  formatOptions: {
    snippetInterface: 'async-await'
  },
  parallel: 2,
  tags: tags && tags.length > 0 ? tags : undefined
};

export default {
  default: defaultProfile
};
