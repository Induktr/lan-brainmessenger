'use client';

import React, { useState } from 'react';
import { useTheme } from '../app/context/ThemeContext';
import { FaTwitter, FaLinkedin, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Link from 'next/link';
import { useLanguage } from '../app/context/LanguageContext';
import SvgIcon from './SvgIcon';



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
  const { } = useTheme();
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
  ], []);

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
          <div className="footer-brand-section">
            <h2 className="footer-brand-title">
              {t(section.titleKey)}
            </h2>
            {section.contentKey && (
              <p className="footer-brand-content">
                {t(section.contentKey)}
              </p>
            )}
          </div>
        );

      case 'quickLinks':
        return (
          <div className="footer-quicklinks-section">
            <div className="footer-quicklinks-header">
              <SvgIcon iconName={FOOTER_ICONS.quickLinks} title={t('footer.iconAlt.quickLinks')} className="footer-quicklinks-icon" />
              <h3 className="footer-quicklinks-title">{t(section.titleKey)}</h3>
            </div>
            <div className="footer-quicklinks-grid">
              {section.links?.map((link, index) => (
                link.href.startsWith('#') ? (
                  <button
                    key={index}
                    onClick={() => handleNavigation(link)}
                    className="footer-quicklinks-item"
                  >
                    <SvgIcon iconName={link.icon} title={t(link.altKey)} className="svg-icon" />
                    {t(link.nameKey)}
                  </button>
                ) : (
                  <Link
                    key={index}
                    href={link.href}
                    className="footer-quicklinks-item"
                  >
                    <SvgIcon iconName={link.icon} title={t(link.altKey)} className="svg-icon" />
                    {t(link.nameKey)}
                  </Link>
                )
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="footer-contact-section">
            <h3 className="footer-contact-title">{t(section.titleKey)}</h3>
            <div className="footer-contact-list">
              {section.contacts?.map((contact, index) => (
                <div
                  key={index}
                  className="footer-contact-item"
                >
                  {contact.isCustomIcon ? (
                    <SvgIcon iconName={contact.icon as string} title={contact.altKey ? t(contact.altKey) : ''} className="svg-icon" />
                  ) : (
                    React.createElement(contact.icon as React.ElementType, { className: "footer-contact-item-icon" })
                  )}
                  <span className="footer-contact-text">{t(contact.textKey)}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="footer-social-section">
            <h3 className="footer-social-title">{t(section.titleKey)}</h3>
            <div className="footer-social-list">
              {section.socials?.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="footer-social-item"
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
    <footer className="footer-base">
      {/* Navigation Arrows */}
      <div className="footer-nav-area">
        {currentSectionIndex > 0 && (
          <button
            onClick={goToPreviousSection}
            className="footer-nav-button top"
            aria-label={t('footer.previousSection')}
          >
            <FaChevronUp size={20} />
          </button>
        )}

        {/* Section Content */}
        <div className="footer-section-wrapper">
          {renderSectionContent()}
        </div>

        {currentSectionIndex < sections.length - 1 && (
          <button
            onClick={goToNextSection}
            className="footer-nav-button bottom"
            aria-label={t('footer.nextSection')}
          >
            <FaChevronDown size={20} />
          </button>
        )}
      </div>

      {/* Copyright - Always visible */}
      <div className="footer-copyright-wrapper">
        <div className="footer-copyright-content">
          <p className="footer-copyright-text">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;