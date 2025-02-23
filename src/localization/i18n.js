import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './en.json';
import es from './es.json';

const locales = RNLocalize.getLocales();
const defaultLanguage = locales.length > 0 ? locales[0].languageCode : 'en';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: defaultLanguage, 
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;