import { z } from 'zod';

/**
 * Generic API response schema
 */
export const apiResponseSchema = z.object({
  status: z.number().int(),
  message: z.string().optional(),
  data: z.unknown().optional(),
});

/**
 * API error response schema
 */
export const errorResponseSchema = z.object({
  status: z.number().int(),
  message: z.string(),
  error: z.string().optional(),
});

export type ApiResponse = z.infer<typeof apiResponseSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
