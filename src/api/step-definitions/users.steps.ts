import { expect, Given, Then, When } from '../../shared/fixtures/fixture';
import { SchemaValidator, userSchema, postSchema } from '../validators';
import { PostPayload } from '../payloads/PostPayload';
import { User } from '../models/User';
import { Post } from '../models/Post';

Given('I have the users API available', async ({ apiBaseUrl }) => {
  await expect(apiBaseUrl).toBeTruthy();
});

Given('I have the posts API available', async ({ apiBaseUrl }) => {
  await expect(apiBaseUrl).toBeTruthy();
});

When('I request user with id {int}', async ({ apiContext, apiClient }, userId: number) => {
  const response = await apiClient.getUser(userId);

  apiContext.response = response;
  apiContext.body = await response.json();
});

/**
 * Create a post using PayloadBuilder
 * Never passes inline objects - always uses payload builders
 */
When('I create a post with title {string} and body {string} and userId {int}', async ({ apiContext, apiClient }, title: string, body: string, userId: number) => {
  // Build payload using PostPayload builder
  const payload = PostPayload.create({
    title,
    body,
    userId,
  });

  const response = await apiClient.createPost(payload);

  apiContext.response = response;
  apiContext.body = await response.json();
});

/**
 * Update a post using PayloadBuilder
 * Uses createUpdate() for partial payloads
 */
When('I update post with id {int} with title {string} and body {string} and userId {int}', async ({ apiContext, apiClient }, postId: number, title: string, body: string, userId: number) => {
  // Build update payload using PostPayload builder
  const payload = PostPayload.createUpdate({
    title,
    body,
    userId,
  });

  const response = await apiClient.updatePost(postId, payload);

  apiContext.response = response;
  apiContext.body = await response.json();
});

Then('the API response status should be {int}', async ({ apiContext }, statusCode: number) => {
  await expect(apiContext.response, 'Expected an API response to be available').toBeDefined();

  const responseBody = await apiContext.response?.json();
  console.log('Response Body:', responseBody);
  await expect(apiContext.response?.status()).toBe(statusCode);
});

Then('the user response should contain id {int}', async ({ apiContext }, userId: number) => {
  const user = apiContext.body as User;

  await expect(user.id).toBe(userId);
});

Then('the post response should contain title {string}', async ({ apiContext }, title: string) => {
  const post = apiContext.body as Post;

  await expect(post.title).toBe(title);
});

Then('the user response schema should be valid', async ({ apiContext }) => {
  const user = apiContext.body;

  await expect(user).toBeDefined();

  const result = SchemaValidator.validateWithDetails(user, userSchema, 'User Response Schema');

  await expect(result.success, `Schema validation failed: ${result.errors?.join(', ')}`).toBe(true);
  await expect(result.data).toBeDefined();
});

Then('the post response schema should be valid', async ({ apiContext }) => {
  const post = apiContext.body;

  await expect(post).toBeDefined();

  const result = SchemaValidator.validateWithDetails(post, postSchema, 'Post Response Schema');

  await expect(result.success, `Schema validation failed: ${result.errors?.join(', ')}`).toBe(true);
  await expect(result.data).toBeDefined();
});

