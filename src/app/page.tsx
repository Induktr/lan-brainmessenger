import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    { name: t('header.features'), to: 'features', type: 'scroll' }, // Changed t('features') to t('header.features')
    { name: t('header.faqLink'), to: '/faq', type: 'route' },
    { name: t('header.docs'), to: '/docs', type: 'route' }
  ];

  const renderNavLink = (item: MenuItem) => {
    if (item.type === 'scroll') {
      return (
        <Link
          key={`${item.type}-${item.to}`} // Changed key to be more unique
          href={`#${item.to}`}
          className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
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
        key={`${item.type}-${item.to}`} // Changed key to be more unique
        href={item.to}
        className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
        onClick={() => setIsOpen(false)}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-[var(--primary)] border-b border-[var(--border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[var(--accent-primary)]">
            BrainMessenger
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map(renderNavLink)}

            {/* Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
                aria-label={t('selectLanguage')}
                title={t('changeLanguageTooltip')}
                disabled={isLoading}
              >
                <SvgIcon iconName="globe" title="Language" className="w-5 h-5 text-[var(--accent-primary)]" />
                <Image
                  width={24}
                  height={24}
                  src={languages[language]?.flag}
                  alt={languages[language]?.name}
                  className="w-5 h-5 object-contain"
                  style={{ filter: 'brightness(0) saturate(100%) invert(94%) sepia(0%) saturate(0%) hue-rotate(213deg) brightness(105%) contrast(104%)' }}
                />
                <SvgIcon
                  iconName="arrowRight"
                  title="FiChevronDown"
                  className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`}
                  style={{
                    filter: 'brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
                    WebkitFilter: 'brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                  }}
                />
              </button>

              {/* Language Dropdown */}
              {isLangOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-[var(--primary)] rounded-lg shadow-xl border border-[var(--border)]">
                  {Object.entries(languages).map(([code, lang]) => (
                    <button
                      key={code}
                      className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-[var(--secondary)] transition-colors ${
                        language === code ? 'bg-[var(--secondary)]' : ''
                      }`}
                      onClick={() => {
                        changeLanguage(code);
                        setIsLangOpen(false);
                      }}
                    >
                      <Image
                        width={24}
                        height={24}
                        src={lang.flag}
                        alt={lang.name}
                        className="w-5 h-5 object-contain"
                        style={{ filter: 'brightness(0) saturate(100%) invert(94%) sepia(0%) saturate(0%) hue-rotate(213deg) brightness(105%) contrast(104%)' }}
                      />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Download Button */}
            <a
              href="/download/windows"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--primary)] transition-colors"
              download
            >
              <SvgIcon
                iconName="download"
                title="Download"
                className="w-5 h-5"
                style={{ filter: 'brightness(0) saturate(100%) invert(10%) sepia(0%) saturate(7495%) hue-rotate(224deg) brightness(95%) contrast(88%)' }}
              />
              Download
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
              aria-label={isDark ? t('lightMode') : t('darkMode')}
            >
              {isDark ? (
                <SvgIcon iconName="sun" title="Light Mode" className="text-[var(--accent-primary)]" />
              ) : (
                <SvgIcon iconName="moon" title="Dark Mode" className="text-[var(--accent-primary)]" />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? t('closeMenu') : t('openMenu')}
          >
            {isOpen ? (
              <FiX className="w-6 h-6 text-[var(--text-primary)]" />
            ) : (
              <FiMenu className="w-6 h-6 text-[var(--text-primary)]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              {menuItems.map(renderNavLink)}

              {/* Mobile Language Selector */}
              <div className="py-2 border-t border-[var(--border)]">
                <p className="px-2 py-1 text-sm text-[var(--text-secondary)]">{t('selectLanguage')}</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {Object.entries(languages).map(([code, lang]) => (
                    <button
                      key={code}
                      onClick={() => {
                        changeLanguage(code);
                        setIsOpen(false);
                      }}
                      disabled={isLoading}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
                        ${language === code
                          ? 'bg-[var(--accent-primary)] text-[var(--primary)]'
                          : 'hover:bg-[var(--secondary)] text-[var(--text-primary)]'}
                        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Image
                        width={24}
                        height={24}
                        src={lang.flag}
                        alt={lang.name}
                        className="w-5 h-5 object-contain"
                        style={{ filter: 'brightness(0) saturate(100%) invert(94%) sepia(0%) saturate(0%) hue-rotate(213deg) brightness(105%) contrast(104%)' }}
                      />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Download Button */}
              <Link
                href="/download/windows"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--primary)] transition-colors"
                download
              >
                <SvgIcon
                  iconName="download"
                  title="Download"
                  className="w-5 h-5"
                  style={{ filter: 'brightness(0) saturate(100%) invert(10%) sepia(0%) saturate(7495%) hue-rotate(224deg) brightness(95%) contrast(88%)' }}
                />
                Download for Windows
              </Link>

              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
              >
                {isDark ? (
                  <>
                    <SvgIcon iconName="sun" title="Light Mode" className="text-[var(--accent-primary)]" />
                    <span>{t('lightMode')}</span>
                  </>
                ) : (
                  <>
                    <SvgIcon iconName="moon" title="Dark Mode" className="text-[var(--accent-primary)]" />
                    <span>{t('darkMode')}</span>
                  </>
                )}
              </button>
            </nav>
          </div>
        )}
        {children} {/* Render children here */}
      </div>
    </header>
  );
};

export default Header;