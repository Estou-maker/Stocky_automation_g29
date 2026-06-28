Feature: Complex API CRUD flow
  Scenario: Create, update, and delete an object with nested payload and strong assertions
    Given I prepare a complex API payload for a product object
    When I send a POST request with nested data and headers to create the object
    Then the create response should contain the expected object details
    When I send a PUT request to update the created object with new values
    Then the update response should reflect the modified values and metadata
    When I send a DELETE request for the created object
    Then the delete response should confirm the object was removed
