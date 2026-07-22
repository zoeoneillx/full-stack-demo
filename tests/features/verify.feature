Feature: Verify seeded user data
  As a tester
  I want to verify the seeded user records
  So that I know the API returns the expected user information

  Background:
    Given the User Directory app is running
    And the database is reset to seed data

  @api @smoke @verify
  Scenario: Verify Alice Johnson's seeded record by id
    When I GET "/api/users/1"
    Then the response status should be 200
    And the response field "firstName" should equal "Alice"
    And the response field "lastName" should equal "Johnson"
    And the response field "email" should equal "alice@example.com"
    And the response field "role" should equal "admin"

  @api @verify
  Scenario: Verify the seeded user list contains all 5 users
    When I GET "/api/users"
    Then the response status should be 200
    And the response array should contain 5 users
    And the response array should include an email "alice@example.com"
    And the response array should include an email "bob@example.com"
    And the response array should include an email "carol@example.com"
    And the response array should include an email "david@example.com"
    And the response array should include an email "eve@example.com"
