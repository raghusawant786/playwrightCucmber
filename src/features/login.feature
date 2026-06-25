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

  Scenario Outline: failed login with invalid credentials
    Given I am on the SauceDemo login page
    When I login with username "<username>" and password "<password>"
    Then I should see login error message "<errorMessage>"

    Examples:
      | username        | password     | errorMessage                                                              |
      | wrong_user      | wrong_pass   | Epic sadface: Username and password do not match any user in this error   |
      | locked_out_user | secret_sauce | Epic sadface: Sorry, this user has been locked out.                       |
      | standard_user   | wrong_pass   | Epic sadface: Username and password do not match any user in this service |
