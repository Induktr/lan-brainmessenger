'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi'; // Assuming these are used for mobile menu icons
import SvgIcon from '../../ui/SvgIcon'; // Corrected path for SvgIcon
import { useTheme } from '../../app/context/ThemeContext'; // Corrected path for ThemeContext
import { useTranslation } from 'react-i18next'; // Import useTranslation

interface Language {
  name: string;
  flag: string;
}

interface HeaderProps {
  children?: React.ReactNode;
}

interface MenuItem {
  name: string;
  to: string;
  type: 'scroll' | 'route';
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { t, i18n, ready: isLoading } = useTranslation(); // Use useTranslation hook
  const langMenuRef = useRef<HTMLDivElement>(null);

  console.log('Header isLoading:', isLoading); // Log isLoading state

  // Keep the languages object with flags as it's not part of i18next instance
  const languages: { [key: string]: Language } = {
    en: { name: 'English', flag: '/icons/en.svg' },
    ru: { name: 'Русский', flag: '/icons/ru.svg' },
    ua: { name: 'Українська', flag: '/icons/ua.svg' },
  };

  const menuItems: MenuItem[] = [
    { name: t('header.features') as string, to: 'features', type: 'scroll' },
    { name: t('header.faqLink') as string, to: '/faq', type: 'route' },
    { name: t('header.docs') as string, to: '/docs', type: 'route' }
  ];

  // Get current language from i18n instance
  const language = i18n.language;

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const renderNavLink = (item: MenuItem) => {
    if (item.type === 'scroll') {
      return (
        <Link
          key={`${item.type}-${item.to}`}
          href={`#${item.to}`}
          className="header-nav-link"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(false);
            document.getElementById(item.to)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {item.name}
        </Link>
      );
    }
    return (
      <Link
        key={`${item.type}-${item.to}`}
        href={item.to}
        className="header-nav-link"
        onClick={() => setIsOpen(false)}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <header className="header-base">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link href="/" className="header-logo">
            BrainMessenger
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav-desktop">
            {menuItems.map(renderNavLink)}

            {/* Language Selector */}
            <div className="lang-selector-wrapper" ref={langMenuRef}>
              <button
                onClick={() => {
                  console.log('Language button clicked. Current isLangOpen:', isLangOpen, 'isLoading:', isLoading); // Log click and states
                  setIsLangOpen(!isLangOpen);
                }}
                className="lang-selector-button"
                aria-label={t('selectLanguage') as string}
                title={t('changeLanguageTooltip') as string}
              >
                <SvgIcon iconName="globe" title="Language" className="lang-selector-icon" />
                <Image
                  width={24}
                  height={24}
                  src={languages[language]?.flag}
                  alt={languages[language]?.name}
                  className="lang-selector-flag"
                />
                <SvgIcon
                  iconName="arrowRight"
                  title="FiChevronDown"
                  className={`lang-selector-arrow ${isLangOpen ? 'open' : ''}`}
                />
              </button>

              {/* Language Dropdown */}
              {isLangOpen && (
                <div className="lang-dropdown">
                  {Object.entries(languages).map(([code, lang]) => (
                    <button
                      key={code}
                      className={`lang-dropdown-item ${
                        language === code ? 'active' : ''
                      }`}
                      onClick={() => {
                        changeLanguage(code);
                        setIsLangOpen(false);
                      }}
                    >
                      <Image
                        width={24}
                        height={24}
                        src={(lang as Language).flag}
                        alt={(lang as Language).name}
                        className="lang-dropdown-flag"
                      />
                      <span>{(lang as Language).name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Download Button */}
            <Link
              href="/download/android"
              className="header-download-button"
              download
            >
              <SvgIcon
                iconName="android"
                title="Download for android"
                className="header-download-icon"
              />
              Download for android
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-button"
              aria-label={isDark ? t('lightMode') as string : t('darkMode') as string}
            >
              {isDark ? (
                <SvgIcon iconName="sun" title="Light Mode" className="theme-toggle-icon" />
              ) : (
                <SvgIcon iconName="moon" title="Dark Mode" className="theme-toggle-icon" />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? t('closeMenu') as string : t('openMenu') as string}
          >
            {isOpen ? (
              <FiX className="mobile-menu-icon" />
            ) : (
              <FiMenu className="mobile-menu-icon" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="mobile-nav-container">
            <nav className="mobile-nav-list">
              {menuItems.map(renderNavLink)}

              {/* Mobile Language Selector */}
              <div className="mobile-lang-selector-wrapper">
                <p className="mobile-lang-selector-label">{t('selectLanguage') as string}</p>
                <div className="mobile-lang-grid">
                  {Object.entries(languages).map(([code, lang]) => (
                    <button
                      key={code}
                      onClick={() => {
                        changeLanguage(code);
                        setIsOpen(false);
                      }}
                      className={`mobile-lang-item ${
                        language === code ? 'active' : ''
                      }`}
                    >
                      <Image
                        width={24}
                        height={24}
                        src={(lang as Language).flag}
                        alt={(lang as Language).name}
                        className="mobile-lang-flag"
                      />
                      <span>{(lang as Language).name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="mobile-theme-toggle-button"
              >
                {isDark ? (
                  <>
                    <SvgIcon iconName="sun" title="Light Mode" className="mobile-theme-toggle-icon" />
                    <span>{t('lightMode') as string}</span>
                  </>
                ) : (
                  <>
                    <SvgIcon iconName="moon" title="Dark Mode" className="mobile-theme-toggle-icon" />
                    <span>{t('darkMode') as string}</span>
                  </>
                )}
              </button>
            </nav>
          </div>
        )}
        {children}
      </div>
    </header>
  );
};

export default Header;
