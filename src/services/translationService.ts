/**
 * Translation service that supports multiple providers
 * Configurable via environment variable: VITE_TRANSLATION_PROVIDER
 */

export type TranslationProvider = 'libretranslate' | 'google' | 'microsoft';

interface TranslationCache {
  [key: string]: string;
}

// Language codes for Indian languages
export const SUPPORTED_LANGUAGES = {
  en: 'English',
  hi: 'हिन्दी (Hindi)',
  mr: 'मराठी (Marathi)',
  gu: 'ગુજરાતી (Gujarati)',
  ta: 'தமிழ் (Tamil)',
  te: 'తెలుగు (Telugu)',
  kn: 'ಕನ್ನಡ (Kannada)',
  ml: 'മലയാളം (Malayalam)',
  bn: 'বাংলা (Bengali)',
  pa: 'ਪੰਜਾਬੀ (Punjabi)',
  or: 'ଓଡ଼ିଆ (Odia)',
};

export type LanguageCode = keyof typeof SUPPORTED_LANGUAGES;

class TranslationService {
  private provider: TranslationProvider;
  private cache: TranslationCache = {};
  private apiKey: string | undefined;
  private libreTranslateUrl: string;
  private libreTranslateApiKey: string | undefined;
  private microsoftApiKey: string | undefined;
  private microsoftRegion: string | undefined;

  constructor() {
    this.provider = (import.meta.env.VITE_TRANSLATION_PROVIDER || 'libretranslate') as TranslationProvider;
    this.apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
    this.libreTranslateUrl = import.meta.env.VITE_LIBRETRANSLATE_URL || 'https://libretranslate.com';
    this.libreTranslateApiKey = import.meta.env.VITE_LIBRETRANSLATE_API_KEY;
    this.microsoftApiKey = import.meta.env.VITE_MICROSOFT_TRANSLATOR_KEY;
    this.microsoftRegion = import.meta.env.VITE_MICROSOFT_TRANSLATOR_REGION;
  }

  /**
   * Generate cache key for translation
   */
  private getCacheKey(text: string, targetLang: string): string {
    return `${text}_${targetLang}`;
  }

  /**
   * Translate text using LibreTranslate API
   */
  private async translateWithLibreTranslate(
    text: string,
    targetLang: string
  ): Promise<string> {
    try {
      const requestBody: any = {
        q: text,
        source: 'en',
        target: targetLang,
        format: 'text',
      };

      // Add API key if available
      if (this.libreTranslateApiKey) {
        requestBody.api_key = this.libreTranslateApiKey;
      }

      const response = await fetch(`${this.libreTranslateUrl}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `LibreTranslate API error: ${response.status}${errorData.error ? ` - ${errorData.error}` : ''}`
        );
      }

      const data = await response.json();
      return data.translatedText;
    } catch (error) {
      console.error('LibreTranslate translation error:', error);
      throw error;
    }
  }

  /**
   * Translate text using Google Cloud Translation API
   */
  private async translateWithGoogle(
    text: string,
    targetLang: string
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Google Cloud Translation API key not configured');
    }

    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: text,
            source: 'en',
            target: targetLang,
            format: 'text',
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Google Translate API error: ${response.status}`);
      }

      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Google Translate error:', error);
      throw error;
    }
  }

  /**
   * Translate text using Microsoft Translator API
   */
  private async translateWithMicrosoft(
    text: string,
    targetLang: string
  ): Promise<string> {
    if (!this.microsoftApiKey) {
      throw new Error('Microsoft Translator API key not configured');
    }

    try {
      const endpoint = 'https://api.cognitive.microsofttranslator.com';
      const url = `${endpoint}/translate?api-version=3.0&from=en&to=${targetLang}`;

      const headers: HeadersInit = {
        'Ocp-Apim-Subscription-Key': this.microsoftApiKey,
        'Content-Type': 'application/json',
      };

      // Add region header if provided (optional but recommended)
      if (this.microsoftRegion) {
        headers['Ocp-Apim-Subscription-Region'] = this.microsoftRegion;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify([{ text }]),
      });

      if (!response.ok) {
        throw new Error(`Microsoft Translator API error: ${response.status}`);
      }

      const data = await response.json();
      return data[0].translations[0].text;
    } catch (error) {
      console.error('Microsoft Translator error:', error);
      throw error;
    }
  }

  /**
   * Translate text to target language
   */
  async translate(text: string, targetLang: LanguageCode): Promise<string> {
    // Return original text for English
    if (targetLang === 'en' || !text) {
      return text;
    }

    // Check cache first
    const cacheKey = this.getCacheKey(text, targetLang);
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }

    try {
      let translatedText: string;

      if (this.provider === 'google') {
        translatedText = await this.translateWithGoogle(text, targetLang);
      } else if (this.provider === 'microsoft') {
        translatedText = await this.translateWithMicrosoft(text, targetLang);
      } else {
        translatedText = await this.translateWithLibreTranslate(text, targetLang);
      }

      // Cache the translation
      this.cache[cacheKey] = translatedText;
      return translatedText;
    } catch (error) {
      console.error(`Translation failed for "${text}" to ${targetLang}:`, error);
      // Return original text if translation fails
      return text;
    }
  }

  /**
   * Translate multiple texts in batch
   */
  async translateBatch(
    texts: string[],
    targetLang: LanguageCode
  ): Promise<string[]> {
    if (targetLang === 'en') {
      return texts;
    }

    // Translate each text (with caching)
    const promises = texts.map((text) => this.translate(text, targetLang));
    return Promise.all(promises);
  }

  /**
   * Clear translation cache
   */
  clearCache(): void {
    this.cache = {};
  }

  /**
   * Get current provider
   */
  getProvider(): TranslationProvider {
    return this.provider;
  }
}

// Export singleton instance
export const translationService = new TranslationService();
