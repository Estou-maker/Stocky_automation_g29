Feature: Post Object
    Scenario: Add new object to the database


        Given I have the api Endpoint "https://api.restful-api.dev/objects"
        When I send A POST request to the Api Endpoint it should be valid
        When I send A PUT request to the created object and it should be updated
        Then I delete the object using id from previous response