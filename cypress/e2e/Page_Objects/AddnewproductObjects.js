const brands = ['Toyota', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Honda', 'Nissan'];

const AddnewproductElements = {
    Products_page: 'a[href="/employee/products"]',
    Btn_add_new_product : 'p-button[data-testid="btn-new-product"]',
    Block_add_new_product: 'div[data-testid="product-form-container"]',
    Input_product_Title: 'input[data-testid="input-title"]',
    Input_product_Description: 'textarea[data-testid="input-description"]',
    Input_product_reference: 'input[data-testid="input-ref"]',
    Input_product_marque: 'input[data-testid="input-brand"]',
    Select_product_categorie_trigger: 'p-select[data-testid="select-category"]',
    Select_product_categorie_list: 'div[data-pc-section="listcontainer"]',
    Select_Product_unit_trigger: 'p-select[data-testid="select-unit"]',
    Select_Product_unit_list: 'div[data-pc-section="listcontainer"]',
    Input_Product_price: 'p-inputnumber[data-testid="input-amount"]',
    Select_Product_currency_trigger: 'p-select[data-testid="select-currency"]',
    Select_Procuct_currency_list: 'ul[aria-label="Option List"]',
    Input_Product_TVA: 'p-inputnumber[data-testid="input-tva"]',
    BTN_sumbit_product_add: 'p-button[data-testid="btn-submit"]',
    product_title : `Product_title_Automation_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0,5)}`,
    product_Description : `Product_desctiption_Automation_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0,5)}`,
    product_reference:  `REF_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0,4)}`,
    Product_marque: brands[Math.floor(Math.random() * brands.length)],
    price: (Math.random() * 1000).toFixed(2),
    TVA: (Math.random() * 20).toFixed(2)
}

export default AddnewproductElements