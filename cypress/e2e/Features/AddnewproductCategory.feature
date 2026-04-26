Feature: Add new Product Category

    Background:
        Given I am on the login page
        When I enter valid credentials
        Then I should be redirected to the dashboard
    
    Scenario: Add a new Product Category
        Given I navigate to Add product Category page
        Then I should be able to add new product category with valid details