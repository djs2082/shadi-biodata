# Translation System Guide

This project uses a hybrid translation system that combines:
1. **i18next** for static content (UI labels, buttons, etc.)
2. **Translation APIs** (LibreTranslate, Google Cloud, or Microsoft Translator) for dynamic content (form field labels, user input)

## Quick Start

### 1. Language Selector
A language dropdown is available in the top-right corner of the biodata form. Users can select from:
- English
- Hindi (हिन्दी)
- Marathi (मराठी)
- Gujarati (ગુજરાતી)
- Tamil (தமிழ்)
- Telugu (తెలుగు)
- Kannada (ಕನ್ನಡ)
- Malayalam (മലയാളം)
- Bengali (বাংলা)
- Punjabi (ਪੰਜਾਬੀ)
- Odia (ଓଡ଼ିଆ)

### 2. Configuration

#### Environment Variables
Edit `.env` file to configure the translation provider:

```bash
# Translation Service Configuration
# Options: 'libretranslate', 'google', or 'microsoft'
VITE_TRANSLATION_PROVIDER=libretranslate

# LibreTranslate Configuration (default: public instance)
VITE_LIBRETRANSLATE_URL=https://libretranslate.com

# Google Cloud Translation API (only required if using 'google' provider)
VITE_GOOGLE_TRANSLATE_API_KEY=your_api_key_here

# Microsoft Translator API (only required if using 'microsoft' provider)
VITE_MICROSOFT_TRANSLATOR_KEY=your_microsoft_api_key_here
VITE_MICROSOFT_TRANSLATOR_REGION=your_azure_region_here
```

#### Switch Between Providers
- **LibreTranslate (Default)**: Free, no API key required, rate-limited
  ```bash
  VITE_TRANSLATION_PROVIDER=libretranslate
  ```

- **Google Cloud Translation**: High quality, requires API key, free tier: 500K chars/month
  ```bash
  VITE_TRANSLATION_PROVIDER=google
  VITE_GOOGLE_TRANSLATE_API_KEY=your_google_api_key
  ```

- **Microsoft Translator (Recommended)**: High quality, requires API key, **free tier: 2M chars/month** (best)
  ```bash
  VITE_TRANSLATION_PROVIDER=microsoft
  VITE_MICROSOFT_TRANSLATOR_KEY=your_microsoft_api_key
  VITE_MICROSOFT_TRANSLATOR_REGION=eastus
  ```

## For Developers

### Adding Static Translations

Static content (buttons, labels, etc.) uses i18next. Add translations to JSON files:

1. **Location**: `src/i18n/locales/`
2. **Files**:
   - `en.json` (English)
   - `hi.json` (Hindi)
   - `mr.json` (Marathi)
   - Add more as needed

3. **Example** (`en.json`):
```json
{
  "buttons": {
    "submit": "Submit",
    "cancel": "Cancel"
  },
  "form": {
    "selectLanguage": "Select Language"
  }
}
```

4. **Usage in Components**:
```tsx
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { t } = useLanguage();

  return (
    <button>{t('buttons.submit')}</button>
  );
}
```

### Adding Dynamic Translations

Dynamic content (form field labels, user input) uses the Translation API:

```tsx
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { translateDynamic, currentLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    const translate = async () => {
      const result = await translateDynamic('Height');
      setTranslatedText(result);
    };
    translate();
  }, [currentLanguage]);

  return <label>{translatedText}</label>;
}
```

### Batch Translation
For translating multiple texts efficiently:

```tsx
const { translateDynamicBatch } = useLanguage();

const texts = ['Name', 'Age', 'Height'];
const translatedTexts = await translateDynamicBatch(texts);
// ['नाम', 'उम्र', 'ऊंचाई'] (in Hindi)
```

### Adding New Languages

1. **Add to supported languages**:
   Edit `src/services/translationService.ts`:
   ```typescript
   export const SUPPORTED_LANGUAGES = {
     en: 'English',
     hi: 'हिन्दी (Hindi)',
     // Add new language
     fr: 'Français (French)',
   };
   ```

