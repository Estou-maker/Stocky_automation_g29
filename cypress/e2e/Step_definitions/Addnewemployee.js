import { Given, When, Then,  } from 'cypress-cucumber-preprocessor/steps'
import  EmployeeElements from   '../Page_Objects/AddnewemployeeObjects'


Given(`I navigate to Add employee page`, () => {
    // [Given] Sets up the initial state of the system.
    cy.get(EmployeeElements.Addnewemployee_menuBTN).should('be.visible').click()
    cy.wait(1000)
    cy.get(EmployeeElements.CreateEmployeeBTN).should('be.visible')
    cy.wait(2000)
    cy.get(EmployeeElements.CreateEmployeeBTN).click()
    cy.get(EmployeeElements.EmployeeForm).should('be.visible').screenshot()
});

Then(`I should be able to add new employee with valid details`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
    cy.get(EmployeeElements.PrenomInput).type(EmployeeElements.prenom)
    cy.get(EmployeeElements.NomInput).type(EmployeeElements.nom)
    cy.get(EmployeeElements.email_input).type(EmployeeElements.email)
    cy.get(EmployeeElements.UsernameInput).type(EmployeeElements.username)
    cy.get(EmployeeElements.Country_code_input).type(EmployeeElements.countrycode)
    cy.get(EmployeeElements.Phone_number_input).type(EmployeeElements.phonenumber)
    cy.get(EmployeeElements.Job_title_input).type('QA Engineer')

    let employeeCategoryValue
    let contractTypeValue

    cy.get(EmployeeElements.Select_Employment_cat_Trigger).click()

    cy.get(EmployeeElements.Employment_Categories_listbox).should('be.visible').find('li')
    .then(options => {
        const randomindex = Math.floor(Math.random() * options.length)
        employeeCategoryValue = options[randomindex].innerText
        cy.wrap(options[randomindex]).click()
    })

    cy.get(EmployeeElements.Select_contract_type_Trigger).click()
    cy.get(EmployeeElements.Contract_type_listbox).should('be.visible').find('li').then(options => {
        const randomindex = Math.floor(Math.random() * options.length)
        contractTypeValue = options[randomindex].innerText
        cy.wrap(options[randomindex]).click()
    })

    cy.get(EmployeeElements.Submit_new_employee_BTN).should('be.visible').click()
    cy.wait(1500)
    cy.get(EmployeeElements.Employee_profile).should('contain', EmployeeElements.prenom)
})       