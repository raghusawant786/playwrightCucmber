import type { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';

/**
 * Combined API Client for all endpoints
 * Includes methods for Users and Posts resources
 */
export class ApiClient extends BaseApiClient {
  constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  // ============ Users Endpoints ============

  async getUser(userId: number): Promise<APIResponse> {
    return this.get(`/users/${userId}`);
  }

  async getUsers(): Promise<APIResponse> {
    return this.get('/users');
  }

  // ============ Posts Endpoints ============

  async getPost(postId: number): Promise<APIResponse> {
    return this.get(`/posts/${postId}`);
  }

  async getPosts(): Promise<APIResponse> {
    return this.get('/posts');
  }

  async createPost(payload: { title: string; body: string; userId: number }): Promise<APIResponse> {
    return this.post('/posts', payload);
  }

  async updatePost(postId: number, payload: Partial<{ title: string; body: string; userId: number }>): Promise<APIResponse> {
    return this.put(`/posts/${postId}`, payload);
  }

  async deletePost(postId: number): Promise<APIResponse> {
    return this.delete(`/posts/${postId}`);
  }
}
