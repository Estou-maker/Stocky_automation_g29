import { Given, When, Then,  } from 'cypress-cucumber-preprocessor/steps'
import loginElements from '../Page_Objects/LoginObjects';


beforeEach(() => {
    cy.intercept('POST', 'https://stocky-backend-dev.uksouth.cloudapp.azure.com/api/v1/User/Auth-Prod').as('LoginRequestAPI')
}
)

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
    // API INTERCEPTION
    cy.wait('@LoginRequestAPI').then((interception)=> {
        expect(interception.response.statusCode).to.eq(200)
        expect(interception.response.body).to.have.property('userData').and.to.have.property('userName', Cypress.env('USERNAME'))
    })
});

Then(`I should be redirected to the dashboard`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
    cy.get(loginElements.DashboardContainer).should('be.visible').should('contain', 'Employee Dashboard')
    cy.screenshot()
});

When(`I enter {string} in the email field`, (user) => {
    // [When] Describes the action or event that triggers the scenario.
    if (user) {
        cy.get(loginElements.UsernameInput).should('be.visible').type(user)
    } else {
        cy.get(loginElements.UsernameInput).clear()
    }
});

When(`I enter {string} in the password field`, (password) => {
    // [When] Describes the action or event that triggers the scenario.
    if (password) {
        cy.get(loginElements.PasswordInput).should('be.visible').type(password)
    } else {
        cy.get(loginElements.PasswordInput).clear()
    }
});

When(`I click on the submit button`, () => {
    // [When] Describes the action or event that triggers the scenario.
    cy.get(loginElements.SubmitBtn).should('not.be.disabled').click()

});

Then(`I should see the message {string}`, (message) => {
    // [Then] Describes the expected outcome or result of the scenario.
    cy.get(loginElements.ErrorMessage).should('be.visible').and('contain', message)
    cy.screenshot()
});