Feature: Browse Amazon.co.uk categories
  As a shopper
  I want to browse Amazon's category navigation
  So that I can move between sections and return back to the homepage

  Scenario: Navigate through Best Sellers, Devices and Accessories, and Apps and Games
    Given I go to "https://www.amazon.co.uk"
    When I accept cookies
    And I click the "Best Sellers" link
    And I click the "Amazon Devices & Accessories" link in the left navigation
    And I click the back button
    And I click the "Apps and Games" link
    And I click the back button
    Then I should be back on Amazon.co.uk with the navigation still available
