const contactUsState = {
  contactUsData: null,
  contactUsError: null,
};

function contactUsReducer(state = contactUsState, action) {
  switch (action.type) {
    case 'CONTACT_SUCCESS':
      return {
        ...state,
        contactUsData: action.payload,
        postAddressError: null,
      };
    case 'CONTACT_FAIL':
      return {
        ...state,
        contactUsData: null,
        postAddressError: action.error,
      };
    case 'CLEAR_CONTACT_STATE':
      return {
        ...contactUsState,
      };
    default:
      return state;
  }
}

export default contactUsReducer;
