import type { APIResponse } from '@playwright/test';
import { expect } from '@playwright/test';
import { z } from 'zod';
import { errorResponseSchema, type ErrorResponse } from '../validators';

type SchemaValidationResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  errors: string[];
};

export class ApiAssertions {
  static async assertStatus(response: APIResponse | undefined, expectedStatus: number): Promise<void> {
    expect(response, 'Expected an API response to be available').toBeDefined();

    const actualStatus = response!.status();
    const responseUrl = response!.url();

    expect(
      actualStatus,
      `Expected API status ${expectedStatus}, got ${actualStatus} for ${responseUrl}`
    ).toBe(expectedStatus);
  }

  static async parseJson(response: APIResponse): Promise<unknown> {
    const responseText = await response.text();

    if (!responseText.trim()) {
      return null;
    }

    try {
      return JSON.parse(responseText) as unknown;
    } catch (error) {
      const preview = responseText.slice(0, 300);
      throw new Error(
        `Expected JSON response but parsing failed for ${response.url()} ` +
        `with status ${response.status()}. Body preview: ${preview}`
      );
    }
  }

  static assertSchema<T>(data: unknown, schema: z.ZodSchema<T>, context: string): T {
    const result = this.validateSchema(data, schema);

    expect(
      result.success,
      `Schema validation failed for ${context}: ${result.success ? '' : result.errors.join(', ')}`
    ).toBe(true);

    if (!result.success) {
      throw new Error(`Schema validation failed for ${context}: ${result.errors.join(', ')}`);
    }

    return result.data;
  }

  static async assertErrorResponse(
    response: APIResponse | undefined,
    body: unknown,
    expectedStatus: number
  ): Promise<ErrorResponse> {
    await this.assertStatus(response, expectedStatus);

    const responseBody = body ?? await this.parseJson(response!);

    return this.assertSchema(
      responseBody,
      errorResponseSchema,
      `Error Response Schema for status ${expectedStatus}`
    );
  }

  private static validateSchema<T>(data: unknown, schema: z.ZodSchema<T>): SchemaValidationResult<T> {
    const result = schema.safeParse(data);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    }

    return {
      success: false,
      errors: result.error.errors.map(error => `${error.path.join('.') || '<root>'}: ${error.message}`),
    };
  }
}
