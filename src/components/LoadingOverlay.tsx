"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../app/context/LanguageContext'; // Corrected path

const LoadingOverlay = () => {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="loading-overlay-container"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className="loading-overlay-card"
        >
          <div className="loading-spinner-wrapper">
            <div className="loading-spinner" />
            <p className="loading-text">
              {t('common.loading')}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingOverlay;
