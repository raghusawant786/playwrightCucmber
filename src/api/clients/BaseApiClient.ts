import type { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseApiClient {
  constructor(
    protected readonly request: APIRequestContext,
    private readonly baseUrl: string
  ) {}

  protected async get(path: string): Promise<APIResponse> {
    return this.request.get(this.buildUrl(path));
  }

  protected async post(path: string, data?: unknown): Promise<APIResponse> {
    return this.request.post(this.buildUrl(path), { data });
  }

  protected async put(path: string, data?: unknown): Promise<APIResponse> {
    return this.request.put(this.buildUrl(path), { data });
  }

  protected async delete(path: string): Promise<APIResponse> {
    return this.request.delete(this.buildUrl(path));
  }

  private buildUrl(path: string): string {
    const baseUrl = this.baseUrl.endsWith('/') ? this.baseUrl : `${this.baseUrl}/`;
    const normalizedPath = path.replace(/^\//, '');

    return new URL(normalizedPath, baseUrl).toString();
  }
}
