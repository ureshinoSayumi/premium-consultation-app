import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import zh from './zh.json';

const deviceLanguage = Localization.getLocales()[0]?.languageCode ?? 'en';
const initialLng = deviceLanguage.startsWith('zh') ? 'zh' : 'en';

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: initialLng,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  compatibilityJSON: 'v4',
});

export default i18n;
