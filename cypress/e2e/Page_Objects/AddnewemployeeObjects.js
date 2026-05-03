const EmployeeElements = {
    Addnewemployee_menuBTN: 'a[href="/employee/employees"]',
    CreateEmployeeBTN: 'p-button[data-testid="btn-new-employee"]',
    EmployeeForm: 'employee-form[data-testid="employee-form"]',
    PrenomInput: 'input[data-testid="input-firstname"]',
    NomInput: 'input[data-testid="input-lastname"]',
    email_input: 'input[data-testid="input-email"]',
    UsernameInput: 'input[data-testid="input-username"]',
    Country_code_input: 'input[data-testid="input-country-code"]',
    Phone_number_input: 'input[data-testid="input-phone-number"]',
    Job_title_input: 'input[data-testid="input-job-title"]',
    Select_Employment_cat_Trigger: 'span[id="category"]',
    Employment_Categories_listbox: 'ul[aria-label="Option List"]',
    Select_contract_type_Trigger: 'span[id="contractType"]',
    Contract_type_listbox: 'div[data-pc-section="listcontainer"]',
    Submit_new_employee_BTN: 'p-button[data-testid="btn-submit"]',
    Employee_profile: 'div[data-testid="profile-container"]',
    prenom : `Prenom_Automation_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0,5)}`,
    nom : `nom_Automation_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0,5)}`,
    email : `email_Automation_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0,5)}@test.com`,
    username : `Username_Automation_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0,6)}`,
    countrycode : "216",
    phonenumber : Math.floor(10000000 + Math.random() * 90000000).toString()

}   

export default EmployeeElements;