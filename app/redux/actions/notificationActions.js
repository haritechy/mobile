import {loaderRef} from '../../components';
import {AppConstants, Strings} from '../../constants';
import {
  deleteRegisterDeviceId,
  registerDevice,
  getNotifications,
  readNotification,
  getNotificationPreference,
  postNotificationPreference,
  updateNotificationPreference,
  deleteNotifications,
} from '../../services/Api';

// Add User device Actions
const registerUserDevice = (deviceData, onCallBack) => {
  return dispatch => {
    registerDevice(deviceData).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'ADD_DEVICE_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'ADD_DEVICE_FAIL',
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

// Delete User device Actions
const deleteRegisterDevice = (udId, onCallBack) => {
  return dispatch => {
    deleteRegisterDeviceId(udId).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'DELETE_DEVICE_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'DELETE_DEVICE_FAIL',
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

// Get Notification Actions
const getAllNotifications = (take = AppConstants.MAX_COUNT, onCallBack) => {
  return dispatch => {
    getNotifications(take).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'GET_NOTIFICATIONS_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'GET_NOTIFICATIONS_FAIL',
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

// Read Notification Actions
const markReadNotifications = (data, onCallBack) => {
  return dispatch => {
    readNotification(data).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'READ_NOTIFICATION_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'READ_NOTIFICATION_FAIL',
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

// Post Notification Preference Actions
const addNotificationPreference = (data, onCallBack) => {
  return dispatch => {
    postNotificationPreference(data).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'ADD_NOTIFICATION_PREFERENCE_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'ADD_NOTIFICATION_PREFERENCE_FAIL',
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

// Get Notification Preference Actions
const getAllNotificationPreference = onCallBack => {
  return dispatch => {
    getNotificationPreference().then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'GET_NOTIFICATION_PREFERENCE_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'GET_NOTIFICATION_PREFERENCE_FAIL',
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

// Update Notification Preference Actions
const updateAllNotificationPreference = (data, onCallBack) => {
  return dispatch => {
    updateNotificationPreference(data).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'UPDATE_NOTIFICATION_PREFERENCE_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'UPDATE_NOTIFICATION_PREFERENCE_FAIL',
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

// Delete Notification Actions
const removeNotifications = (Ids, onCallBack) => {
  return dispatch => {
    deleteNotifications(Ids).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

export {
  registerUserDevice,
  deleteRegisterDevice,
  getAllNotifications,
  markReadNotifications,
  addNotificationPreference,
  getAllNotificationPreference,
  updateAllNotificationPreference,
  removeNotifications,
};
