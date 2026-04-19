import { Given, When, Then,  } from 'cypress-cucumber-preprocessor/steps'
import loginElements from '../Page_Objects/LoginObjects';

Given(`I am on the login page`, () => {
    // [Given] Sets up the initial state of the system.
    // Visit the login page
    cy.visit(loginElements.LoginUrl)
    // Check that the login page title is visible
    cy.get(loginElements.TitleCNX).should('be.visible').should('contain', 'Welcome Back') 
});


When(`I enter valid credentials`, () => {
    // [When] Describes the action or event that triggers the scenario.
    cy.log('Entering Valid Credentials')
    cy.get(loginElements.UsernameInput).should('be.visible').type(Cypress.env('USERNAME'), { log: false})
    cy.get(loginElements.PasswordInput).should('be.visible').type(Cypress.env('USER_PASSWORD'), { log: false})
    cy.get(loginElements.SubmitBtn).should('not.be.disabled').click()
});

Then(`I should be redirected to the dashboard`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
    cy.get(loginElements.DashboardContainer).should('be.visible').should('contain', 'Employee Dashboard')
    cy.screenshot()
});