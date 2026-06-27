Feature: Visual validation for SauceDemo

  @visual
  Scenario: products dashboard visual comparison
    Given I am on the SauceDemo login page
    When I login with username "standard_user" and password "secret_sauce"
    Then I should be redirected to the products dashboard
    And the products dashboard should match the approved design
