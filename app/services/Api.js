import {create} from 'apisauce';
import {Platform} from 'react-native';
import {api} from '../config/AppEnvironment';
import ApisConstants from '../constants/ApiConstants';
import {clearAll, refreshUserToken} from '../redux/actions/userActions';
import {isSessionExpired, isTokenExpired} from '../utils/helper';
import {deleteRequest, getRequest, postRequest, putRequest} from './commonApis';

const {
  authenticateUrl,
  refreshTokenUrl,
  registerUrl,
  forgotPasswordUrl,
  externalLoginUrl,
  sendOtpUrl,
  verifyOtpUrl,
  isUserExistUrl,
  changePasswordUrl,
  recoverUsernameUrl,
  phoneVerificationUrl,
  emailVerificationUrl,
  resetPasswordUrl,
  getUserUrl,
  getCountryUrl,
  getStateUrl,
  getStateByCountryUrl,
  getCityUrl,
  getCityByStateUrl,
  updateUserUrl,
  getAddressUrl,
  postAddressUrl,
  mediaUploadUrl,
  contactUsUrl,
  postLocationsUrl,
  getLocationUrl,
  deleteLocationUrl,
  getProductCategoryUrl,
  getProductCategoryFormUrl,
  productsUrl,
  receiptsUrl,
  moveProductsUrl,
  productWarrantyUrl,
  getChartUrl,
  registerDeviceUrl,
  notificationUrl,
  notificationPreferenceUrl,
  deleteAccountConfirmPasswordUrl,
  errorLogsUrl,
  verificationReminderUrl,
  barCodeScanLogUrl,
} = ApisConstants;

// Configure bar code api with apisause
export const scanApi = create({
  baseURL: 'https://barcodes1.p.rapidapi.com',
  headers: {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': '1216344d60msh2367cfb9a5ee50fp18762ajsnd34b2409016e',
    'X-RapidAPI-Host': 'barcodes1.p.rapidapi.com',
  },
  timeout: 30000,
});

// AUTH API Calls
const authenticate = authData => api.post(authenticateUrl, authData);

const register = data => api.post(registerUrl, data);

const forgotPassword = data => api.post(forgotPasswordUrl, data);

const refreshToken = data => api.post(refreshTokenUrl, data);

const sendOtpRequest = (emailOrPhone, countryCode = null) =>
  api.post(
    `${sendOtpUrl}?countryCode=${encodeURIComponent(
      countryCode,
    )}&Emailorphone=${emailOrPhone}`,
  );

const verifyOtpRequest = userData => api.post(verifyOtpUrl, userData);

const recoverUsername = (emailOrPhone, countryCode = null) =>
  api.post(
    `${recoverUsernameUrl}?countryCode=${encodeURIComponent(
      countryCode,
    )}&Emailorphone=` + emailOrPhone,
  );

const sendEmailVerification = email =>
  api.post(`${emailVerificationUrl}?Email=` + email);

const sendPhoneVerification = (countryCode, phoneNumber) =>
  api.post(
    `${phoneVerificationUrl}?countryCode=${encodeURIComponent(
      countryCode,
    )}&PhoneNumber=${phoneNumber}`,
  );

const resetPasswordRequest = data => api.post(resetPasswordUrl, data);

const isUserExist = username =>
  api.post(`${isUserExistUrl}?username=` + username);

const externalLogin = socialData => api.post(externalLoginUrl, socialData);

const checkForRefreshToken = () => {
  const authData =
    require('../redux/store')?.store?.getState()?.userReducer?.userInfo;
  if (isSessionExpired(authData?.refreshTokenExpiryTime)) {
    console.log('isSessionExpired called');
    require('../redux/store')?.store?.dispatch(clearAll());
  } else {
    if (authData && isTokenExpired(authData?.validTo)) {
      console.log('isTokenExpired called');
      const tokenData = {
        token: authData?.token,
        refreshToken: authData?.refreshToken,
      };
      require('../redux/store')?.store?.dispatch(refreshUserToken(tokenData));
    }
  }
};

const logoutIfNotExist = data => {
  if (data?.statusCode === 401) {
    require('../redux/store')?.store?.dispatch(clearAll());
  }
};

// AFTER AUTH API CALLS

