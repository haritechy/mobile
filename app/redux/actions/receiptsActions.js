import {loaderRef} from '../../components';
import {Strings} from '../../constants';
import {
  deleteReceipt,
  getProductOfReceipts,
  getReceipts,
  postReceipt,
  updateReceipt,
} from '../../services/Api';

// Get Receipts Actions
const getAllReceipts = (take, search, sortBy, filter, onCallBack) => {
  return dispatch => {
    getReceipts(take, search, sortBy, filter).then(
      response => {
        loaderRef.current.hide();
        if (response?.ok) {
          dispatch({
            type: 'GET_RECEIPTS_SUCCESS',
            payload: response?.data,
            sortBy: sortBy,
            filter: filter,
          });
        } else {
          dispatch({
            type: 'GET_RECEIPTS__FAIL',
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

// Get Receipt Product Actions
const getReceiptProducts = (receiptId, onCallBack) => {
  return dispatch => {
    getProductOfReceipts(receiptId).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data?.result[0]);
        if (response?.ok) {
          dispatch({
            type: 'RECEIPT_PRODUCT_SUCCESS',
            payload: response?.data?.result[0],
          });
        } else {
          dispatch({
            type: 'RECEIPT_PRODUCT_FAIL',
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

// Add Receipt Action
const addReceipt = (receiptData, onCallBack) => {
  return dispatch => {
    postReceipt(receiptData).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'POST_RECEIPT_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'POST_RECEIPT_FAIL',
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

// Edit Receipt Action
const editReceipt = (receiptData, onCallBack) => {
  return dispatch => {
    updateReceipt(receiptData).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'POST_RECEIPT_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'POST_RECEIPT_FAIL',
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

// Delete Receipt Action
const deleteReceiptAction = (receiptId, onCallBack) => {
  return dispatch => {
    deleteReceipt(receiptId).then(
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
  getAllReceipts,
  addReceipt,
  editReceipt,
  getReceiptProducts,
  deleteReceiptAction,
};
