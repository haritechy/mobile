import {loaderRef} from '../../components';
import {Strings} from '../../constants';
import {
  getWarranties,
  getWarrantyDetail,
  updateProductWarranties,
  postProductWarranties,
  deleteProductWarranties,
} from '../../services/Api';

// Get All warranties Actions
const getAllWarranties = (search, filter, take) => {
  return dispatch => {
    getWarranties(search, filter, take).then(
      response => {
        loaderRef.current.hide();
        if (response?.ok) {
          dispatch({
            type: 'GET_WARRANTIES_SUCCESS',
            filter: filter,
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'GET_WARRANTIES_FAIL',
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

// Get Warranty Detail Actions
const getProductWarranty = productId => {
  return dispatch => {
    getWarrantyDetail(productId).then(
      response => {
        loaderRef.current.hide();
        if (response?.ok) {
          const sortedWarranties = response?.data?.result.sort(function compare(
            a,
            b,
          ) {
            return new Date(a.createdOn) - new Date(b.createdOn);
          });
          dispatch({
            type: 'PRODUCT_WARRANTY_SUCCESS',
            payload: sortedWarranties,
          });
        } else {
          dispatch({
            type: 'PRODUCT_WARRANTY_FAIL',
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

// Update Warranty Actions
const updateProductWarranty = (productWarranties, onCallBack) => {
  return dispatch => {
    updateProductWarranties(productWarranties).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'UPDATE_WARRANTY_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'UPDATE_WARRANTY_FAIL',
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

// Add Warranty Actions
const addProductWarranty = (productWarranties, onCallBack) => {
  return dispatch => {
    postProductWarranties(productWarranties).then(
      response => {
        console.log('addProductWarranty response ', response);
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'POST_WARRANTY_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'POST_WARRANTY_FAIL',
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
// Delete Product Action
const deleteProductWarranty = (warrantyIds, onCallBack) => {
  return () => {
    deleteProductWarranties(warrantyIds).then(
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
  getAllWarranties,
  getProductWarranty,
  updateProductWarranty,
  addProductWarranty,
  deleteProductWarranty,
};
