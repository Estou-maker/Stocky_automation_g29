Feature: Add new Product

    Background:
        Given I am on the login page
        When I enter valid credentials
        Then I should be redirected to the dashboard
    
    Scenario: Add a new product
        Given I navigate to Add Product Page
        Then I should be able to add a new product with valid details