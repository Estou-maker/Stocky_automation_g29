Feature: Add new employee

    Background:
        Given I am on the login page
        When I enter valid credentials
        Then I should be redirected to the dashboard
    
    Scenario: Add a new employee
        Given I navigate to Add employee page
        Then I should be able to add new employee with valid details