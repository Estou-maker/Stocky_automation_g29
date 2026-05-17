import { Given, When, Then,  } from 'cypress-cucumber-preprocessor/steps'
import  AddnewproductElements from   '../Page_Objects/AddnewproductObjects'



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
    cy.get(AddnewproductElements.Btn_add_new_product).should('be.visible').click()
    
});
