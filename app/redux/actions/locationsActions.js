import {loaderRef} from '../../components';
import {AppConstants, Strings} from '../../constants';
import {
  postLocations,
  getLocations,
  deleteLocations,
  putLocation,
} from '../../services/Api';

// Add Locations Action
const addLocation = (locationsData, onCallBack) => {
  return dispatch => {
    postLocations(locationsData).then(
      response => {
        loaderRef.current.hide();
        onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'ADD_LOCATIONS_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'ADD_LOCATIONS_FAIL',
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

// Update Locations Action
const updateLocation = (locationsData, onCallBack) => {
  return dispatch => {
    putLocation(locationsData).then(
      response => {
        loaderRef.current.hide();
        onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'EDIT_LOCATION_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'EDIT_LOCATION_FAIL',
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

// get Locations Action
const getExistsLocation = (
  take = AppConstants.MAX_COUNT,
  search,
  sortBy,
  filter,
  onCallBack,
) => {
  return dispatch => {
    getLocations(take, search, sortBy, filter).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok);
        if (response?.ok) {
          dispatch({
            type: 'GET_LOCATIONS_SUCCESS',
            payload: response?.data,
            sortBy: sortBy,
            filter: filter,
          });
        } else {
          dispatch({
            type: 'GET_LOCATIONS_FAIL',
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

// delete Locations Action
const deleteExistsLocation = (locationIds, successCallback) => {
  return dispatch => {
    deleteLocations(locationIds).then(
      response => {
        successCallback && successCallback(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'DELETE_LOCATIONS_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'DELETE_LOCATIONS_FAIL',
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

// select Location Action
const selectLocation = location => {
  return dispatch => {
    dispatch({
      type: 'SELECT_LOCATION',
      data: location,
    });
  };
};
export {
  addLocation,
  updateLocation,
  getExistsLocation,
  deleteExistsLocation,
  selectLocation,
};
