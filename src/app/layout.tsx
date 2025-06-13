import type { Metadata } from "next";
import "./globals.css";
import React from 'react';
import AppErrorBoundary from '../components/ErrorBoundary';
import Header from '../components/Header/Header';
import Footer from '../ui/Footer';
import { Providers } from './providers';


export const metadata: Metadata = {
  title: "BrainMessenger",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AppErrorBoundary>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </AppErrorBoundary>
      </body>
    </html>
  );
}
