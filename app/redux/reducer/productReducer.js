const productState = {
  listProductCategory: [],
  getProductCategoryError: null,
  categoryFormData: [],
  getCategoryFormDataError: null,
  addProductData: null,
  addProductError: null,
  moveProductData: null,
  moveProductError: null,
  productImageData: null,
  deleteProductImageData: null,
  productImageError: null,
  listProductData: null,
  productPageDetail: null,
  locationProductsError: null,
  listLocationProducts: null,
  getProductDataError: null,
  productDetail: null,
  productDetailError: null,
  editProductData: null,
  editProductError: null,
  productLocationIds: '',
  productCategoryIds: '',
  productPurchaseDate: '',
  productWarrantyDate: '',
  productSortBy: '',
  productFilter: null,
  productDeliveryFilter: null,
  addedWarranty: null,
};

function productReducer(state = productState, action) {
  switch (action.type) {
    case 'GET_PRODUCT_CATEGORY_SUCCESS':
      return {
        ...state,
        listProductCategory: action.payload?.result,
        getProductCategoryError: null,
      };
    case 'GET_PRODUCT_CATEGORY_FAIL':
      return {
        ...state,
        listProductCategory: [],
        getProductCategoryError: action.error,
      };
    case 'GET_JSON_FORM_SUCCESS':
      return {
        ...state,
        categoryFormData: action.payload?.result,
        getCategoryFormDataError: null,
      };
    case 'GET_JSON_FORM_FAIL':
      return {
        ...state,
        categoryFormData: [],
        getCategoryFormDataError: action.error,
      };
    case 'ADD_PRODUCT_SUCCESS':
      return {
        ...state,
        addProductData: action.payload,
        addProductError: null,
      };
    case 'ADD_PRODUCT_FAIL':
      return {
        ...state,
        addProductData: null,
        addProductError: action.error,
      };
    case 'MOVE_PRODUCT_SUCCESS':
      return {
        ...state,
        moveProductData: action.payload,
        moveProductError: null,
      };
    case 'MOVE_PRODUCT_FAIL':
      return {
        ...state,
        moveProductData: null,
        moveProductError: action.error,
      };
    case 'PRODUCT_IMAGE_SUCCESS':
      return {
        ...state,
        productImageData: action.payload,
        productImageError: null,
      };
    case 'PRODUCT_IMAGE_FAIL':
      return {
        ...state,
        productImageData: null,
        productImageError: action.error,
      };
    case 'DELETE_PRODUCT_IMAGE_SUCCESS':
      return {
        ...state,
        deleteProductImageData: action.payload,
      };
    case 'DELETE_PRODUCT_IMAGE_FAIL':
      return {
        ...state,
        deleteProductImageData: null,
      };
    case 'GET_PRODUCT_SUCCESS':
      return {
        ...state,
        listProductData: action.payload?.result,
        productPageDetail: action.payload?.pageDetail,
        productSortBy: action.sortBy,
        productFilter: action.filter,
        getProductDataError: null,
      };
    case 'GET_PRODUCT_FAIL':
      return {
        ...state,
        listProductData: null,
        getProductDataError: action.error,
      };
    case 'GET_LOCATION_PRODUCT_SUCCESS':
      return {
        ...state,
        listLocationProducts: action.payload?.result,
        productSortBy: action.sortBy,
        productDeliveryFilter: action.filter,
        locationProductsError: null,
      };
    case 'GET_LOCATION_PRODUCT_FAIL':
      return {
        ...state,
        listLocationProducts: null,
        locationProductsError: action.error,
      };
    case 'GET_JSON_DETAIL_SUCCESS':
      return {
        ...state,
        productDetail: action.payload,
        productDetailError: null,
      };
    case 'GET_JSON_DETAIL_FAIL':
      return {
        ...state,
        productDetail: null,
        productDetailError: action.error,
      };
    case 'UPDATE_PRODUCT_DETAIL_SUCCESS':
      return {
        ...state,
        editProductData: action.payload,
        editProductError: null,
      };
    case 'UPDATE_PRODUCT_DETAIL_FAIL':
      return {
        ...state,
        editProductData: null,
        editProductError: action?.error,
      };
    case 'RESET_PRODUCT_FILTER':
      return {
        ...state,
        productFilter: null,
      };
    case 'RESET_LOCATION_PRODUCT_FILTER':
      return {
        ...state,
        productDeliveryFilter: null,
      };
    case 'SAVE_WARRANTY':
      return {
        ...state,
        addedWarranty: action.data,
      };
    case 'CLEAR_WARRANTY':
      return {
        ...state,
        addedWarranty: null,
      };
    case 'CLEAR_PRODUCT_STATE':
      return {
        ...productState,
      };
    default:
      return state;
  }
}

export default productReducer;
