# API Schema Directory

Modular schema definitions for API responses and request payloads.

## Structure

```
schemas/
├── index.ts                 # Central export point
├── common.schemas.ts        # Generic/shared schemas (API responses, errors)
└── user.schemas.ts          # User-related schemas
```

## Usage

### Import Everything
```typescript
import { userSchema } from '../validators';
```

### Import Specific Schema
```typescript
import { userSchema, type User } from '../validators';

const user = SchemaValidator.validate(data, userSchema);
```

### Import Specific Type
```typescript
import type { User } from '../validators';

const users: User[] = await fetchUsers();
```

## Adding New Schemas

1. **Create a new file** (e.g., `post.schemas.ts`)
2. **Define your schemas** following the existing patterns
3. **Export types** using `z.infer<typeof schema>`
4. **Add to `schemas/index.ts`**

### Example: Post Schemas

**`post.schemas.ts`:**
```typescript
import { z } from 'zod';

export const postSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  title: z.string().min(1),
  body: z.string().min(1),
});

export const postListSchema = z.array(postSchema);

export const createPostSchema = postSchema.omit({ id: true });

export type Post = z.infer<typeof postSchema>;
export type CreatePostPayload = z.infer<typeof createPostSchema>;
```

**Update `schemas/index.ts`:**
```typescript
export {
  postSchema,
  postListSchema,
  createPostSchema,
  type Post,
  type CreatePostPayload,
} from './post.schemas';
```

## File Naming Conventions

- **`resource.schemas.ts`** - All schemas for one resource (users, posts, etc.)
- Export **both schema and type** from each file
- Use descriptive names: `userSchema`, `createUserSchema`, `updateUserSchema`, `userListSchema`

## Schema Patterns

### Basic Read Schema
```typescript
export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof userSchema>;
```

### List Schema
```typescript
export const userListSchema = z.array(userSchema);
```

### Create Request Schema (without ID)
```typescript
export const createUserSchema = userSchema.omit({ id: true });
export type CreateUserPayload = z.infer<typeof createUserSchema>;
```

### Update Request Schema (all optional)
```typescript
export const updateUserSchema = userSchema.partial();
export type UpdateUserPayload = z.infer<typeof updateUserSchema>;
```

### Extend Existing Schema
```typescript
export const userDetailSchema = userSchema.extend({
  posts: z.array(postSchema),
  comments: z.array(commentSchema),
});
```

## Testing Schemas

```typescript
import { SchemaValidator, userSchema } from '../validators';

Then('user response is valid', async ({ apiContext }) => {
  const result = SchemaValidator.validateWithDetails(
    apiContext.body,
    userSchema
  );
  
  expect(result.success).toBe(true);
  expect(result.data).toBeDefined();
});
```

## See Also

- [SchemaValidator.ts](../SchemaValidator.ts) - Validation utility methods
- [../README.md](../README.md) - Main validators documentation
