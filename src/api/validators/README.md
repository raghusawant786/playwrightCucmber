# API Schema Validator

This directory contains schema validation utilities for API responses in your Playwright-Cucumber framework.

## Overview

The schema validator uses **Zod**, a TypeScript-first schema validation library that provides:
- Type-safe validation
- Detailed error messages
- TypeScript type inference
- Lightweight and performant

## Files

- **schemas.ts** - Contains all Zod schema definitions for API responses
- **SchemaValidator.ts** - Utility class with validation methods
- **index.ts** - Exports for easy importing
- **UsersApiClientExample.ts** - Example implementation

## Installation

Zod is already added to `package.json`. Run:

```bash
npm install
```

## Quick Start

### 1. Using Basic Validation

```typescript
import { SchemaValidator, userSchema } from '../validators';

const response = await fetch('/api/users/1');
const data = await response.json();

// Validate and throw on error
const user = SchemaValidator.validate(data, userSchema, 'User validation');
```

### 2. Safe Validation (No Throw)

```typescript
// Returns null if validation fails
const user = SchemaValidator.safeParse(data, userSchema, 'User validation');

if (user) {
  console.log('Valid user:', user);
} else {
  console.log('Validation failed');
}
```

### 3. Detailed Error Handling

```typescript
const result = SchemaValidator.validateWithDetails(data, userSchema);

if (result.success) {
  console.log('User:', result.data);
} else {
  console.log('Validation errors:', result.errors);
  // Output: ["email: Invalid email format", "name: Name is required"]
}
```

## Available Schemas

### User Schema

```typescript
export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
});
```

### User List Schema

```typescript
export const userListSchema = z.array(userSchema);
```

### User Detail Schema (Extended)

```typescript
export const userDetailSchema = userSchema.extend({
  phone: z.string().optional(),
  website: z.string().url().optional(),
  company: z.object({ name: z.string() }).optional(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    zipcode: z.string(),
  }).optional(),
});
```

### API Response Schema

```typescript
export const apiResponseSchema = z.object({
  status: z.number().int(),
  message: z.string().optional(),
  data: z.unknown().optional(),
});
```

## Integrating into Your API Client

See `UsersApiClientExample.ts` for a complete implementation example.

### Key Methods

| Method | Description | Throws |
|--------|-------------|--------|
| `validate(data, schema, context)` | Validates and returns typed data | Yes |
| `safeParse(data, schema, context)` | Validates and returns null on error | No |
| `validateWithDetails(data, schema, context)` | Returns validation result object | No |

## Example Integration

```typescript
import { SchemaValidator, userSchema, type User } from '../validators';

async getUser(userId: number): Promise<User> {
  const response = await this.get(`/users/${userId}`);
  const data = await response.json();
  return SchemaValidator.validate(data, userSchema, `User ID: ${userId}`);
}
```

## Custom Schemas

Add new schemas to `schemas.ts`:

```typescript
export const productSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  price: z.number().positive(),
  inStock: z.boolean(),
});

export type Product = z.infer<typeof productSchema>;
```

## Error Logging

All validation errors are automatically logged via the logger utility. Check logs for validation failures.

## Testing

Validate your API responses in step definitions:

```typescript
import { SchemaValidator, userListSchema } from '../validators';

Given('users API returns valid data', async () => {
  const users = await this.usersClient.getUsers();
  const validated = SchemaValidator.validate(users, userListSchema);
  expect(validated).toBeDefined();
});
```
