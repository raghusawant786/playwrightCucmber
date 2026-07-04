Feature: Visual validation for SauceDemo

  @visual
  Scenario: products dashboard visual comparison
    Given I am on the SauceDemo login page
    When I login with username "standard_user" and password "secret_sauce"
    Then I should be redirected to the products dashboard
    And the products dashboard should match the approved design
    And select "Sauce Labs Backpack" from the products list
    And Click on Add to cart button
    And click on the shopping cart icon
    And I should see the product "Sauce Labs Backpack" in the cart
    And the cart page should match the approved design
    And click on the checkout button
    Then I should see the checkout Your Information title "Checkout: Your Information"
    And the checkout information page should match the approved design
    And I fill in the checkout information with first name "John", last name "Doe", and postal code "12345"
    And click on the continue button
    Then I should see the checkout Overview title "Checkout: Overview"
    And I should see the product "Sauce Labs Backpack" in the overview
    And the checkout overview page should match the approved design
    And click on the finish button
    Then I should see the checkout Complete title "Checkout: Complete!"
    Then I should see the message "THANK YOU FOR YOUR ORDER"
    And the order confirmation page should match the approved design
