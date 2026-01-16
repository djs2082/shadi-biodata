import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from './locales/en.json';
import hiTranslations from './locales/hi.json';
import mrTranslations from './locales/mr.json';
import guTranslations from './locales/gu.json';
import taTranslations from './locales/ta.json';
import teTranslations from './locales/te.json';
import knTranslations from './locales/kn.json';
import mlTranslations from './locales/ml.json';
import bnTranslations from './locales/bn.json';
import paTranslations from './locales/pa.json';
import orTranslations from './locales/or.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      hi: {
        translation: hiTranslations,
      },
      mr: {
        translation: mrTranslations,
      },
      gu: {
        translation: guTranslations,
      },
      ta: {
        translation: taTranslations,
      },
      te: {
        translation: teTranslations,
      },
      kn: {
        translation: knTranslations,
      },
      ml: {
        translation: mlTranslations,
      },
      bn: {
        translation: bnTranslations,
      },
      pa: {
        translation: paTranslations,
      },
      or: {
        translation: orTranslations,
      },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
