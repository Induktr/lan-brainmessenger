'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi'; // Assuming these are used for mobile menu icons
import SvgIcon from '../../ui/SvgIcon'; // Corrected path for SvgIcon
import { useTheme } from '../../app/context/ThemeContext'; // Corrected path for ThemeContext
import { useLanguage } from '../../app/context/LanguageContext'; // Corrected path for LanguageContext

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
  const { language, changeLanguage, languages, t, isLoading } = useLanguage();
  const langMenuRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    { name: t('header.features'), to: 'features', type: 'scroll' },
    { name: t('header.faqLink'), to: '/faq', type: 'route' },
    { name: t('header.docs'), to: '/docs', type: 'route' }
  ];

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
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="lang-selector-button"
                aria-label={t('selectLanguage')}
                title={t('changeLanguageTooltip')}
                disabled={isLoading}
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
              aria-label={isDark ? t('lightMode') : t('darkMode')}
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
            aria-label={isOpen ? t('closeMenu') : t('openMenu')}
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
                <p className="mobile-lang-selector-label">{t('selectLanguage')}</p>
                <div className="mobile-lang-grid">
                  {Object.entries(languages).map(([code, lang]) => (
                    <button
                      key={code}
                      onClick={() => {
                        changeLanguage(code);
                        setIsOpen(false);
                      }}
                      disabled={isLoading}
                      className={`mobile-lang-item ${
                        language === code ? 'active' : ''
                      } ${isLoading ? 'disabled' : ''}`}
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
                    <span>{t('lightMode')}</span>
                  </>
                ) : (
                  <>
                    <SvgIcon iconName="moon" title="Dark Mode" className="mobile-theme-toggle-icon" />
                    <span>{t('darkMode')}</span>
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