"use client";

import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './lib/i18n'; // Import your client i18n instance

interface ProvidersProps {
  children: React.ReactNode;
  initialLocale: string;
  initialTranslations: any; // Use a more specific type if possible
}

export function Providers({ children, initialLocale, initialTranslations }: ProvidersProps) {
  // Initialize i18next on the client with preloaded state
  // This should only happen once
  if (!i18n.isInitialized) {
    i18n.init({
      resources: {
        [initialLocale]: {
          translation: initialTranslations,
        },
      },
      lng: initialLocale, // Set initial language
      fallbackLng: 'en',
      supportedLngs: ['en', 'ru', 'ua'],
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false
      }
    });
  } else {
    // If already initialized (e.g., client-side navigation),
    // ensure the language is set if it changed
    if (i18n.language !== initialLocale) {
       i18n.changeLanguage(initialLocale);
    }
  }

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </I18nextProvider>
  );
}
