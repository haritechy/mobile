import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import memoize from 'lodash.memoize';
import en from './language/en.json';
import sp from './language/sp.json';

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    hi: sp,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
