const settingState = {
  mode: 'light',
  changePasswordData: null,
  changePasswordError: null,
  error: null,
  isWalkthroughVisited: false,
  isBiometric: false,
  isUpdateNeeded: false,
};

function settingReducer(state = settingState, action) {
  switch (action.type) {
    case 'DISABLE_WALKTHROUGH':
      return {...state, isWalkthroughVisited: true};
    case 'CHANGE_PASSWORD':
      return {
        ...state,
        changePasswordData: action.payload,
        changePasswordError: null,
      };
    case 'CHANGE_PASSWORD_FAIL':
      return {
        ...state,
        changePasswordData: null,
        changePasswordError: action?.error,
      };
    case 'CHANGE_THEME':
      return {...state, mode: action.payload};
    case 'IS_UPDATE_NEED':
      return {...state, isUpdateNeeded: action.payload};

    case 'SET_BIOMETRIC':
      return {...state, isBiometric: action.payload};
    case 'ERROR':
      return {
        ...state,
        error: action?.error,
      };
    case 'CLEAR_SETTING_STATE':
      return {...state, changePasswordData: null};
    default:
      return state;
  }
}

export default settingReducer;
