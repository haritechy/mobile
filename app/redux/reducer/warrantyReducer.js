const warrantyState = {
  listWarranties: [],
  getWarrantiesError: null,
  listProductWarranties: null,
  productWarrantyError: null,
  warrantyFilter: null,
  updateWarrantyData: null,
  updateWarrantyError: null,
  addWarrantyData: null,
  addWarrantyError: null,
  warrantyPage: null,
  deleteWarrantyData: null,
  deleteWarrantyError: null,
};

function warrantyReducer(state = warrantyState, action) {
  switch (action.type) {
    case 'GET_WARRANTIES_SUCCESS':
      return {
        ...state,
        listWarranties: action.payload?.result,
        warrantyFilter: action.filter,
        getWarrantiesError: null,
        warrantyPage: action.payload?.pageDetail,
      };
    case 'GET_WARRANTIES_FAIL':
      return {
        ...state,
        listWarranties: [],
        getWarrantiesError: action.error,
        warrantyPage: null,
      };
    case 'PRODUCT_WARRANTY_SUCCESS':
      return {
        ...state,
        listProductWarranties: action.payload,
        productWarrantyError: null,
      };
    case 'PRODUCT_WARRANTY_FAIL':
      return {
        ...state,
        listProductWarranties: null,
        productWarrantyError: action.error,
      };
    case 'UPDATE_WARRANTY_SUCCESS':
      return {
        ...state,
        updateWarrantyData: action.payload,
        updateWarrantyError: null,
      };
    case 'UPDATE_WARRANTY_FAIL':
      return {
        ...state,
        updateWarrantyData: null,
        updateWarrantyError: action.error,
      };
    case 'POST_WARRANTY_SUCCESS':
      return {
        ...state,
        addWarrantyData: action.payload,
        addWarrantyError: null,
      };
    case 'POST_WARRANTY_FAIL':
      return {
        ...state,
        addWarrantyData: null,
        addWarrantyError: action.error,
      };
    case 'DELETE_WARRANTY_SUCCESS':
      return {
        ...state,
        deleteWarrantyData: action.payload,
        deleteWarrantyError: null,
      };
    case 'DELETE_WARRANTY_FAIL':
      return {
        ...state,
        deleteWarrantyData: null,
        deleteWarrantyError: action.error,
      };
    case 'RESET_WARRANTY_FILTER':
      return {
        ...state,
        warrantyFilter: null,
      };
    case 'CLEAR_WARRANTY_STATE':
      return {
        ...warrantyState,
      };
    default:
      return state;
  }
}

export default warrantyReducer;
