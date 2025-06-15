"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface Language {
  name: string;
  flag: string;
}

interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
  t: (key: string, options?: { defaultValue?: string; [key: string]: string | number | boolean | undefined }) => string;
  languages: { [key: string]: Language };
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const languages: { [key: string]: Language } = {
  en: { name: 'English', flag: '/icons/en.svg' },
  ru: { name: 'Русский', flag: '/icons/ru.svg' },
  ua: { name: 'Українська', flag: '/icons/ua.svg' },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();
  // const pathname = usePathname();

  const loadTranslations = useCallback(async (lang: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/translations/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${lang}`);
      }
      const data = await response.json();
      setTranslations(data);
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to English if translation fails
      const response = await fetch('/translations/en.json');
      const data = await response.json();
      setTranslations(data);
      setLanguage('en');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    const browserLang = navigator.language.split('-')[0];
    const initialLang = savedLang || (languages[browserLang] ? browserLang : 'en');
    setLanguage(initialLang);
    loadTranslations(initialLang);
  }, [loadTranslations]);

  const changeLanguage = useCallback((lang: string) => {
    if (languages[lang]) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
      loadTranslations(lang);
      // Optional: Update URL if you want language in the path
      // router.push(`/${lang}${pathname}`);
    }
  }, [loadTranslations]);

  const t = useCallback((key: string, options?: { defaultValue?: string; [key: string]: string | number | boolean | undefined }) => {
    const keys = key.split('.');
    let value: unknown = translations;
    for (let i = 0; i < keys.length; i++) {
      if (value && typeof value === 'object' && value !== null && keys[i] in value) {
        value = (value as Record<string, unknown>)[keys[i]];
      } else {
        value = undefined;
        break;
      }
    }

    let result: string;
    if (typeof value === 'string') {
      result = value;
    } else if (options?.defaultValue !== undefined) {
      result = options.defaultValue;
    } else {
      result = key; // Fallback to the key itself if no translation or default value
    }

    // Handle interpolation if options are provided
    if (options) {
      for (const optKey in options) {
        if (optKey !== 'defaultValue' && Object.prototype.hasOwnProperty.call(options, optKey)) {
          const placeholder = `{{${optKey}}}`;
          const optionValue = options[optKey];
          if (typeof optionValue === 'string' || typeof optionValue === 'number' || typeof optionValue === 'boolean') {
            result = result.replace(new RegExp(placeholder, 'g'), String(optionValue));
          }
        }
      }
    }

    return result;
  }, [translations]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, languages, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}