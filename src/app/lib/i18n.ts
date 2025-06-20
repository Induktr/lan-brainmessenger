import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

// Client-side configuration
// Remove LanguageDetector for SSR compatibility
const clientI18n = i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/translations/{{lng}}.json',
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru', 'ua'],
    // detection is removed as LanguageDetector is removed
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false
    }
  });

// Export the client instance
export default i18n;
