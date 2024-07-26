import moment from 'moment';
import {Platform} from 'react-native';
import {TestIds} from 'react-native-google-mobile-ads';
import {object, string} from 'yup';
import {AppConstants, Strings} from '../constants';
import {Colors, Icons} from '../theme';
const NAME_REG =
  /^([a-zA-Z0-9@#$&()_])+[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/;
const PRICE_REG = /^(\d*\.{0,1}\d{0,2}$)/;
const NUM_REG = /^\d*\.?\d*$/;
const YEAR_REG = /^\d{4}$/;

const progressData = (duration, diff, value) => {
  return {
    duration: duration,
    progress: (diff * 100) / value / 100,
    color: Colors.filledGreen,
    unfieldColor: Colors.unFilledGreen,
  };
};
const diffYear = year => (year > 1 ? `${year} years` : `${year} year`);
const diffMonth = month => (month > 1 ? `${month} months` : `${month} month`);
const diffDays = day => (day > 1 ? `${day} days` : `${day} day`);
const getExpireDetail = (startDate, expireDate) => {
  try {
    const expDate = new Date(expireDate);
    const nowDate = new Date();
    const a = moment([
      expDate.getUTCFullYear(),
      expDate.getUTCMonth(),
      expDate.getUTCDate(),
    ]);
    const b = moment([
      nowDate.getUTCFullYear(),
      nowDate.getUTCMonth(),
      nowDate.getUTCDate(),
    ]);
    const diffInYear = a.diff(b, 'year');
    b.add(diffInYear, 'years');
    const diffInMonths = a.diff(b, 'months');
    b.add(diffInMonths, 'months');
    const diffInDays = a.diff(b, 'days');
    let duration = '';
    if (diffInYear > 0) {
      duration =
        diffInMonths > 0
          ? `${diffYear(diffInYear)} ${diffMonth(diffInMonths)}`
          : diffYear(diffInYear);
      return progressData(duration, diffInYear, 12);
    } else if (diffInMonths > 0) {
      duration =
        diffInDays > 0
          ? `${diffMonth(diffInMonths)} ${diffDays(diffInDays)}`
          : diffMonth(diffInMonths);
      return progressData(duration, diffInMonths, 12);
    } else if (diffInDays > 0) {
      return {
        duration: diffDays(diffInDays),
        progress: (diffInDays * 100) / 30 / 100,
        color: Colors.filledYellow,
        unfieldColor: Colors.unFilledYellow,
      };
    } else {
      return false;
    }
  } catch (error) {
    console.log('getExpireDetail ', error);
  }
};

const dayDifference = date => {
  const {dateFormats} = AppConstants;
  const expiryDate = moment(
    moment(date).format(dateFormats.fullDateTime),
    dateFormats.fullDateTime,
  );
  const fromDate = moment(
    moment(new Date()).format(dateFormats.fullDateTime),
    dateFormats.fullDateTime,
  );
  const diff = fromDate.diff(expiryDate);
  return moment.duration(diff).days();
};

const validateEmailOrPhone = text => {
  try {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let phoneReg = /^[0-9]{10}$/;
    return !!(reg.test(text) || phoneReg.test(text));
  } catch (error) {
    console.log('validateEmailOrPhone ', error);
  }
};

const validateEmail = text => {
  try {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return !!reg.test(text);
  } catch (error) {
    console.log('validateEmail ', error);
  }
};

const validatePhone = text => {
  try {
    let phoneReg = /^[0-9]{10}$/;
    return !!phoneReg.test(text);
  } catch (error) {
    console.log('validatePhone ', error);
  }
};

const obscureEmail = email => {
  try {
    const [name, domain] = email.split('@');
    return `${name[0]}${new Array(name.length).join('*')}@${domain}`;
  } catch (error) {
    console.log('obscureEmail ', error);
  }
};

const setNumberMask = number => {
  try {
    if (number && number?.length > 0) {
      const num = number.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
      return '(' + num[1] + ') ' + num[2] + '-' + num[3];
    } else {
      return '';
    }
  } catch (error) {
    console.log('setNumberMask ', error);
  }
};

const getAddressType = type => {
  switch (type) {
    case 1:
      return Strings.physicalAddress;
    case 2:
      return Strings.mailingAddress;
  }
};

const locationPlaceholder = type => {
  switch (type) {
    case 1:
      return Icons.homeIcn;
    case 2:
      return Icons.building;
    default:
      return Icons.homeIcn;
  }
};

const errorType = (type, field) => {
  const {Field} = AppConstants.Product;
  if (field === Field.ManufactureYear) {
    return string().test('type', Strings.invalidYear, value => {
      if (value) {
        return YEAR_REG.test(value);
      } else {
        return true;
      }
    });
  } else if (field === Field.Price) {
    return string().test('type', Strings.invalidPrice, value => {
      if (value) {
        return PRICE_REG.test(value);
      } else {
        return true;
      }
    });
  } else if (field === Field.Description) {
    return string().max(256, Strings.toLongDescription);
  } else if (field === Field.Notes) {
    return string().max(256, Strings.toLongNotes);
  } else {
    switch (type) {
      case 'Text':
        return string().matches(NAME_REG, Strings.invalidInput).required();
      case 'TextArea':
        return string().matches(NAME_REG, Strings.invalidInput).required();
      case 'Dropdown':
        return object().required();
      case 'Number':
        return string().matches(NUM_REG, Strings.invalidInput).required();
      case 'DateTime':
        return string().required();
      case 'location':
        return object().required(Strings.selectLocation);
      case 'category':
        return object().required(Strings.selectCategory);
      default:
        return string().notRequired();
    }
  }
};

const validateProductFields = field =>
  field === AppConstants.Product.Field.Price ||
  field === AppConstants.Product.Field.ManufactureYear;

const priceCurrency = type => {
  switch (type) {
    case 'INR':
      return '₹';
    case 'USD':
      return '$';
    default:
      return '';
  }
};

function isTokenExpired(date_string) {
  try {
    const tokenExpiration = moment.utc(date_string).toISOString();
    const current_date = moment.utc().toISOString();
    const duration = moment(tokenExpiration).diff(current_date, 'minutes');
    return duration <= 1 ? true : false;
  } catch (error) {
    console.log('isTokenExpired ', error);
  }
}

function isSessionExpired(refreshTokenExpireDate) {
  try {
    const refreshTokenExpiration = moment
      .utc(refreshTokenExpireDate)
      .toISOString();
    const current_date = moment.utc().toISOString();
    const duration = moment(refreshTokenExpiration).diff(
      current_date,
      'minutes',
    );
    return duration <= 30 ? true : false;
  } catch (error) {
    console.log('isSessionExpired ', error);
  }
}

function formattedDate(date) {
  return date
    ? moment(date).format(AppConstants.dateFormats.monthDateFormat)
    : '';
}
function formattedUtcDate(date) {
  return date
    ? moment.utc(date).format(AppConstants.dateFormats.monthDateFormat)
    : '';
}

const getAddUnitId = type => {
  const {Banners} = AppConstants;
  if (__DEV__) {
    return TestIds.BANNER;
  } else {
    switch (type) {
      case Banners.Home:
        return Platform.OS === 'ios'
          ? 'ca-app-pub-3758536231280993/6309448703'
          : 'ca-app-pub-3758536231280993/8715329588';
      case Banners.Notification:
        return Platform.OS === 'ios'
          ? 'ca-app-pub-3758536231280993/3489378479'
          : 'ca-app-pub-3758536231280993/3146597698';
      case Banners.DeliveryLocation:
        return Platform.OS === 'ios'
          ? 'ca-app-pub-3758536231280993/1235298968'
          : 'ca-app-pub-3758536231280993/2341331226';
      case Banners.Locations:
        return Platform.OS === 'ios'
          ? 'ca-app-pub-3758536231280993/3563883099'
          : 'ca-app-pub-3758536231280993/4779792300';
      case Banners.LocationDetail:
        return Platform.OS === 'ios'
          ? 'ca-app-pub-3758536231280993/9987886952'
          : 'ca-app-pub-3758536231280993/7973217266';
      case Banners.Products:
        return Platform.OS === 'ios'
          ? 'ca-app-pub-3758536231280993/3889675988'
          : 'ca-app-pub-3758536231280993/9060698534';
      case Banners.ProductDetail:
        return Platform.OS === 'ios'
          ? 'ca-app-pub-3758536231280993/1975581286'
          : 'ca-app-pub-3758536231280993/1595225768';
      case Banners.ReceiptList:
        return Platform.OS === 'ios'
          ? 'ca-app-pub-3758536231280993/4260083409'
          : 'ca-app-pub-3758536231280993/8320701629';
      case Banners.Profile:
        return Platform.OS === 'ios'
          ? 'ca-app-pub-3758536231280993/9833055855'
          : 'ca-app-pub-3758536231280993/4792520150';
      case Banners.AlertNotification:
        return Platform.OS === 'ios'
          ? 'ca-app-pub-3758536231280993/3468077619'
          : 'ca-app-pub-3758536231280993/1675116813';
      case Banners.Authentication:
        return Platform.OS === 'ios'
          ? 'ca-app-pub-3758536231280993/8123306798'
          : 'ca-app-pub-3758536231280993/6544300114';
      case Banners.ChangePassword:
        return Platform.OS === 'ios'
          ? 'ca-app-pub-3758536231280993/4495052975'
          : 'ca-app-pub-3758536231280993/2058260197';
      case Banners.ContactUs:
        return Platform.OS === 'ios'
          ? 'ca-app-pub-3758536231280993/6274451771'
          : 'ca-app-pub-3758536231280993/6816048263';
      case Banners.Privacy:
        return Platform.OS === 'ios'
          ? 'ca-app-pub-3758536231280993/6125944828'
          : 'ca-app-pub-3758536231280993/7390763339';
      case Banners.Theme:
        return Platform.OS === 'ios'
          ? 'ca-app-pub-3758536231280993/3800918402'
          : 'ca-app-pub-3758536231280993/6161156731';
      default:
        return TestIds.BANNER;
    }
  }
};

const getSemanticVersion = storeVersion => {
  const storeVer = storeVersion.split('.');
  let storeMajor = 0;
  let storeMinor = 0;
  const storeVerLen = storeVer.length;

  if (storeVerLen > 0) {
    if (storeVerLen === 1) {
      storeMajor = storeVer[0];
    } else if (storeVerLen === 2) {
      storeMajor = storeVer[0];
      storeMinor = storeVer[1];
    } else {
      storeMajor = storeVer[0];
      storeMinor = storeVer[1];
    }
  }
  return `${storeMajor}.${storeMinor}`;
};
export {
  getExpireDetail,
  validateEmailOrPhone,
  obscureEmail,
  validateEmail,
  validatePhone,
  setNumberMask,
  getAddressType,
  locationPlaceholder,
  errorType,
  isTokenExpired,
  isSessionExpired,
  priceCurrency,
  dayDifference,
  formattedDate,
  formattedUtcDate,
  getAddUnitId,
  getSemanticVersion,
  validateProductFields,
};
