Feature: LLM demo response quality
  As a tester of non-deterministic features
  I want to validate stable facts without exact wording
  So that AI checks are robust and meaningful

  Background:
    Given the User Directory app is running

  @api @smoke @llm
  Scenario: LLM endpoint returns expected shape and fixed question
    When I GET "/api/llm/ask"
    Then the response status should be 200
    And the response should include keys:
      | question      |
      | response      |
      | responseIndex |
      | totalVariants |
      | model         |
    And the question should equal "What is the capital of Ireland?"
    And the response should contain "Dublin" case-insensitive
    And responseIndex should be between 1 and 15
    And totalVariants should be 15

  @api @llm
  Scenario: LLM wording varies across multiple calls
    When I call "/api/llm/ask" 10 times and collect responses
    Then there should be more than 1 distinct response
