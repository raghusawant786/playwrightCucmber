/**
 * Post Response
 */
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

/**
 * Create Post Request
 */
export interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}

/**
 * Update Post Request
 */
export interface UpdatePostRequest {
  title?: string;
  body?: string;
  userId?: number;
}
