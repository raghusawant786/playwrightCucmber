import { z } from 'zod';

/**
 * Address schema - used in User responses
 */
const addressSchema = z.object({
  street: z.string(),
  suite: z.string().optional(),
  city: z.string(),
  zipcode: z.string(),
  geo: z.object({
    lat: z.string(),
    lng: z.string(),
  }).optional(),
});

/**
 * Company schema - used in User responses
 */
const companySchema = z.object({
  name: z.string(),
  catchPhrase: z.string().optional(),
  bs: z.string().optional(),
});

/**
 * User schema - basic user response
 */
export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  website: z.string().optional(),
  address: addressSchema.optional(),
  company: companySchema.optional(),
});

/**
 * User list schema - array of users
 */
export const userListSchema = z.array(userSchema);

/**
 * User detail schema - extended user with all fields required
 */
export const userDetailSchema = userSchema.extend({
  address: addressSchema,
  company: companySchema,
  phone: z.string(),
  website: z.string(),
});

/**
 * Create user request schema
 */
export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  website: z.string().optional(),
  address: addressSchema.optional(),
  company: companySchema.optional(),
});

export type User = z.infer<typeof userSchema>;
export type UserDetail = z.infer<typeof userDetailSchema>;
export type CreateUserPayload = z.infer<typeof createUserSchema>;
