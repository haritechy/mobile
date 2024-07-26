const addressState = {
  listCountries: [],
  listStates: [],
  listCities: [],
  listAddress: [],
  postAddressData: null,
  postAddressError: null,
};

function addressReducer(state = addressState, action) {
  switch (action.type) {
    case 'GET_COUNTRIES':
      return {
        ...state,
        listCountries: action.payload?.result,
      };
    case 'GET_STATES':
      return {...state, listStates: action.payload?.result};
    case 'GET_CITIES':
      return {
        ...state,
        listCities: action.payload?.result,
      };
    case 'GET_ADDRESS':
      return {
        ...state,
        listAddress: action.payload?.result,
      };
    case 'ADD_ADDRESS':
      return {
        ...state,
        postAddressData: action.payload,
      };
    case 'POST_ADDRESS_FAIL':
      return {
        ...state,
        postAddressError: action.error,
      };
    case 'ERROR':
      return {
        ...state,
        error: action?.error,
      };
    case 'CLEAR_ADDRESS_STATE':
      return {
        ...state,
        postAddressData: null,
      };
    default:
      return state;
  }
}

export default addressReducer;
