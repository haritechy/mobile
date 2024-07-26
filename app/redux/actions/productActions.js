import {loaderRef} from '../../components';
import {Strings} from '../../constants';
import {
  getProductCategory,
  getCategoryForm,
  getBarcodeProduct,
  postProducts,
  postProductImage,
  getProducts,
  getLocationProducts,
  getProductDetail,
  updateProduct,
  deleteProductImage,
  deleteProducts,
  moveProducts,
} from '../../services/Api';

// get exist product category Action
const getExistProductCategory = onCallBack => {
  return dispatch => {
    getProductCategory().then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data?.result);
        if (response?.ok) {
          dispatch({
            type: 'GET_PRODUCT_CATEGORY_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'GET_PRODUCT_CATEGORY_FAIL',
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

// get category form Action
const getCategoryFormData = (categoryId, successCallback) => {
  return dispatch => {
    getCategoryForm(categoryId).then(
      response => {
        loaderRef.current.hide();
        if (response?.ok) {
          dispatch({
            type: 'GET_JSON_FORM_SUCCESS',
            payload: response?.data,
          });
          successCallback(response?.data?.result);
        } else {
          dispatch({
            type: 'GET_JSON_FORM_FAIL',
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

// Add Product Action
const addProduct = (productData, onCallBack) => {
  return dispatch => {
    postProducts(productData).then(
      response => {
        onCallBack && onCallBack(response?.ok, response?.data);
        loaderRef.current.hide();
        if (response?.ok) {
          dispatch({
            type: 'ADD_PRODUCT_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'ADD_PRODUCT_FAIL',
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

// Add Product Image Action
const addProductImage = (productId, imageData) => {
  return dispatch => {
    postProductImage(productId, imageData).then(
      response => {
        loaderRef.current.hide();
        if (response?.ok) {
          dispatch({
            type: 'PRODUCT_IMAGE_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'PRODUCT_IMAGE_FAIL',
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

// get product data Action
const getProductData = (take, search, sortBy, filter, onCallBack) => {
  return dispatch => {
    getProducts(take, search, sortBy, filter).then(
      response => {
        onCallBack && onCallBack(response?.ok);
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok);
        if (response?.ok) {
          dispatch({
            type: 'GET_PRODUCT_SUCCESS',
            payload: response?.data,
            sortBy: sortBy,
            filter: filter,
          });
        } else {
          dispatch({
            type: 'GET_PRODUCT_FAIL',
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

// get product data Action
const getLocationProductData = (
  locationId,
  search,
  sortBy,
  filter,
  onCallBack = undefined,
) => {
  return dispatch => {
    getLocationProducts(locationId, search, sortBy, filter).then(
      response => {
        onCallBack && onCallBack(response?.ok);
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok);
        if (response?.ok) {
          dispatch({
            type: 'GET_LOCATION_PRODUCT_SUCCESS',
            payload: response?.data,
            sortBy: sortBy,
            filter: filter,
          });
        } else {
          dispatch({
            type: 'GET_LOCATION_PRODUCT_FAIL',
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

// get product detail  Action
const getProductDetailData = (productId, successCallback) => {
  return dispatch => {
    getProductDetail(productId).then(
      response => {
        loaderRef.current.hide();
        if (response?.ok) {
          dispatch({
            type: 'GET_JSON_DETAIL_SUCCESS',
            payload: response?.data?.result[0],
          });
          successCallback && successCallback(response?.data?.result);
        } else {
          dispatch({
            type: 'GET_JSON_DETAIL_FAIL',
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

// Update product detail Action
const updateProductDetail = (productId, editProductData, onCallBack) => {
  return dispatch => {
    updateProduct(productId, editProductData).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'UPDATE_PRODUCT_DETAIL_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'UPDATE_PRODUCT_DETAIL_FAIL',
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

// Delete Product Image Action
const removeProductImage = (productId, imageIds) => {
  return dispatch => {
    deleteProductImage(productId, imageIds).then(
      response => {
        loaderRef.current.hide();
        if (response?.ok) {
          dispatch({
            type: 'DELETE_PRODUCT_IMAGE_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'DELETE_PRODUCT_IMAGE_FAIL',
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
const deleteFromProducts = (productIds, onCallBack) => {
  return () => {
    deleteProducts(productIds).then(
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

// Add Product Action
const moveProductToLocation = (productMoveData, onCallBack) => {
  return dispatch => {
    moveProducts(productMoveData).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok);
        if (response?.ok) {
          dispatch({
            type: 'MOVE_PRODUCT_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'MOVE_PRODUCT_FAIL',
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

// Scan Product Action
const getScannedProducts = (qrId, onCallBack) => {
  return () => {
    getBarcodeProduct(qrId)
      .then(
        response => {
          loaderRef.current.hide();
          onCallBack && onCallBack(response?.ok, response?.data?.product);
        },
        () => {
          loaderRef.current.hide();
        },
      )
      .catch(e => console.log('scan error ', e));
  };
};
export {
  getExistProductCategory,
  getCategoryFormData,
  addProduct,
  addProductImage,
  getProductData,
  getProductDetailData,
  updateProductDetail,
  removeProductImage,
  deleteFromProducts,
  moveProductToLocation,
  getLocationProductData,
  getScannedProducts,
};
