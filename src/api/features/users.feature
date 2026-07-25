Feature: Users API

  @api
  Scenario: get user by id
    Given I have the users API available
    When I request user with id 1
    Then the API response status should be 200
    And the user response should contain id 1
    And the user response schema should be valid

  @api
  Scenario: create a new post
    Given I have the posts API available
    When I create a post with title "foo" and body "bar" and userId 1
    Then the API response status should be 201
    And the post response should contain title "foo"
    And the post response schema should be valid

  @api
  Scenario: update an existing post
    Given I have the posts API available
    When I update post with id 1 with title "foo" and body "bar" and userId 1
    Then the API response status should be 200
    And the post response should contain title "foo"
    And the post response schema should be valid