const changePasswordRequest = passData => {
  const authData =
    require('../redux/store')?.store?.getState()?.userReducer?.userInfo;
  return api.post(changePasswordUrl, passData, {
    headers: {Authorization: `Bearer ${authData?.token}`},
  });
};
const getCharts = () => getRequest(getChartUrl, {});

const getUserData = () => getRequest(getUserUrl, {});

const updateUserData = editData => putRequest(updateUserUrl, editData);

const getCountries = take =>
  getRequest(`${getCountryUrl}?Skip=0&Take=${take}&OrderBy=${'id asc'}`, {});

const getStates = () => getRequest(getStateUrl, {});

const getStatesByCountry = countryId =>
  getRequest(`${getStateByCountryUrl}/${countryId}`, {});

const getCities = () => getRequest(getCityUrl, {});

const postCities = cityData => postRequest(getCityUrl, cityData);

const getCitiesByState = stateId =>
  getRequest(`${getCityByStateUrl}/${stateId}`, {});

const getUserAddress = () => getRequest(getAddressUrl, {});

const postUserAddress = addressData => postRequest(postAddressUrl, addressData);

const postContactUs = contactData => postRequest(contactUsUrl, contactData);

const postLocations = locationsData =>
  postRequest(postLocationsUrl, locationsData);

const putLocation = locationsData =>
  putRequest(postLocationsUrl, locationsData);

const getLocations = (take, search = '', sortBy = '', filter) => {
  const {listCategory, listType, warrantyDate} = filter || {};
  const selectedTypes = listType
    ? listType.filter(type => type.isSelected)
    : [];
  const listTypeIds = listType
    ? selectedTypes.map(type => type.id).toString()
    : '';
  const listCategoryIds = listCategory
    ? listCategory
        .map(category => {
          return category?.categoryId;
        })
        .toString()
    : '';
  let locationApiUrl = `${getLocationUrl}?Skip=0&Take=${take}&SearchText=${encodeURIComponent(
    search,
  )}&OrderBy=${sortBy}`;
  if (selectedTypes?.length > 0) {
    locationApiUrl = `${locationApiUrl}&locationTypes=${listTypeIds}`;
  }
  if (listCategory?.length > 0) {
    locationApiUrl = `${locationApiUrl}&categoryId=${listCategoryIds}`;
  }
  if (warrantyDate) {
    locationApiUrl = `${locationApiUrl}&from=${warrantyDate?.fromDate}&to=${warrantyDate?.toDate}`;
  }
  return getRequest(locationApiUrl, {});
};

const deleteLocations = locationIds =>
  deleteRequest(deleteLocationUrl, locationIds);

const postUserProfile = async selectedProfile => {
  const formData = new FormData();
  const file = {
    name: selectedProfile.fileName,
    type: selectedProfile.type,
    uri:
      Platform.OS === 'android'
        ? selectedProfile.uri
        : selectedProfile.uri.replace('file://', ''),
  };
  formData.append('files', file);
  formData.append('fileDriveName', 'UserProfile');
  return postRequest(mediaUploadUrl, formData, {
    'Content-Type': 'multipart/form-data',
  });
};

const uploadMediaFile = async (
  selectedFile,
  driveName,
  listImages,
  isMultiple,
) => {
  let formData = new FormData();
  if (isMultiple) {
    listImages?.map(image => {
      const file = {
        name: image.fileName,
        type: image.type,
        uri:
          Platform.OS === 'android'
            ? image.uri
            : image.uri.replace('file://', ''),
      };
      formData.append('files', file);
    });
  } else {
    const file = {
      name: selectedFile.fileName,
      type: selectedFile.type,
      uri:
        Platform.OS === 'android'
          ? selectedFile.uri
          : selectedFile.uri.replace('file://', ''),
    };
    formData.append('files', file);
  }
  formData.append('fileDriveName', driveName);
  return postRequest(mediaUploadUrl, formData, {
    'Content-Type': 'multipart/form-data',
  });
};

const getProductCategory = () => getRequest(getProductCategoryUrl, {});

const getCategoryForm = categoryId =>
  getRequest(`${getProductCategoryFormUrl}` + categoryId, {});

const getBarcodeProduct = qrId => scanApi.get(`?query=${qrId}`);

const postProducts = productsData => postRequest(productsUrl, productsData);

const postProductImage = (productId, imageData) =>
  postRequest(`${productsUrl}/${productId}/images`, imageData);

const postReceipt = receiptData => postRequest(receiptsUrl, receiptData);
const updateReceipt = receiptData => putRequest(receiptsUrl, receiptData);

