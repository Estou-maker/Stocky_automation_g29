import { Given, When, Then,  } from 'cypress-cucumber-preprocessor/steps'
import  AddnewproductElements from   '../Page_Objects/AddnewproductObjects'

beforeEach(() => {
    cy.intercept('POST', 'https://stocky-backend-dev.uksouth.cloudapp.azure.com/api/v1/Product').as('AddProductAPI')
})

Given(`I navigate to Add Product Page`, () => {
    cy.get(AddnewproductElements.Products_page).should('be.visible').click()
    cy.wait(3000)
    cy.get(AddnewproductElements.Btn_add_new_product).should('be.visible').click()

    // [Given] Sets up the initial state of the system.
});

Then(`I should be able to add a new product with valid details`, () => {

    let categorytypevalue
    let unitTypeValue
    let currencyTypeValue
    // [Then] Describes the expected outcome or result of the scenario.
    cy.get(AddnewproductElements.Block_add_new_product).should('be.visible')
    cy.get(AddnewproductElements.Input_product_Title).should('be.visible').type(AddnewproductElements.product_title)
    cy.get(AddnewproductElements.Input_product_Description).should('be.visible').type(AddnewproductElements.product_Description)
    cy.get(AddnewproductElements.Input_product_reference).should('be.visible').type(AddnewproductElements.product_reference)
    cy.get(AddnewproductElements.Input_product_marque).should('be.visible').type(AddnewproductElements.Product_marque)
    cy.get(AddnewproductElements.Select_product_categorie_trigger).click()
    

    cy.get(AddnewproductElements.Select_product_categorie_list).should('be.visible').find('li').then(options => {
        const randomindex = Math.floor(Math.random() * options.length)
        categorytypevalue = options[randomindex].innertext
        cy.wrap(options[randomindex]).click()
    })

    cy.get(AddnewproductElements.Select_Product_unit_trigger).should('be.visible').click()
    cy.get(AddnewproductElements.Select_Product_unit_list).find('li').then(options => {
        const randomindex = Math.floor(Math.random() * options.length)
        unitTypeValue = options[randomindex].innertext
        cy.wrap(options[randomindex]).click()
    })

    cy.get(AddnewproductElements.Input_Product_price).should('be.visible')
    .clear().type(AddnewproductElements.price)

    cy.get(AddnewproductElements.Select_Product_currency_trigger).should('be.visible').click()
    cy.get(AddnewproductElements.Select_Procuct_currency_list).find('li').then(options => {
        const randomindex = Math.floor(Math.random() * options.length)
        currencyTypeValue = options[randomindex].innertext
        cy.wrap(options[randomindex]).click()
    })

    cy.get(AddnewproductElements.Input_Product_TVA).clear().type(AddnewproductElements.TVA)
    cy.get(AddnewproductElements.BTN_sumbit_product_add).should('be.visible').click()
    cy.wait('@AddProductAPI').then((interception) => {     
/// Validate API request
        expect(interception.response.statusCode).to.eq(201)
        expect(interception.request.body).to.have.property('title', AddnewproductElements.product_title)
        expect(interception.request.body).to.have.property('description', AddnewproductElements.product_Description)
        expect(interception.request.body).to.have.property('ref', AddnewproductElements.product_reference)
        expect(interception.request.body).to.have.property('brand', AddnewproductElements.Product_marque)
        expect(interception.request.body).to.have.property('productCategoryId')
        expect(interception.request.body).to.have.property('productUnitId')
        expect(interception.request.body).to.have.property('price').and.to.have.property('amount', parseFloat(AddnewproductElements.price))
        expect(interception.request.body).to.have.property('price').and.to.have.property('currency')
        expect(interception.request.body).to.have.property('tva', parseFloat(AddnewproductElements.TVA))
/// Validate response body
        expect(interception.response.body).to.have.property('id')
        expect(interception.response.body).to.have.property('title', AddnewproductElements.product_title)
        expect(interception.response.body).to.have.property('description', AddnewproductElements.product_Description)
        expect(interception.response.body).to.have.property('ref', AddnewproductElements.product_reference)
        expect(interception.response.body).to.have.property('brand', AddnewproductElements.Product_marque)
        expect(interception.response.body).to.have.property('productCategory')
        expect(interception.response.body).to.have.property('productUnit')
        expect(interception.response.body).to.have.property('price').and.to.have.property('amount', parseFloat(AddnewproductElements.price))
        expect(interception.response.body).to.have.property('price').and.to.have.property('currency')
        expect(interception.response.body).to.have.property('tva', parseFloat(AddnewproductElements.TVA))
    })
})
