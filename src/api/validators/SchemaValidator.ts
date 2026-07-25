import { z } from 'zod';
import { logger } from '../../shared/support/logger';

export class SchemaValidator {
  /**
   * Validates data against a provided Zod schema
   * @param data The data to validate
   * @param schema The Zod schema to validate against
   * @param context Optional context for logging
   * @returns The validated data or throws an error
   */
  static validate<T>(data: unknown, schema: z.ZodSchema<T>, context?: string): T {
    try {
      const result = schema.parse(data);
      logger.info(`✓ Schema validation passed${context ? ` for ${context}` : ''}`);
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors
          .map(err => `${err.path.join('.')}: ${err.message}`)
          .join('; ');
        logger.error(`✗ Schema validation failed${context ? ` for ${context}` : ''}: ${errorMessage}`);
        throw new Error(`Schema validation failed: ${errorMessage}`);
      }
      throw error;
    }
  }

  /**
   * Safely parses data without throwing (returns null on error)
   */
  static safeParse<T>(data: unknown, schema: z.ZodSchema<T>, context?: string): T | null {
    try {
      return this.validate(data, schema, context);
    } catch (error) {
      return null;
    }
  }

  /**
   * Validates and returns detailed error information
   */
  static validateWithDetails<T>(
    data: unknown,
    schema: z.ZodSchema<T>,
    context?: string
  ): { success: boolean; data?: T; errors?: string[] } {
    try {
      const result = this.validate(data, schema, context);
      return { success: true, data: result };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
        return { success: false, errors };
      }
      return { success: false, errors: [String(error)] };
    }
  }
}
