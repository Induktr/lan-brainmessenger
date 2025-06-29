"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SvgIcon from '../../ui/SvgIcon'; // Import SvgIcon


interface CaseStudyProps {
  titleKey: string;
  iconName: string; // Changed to iconName: string
  descriptionKey: string;
  metricsKeys: { valueKey: string; labelKey: string }[];
}

const CaseStudy: React.FC<CaseStudyProps> = ({ titleKey, iconName, descriptionKey, metricsKeys }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="case-study-card group"
    >
      <div
        className="case-study-card-glow"
      />

      <div className="case-study-content">
        <div className="case-study-icon-wrapper">
          {/* Render icon using SvgIcon */}
          <SvgIcon iconName={iconName} title={t(titleKey) as string} className="case-study-icon" />
        </div>
        <h3 className="case-study-title">{t(titleKey) as string}</h3>
        <p className="case-study-description">{t(descriptionKey) as string}</p>
        <div className="case-study-metrics-grid">
          {metricsKeys.map((metric, index) => (
            <div key={index} className="case-study-metric-item">
              <div className="case-study-metric-value">{t(metric.valueKey) as string}</div>
              <div className="case-study-metric-label">{t(metric.labelKey) as string}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudy;