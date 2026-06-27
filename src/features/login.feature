Feature: Login to SauceDemo

  @smoke
  Scenario: successful login with valid credentials
    Given I am on the SauceDemo login page
    When I login with username "standard_user" and password "secret_sauce"
    Then I should be redirected to the products dashboard
    And I should see the dashboard title "Products"
    And select "Sauce Labs Backpack" from the products list
    And Click on Add to cart button
    And click on the shopping cart icon
    And I should see the product "Sauce Labs Backpack" in the cart
    And click on the checkout button
    # Then I should see the checkout Your Information title "Checkout: Your Information"
    # And I fill in the checkout information with first name "John", last name "Doe", and postal code "12345"
    # And click on the continue button
    # Then I should see the checkout Overview title "Checkout: Overview"
    # And I should see the product "Sauce Labs Backpack" in the overview
    # And click on the finish button  
    # Then I should see the checkout Complete title "Checkout: Complete!"
    # Then I should see the message "THANK YOU FOR YOUR ORDER"
    # And I click on the back home button
    # Then I should be redirected to the products dashboard

  Scenario Outline: failed login with invalid credentials
    Given I am on the SauceDemo login page
    When I login with username "<username>" and password "<password>"
    Then I should see login error message "<errorMessage>"

    Examples:
      | username        | password     | errorMessage                                                              |
      | wrong_user      | wrong_pass   | Epic sadface: Username and password do not match any user in this service |
      | locked_out_user | secret_sauce | Epic sadface: Sorry, this user has been locked out.                       |
      | standard_user   | wrong_pass   | Epic sadface: Username and password do not match any user in this service |
