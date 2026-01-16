import React, { createContext, useContext, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  translationService,
  LanguageCode,
  SUPPORTED_LANGUAGES,
} from '../services/translationService';

interface LanguageContextType {
  currentLanguage: LanguageCode;
  changeLanguage: (lang: LanguageCode) => Promise<void>;
  translateDynamic: (text: string) => Promise<string>;
  translateDynamicBatch: (texts: string[]) => Promise<string[]>;
  supportedLanguages: typeof SUPPORTED_LANGUAGES;
  t: (key: string) => string; // For static translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(
    (i18n.language as LanguageCode) || 'en'
  );

  /**
   * Change the application language
   */
  const changeLanguage = useCallback(
    async (lang: LanguageCode) => {
      try {
        // Change i18next language for static content
        await i18n.changeLanguage(lang);
        setCurrentLanguage(lang);

        // Clear translation cache when language changes
        translationService.clearCache();
      } catch (error) {
        console.error('Failed to change language:', error);
      }
    },
    [i18n]
  );

  /**
   * Translate dynamic content (form field labels, values, etc.)
   */
  const translateDynamic = useCallback(
    async (text: string): Promise<string> => {
      if (currentLanguage === 'en' || !text) {
        return text;
      }
      return translationService.translate(text, currentLanguage);
    },
    [currentLanguage]
  );

  /**
   * Translate multiple dynamic texts in batch
   */
  const translateDynamicBatch = useCallback(
    async (texts: string[]): Promise<string[]> => {
      if (currentLanguage === 'en') {
        return texts;
      }
      return translationService.translateBatch(texts, currentLanguage);
    },
    [currentLanguage]
  );

  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    translateDynamic,
    translateDynamicBatch,
    supportedLanguages: SUPPORTED_LANGUAGES,
    t, // Expose i18next translation function for static content
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook to use language context
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
