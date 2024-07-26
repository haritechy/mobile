const AppConstants = {
  phoneNumberMask: '([000]) [000] [00] [00]',
  RESET_PASSWORD: 'RESET_PASSWORD',
  addressType: {
    Physical: 1,
    Mailing: 2,
  },
  PropertyType: {
    Residential: 1,
    Business: 2,
  },
  mediaDriveName: {
    Locations: 'Locations',
    Products: 'Products',
    Warranty: 'Warranty',
    ContactUs: 'ContactUs',
    ProductReceipts: 'ProductReceipts',
  },
  deleteTypes: {
    Location: 'location',
    Product: 'product',
    Receipt: 'receipt',
  },
  MAX_COUNT: 99,
  MAX_COUNTRY_COUNT: 250,
  MAX_IMAGE_SIZE: 10,
  // AsyncStorage Constants
  IS_WALKTHROUGH: 'isWalkThrough',
  IS_ASYNC_USER: 'IS_ASYNC_USER',
  IS_BIOMETRIC_AUTHENTICATION: 'isBiometricAuthentication',
  dateFormats: {
    simpleDate: 'DD-MM-YYYY',
    reverseDate: 'YYYY-MM-DD',
    fullDateTime: 'DD-MM-YYYY hh:mm:ss A',
    monthDateFormat: 'MMM DD, YYYY',
    dateMonth: 'DD MMM',
    hrMinute: 'HH:mm',
  },
  statusTypes: {
    Success: 'Success',
    Fail: 'Fail',
  },
  Banners: {
    Home: 'Home',
    Notification: 'Notification',
    DeliveryLocation: 'DeliveryLocation',
    Locations: 'Locations',
    LocationDetail: 'LocationDetail',
    Products: 'Products',
    ProductDetail: 'ProductDetail',
    ReceiptList: 'ReceiptList',
    Profile: 'Profile',
    AlertNotification: 'AlertNotification',
    Authentication: 'Authentication',
    ChangePassword: 'ChangePassword',
    ContactUs: 'ContactUs',
    Privacy: 'Privacy',
    Theme: 'Theme',
  },
  Product: {
    Field: {
      Price: 'Price',
      ManufactureYear: 'ManufactureYear',
      Description: 'Description',
      Notes: 'Notes',
    },
    Type: {
      Number: 'Number',
    },
  },
};
export default AppConstants;
