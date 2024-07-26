import {api} from '../config/AppEnvironment';
import {checkForRefreshToken, logoutIfNotExist} from './Api';

const getRequest = async (endpoint, data = {}) => {
  checkForRefreshToken();
  const authData =
    require('../redux/store')?.store?.getState()?.userReducer?.userInfo;
  const response = await api.get(endpoint, data, {
    headers: {Authorization: `Bearer ${authData?.token}`},
  });
  logoutIfNotExist(response?.data);
  return response;
};

const postRequest = async (endpoint, data, headers = {}) => {
  checkForRefreshToken();
  const authData =
    require('../redux/store')?.store?.getState()?.userReducer?.userInfo;
  const response = await api.post(endpoint, data, {
    headers: {Authorization: `Bearer ${authData?.token}`, ...headers},
  });
  logoutIfNotExist(response?.data);
  return response;
};

const putRequest = async (endpoint, data, headers) => {
  checkForRefreshToken();
  const authData =
    require('../redux/store')?.store?.getState()?.userReducer?.userInfo;
  const response = await api.put(endpoint, data, {
    headers: {Authorization: `Bearer ${authData?.token}`},
  });
  logoutIfNotExist(response?.data);
  return response;
};

const deleteRequest = async (endpoint, data) => {
  checkForRefreshToken();
  const authData =
    require('../redux/store')?.store?.getState()?.userReducer?.userInfo;
  const response = await api.delete(
    endpoint,
    {},
    {data: data, headers: {Authorization: `Bearer ${authData?.token}`}},
  );
  logoutIfNotExist(response?.data);
  return response;
};

export {getRequest, postRequest, putRequest, deleteRequest};
