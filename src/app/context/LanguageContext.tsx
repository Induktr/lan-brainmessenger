"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import { usePathname } from 'next/navigation'; // Import usePathname from next/navigation

interface Language {
  name: string;
  flag: string;
}

interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
  t: (key: string, options?: { defaultValue?: string }) => string;
  languages: { [key: string]: Language };
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const languages: { [key: string]: Language } = {
  en: { name: 'English', flag: '/icons/en.svg' },
  ru: { name: 'Русский', flag: '/icons/ru.svg' },
  ua: { name: 'Українська', flag: '/icons/ua.svg' },
  uk: { name: 'Українська', flag: '/icons/ua.svg' }, // Alias for ua
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

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
  }, [languages, loadTranslations]);

  const t = useCallback((key: string, options?: { defaultValue?: string }) => {
    return translations[key] || options?.defaultValue || key;
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