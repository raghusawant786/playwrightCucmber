Feature: Users and Posts API - Hybrid Payload Management

  @api
  Scenario: Fetch user by ID
    Given I have the users API available
    When I request user with id 1
    Then the API response status should be 200
    And the user response should contain id 1
    And the user response schema should be valid

  @api
  Scenario: Create a post with custom payload
    Given I have the posts API available
    When I create a post with title "foo" and body "bar" and userId 1
    Then the API response status should be 201
    And the post response should contain title "foo"
    And the post response schema should be valid

  @api
  Scenario: Update an existing post
    Given I have the posts API available
    When I update post with id 1 with title "foo1" and body "bar1" and userId 1
    Then the API response status should be 200
    And the post response should contain title "foo1"
    And the post response schema should be valid

