import * as Yup from 'yup';
import AppConstants from '../constants/AppConstants';
import Strings from '../constants/Strings';

const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*./-]).{8,}$/;
const emailRegex =
  // eslint-disable-next-line no-useless-escape
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; // has been disabled because we need escape characters
const MOBILE_REG = /^[0-9]{10}$/; // Change this regex based on requirement
const NAME_REG = /^[-a-zA-Z-()]+(\s+[-a-zA-Z-()]+)*$/;
const ZIPCODE_REG = /^(\d{5}|\d{6})$/;
const IMAGE_REG = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
const WHITE_SPACE_REG = /^\S*$/;
const PRICE_REG = /^(\d*\.{0,1}\d{0,2}$)/;
const SERVICE_NO_REG = /^[A-Za-z0-9]*$/;

const schema = {
  login: Yup.object({
    email: Yup.string()
      // .email(Strings.invalidEmail)
      .required(Strings.emptyEmail)
      .trim(),
    password: Yup.string()
      .matches(/^\S*$/, Strings.whiteSpaceNotAllowed)
      .max(50, Strings.invalidPassword)
      .required(Strings.emptyPassword)
      .trim(),
  }),
  deleteAccount: Yup.object({
    confirmPassword: Yup.string().required(Strings.emptyConfirmPassword).trim(),
  }),
  register: Yup.object({
    firstname: Yup.string()
      .min(1, Strings.errorValidFirstName)
      .max(20, Strings.toLongFirstName)
      .matches(NAME_REG, Strings.errorValidFirstName)
      .required(Strings.emptyFirstName)
      .trim(),
    lastname: Yup.string()
      .min(1, Strings.errorValidLastName)
      .max(20, Strings.toLongLastName)
      .matches(NAME_REG, Strings.errorValidLastName)
      .required(Strings.emptyLastName)
      .trim(),
    username: Yup.string()
      .min(2, Strings.validName)
      .max(30, Strings.toLongUsername)
      .required(Strings.emptyUserName)
      .trim(),
    email: Yup.string()
      .email(Strings.invalidEmail)
      .max(60, Strings.toLongEmail)
      .required(Strings.emptyEmail)
      .trim(),
    mobile_no: Yup.string()
      .matches(MOBILE_REG, Strings.invalidMobileNumber)
      .required(Strings.emptyMobile_no)
      .trim(),
    password: Yup.string()
      .matches(/^\S*$/, Strings.whiteSpaceNotAllowed)
      .matches(PASSWORD_REGEX, Strings.passwordShouldBe)
      .max(50, Strings.invalidPassword)
      .required(Strings.emptyPassword)
      .trim(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], Strings.passwordNotMatch)
      .required(Strings.emptyConfirmPassword)
      .trim(),
  }),
  mobile_no: Yup.object({
    mobile_no: Yup.string()
      .min(10, Strings.invalidMobileNumber)
      .max(10, Strings.invalidMobileNumber)
      .required(Strings.emptyMobile_no)
      .trim(),
  }),
  resetPwd: Yup.object({
    password: Yup.string()
      .matches(/^\S*$/, Strings.whiteSpaceNotAllowed)
      .matches(PASSWORD_REGEX, Strings.passwordShouldBe)
      .required(Strings.pleaseEnterNewPassword)
      .trim(),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], Strings.passwordNotMatch)
      .required(Strings.pleaseReEnterNewPassword)
      .trim(),
  }),
  addProduct: Yup.object({
    location: Yup.object().required(Strings.selectLocation),
    category: Yup.object().required(Strings.selectCategory),
  }),
  addReceipt: Yup.object({
    receiptImage: Yup.mixed()
      .required(Strings.emptyReceiptImage)
      .test('type', Strings.unsupported, function (value) {
        if (value?.type) {
          const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
          return SUPPORTED_FORMATS.includes(value?.type);
        }
        return true;
      })
      .test('fileSize', Strings.unsupportedFileSize, function (value) {
        if (value?.fileSize) {
          const SUPPORTED_MB = value?.fileSize / Math.pow(1024, 2);
          return SUPPORTED_MB <= AppConstants.MAX_IMAGE_SIZE;
        }
        return true;
      }),
    receiptName: Yup.string().required(Strings.emptyReceiptName).trim(),
    purchaseDate: Yup.string().required(Strings.emptyPurchaseDate).trim(),
  }),
  addLocation: Yup.object({
    locationImage: Yup.mixed().test(
      'type',
      Strings.unsupported,
      function (value) {
        if (value && value?.type) {
          const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
          return SUPPORTED_FORMATS.includes(value?.type);
        } else {
          return true;
        }
      },
    ),
    locationName: Yup.string()
      .min(2, Strings.validName)
      .required(Strings.emptyLocationName)
      .trim(),
    address1: Yup.string()
      .min(2, Strings.validName)
      .required(Strings.emptyAddress)
      .trim(),
    address2: Yup.string().nullable().notRequired(),
    country: Yup.object().required(Strings.countryPlaceholder),
    state: Yup.object().required(Strings.statePlaceholder),
    city: Yup.object().required(Strings.cityPlaceholder),
    zipCode: Yup.string()
      .matches(ZIPCODE_REG, Strings.invalidZipCode)
      .required(Strings.emptyZipcode)
      .trim(),
    typeOfProperty: Yup.object().required(Strings.typeOfPropertyError),
  }),
  newUsrVerify: Yup.object({
    otpInput: Yup.string()
      .length(6, Strings.InvalidOtpError)
      .required(Strings.OtpError)
      .trim(),
  }),
  forgotUsrPwd: Yup.object({
    emailOrPhone: Yup.string().required(Strings.pleaseEnterEmailOrPhone).trim(),
  }),
  forgotPassword: Yup.object().shape(
    {
      email: Yup.string()
        .when(['phone'], {
          is: a => a === undefined,
          then: Yup.string().required(Strings.emptyEmail).trim(),
        })
        .trim(),
      phone: Yup.string()
        .when(['email'], {
          is: a => a === undefined,
          then: Yup.string().required(Strings.emptyPhoneNumber).trim(),
        })
        .trim(),
    },
    [['email', 'phone']],
  ),
  editProfile: Yup.object({
    profileImage: Yup.mixed().test(
      'type',
      Strings.unsupported,
      function (value) {
        if (value && value?.type) {
          const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
          return SUPPORTED_FORMATS.includes(value?.type);
        } else {
          return true;
        }
      },
    ),
    userName: Yup.string()
      .min(2, Strings.validName)
      .max(30, Strings.toLongUsername)
      .required(Strings.emptyUserName)
      .matches(WHITE_SPACE_REG, Strings.whiteSpaceNotAllowed)
      .trim(),
    firstName: Yup.string()
      .min(1, Strings.errorValidFirstName)
      .max(20, Strings.toLongFirstName)
      .required(Strings.emptyFirstName)
      .trim(),
    lastName: Yup.string()
      .min(1, Strings.errorValidLastName)
      .max(20, Strings.toLongLastName)
      .required(Strings.emptyLastName)
      .trim(),
    emailAddress: Yup.string()
      .email(Strings.invalidEmail)
      .max(60, Strings.toLongEmail)
      .required()
      .trim(),
    phone: Yup.string()
      .matches(MOBILE_REG, Strings.invalidMobileNumber)
      .required(Strings.emptyPhoneNumber)
      .trim(),
    pAddress1: Yup.string().required(Strings.emptyAddress).trim(),
    pCountry: Yup.object().required(Strings.emptyCountry),
    pState: Yup.object().required(Strings.emptyState),
    pCity: Yup.object().required(Strings.emptyCity),
    pZipCode: Yup.string()
      .matches(ZIPCODE_REG, Strings.invalidZipCode)
      .required(Strings.emptyZipcode)
      .trim(),
  }),
  editProfileWithMailAddress: Yup.object({
    profileImage: Yup.mixed().test(
      'type',
      Strings.unsupported,
      function (value) {
        if (value && value?.type) {
          const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
          return SUPPORTED_FORMATS.includes(value?.type);
        } else {
          return true;
        }
      },
    ),
    userName: Yup.string()
      .min(2, Strings.validName)
      .max(30, Strings.toLongUsername)
      .required(Strings.emptyUserName)
      .matches(WHITE_SPACE_REG, Strings.whiteSpaceNotAllowed)
      .trim(),
    firstName: Yup.string()
      .min(1, Strings.errorValidFirstName)
      .max(20, Strings.toLongFirstName)
      .required(Strings.emptyFirstName)
      .trim(),
    lastName: Yup.string()
      .min(1, Strings.errorValidLastName)
      .max(20, Strings.toLongLastName)
      .required(Strings.emptyLastName)
      .trim(),
    emailAddress: Yup.string()
      .max(60, Strings.toLongEmail)
      .email(Strings.invalidEmail)
      .required()
      .trim(),
    phone: Yup.string()
      .matches(MOBILE_REG, Strings.invalidMobileNumber)
      .required(Strings.emptyPhoneNumber)
      .trim(),
    pAddress1: Yup.string().required(Strings.emptyAddress).trim(),
    pCountry: Yup.object().required(Strings.emptyCountry),
    pState: Yup.object().required(Strings.emptyState),
    pCity: Yup.object().required(Strings.emptyCity),
    pZipCode: Yup.string()
      .matches(ZIPCODE_REG, Strings.invalidZipCode)
      .required(Strings.emptyZipcode)
      .trim(),
    mAddress1: Yup.string().required(Strings.emptyAddress).trim(),
    mCountry: Yup.object().required(Strings.emptyCountry),
    mState: Yup.object().required(Strings.emptyState),
    mCity: Yup.object().required(Strings.emptyCity),
    mZipCode: Yup.string()
      .matches(ZIPCODE_REG, Strings.invalidZipCode)
      .required(Strings.emptyZipcode)
      .trim(),
  }),
  changePwd: Yup.object({
    currentPassword: Yup.string().required(Strings.currentPassword).trim(),
    newPassword: Yup.string()
      .matches(/^\S*$/, Strings.whiteSpaceNotAllowed)
      .matches(PASSWORD_REGEX, Strings.passwordShouldBe)
      .required(Strings.newPassword)
      .trim(),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], Strings.passwordNotMatch)
      .required(Strings.emptyConfirmPassword)
      .trim(),
  }),
  contactUs: Yup.object({
    attachment: Yup.mixed().test('type', Strings.unsupported, function (value) {
      if (value && value?.type) {
        const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
        return SUPPORTED_FORMATS.includes(value?.type);
      } else {
        return true;
      }
    }),
    subject: Yup.string()
      .max(100, Strings.toLongSubject)
      .required(Strings.emptySubject)
      .trim(),
    detail: Yup.string()
      .max(256, Strings.toLongDescription)
      .required(Strings.emptyMessage)
      .trim(),
  }),
  addressPopupPhysicalAddress: {
    pAddress1: Yup.string().required(Strings.emptyAddress).trim(),
    pCountry: Yup.object().required(Strings.emptyCountry),
    pState: Yup.object().required(Strings.emptyState),
    pCity: Yup.object().required(Strings.emptyCity),
    pZipCode: Yup.string()
      .matches(ZIPCODE_REG, Strings.invalidZipCode)
      .required(Strings.emptyZipcode)
      .trim(),
  },
  addressPopupMailingAddress: {
    pAddress1: Yup.string().required(Strings.emptyAddress).trim(),
    pCountry: Yup.object().required(Strings.emptyCountry),
    pState: Yup.object().required(Strings.emptyState),
    pCity: Yup.object().required(Strings.emptyCity),
    pZipCode: Yup.string()
      .matches(ZIPCODE_REG, Strings.invalidZipCode)
      .required(Strings.emptyZipcode)
      .trim(),
    mAddress1: Yup.string().required(Strings.emptyAddress).trim(),
    mCountry: Yup.object().required(Strings.emptyCountry),
    mState: Yup.object().required(Strings.emptyState),
    mCity: Yup.object().required(Strings.emptyCity),
    mZipCode: Yup.string()
      .matches(ZIPCODE_REG, Strings.invalidZipCode)
      .required(Strings.emptyZipcode)
      .trim(),
  },
  mailingAddress: {
    mAddress1: Yup.string().required(Strings.emptyAddress).trim(),
    mCountry: Yup.object().required(Strings.emptyCountry),
    mState: Yup.object().required(Strings.emptyState),
    mCity: Yup.object().required(Strings.emptyCity),
    mZipCode: Yup.string()
      .matches(ZIPCODE_REG, Strings.invalidZipCode)
      .required(Strings.emptyZipcode)
      .trim(),
  },
  currency: {
    currency: Yup.object().required(Strings.emptyCurrency),
  },
  currencyPhone: {
    phone: Yup.string()
      .matches(MOBILE_REG, Strings.invalidMobileNumber)
      .required(Strings.emptyPhoneNumber)
      .trim(),
    currency: Yup.object().required(Strings.emptyCurrency),
  },
  addWarranty: Yup.array().of(
    Yup.object({
      name: Yup.string().required(Strings.emptyWarrantyName),
      startDate: Yup.string().required(Strings.emptyStartDate),
      endDate: Yup.string().required(Strings.emptyEndDate),
      price: Yup.mixed().test('', Strings.invalidPrice, value => {
        if (value) {
          return PRICE_REG.test(value);
        } else {
          return true;
        }
      }),
      agreementNumber: Yup.mixed().test('', 'Invalid service number', value => {
        if (value) {
          return SERVICE_NO_REG.test(value);
        } else {
          return true;
        }
      }),
      imageUrl: Yup.mixed()
        .test('type', Strings.unsupported, function (value) {
          if (value?.type) {
            const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
            return SUPPORTED_FORMATS.includes(value?.type);
          }
          return true;
        })
        .test('fileSize', Strings.unsupportedFileSize, function (value) {
          if (value?.fileSize) {
            const SUPPORTED_MB = value?.fileSize / Math.pow(1024, 2);
            return SUPPORTED_MB <= AppConstants.MAX_IMAGE_SIZE;
          }
          return true;
        }),
    }),
  ),
};

export default schema;
