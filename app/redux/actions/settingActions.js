import {loaderRef} from '../../components';
import {Strings} from '../../constants';
import {changePasswordRequest} from '../../services/Api';

// Theme Action
const switchTheme = mode => {
  return async dispatch => {
    dispatch({
      type: 'CHANGE_THEME',
      payload: mode,
    });
  };
};

// Biometric Action
const setBiometric = isBiometric => {
  return async dispatch => {
    dispatch({
      type: 'SET_BIOMETRIC',
      payload: isBiometric,
    });
  };
};

// Change Password Action
const changePassword = passData => {
  return dispatch => {
    changePasswordRequest(passData).then(
      response => {
        loaderRef.current.hide();
        if (response?.ok) {
          dispatch({
            type: 'CHANGE_PASSWORD',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'CHANGE_PASSWORD_FAIL',
            error: response?.data?.message || Strings.somethingWentWrong,
          });
        }
      },
      err => {
        console.log('changePassword error ', err);
        loaderRef.current.hide();
      },
    );
  };
};

const clearSettingState = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_SETTING_STATE',
    });
  };
};

// update app version
const setUpdateApp = isUpdateNeed => {
  return async dispatch => {
    dispatch({
      type: 'IS_UPDATE_NEED',
      payload: isUpdateNeed,
    });
  };
};

export {
  setBiometric,
  switchTheme,
  changePassword,
  clearSettingState,
  setUpdateApp,
};
