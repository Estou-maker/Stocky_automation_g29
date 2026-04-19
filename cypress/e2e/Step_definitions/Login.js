import { Given, When, Then,  } from 'cypress-cucumber-preprocessor/steps'

Given(`I am on the login page`, () => {
    // [Given] Sets up the initial state of the system.
    cy.log('test') 
});

When(`I enter valid credentials`, () => {
    // [When] Describes the action or event that triggers the scenario.
    cy.log('test') 
});

Then(`I should be redirected to the dashboard`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
    cy.log('test')
});