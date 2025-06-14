"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import { FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import UpdateSlider from '../../components/Updates/UpdateSlider';
import CaseStudy from '../../components/Updates/CaseStudy';
import { UpdateItem, updates as updatesData } from '../../data/updates';
import { ICONS } from '../lib/constants';
import { useLanguage } from '../../app/context/LanguageContext';

interface UpdateModalProps {
  update: UpdateItem | null;
  onClose: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ update, onClose }) => {
  const { t } = useLanguage();
  if (!update) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="update-modal-overlay"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="update-modal-content"
      >
        <button
          onClick={onClose}
          className="update-modal-close-button"
        >
          <FiX size={24} />
        </button>

        <div className="update-modal-header">
          <div className="update-modal-icon-wrapper">
            {update.iconUrl && (
              <Image
                src={update.iconUrl}
                alt={t(update.titleKey) || update.originalTitle}
                width={24} // Specify width
                height={24} // Specify height
                className="update-modal-icon"
              />
            )}
          </div>
          <div>
            <h3 className="update-modal-title">{t(update.titleKey)}</h3>
            <p className="update-modal-date">{t(update.dateKey)}</p>
          </div>
        </div>

        <div className="update-modal-prose">
          <p className="update-modal-description">{t(update.descriptionKey)}</p>

          <div className="update-modal-section-spacing">
            <div>
              <h4 className="update-modal-section-title">{t('updates.modal.keyFeaturesTitle')}</h4>
              <ul className="update-modal-list">
                <li>{t('updates.modal.placeholder')}</li>
                <li>{t('updates.modal.placeholder')}</li>
                <li>{t('updates.modal.placeholder')}</li>
              </ul>
            </div>

            <div>
              <h4 className="update-modal-section-title">{t('updates.modal.impactMetricsTitle')}</h4>
              <div className="update-modal-grid">
                <div className="update-modal-grid-item">
                  <div className="update-modal-grid-value">{t('updates.modal.placeholder')}</div>
                  <div className="update-modal-grid-label">{t('updates.modal.placeholder')}</div>
                </div>
                <div className="update-modal-grid-item">
                  <div className="update-modal-grid-value">{t('updates.modal.placeholder')}</div>
                  <div className="update-modal-grid-label">{t('updates.modal.placeholder')}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="update-modal-section-title">{t('updates.modal.featureOverviewTitle')}</h4>
              <div className="update-modal-video-wrapper">
                <iframe
                  className="update-modal-video"
                  src="https://youtu.be/9cH5Em0F7pc?si=mi9VoAX9xcDfP3Bj"
                  title={t('updates.modal.featureOverviewTitle')}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div>
              <h4 className="update-modal-section-title">{t('updates.modal.additionalInfoTitle')}</h4>
              <p className="update-modal-description">
                {t('updates.modal.placeholder')}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface CaseStudyItem {
  titleKey: string;
  iconName: string;
  descriptionKey: string;
  metricsKeys: { valueKey: string; labelKey: string }[];
}

const Updates: React.FC = () => { // Removed UpdatesProps interface
  const { } = useTheme();
  const { t } = useLanguage();
  const [selectedUpdate, setSelectedUpdate] = useState<UpdateItem | null>(null);

  const caseStudies: CaseStudyItem[] = [
    {
      titleKey: 'updates.caseStudy.title',
      iconName: ICONS.shield,
      descriptionKey: 'updates.caseStudy.description',
      metricsKeys: [
        { valueKey: 'updates.caseStudy.metricPlaceholder', labelKey: 'updates.caseStudy.metricPlaceholder' },
        { valueKey: 'updates.caseStudy.metricPlaceholder', labelKey: 'updates.caseStudy.metricPlaceholder' }
      ]
    },
  ];

  return (
    <div className="updates-page-container">
      <div className="updates-page-header-wrapper">
        <Link
          href="/"
          className="updates-back-link"
        >
          {ICONS.arrowLeft}
          {t('backToHome')}
        </Link>
        <h1 className="updates-page-title">{t('updates.pageTitle')}</h1>
        <p className="updates-page-subtitle">
          {t('updates.pageSubtitle')}
        </p>
      </div>

      <div className="updates-section-wrapper">
        <UpdateSlider updates={updatesData} />
      </div>

      <div className="updates-section-wrapper">
        <h2 className="updates-section-title">{t('updates.impactTitle')}</h2>
        <div className="updates-grid">
          {caseStudies.map((study, index) => (
            <CaseStudy key={index} {...study} />
          ))}
        </div>
      </div>

      <div className="updates-section-wrapper">
        <h2 className="updates-section-title">{t('updates.allUpdatesTitle')}</h2>
        <div className="updates-grid">
          {updatesData.map((update, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                onClick={() => setSelectedUpdate(update)}
                className="update-card"
              >
                <div
                  className="update-card-glow"
                  style={{
                    background: 'radial-gradient(circle at center, var(--color-primary), transparent)'
                  }}
                />

                <div className="update-card-content">
                  <div className="update-card-icon-wrapper">
                    {update.iconUrl && (
                      <Image
                        src={update.iconUrl}
                        alt={t(update.titleKey) || update.originalTitle}
                        width={32} // Specify width
                        height={32} // Specify height
                        className="update-card-icon"
                      />
                    )}
                  </div>
                  <h3 className="update-card-title">{t(update.titleKey)}</h3>
                  <p className="update-card-description">{t(update.descriptionKey)}</p>
                  <p className="update-card-date">{t(update.dateKey)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedUpdate && (
          <UpdateModal
            update={selectedUpdate}
            onClose={() => setSelectedUpdate(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Updates;