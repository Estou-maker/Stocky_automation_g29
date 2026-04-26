import { Given, When, Then,  } from 'cypress-cucumber-preprocessor/steps'
import  ProductCatogries from   '../Page_Objects/AddnewproductCategoryObjects'


Given(`I navigate to Add product Category page`, () => {
    // [Given] Sets up the initial state of the system.
    cy.get(ProductCatogries.ProductCatogriesURL).should('be.visible').click()
    cy.get(ProductCatogries.CreatePCategoriesBTN, {timeout: 10000}).should('be.visible')
});

Then(`I should be able to add new product category with valid details`, () => {

    // [Then] Describes the expected outcome or result of the scenario.
    cy.wait(1000)
    cy.get(ProductCatogries.CreatePCategoriesBTN).should('be.visible').click()
    cy.get(ProductCatogries.PcategoriesFORM, {timeout: 10000}).should('be.visible')
    cy.get(ProductCatogries.TitleInput).should('be.visible').type(ProductCatogries.ProductCategoryTitle)
    cy.get(ProductCatogries.DescriptionInput).should('be.visible').type('Autotest')
    cy.get(ProductCatogries.SubmitPCBTN).should('not.be.disabled').click()

    cy.get(ProductCatogries.PcategoriesTABLE).should('contain', ProductCatogries.ProductCategoryTitle)
    cy.screenshot()
});