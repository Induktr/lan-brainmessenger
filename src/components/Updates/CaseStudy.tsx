"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../app/context/LanguageContext'; // Adjust path as needed

interface CaseStudyItem {
  titleKey: string;
  icon: React.ElementType | any; // This will be replaced by SvgIcon
  descriptionKey: string;
  metricsKeys: { valueKey: string; labelKey: string }[];
}

interface CaseStudyProps {
  titleKey: string;
  icon: React.ElementType | any; // This will be replaced by SvgIcon
  descriptionKey: string;
  metricsKeys: { valueKey: string; labelKey: string }[];
}

const CaseStudy: React.FC<CaseStudyProps> = ({ titleKey, icon, descriptionKey, metricsKeys }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="group relative bg-[var(--secondary)] rounded-xl p-6 border border-[var(--border)] cursor-pointer"
    >
      <div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"
        style={{
          background: 'radial-gradient(circle at center, var(--accent-primary), transparent)'
        }}
      />

      <div className="relative z-10">
        <div className="text-[var(--accent-primary)] text-2xl mb-4">
          {/* Render icon using the passed icon prop, assuming it's a component or string */}
          {icon && typeof icon === 'string' ? (
            <img src={icon} alt={t(titleKey)} className="w-8 h-8" />
          ) : (
            React.createElement(icon, { className: "w-8 h-8" })
          )}
        </div>
        <h3 className="text-xl font-semibold mb-2">{t(titleKey)}</h3>
        <p className="text-[var(--text-secondary)] mb-4">{t(descriptionKey)}</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {metricsKeys.map((metric, index) => (
            <div key={index} className="bg-[var(--tertiary)] p-3 rounded-lg text-center">
              <div className="text-xl font-bold text-[var(--accent-primary)]">{t(metric.valueKey)}</div>
              <div className="text-sm text-[var(--text-secondary)]">{t(metric.labelKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudy;