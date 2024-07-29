import axios from 'axios';
import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
} from '../actiontypes/warrantyBuy';

export const fetchProducts = () => {
  return async dispatch => {
    dispatch({type: FETCH_PRODUCTS_REQUEST});
    try {
      const response = await axios.get(
        'https://preprodjavaapi.melbeez.com//warranty/all',
      );
      dispatch({type: FETCH_PRODUCTS_SUCCESS, payload: response.data});
    } catch (error) {
      dispatch({type: FETCH_PRODUCTS_FAILURE, error: error.message});
    }
  };
};
