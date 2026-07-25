/**
 * Central export point for all API schemas
 * Import from this file for clean imports across the framework
 */

// Common schemas
export {
  apiResponseSchema,
  errorResponseSchema,
  type ApiResponse,
  type ErrorResponse,
} from './common.schemas';

// User schemas
export {
  userSchema,
  userListSchema,
  userDetailSchema,
  createUserSchema,
  type User,
  type UserDetail,
  type CreateUserPayload,
} from './user.schemas';

// Post schemas
export {
  postSchema,
  postListSchema,
  createPostSchema,
  updatePostSchema,
  type Post,
  type CreatePostPayload,
  type UpdatePostPayload,
} from './post.schemas';