const getReceipts = (take, search, sortBy, filter) => {
  let receiptApiUrl = `${receiptsUrl}??Skip=0&Take=${
    take || 100
  }&SearchText=${encodeURIComponent(search || '')}&OrderBy=${sortBy || ''}`;
  if (filter?.purchaseDate) {
    const {purchaseDate} = filter;
    receiptApiUrl = `${receiptApiUrl}&purchaseFromDate=${purchaseDate?.fromDate}&purchaseToDate=${purchaseDate?.toDate}`;
  }
  return getRequest(receiptApiUrl, {});
};

const getProductOfReceipts = receiptId =>
  getRequest(`${receiptsUrl}/${receiptId}`, {});

const getWarranties = (search, filter, take = 10) => {
  const {listCategoryFiltered, warrantyDate, warrantyStatus} = filter || {};
  let warrantyApiUrl = `${productWarrantyUrl}?Skip=0&Take=${take}&SearchText=${
    encodeURIComponent(search) || ''
  }`;
  if (listCategoryFiltered?.length > 0) {
    const listCategoryIds = listCategoryFiltered
      ? listCategoryFiltered
          .map(category => {
            return category?.categoryId;
          })
          .toString()
      : '';
    warrantyApiUrl = `${warrantyApiUrl}&categories=${listCategoryIds}`;
  }
  if (warrantyStatus) {
    warrantyApiUrl = `${warrantyApiUrl}&status=${warrantyStatus?.id}`;
  }
  if (warrantyDate?.fromDate || warrantyDate?.toDate) {
    warrantyApiUrl = `${warrantyApiUrl}&warrantyFromDate=${
      warrantyDate?.fromDate || ''
    }&warrantyToDate=${warrantyDate?.toDate || ''}`;
  }
  return getRequest(warrantyApiUrl, {});
};

const getWarrantyDetail = productId =>
  getRequest(`${productsUrl}/${productId}/warranties`, {});

const updateProductWarranties = productWarranties =>
  putRequest(productWarrantyUrl, productWarranties);

const postProductWarranties = productWarranties =>
  postRequest(productWarrantyUrl, productWarranties);

const deleteProductWarranties = warrantyIds =>
  deleteRequest(`${productWarrantyUrl}/${warrantyIds}`, {});

const getProducts = (take, search = '', sortBy = '', filter) => {
  const {
    listLocationFiltered,
    listCategoryFiltered,
    purchaseDate,
    warrantyDate,
  } = filter || {};
  const listLocationIds = listLocationFiltered
    ? listLocationFiltered
        .map(location => {
          return location?.id;
        })
        .toString()
    : '';
  const listCategoryIds = listCategoryFiltered
    ? listCategoryFiltered
        .map(category => {
          return category?.categoryId;
        })
        .toString()
    : '';
  let productApiUrl = `${productsUrl}?Skip=${0}&Take=${take}&SearchText=${encodeURIComponent(
    search || '',
  )}&OrderBy=${sortBy || ''}`;
  if (listLocationFiltered?.length > 0) {
    productApiUrl = `${productApiUrl}&locationIds=${listLocationIds}`;
  }
  if (listCategoryFiltered?.length > 0) {
    productApiUrl = `${productApiUrl}&categoryIds=${listCategoryIds}`;
  }
  if (purchaseDate?.fromPurchaseDate || purchaseDate?.toPurchaseDate) {
    productApiUrl = `${productApiUrl}&purchaseFromDate=${purchaseDate?.fromPurchaseDate}&purchaseToDate=${purchaseDate?.toPurchaseDate}`;
  }
  if (
    warrantyDate?.fromWarrantyExpiryDate ||
    warrantyDate?.toWarrantyExpiryDate
  ) {
    productApiUrl = `${productApiUrl}&warrantyFromDate=${warrantyDate?.fromWarrantyExpiryDate}&warrantyToDate=${warrantyDate?.toWarrantyExpiryDate}`;
  }
  return getRequest(productApiUrl, {});
};

