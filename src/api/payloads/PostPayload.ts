import type { CreatePostRequest, UpdatePostRequest } from '../models/Post';
import postTemplates from '../test-data/post.json';

/**
 * PostPayload Builder
 * 
 * Manages payload creation for Post requests using template-based approach.
 * Never mutates source templates. Always returns fresh payload objects.
 * 
 * Usage:
 *   const payload = PostPayload.create({ title: 'Custom Title' });
 *   const emptyPayload = PostPayload.emptyTitle();
 *   const randomPayload = PostPayload.random();
 */
export class PostPayload {
  /**
   * Create a post payload by merging overrides with default template
   * 
   * @param overrides - Partial payload to override defaults
   * @returns Fresh CreatePostRequest with merged values
   * 
   * @example
   * PostPayload.create({ title: 'foo' })
   * // Returns: { title: 'foo', body: 'Default post body content', userId: 1 }
   */
  static create(overrides?: Partial<CreatePostRequest>): CreatePostRequest {
    const template = this.deepClone(postTemplates.default);
    return { ...template, ...overrides };
  }

  /**
   * Create an update payload
   * 
   * @param overrides - Partial update payload
   * @returns UpdatePostRequest with merged values
   */
  static createUpdate(overrides?: Partial<UpdatePostRequest>): UpdatePostRequest {
    const template = this.deepClone(postTemplates.default);
    return { ...template, ...overrides };
  }



  /**
   * Deep clone to prevent accidental mutations of templates
   */
  private static deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
