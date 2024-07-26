import moment from 'moment';
import {
  authenticate,
  register,
  sendEmailVerification,
  sendOtpRequest,
  verifyOtpRequest,
  sendPhoneVerification,
  recoverUsername,
  resetPasswordRequest,
  getUserData,
  externalLogin,
  updateUserData,
  postUserProfile,
  refreshToken,
  deleteUserAccount,
  deleteAccountConfirmPassword,
  updateVerificationReminder,
} from '../../services/Api';
import {loaderRef} from '../../components';
import {AppConstants, Strings} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Login Action
const login = (authData, onCallBack) => {
  return dispatch => {
    authenticate(authData).then(
      async response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          await AsyncStorage.setItem(AppConstants.IS_ASYNC_USER, 'true');
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: response?.data,
            emailOrPhoneVerified:
              response?.data?.result?.emailConfirmed ||
              response?.data?.result?.phoneNumberConfirmed,
          });
        } else {
          dispatch({
            type: 'LOGIN_FAIL',
            error: response?.data?.message || Strings.somethingWentWrong,
          });
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

// Create Account Action
const createAccount = (data, onCallBack) => {
  return dispatch => {
    register(data).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'SIGNUP',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'SIGNUP_FAIL',
            error: response?.data?.message || Strings.somethingWentWrong,
          });
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

// Email Verification Action
const sendVerificationToEmail = (emailOrPhone, onCallBack) => {
  return dispatch => {
    sendEmailVerification(emailOrPhone).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'EMAIL_VERIFICATION',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'EMAIL_VERIFICATION_FAIL',
            error: response?.data?.message || Strings.somethingWentWrong,
          });
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

// Phone Verification Action
const sendVerificationToPhone = (code, phone, onCallBack) => {
  return dispatch => {
    sendPhoneVerification(code, phone).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'PHONE_VERIFICATION',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'PHONE_VERIFICATION_FAIL',
            error: response?.data?.message || Strings.somethingWentWrong,
          });
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

// Recover Username Action
const forgotUsername = (emailOrPhone, code, onCallBack) => {
  return dispatch => {
    recoverUsername(emailOrPhone, code).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'RECOVER_USERNAME',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'RECOVER_USERNAME_FAIL',
            error: response?.data?.message || Strings.somethingWentWrong,
          });
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

// Send OTP Action
const sendOtp = (emailOrPhone, code, onCallback) => {
  return dispatch => {
    sendOtpRequest(emailOrPhone, code).then(
      response => {
        loaderRef.current.hide();
        onCallback && onCallback(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'SEND_OTP',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'SEND_OTP_FAIL',
            error: response?.data?.message || Strings.somethingWentWrong,
          });
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

// Verify OTP Action
const verifyOtp = (userData, onCallback) => {
  return dispatch => {
    verifyOtpRequest(userData).then(
      response => {
        loaderRef.current.hide();
        onCallback && onCallback(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'VERIFY_OTP',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'VERIFY_OTP_FAIL',
            error: response?.data?.message || Strings.somethingWentWrong,
          });
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

// Reset Password Action
const resetPassword = (data, onCallback) => {
  return dispatch => {
    resetPasswordRequest(data).then(
      response => {
        loaderRef.current.hide();
        onCallback && onCallback(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'RESET_PASSWORD',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'RESET_PASSWORD_FAIL',
            error: response?.data?.message || Strings.somethingWentWrong,
          });
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

// External Action
const loginFromExternal = (loginData, loginType, onCallBack) => {
  return dispatch => {
    externalLogin(loginData).then(
      async response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          await AsyncStorage.setItem(AppConstants.IS_ASYNC_USER, 'true');
          dispatch({
            type: 'EXTERNAL_LOGIN',
            payload: response?.data,
            loginType: loginType,
            emailOrPhoneVerified:
              response?.data?.result?.emailConfirmed ||
              response?.data?.result?.phoneNumberConfirmed,
          });
          const {result} = response?.data;
          dispatch({
            type: 'SAVE_REMINDER',
            date: moment(result?.verificationRemindedOn),
            count: result?.verificationReminderCount,
          });
        } else {
          dispatch({
            type: 'EXTERNAL_LOGIN_FAIL',
            error: response?.data?.message || Strings.somethingWentWrong,
          });
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

// Refresh Token Action
const refreshUserToken = tokenData => {
  return dispatch => {
    refreshToken(tokenData).then(
      response => {
        loaderRef.current.hide();
        if (response?.ok) {
          dispatch({
            type: 'REFRESH_TOKEN',
            payload: response?.data,
          });
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

// Logout Action
const clearAll = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
      payload: {},
    });
  };
};

// Get User Action
const getUser = () => {
  return dispatch => {
    getUserData().then(
      response => {
        loaderRef.current.hide();
        if (response?.ok) {
          dispatch({
            type: 'GET_USER',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'GET_USER_FAIL',
            error: response?.data?.message || Strings.somethingWentWrong,
          });
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

// Update Profile Action
const updateProfile = (selectedProfile, onCallBack) => {
  return dispatch => {
    postUserProfile(selectedProfile).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data[0]);
        if (response?.ok) {
          dispatch({
            type: 'UPDATE_PROFILE',
            payload: response?.data[0],
          });
        } else {
          dispatch({
            type: 'UPDATE_PROFILE_FAIL',
            error: response?.data?.message || Strings.somethingWentWrong,
          });
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

// Update User Action
const updateUser = (editData, onCallBack) => {
  return dispatch => {
    updateUserData(editData).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'UPDATE_USER',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'UPDATE_USER_FAIL',
            error: response?.data?.message || Strings.somethingWentWrong,
          });
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

// delete account confirm password Action
const deleteAccountMatchPassword = (matchPassword, onCallBack) => {
  return dispatch => {
    deleteAccountConfirmPassword(matchPassword).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'PASSWORD_MATCH_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'PASSWORD_MATCH_FAIL',
            error: response?.data?.message || Strings.somethingWentWrong,
          });
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};
// delete user account Action
const deleteAccount = (userId, successCallback) => {
  return dispatch => {
    deleteUserAccount(userId).then(
      response => {
        loaderRef.current.hide();
        successCallback && successCallback(response?.ok);
        if (response?.ok) {
          dispatch({
            type: 'DELETE_ACCOUNT_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'DELETE_ACCOUNT_FAIL',
            error: response?.data?.message || Strings.somethingWentWrong,
          });
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

const clearAddressState = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_ADDRESS_STATE',
    });
  };
};

const setVerificationReminder = (count, onCallBack) => {
  return dispatch => {
    updateVerificationReminder().then(response => {
      onCallBack && onCallBack(response?.ok);
      if (response?.ok) {
        dispatch({
          type: 'SAVE_REMINDER',
          date: moment(new Date()),
          count: count,
        });
      }
    });
  };
};
export {
  refreshUserToken,
  login,
  clearAll,
  createAccount,
  forgotUsername,
  sendVerificationToEmail,
  sendVerificationToPhone,
  sendOtp,
  verifyOtp,
  resetPassword,
  getUser,
  updateUser,
  updateProfile,
  loginFromExternal,
  clearAddressState,
  deleteAccountMatchPassword,
  deleteAccount,
  setVerificationReminder,
};
