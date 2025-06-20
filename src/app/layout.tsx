import type { Metadata } from "next";
import "./globals.css";
import React from 'react';
import AppErrorBoundary from '../components/ErrorBoundary';
import Header from '../components/Header/Header';
import Footer from '../ui/Footer';
import { Providers } from './providers';
import { loadTranslations } from './lib/server-i18n'; // Import the server function
import { headers } from 'next/headers'; // Import headers


export const metadata: Metadata = {
  title: "BrainMessenger",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || 'en';
  const initialLocale = acceptLanguage.split(',')[0].split('-')[0];

  const { locale, translations } = await loadTranslations(initialLocale); // Load translations on server

  return (
    <html lang={locale}><body className={`antialiased`}>
        <AppErrorBoundary>
          <Providers initialLocale={locale} initialTranslations={translations}>
            <Header />
            {children}
            <Footer />
          </Providers>
        </AppErrorBoundary>
      </body>
    </html>
  );
}
