import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import deTranslation from '../locales/de.json';
import enTranslation from '../locales/en.json';

const savedLanguage = localStorage.getItem('i18nextLng') || 'de';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      de: { translation: deTranslation },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;