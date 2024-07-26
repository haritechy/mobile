const authState = {
  userInfo: null,
  registerData: null,
  loginData: null,
  recoverUserData: null,
  sendOtpData: null,
  verifyOtpData: null,
  resetPasswordData: null,
  emailVerificationData: null,
  phoneVerificationData: null,
  userData: null,
  updateUserData: null,
  errorMessage: null,
  loginError: null,
  signupError: null,
  recoverUserError: null,
  sendOtpError: null,
  verifyOtpError: null,
  resetPasswordError: null,
  phoneVerificationError: null,
  emailVerificationError: null,
  getUserError: null,
  editUserError: null,
  externalLoginError: null,
  editUserData: null,
  uploadProfileError: null,
  uploadProfileData: null,
  loginType: null,
  deleteUserAccountData: [],
  deleteUserAccountError: null,
  matchPasswordSuccess: null,
  matchPasswordError: null,
  isFirstLogin: true,
  reminderDate: undefined,
  reminderCount: undefined,
};

function userReducer(state = authState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        userInfo: action?.emailOrPhoneVerified ? action.payload?.result : null,
        loginData: action.payload,
        loginError: null,
        loginType: 'default',
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        userInfo: null,
        loginData: null,
        loginError: action?.error,
      };
    case 'SIGNUP':
      return {
        ...state,
        registerData: action.payload,
        signupError: null,
      };
    case 'SIGNUP_FAIL':
      return {...state, registerData: null, signupError: action?.error};
    case 'RECOVER_USERNAME':
      return {
        ...state,
        recoverUserData: action.payload,
        recoverUserError: null,
      };
    case 'RECOVER_USERNAME_FAIL':
      return {
        ...state,
        recoverUserData: null,
        recoverUserError: action?.error,
      };
    case 'SEND_OTP':
      return {
        ...state,
        sendOtpData: action.payload,
        sendOtpError: null,
      };
    case 'SEND_OTP_FAIL':
      return {
        ...state,
        sendOtpData: null,
        sendOtpError: action?.error,
      };
    case 'VERIFY_OTP':
      return {
        ...state,
        verifyOtpData: action.payload,
        verifyOtpError: null,
      };
    case 'VERIFY_OTP_FAIL':
      return {
        ...state,
        verifyOtpData: null,
        verifyOtpError: action?.error,
      };
    case 'RESET_PASSWORD':
      return {
        ...state,
        resetPasswordData: action.payload,
        resetPasswordError: null,
      };
    case 'RESET_PASSWORD_FAIL':
      return {
        ...state,
        resetPasswordData: null,
        resetPasswordError: action?.error,
      };
    case 'EMAIL_VERIFICATION':
      return {
        ...state,
        emailVerificationData: action.payload,
        emailVerificationError: null,
      };
    case 'EMAIL_VERIFICATION_FAIL':
      return {
        ...state,
        emailVerificationData: null,
        emailVerificationError: action?.error,
      };
    case 'PHONE_VERIFICATION':
      return {
        ...state,
        phoneVerificationData: action.payload,
        phoneVerificationError: null,
      };
    case 'PHONE_VERIFICATION_FAIL':
      return {
        ...state,
        phoneVerificationData: null,
        phoneVerificationError: action?.error,
      };
    case 'GET_USER':
      return {
        ...state,
        userData: action.payload?.result,
        getUserError: null,
      };
    case 'GET_USER_FAIL':
      return {
        ...state,
        userData: null,
        getUserError: action?.error,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        editUserData: action.payload,
        editUserError: null,
      };
    case 'UPDATE_USER_FAIL':
      return {
        ...state,
        editUserData: null,
        editUserError: action?.error,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        uploadProfileData: action.payload,
        uploadProfileError: null,
      };
    case 'UPDATE_PROFILE_FAIL':
      return {
        ...state,
        uploadProfileData: null,
        uploadProfileError: action?.error,
      };
    case 'EXTERNAL_LOGIN':
      return {
        ...state,
        loginData: action.payload,
        userInfo: action?.emailOrPhoneVerified ? action.payload?.result : null,
        externalLoginError: null,
        loginType: action?.loginType,
      };
    case 'EXTERNAL_LOGIN_FAIL':
      return {
        ...state,
        loginData: null,
        userInfo: null,
        externalLoginError: action?.error,
      };
    case 'UPDATE_USERINFO':
      return {
        ...state,
        userInfo: action.data,
      };
    case 'REFRESH_TOKEN':
      return {
        ...authState,
        userInfo: action.payload?.result,
      };
    case 'CLEAR_PROFILE_STATE':
      return {
        ...state,
        phoneVerificationData: null,
        emailVerificationData: null,
        phoneVerificationError: null,
        emailVerificationError: null,
        editUserData: null,
        uploadProfileData: null,
      };
    case 'LOGOUT':
      return {...authState};
    case 'DELETE_ACCOUNT_SUCCESS':
      return {
        ...state,
        deleteUserAccountData: action.payload,
        deleteUserAccountError: null,
      };
    case 'DELETE_ACCOUNT_FAIL':
      return {
        ...state,
        deleteUserAccountData: [],
        deleteUserAccountError: action.error,
      };
    case 'PASSWORD_MATCH_SUCCESS':
      return {
        ...state,
        matchPasswordSuccess: action.payload,
        matchPasswordError: null,
      };
    case 'PASSWORD_MATCH_FAIL':
      return {
        ...state,
        matchPasswordSuccess: null,
        matchPasswordError: action?.error,
      };
    case 'FIRST_ATTEMPT':
      return {
        ...state,
        isFirstLogin: false,
      };
    case 'SAVE_REMINDER':
      return {
        ...state,
        reminderDate: action.date,
        reminderCount: action.count,
      };
    default:
      return state;
  }
}

export default userReducer;
