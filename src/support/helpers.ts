import fs from 'node:fs';
import path from 'node:path';

export async function waitForTimeout(milliseconds: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export function generateRandomEmail(domain = 'example.com'): string {
  return `user-${Date.now()}-${Math.floor(Math.random() * 10_000)}@${domain}`;
}

export function readTestData<T>(fileName: string): T {
  const filePath = path.resolve(process.cwd(), 'test-data', fileName);
  const fileContents = fs.readFileSync(filePath, 'utf-8');

  return JSON.parse(fileContents) as T;
}
