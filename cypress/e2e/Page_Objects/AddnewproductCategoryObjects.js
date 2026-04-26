const ProductCatogries = {
    ProductCatogriesURL: 'a[href="/employee/product-categories"]',
    CreatePCategoriesBTN: 'p-button[icon="pi pi-plus"]',
    PcategoriesFORM: 'product-category-form',
    TitleInput: 'input[id="title"]',
    DescriptionInput: 'textarea[id="description"]',
    SubmitPCBTN: 'p-button[type="submit"]',
    ProductCategoryTitle: `CategoryAutomation_${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0,7)}`,
    PcategoriesTABLE: 'tbody[class="p-datatable-tbody"]'
}

export default ProductCatogries;