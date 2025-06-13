'use client';

import React, { useState } from 'react';
import { useTheme } from '../app/context/ThemeContext';
import { FaTwitter, FaLinkedin, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Link from 'next/link';
import { useLanguage } from '../app/context/LanguageContext';
import SvgIcon from './SvgIcon';


interface FooterIconProps {
  src: string | undefined;
  alt: string;
  className?: string;
}

interface LinkItem {
  nameKey: string;
  href: string;
  icon: string;
  altKey: string;
}

interface ContactItem {
  icon: string | React.ElementType;
  textKey: string;
  isCustomIcon?: boolean;
  altKey?: string;
}

interface SocialItem {
  icon: React.ElementType;
  href: string;
  labelKey: string;
}

interface SectionData {
  id: string;
  titleKey: string;
  contentKey?: string;
  links?: LinkItem[];
  contacts?: ContactItem[];
  socials?: SocialItem[];
}

const FOOTER_ICONS = {
  home: 'home',
  faq: 'faq',
  features: 'features',
  news: 'news',
  roadmap: 'roadmap',
  quickLinks: 'quickLinks',
  emailIcon: 'mail'
};

const Footer = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const sections = React.useMemo((): SectionData[] => [
    {
      id: 'brand',
      titleKey: 'footer.sectionTitle.brand',
      contentKey: 'footer.brandContent'
    },
    {
      id: 'quickLinks',
      titleKey: 'footer.sectionTitle.quickLinks',
      links: [
        { nameKey: 'footer.quickLinks.home', href: '/', icon: FOOTER_ICONS.home, altKey: 'footer.quickLinks.home' },
        { nameKey: 'footer.quickLinks.features', href: '/#features', icon: FOOTER_ICONS.features, altKey: 'footer.quickLinks.features' },
        { nameKey: 'footer.quickLinks.news', href: '/#updates', icon: FOOTER_ICONS.news, altKey: 'footer.quickLinks.news' },
        { nameKey: 'footer.quickLinks.roadmap', href: '/#roadmap', icon: FOOTER_ICONS.roadmap, altKey: 'footer.quickLinks.roadmap' },
        { nameKey: 'footer.quickLinks.faq', href: '/faq', icon: FOOTER_ICONS.faq, altKey: 'footer.quickLinks.faq' },
        { nameKey: 'footer.quickLinks.doc', href: '/docs', icon: FOOTER_ICONS.quickLinks, altKey: 'footer.quickLinks.doc' }
      ]
    },
    {
      id: 'contact',
      titleKey: 'footer.sectionTitle.contact',
      contacts: [
        {
          icon: FOOTER_ICONS.emailIcon,
          textKey: 'footer.contact.email',
          isCustomIcon: true,
          altKey: 'footer.iconAlt.email'
        },
      ]
    },
    {
      id: 'social',
      titleKey: 'footer.sectionTitle.social',
      socials: [
        { icon: FaTwitter, href: '#', labelKey: 'footer.social.twitter' },
        { icon: FaLinkedin, href: '#', labelKey: 'footer.social.linkedin' }
      ]
    }
  ], [t]);

  const goToNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const goToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const handleNavigation = (link: LinkItem) => {
    if (link.href.startsWith('#')) {
      const elementId = link.href.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = link.href;
    }
  };

  const renderSectionContent = () => {
    const section = sections[currentSectionIndex];

    switch (section.id) {
      case 'brand':
        return (
          <div className="text-center transform transition-all duration-500">
            <h2 className="text-[var(--font-size-h1)] font-bold mb-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)] bg-clip-text text-transparent">
              {t(section.titleKey)}
            </h2>
            {section.contentKey && (
              <p className="text-[var(--font-size-lg)] text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
                {t(section.contentKey)}
              </p>
            )}
          </div>
        );

      case 'quickLinks':
        return (
          <div className="text-center transform transition-all duration-500">
            <div className="flex items-center justify-center gap-3 mb-8">
              <SvgIcon iconName={FOOTER_ICONS.quickLinks} title={t('footer.iconAlt.quickLinks')} className="w-8 h-8 text-[var(--color-primary)]" />
              <h3 className="text-[var(--font-size-h3)] font-semibold text-[var(--color-text-primary)]">{t(section.titleKey)}</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {section.links?.map((link, index) => (
                link.href.startsWith('#') ? (
                  <button
                    key={index}
                    onClick={() => handleNavigation(link)}
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-[var(--color-surface-dark)] rounded-lg text-[var(--color-text-primary)] hover:text-[var(--color-primary)] hover:scale-105 transition-all duration-300"
                  >
                    <SvgIcon iconName={link.icon} title={t(link.altKey)} className="text-[var(--color-primary)]" />
                    {t(link.nameKey)}
                  </button>
                ) : (
                  <Link
                    key={index}
                    href={link.href}
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-[var(--color-surface-dark)] rounded-lg text-[var(--color-text-primary)] hover:text-[var(--color-primary)] hover:scale-105 transition-all duration-300"
                  >
                    <SvgIcon iconName={link.icon} title={t(link.altKey)} className="text-[var(--color-primary)]" />
                    {t(link.nameKey)}
                  </Link>
                )
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="text-center transform transition-all duration-500">
            <h3 className="text-[var(--font-size-h3)] font-semibold mb-8 text-[var(--color-text-primary)]">{t(section.titleKey)}</h3>
            <div className="space-y-6 max-w-2xl mx-auto">
              {section.contacts?.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-4 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 group"
                >
                  {contact.isCustomIcon ? (
                    <SvgIcon iconName={contact.icon as string} title={contact.altKey ? t(contact.altKey) : ''} className="w-8 h-8 text-[var(--color-primary)]" />
                  ) : (
                    React.createElement(contact.icon as React.ElementType, { key: index, className: "w-8 h-8 text-[var(--color-primary)]" })
                  )}
                  <span className="text-[var(--font-size-lg)]">{t(contact.textKey)}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="text-center transform transition-all duration-500">
            <h3 className="text-[var(--font-size-h3)] font-semibold mb-8 text-[var(--color-text-primary)]">{t(section.titleKey)}</h3>
            <div className="flex justify-center space-x-6">
              {section.socials?.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-4 rounded-full bg-[var(--color-surface-dark)] text-[var(--color-text-primary)] hover:text-[var(--color-primary)] hover:scale-110 transition-all duration-300"
                  aria-label={t(social.labelKey)}
                >
                  <social.icon size={28} />
                </a>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <footer className="w-full bg-[var(--color-background-dark)] text-[var(--color-text-primary)] flex flex-col relative">
      {/* Navigation Arrows */}
      <div className="flex-1 flex flex-col items-center justify-between py-16 px-4 sm:px-6 lg:px-8">
        {currentSectionIndex > 0 && (
          <button
            onClick={goToPreviousSection}
            className="absolute top-[15px] left-1/2 -translate-x-1/2 p-3 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] z-10"
            aria-label={t('footer.previousSection')}
          >
            <FaChevronUp size={20} />
          </button>
        )}

        {/* Section Content */}
        <div className="w-full max-w-7xl mx-auto">
          {renderSectionContent()}
        </div>

        {currentSectionIndex < sections.length - 1 && (
          <button
            onClick={goToNextSection}
            className="absolute bottom-[60px] left-1/2 -translate-x-1/2 p-3 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] z-10"
            aria-label={t('footer.nextSection')}
          >
            <FaChevronDown size={20} />
          </button>
        )}
      </div>

      {/* Copyright - Always visible */}
      <div className="border-t border-[var(--color-border)] bg-[var(--color-background-dark)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-center text-[var(--color-text-secondary)]">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;