2. **Create translation file**:
   Create `src/i18n/locales/fr.json` with translations

3. **Register in i18n config**:
   Edit `src/i18n/config.ts`:
   ```typescript
   import frTranslations from './locales/fr.json';

   i18n.init({
     resources: {
       en: { translation: enTranslations },
       fr: { translation: frTranslations }, // Add new language
     },
   });
   ```

## Translation Providers

### LibreTranslate
- **Pros**: Free, no API key, open-source
- **Cons**: Rate-limited, may be slower, quality varies
- **Best for**: Development, testing, low-traffic apps

### Google Cloud Translation
- **Pros**: High quality, fast, reliable
- **Cons**: Requires API key, costs money after free tier
- **Free tier**: 500,000 characters/month
- **Best for**: Production apps with moderate usage

#### Setting Up Google Cloud Translation

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable "Cloud Translation API"
4. Create API credentials (API Key)
5. Add API key to `.env`:
   ```bash
   VITE_GOOGLE_TRANSLATE_API_KEY=your_actual_api_key_here
   VITE_TRANSLATION_PROVIDER=google
   ```

### Microsoft Translator (Recommended)
- **Pros**: High quality, fast, reliable, **best free tier (2M chars/month)**
- **Cons**: Requires API key, Azure account setup required
- **Free tier**: 2,000,000 characters/month (4x more than Google)
- **Best for**: Production apps with high volume

#### Setting Up Microsoft Translator

1. Go to [Azure Portal](https://portal.azure.com)
2. Create a free Azure account (if you don't have one)
3. Create a new resource → "Translator" (under AI + Machine Learning)
4. Choose pricing tier: **F0 (Free)** - 2M characters/month
5. Copy the API key and region from "Keys and Endpoint"
6. Add to `.env`:
   ```bash
   VITE_MICROSOFT_TRANSLATOR_KEY=your_actual_api_key_here
   VITE_MICROSOFT_TRANSLATOR_REGION=eastus  # or your region
   VITE_TRANSLATION_PROVIDER=microsoft
   ```

**Why Microsoft Translator?**
- 4x more free characters than Google (2M vs 500K)
- Excellent quality translations for Indian languages
- Lower cost after free tier ($10/1M vs $20/1M for Google)

## Caching

The translation service automatically caches translations to:
- Reduce API calls
- Improve performance
- Save costs

Cache is cleared when language changes.

## Troubleshooting

### Translation Not Working
1. Check console for errors
2. Verify environment variables are set correctly
3. Ensure `.env` file is in project root
4. Restart dev server after changing `.env`

### LibreTranslate Rate Limit
If you hit rate limits:
1. Switch to Google Cloud Translation
2. Self-host LibreTranslate
3. Update `VITE_LIBRETRANSLATE_URL` to your instance

### Missing Translations
1. Check if translation file exists for the language
2. Verify JSON syntax is correct
3. Restart dev server

## Best Practices

1. **Use i18next for static content**: Faster, no API calls, offline support
2. **Use API translation for dynamic content**: User-generated, unpredictable content
3. **Provide fallbacks**: Always handle translation failures gracefully
4. **Test with real data**: Verify translations are contextually accurate
5. **Monitor API usage**: Track costs and rate limits

## File Structure

```
src/
├── i18n/
│   ├── config.ts           # i18next configuration
│   └── locales/
│       ├── en.json         # English translations
│       ├── hi.json         # Hindi translations
│       └── mr.json         # Marathi translations
├── services/
│   └── translationService.ts   # Translation API service
├── contexts/
│   └── LanguageContext.tsx     # Language context & hook
└── components/
    └── molecules/
        └── LanguageSelector.tsx  # Language dropdown
```

## Support

For issues or questions:
- Check this guide
- Review code comments
- Test with different providers
- Monitor browser console for errors
