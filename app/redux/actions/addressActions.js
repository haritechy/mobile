import {loaderRef} from '../../components';
import {AppConstants, Strings} from '../../constants';
import {
  getCities,
  getCountries,
  getStates,
  getUserAddress,
  postUserAddress,
  getStatesByCountry,
  getCitiesByState,
  postCities,
} from '../../services/Api';

// Get Country Action
const getExistCountries = () => {
  return dispatch => {
    getCountries(AppConstants.MAX_COUNTRY_COUNT).then(
      response => {
        loaderRef.current.hide();
        if (response?.ok) {
          dispatch({
            type: 'GET_COUNTRIES',
            payload: response?.data,
          });
        } else {
          dispatch({type: 'ERROR', error: response?.data?.message});
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

// Get State Action
const getExistStates = () => {
  return dispatch => {
    getStates().then(
      response => {
        loaderRef.current.hide();
        if (response?.ok) {
          dispatch({
            type: 'GET_STATES',
            payload: response?.data,
          });
        } else {
          dispatch({type: 'ERROR', error: response?.data?.message});
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

// Get State by Country Id Action
const getStatesOfCountry = (id, onCallback) => {
  return dispatch => {
    getStatesByCountry(id).then(
      response => {
        if (response?.ok) {
          onCallback && onCallback(response?.ok, response?.data?.result);
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

// Get City by State Id Action
const getCitiesOfState = (id, onCallback) => {
  return dispatch => {
    getCitiesByState(id).then(
      response => {
        loaderRef.current.hide();
        if (response?.ok) {
          onCallback && onCallback(response?.ok, response?.data?.result);
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

// Get City Action
const getExistCities = () => {
  return dispatch => {
    getCities().then(
      response => {
        loaderRef.current.hide();
        if (response?.ok) {
          dispatch({
            type: 'GET_CITIES',
            payload: response?.data,
          });
        } else {
          dispatch({type: 'ERROR', error: response?.data?.message});
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

// Post add cities Action
const postAddCities = (cityData, onCallBack) => {
  return dispatch => {
    postCities(cityData).then(response => {
      onCallBack && onCallBack(response?.ok, response?.data);
    });
  };
};

// Get Address Action
const getAddresses = () => {
  return dispatch => {
    getUserAddress().then(
      response => {
        loaderRef.current.hide();
        if (response?.ok) {
          dispatch({
            type: 'GET_ADDRESS',
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

// Post Address Action
const postAddresses = (addressData, onCallBack) => {
  return dispatch => {
    postUserAddress(addressData).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'ADD_ADDRESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'POST_ADDRESS_FAIL',
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

export {
  getExistCountries,
  getExistStates,
  getExistCities,
  getStatesOfCountry,
  getCitiesOfState,
  getAddresses,
  postAddresses,
  postAddCities,
};