const getLocationProducts = (locationId, search = '', sortBy = '', filter) => {
  const {listCategoryFiltered, purchaseDate, warrantyDate} = filter || {};
  const listCategoryIds = listCategoryFiltered
    ? listCategoryFiltered
        .map(category => {
          return category?.categoryId;
        })
        .toString()
    : '';
  let productApiUrl = `${productsUrl}?SearchText=${encodeURIComponent(
    search,
  )}&OrderBy=${sortBy}&locationIds=${locationId}`;
  if (listCategoryFiltered?.length > 0) {
    productApiUrl = `${productApiUrl}&categoryIds=${listCategoryIds}`;
  }
  if (filter?.purchaseDate) {
    productApiUrl = `${productApiUrl}&purchaseFromDate=${purchaseDate?.fromPurchaseDate}&purchaseToDate=${purchaseDate?.toPurchaseDate}`;
  }
  if (filter?.warrantyDate) {
    productApiUrl = `${productApiUrl}&warrantyFromDate=${warrantyDate?.fromWarrantyExpiryDate}&warrantyToDate=${warrantyDate?.toWarrantyExpiryDate}`;
  }
  return getRequest(productApiUrl, {});
};

const getProductDetail = productId =>
  getRequest(`${productsUrl}/` + productId, {});

const updateProduct = (productId, editProductData) =>
  putRequest(`${productsUrl}/` + productId, editProductData);

const deleteProductImage = (productId, imageIds) =>
  deleteRequest(`${productsUrl}/${productId}/images`, imageIds);

const deleteProducts = productIds => deleteRequest(productsUrl, productIds);

const moveProducts = productMoveData =>
  postRequest(moveProductsUrl, productMoveData);

const registerDevice = deviceData => postRequest(registerDeviceUrl, deviceData);

const deleteRegisterDeviceId = udId =>
  deleteRequest(`${registerDeviceUrl}/${udId}`);

const getNotifications = take =>
  getRequest(`${notificationUrl}?OrderBy=createdOn desc&skip=0&take=${take}`);

const deleteNotifications = notificationIds =>
  deleteRequest(notificationUrl, notificationIds);

const readNotification = data =>
  postRequest(`${notificationUrl}/read-notification`, data);

const postNotificationPreference = data =>
  postRequest(notificationPreferenceUrl, data);

const getNotificationPreference = () => getRequest(notificationPreferenceUrl);

const updateNotificationPreference = data =>
  putRequest(notificationPreferenceUrl, data);

const deleteAccountConfirmPassword = (matchPassword = '') =>
  postRequest(`${deleteAccountConfirmPasswordUrl}/${matchPassword}`);

const deleteUserAccount = userId => deleteRequest(`${getUserUrl}/${userId}`);

const sendErrorLog = logData => api.post(errorLogsUrl, logData);

const barCodeScanLog = logData => postRequest(barCodeScanLogUrl, logData);

const updateVerificationReminder = () => postRequest(verificationReminderUrl);

const deleteReceipt = receiptId => deleteRequest(`${receiptsUrl}/${receiptId}`);

export {
  getCharts,
  checkForRefreshToken,
  authenticate,
  register,
  forgotPassword,
  refreshToken,
  sendEmailVerification,
  externalLogin,
  sendOtpRequest,
  verifyOtpRequest,
  recoverUsername,
  sendPhoneVerification,
  isUserExist,
  changePasswordRequest,
  resetPasswordRequest,
  getUserData,
  updateUserData,
  getCountries,
  getStates,
  getCities,
  getStatesByCountry,
  getCitiesByState,
  getUserAddress,
  postUserAddress,
  postUserProfile,
  postContactUs,
  postLocations,
  getLocations,
  deleteLocations,
  uploadMediaFile,
  putLocation,
  getProductCategory,
  getCategoryForm,
  postProducts,
  postProductImage,
  postReceipt,
  updateReceipt,
  getReceipts,
  getProducts,
  getLocationProducts,
  getProductDetail,
  updateProduct,
  deleteProductImage,
  deleteProducts,
  moveProducts,
  getWarranties,
  getWarrantyDetail,
  getProductOfReceipts,
  updateProductWarranties,
  postProductWarranties,
  registerDevice,
  deleteRegisterDeviceId,
  getNotifications,
  deleteNotifications,
  readNotification,
  postNotificationPreference,
  getNotificationPreference,
  updateNotificationPreference,
  getBarcodeProduct,
  deleteAccountConfirmPassword,
  deleteUserAccount,
  sendErrorLog,
  updateVerificationReminder,
  deleteReceipt,
  barCodeScanLog,
  deleteProductWarranties,
  logoutIfNotExist,
  postCities,
};
