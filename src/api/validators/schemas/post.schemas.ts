import { z } from 'zod';

/**
 * Post schema - basic post response
 */
export const postSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
  userId: z.number().int().positive(),
});

/**
 * Post list schema - array of posts
 */
export const postListSchema = z.array(postSchema);

/**
 * Create post request schema
 */
export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
  userId: z.number().int().positive(),
});

/**
 * Update post request schema
 */
export const updatePostSchema = createPostSchema.partial();

export type Post = z.infer<typeof postSchema>;
export type CreatePostPayload = z.infer<typeof createPostSchema>;
export type UpdatePostPayload = z.infer<typeof updatePostSchema>;
