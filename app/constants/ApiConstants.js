import Config from '../config/AppConfig';

const ApiConstants = {
  ApiBaseUrl: Config.isDevelop
    ? 'https://dev.mobmaxime.com/MelbeezAPI'
    : 'https://api.melbeez.com',
  ImageBaseUrl: Config.isDevelop
    ? 'https://dev.mobmaxime.com/MelbeezAPI/MediaServer'
    : 'https://melbeez.s3.us-west-1.amazonaws.com',
  TermsConditionUrl: Config.isDevelop
    ? 'https://dev.mobmaxime.com/MelbeezAPI/policies/terms-and-conditions.html'
    : 'https://api.melbeez.com/policies/terms-and-conditions.html',
  PrivacyUrl: Config.isDevelop
    ? 'https://dev.mobmaxime.com/MelbeezAPI/policies/privacy.html'
    : 'https://api.melbeez.com/policies/privacy.html',
  EulaPolicyUrl: Config.isDevelop
    ? 'https://dev.mobmaxime.com/MelbeezAPI/policies/eula.html'
    : 'https://api.melbeez.com/policies/eula.html',
  CookieUrl: Config.isDevelop
    ? 'https://dev.mobmaxime.com/MelbeezAPI/policies/cookie-policy.html'
    : 'https://api.melbeez.com/policies/cookie-policy.html',
  registerUrl: '/api/User/Register',
  authenticateUrl: '/api/User/authenticate',
  refreshTokenUrl: '/api/User/refresh-token',
  sendVerificationUrl: '/api/User/email/varification/send',
  validateEmailUrls: '/api/User/email/varification/validate',
  forgotPasswordUrl: '/api/User/forgot-password',
  externalLoginUrl: '/api/User/external-login',
  sendOtpUrl: '/api/user/sendotp',
  verifyOtpUrl: '/api/user/verifyotp',
  recoverUsernameUrl: '/api/user/recover-username',
  phoneVerificationUrl: '/api/user/phone/send-verification-link',
  emailVerificationUrl: '/api/user/email/send-verification-link',
  resetPasswordUrl: '/api/user/reset-password',
  isUserExistUrl: '/api/user/isuserexist',
  changePasswordUrl: '/api/user/change-password',
  getUserUrl: '/api/user',
  getCountryUrl: '/api/countries',
  getStateUrl: '/api/states',
  getCityUrl: '/api/cities',
  getStateByCountryUrl: '/api/states/by-country',
  getCityByStateUrl: '/api/cities/by-state',
  updateUserUrl: '/api/user',
  getAddressUrl: '/api/addresses',
  postAddressUrl: '/api/addresses',
  contactUsUrl: '/api/contact-us',
  mediaUploadUrl: '/media/upload',
  postLocationsUrl: '/api/locations',
  getLocationUrl: '/api/locations',
  deleteLocationUrl: '/api/locations',
  getProductCategoryUrl: '/api/product-categories',
  getProductCategoryFormUrl: '/api/product-categories/form-builder-data/',
  productsUrl: '/api/products',
  receiptsUrl: '/api/receipts',
  moveProductsUrl: '/api/products/move-location',
  productWarrantyUrl: '/api/products/warranties',
  getChartUrl: '/api/chart',
  registerDeviceUrl: '/api/register-device',
  notificationUrl: '/api/pushnotification',
  notificationPreferenceUrl:
    '/api/pushnotification/user-notification-preference',
  deleteAccountConfirmPasswordUrl: '/api/confirm-password',
  errorLogsUrl: '/api/log/SML-Error-log',
  verificationReminderUrl: '/api/user/verification-reminder',
  barCodeScanLogUrl: '/api/log/barcode-transaction-log',
  appStoreUrl: 'https://apps.apple.com/us/app/melbeez/id6449959836',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.melbeez.app',
};

export default ApiConstants;
