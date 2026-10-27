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
    const result = schema.safeParse(data);

    if (result.success) {
      logger.info(`✓ Schema validation passed${context ? ` for ${context}` : ''}`);
      return { success: true, data: result.data };
    }

    const errors = result.error.errors.map(err => `${err.path.join('.') || '<root>'}: ${err.message}`);
    logger.error(`✗ Schema validation failed${context ? ` for ${context}` : ''}: ${errors.join('; ')}`);

    return { success: false, errors };
  }
}
