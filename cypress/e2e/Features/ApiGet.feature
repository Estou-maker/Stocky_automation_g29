Feature: Test Dogs Api GET

    Testing endpoint GET /breeds/list/all 

    Scenario: Verify that the API returns a list of all dog breeds
        Given I send a GET request to the endpoint
        Then I should receive a response with all details of the dog breeds
        