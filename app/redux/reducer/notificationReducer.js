const notificationState = {
  addDeviceData: null,
  addDeviceError: null,
  deleteDeviceData: null,
  deleteDeviceError: null,
  listNotifications: null,
  notificationPage: null,
  notificationError: null,
  readNotificationData: null,
  readNotificationError: null,
  notificationPreferenceData: null,
  notificationPreferenceError: null,
  updatedNotificationPreferenceData: null,
  updatedNotificationPreferenceError: null,
  postNotificationPreferenceData: null,
  postNotificationPreferenceError: null,
};

function notificationReducer(state = notificationState, action) {
  switch (action.type) {
    case 'ADD_DEVICE_SUCCESS':
      return {
        ...state,
        addDeviceData: action.payload,
        addDeviceError: null,
      };
    case 'ADD_DEVICE_FAIL':
      return {
        ...state,
        addDeviceData: null,
        addDeviceError: action.error,
      };
    case 'DELETE_DEVICE_SUCCESS':
      return {
        ...state,
        deleteDeviceData: action.payload,
        deleteDeviceError: null,
      };
    case 'DELETE_DEVICE_FAIL':
      return {
        ...state,
        deleteDeviceData: null,
        deleteDeviceError: action.error,
      };
    case 'GET_NOTIFICATIONS_SUCCESS':
      return {
        ...state,
        listNotifications: action.payload?.result,
        notificationPage: action.payload?.notificationPageDetail,
        notificationError: null,
      };
    case 'GET_NOTIFICATIONS_FAIL':
      return {
        ...state,
        listNotifications: null,
        notificationPage: null,
        notificationError: action.error,
      };
    case 'READ_NOTIFICATION_SUCCESS':
      return {
        ...state,
        readNotificationData: action.payload,
        readNotificationError: null,
      };
    case 'READ_NOTIFICATION_FAIL':
      return {
        ...state,
        readNotificationData: null,
        readNotificationError: action.error,
      };
    case 'GET_NOTIFICATION_PREFERENCE_SUCCESS':
      return {
        ...state,
        notificationPreferenceData: action.payload?.result,
        notificationPreferenceError: null,
      };
    case 'GET_NOTIFICATION_PREFERENCE_FAIL':
      return {
        ...state,
        notificationPreferenceData: null,
        notificationPreferenceError: action.error,
      };
    case 'ADD_NOTIFICATION_PREFERENCE_SUCCESS':
      return {
        ...state,
        postNotificationPreferenceData: action.payload,
        postNotificationPreferenceError: null,
      };
    case 'ADD_NOTIFICATION_PREFERENCE_FAIL':
      return {
        ...state,
        postNotificationPreferenceData: null,
        postNotificationPreferenceError: action.error,
      };
    case 'UPDATE_NOTIFICATION_PREFERENCE_SUCCESS':
      return {
        ...state,
        updatedNotificationPreferenceData: action.payload,
        updatedNotificationPreferenceError: null,
      };
    case 'UPDATE_NOTIFICATION_PREFERENCE_FAIL':
      return {
        ...state,
        updatedNotificationPreferenceData: null,
        updatedNotificationPreferenceError: action.error,
      };
    case 'CLEAR_NOTIFICATION_STATE':
      return {
        ...notificationState,
      };
    default:
      return state;
  }
}

export default notificationReducer;
