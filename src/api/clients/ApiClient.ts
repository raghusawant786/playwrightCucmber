import type { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { CreatePostRequest, UpdatePostRequest } from '../models/Post';

/**
 * API Client for Users and Posts endpoints
 */
export class ApiClient extends BaseApiClient {
  constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  // ============ Users Endpoints ============

  /**
   * Fetch a single user by ID
   */
  async getUser(userId: number): Promise<APIResponse> {
    return this.get(`/users/${userId}`);
  }

  // ============ Posts Endpoints ============

  /**
   * Create a new post
   * @param payload - Must be created via PostPayload.create()
   */
  async createPost(payload: CreatePostRequest): Promise<APIResponse> {
    return this.post('/posts', payload);
  }

  /**
   * Update an existing post
   * @param postId - Post ID to update
   * @param payload - Must be created via PostPayload.createUpdate()
   */
  async updatePost(postId: number, payload: UpdatePostRequest): Promise<APIResponse> {
    return this.put(`/posts/${postId}`, payload);
  }
}
