Feature: API authentication behavior
  As a client of the User Directory API
  I want clear auth outcomes
  So that credential handling is correct and testable

  Background:
    Given the User Directory app is running
    And the database is reset to seed data

  @api @smoke
  Scenario: Valid credentials return a token
    When I POST to "/api/auth" with:
      | email    | alice@example.com |
      | password | password123       |
    Then the response status should be 200
    And the response should include "token"
    And the response user email should be "alice@example.com"

  @api
  Scenario: Wrong password returns unauthorized
    When I POST to "/api/auth" with:
      | email    | alice@example.com |
      | password | wrongpassword     |
    Then the response status should be 401
    And the response error should contain "invalid credentials"

  @api
  Scenario: Unknown user returns unauthorized
    When I POST to "/api/auth" with:
      | email    | nobody@example.com |
      | password | password123        |
    Then the response status should be 401
    And the response error should contain "invalid credentials"
