"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../app/context/LanguageContext'; // Adjust path as needed
import { UpdateItem } from '../../data/updates'; // Corrected path
import SvgIcon from '../../ui/SvgIcon'; // Corrected path

interface UpdateSliderProps {
  updates: UpdateItem[];
}

const UpdateSlider: React.FC<UpdateSliderProps> = ({ updates }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useLanguage();

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % updates.length);
    }, 5000); // Change slide every 5 seconds
  }, [updates.length]);

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isAutoPlay) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay(); // Cleanup on unmount
  }, [isAutoPlay, startAutoPlay]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false); // Pause autoplay on manual navigation
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + updates.length) % updates.length);
    setIsAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % updates.length);
    setIsAutoPlay(false);
  };

  if (updates.length === 0) {
    return null;
  }

  const currentUpdate = updates[currentIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-lg bg-[var(--secondary)] border border-[var(--border)]">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="p-8 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="md:w-2/3">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-[var(--accent-primary)] text-[var(--primary)]">
                {currentUpdate.iconUrl && <img src={currentUpdate.iconUrl} alt={t(currentUpdate.titleKey) || currentUpdate.originalTitle} className="w-8 h-8" />}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[var(--text-primary)]">{t(currentUpdate.titleKey)}</h3>
                <p className="text-[var(--text-secondary)]">{t(currentUpdate.dateKey)}</p>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] mb-6">{t(currentUpdate.descriptionKey)}</p>
            <div className="flex space-x-4">
              <button className="px-6 py-3 bg-[var(--accent-primary)] text-[var(--primary)] rounded-lg hover:bg-[var(--accent-hover)] transition-colors">
                {t('updates.slider.learnMore')}
              </button>
              <button className="px-6 py-3 border border-[var(--border)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--tertiary)] transition-colors">
                {t('updates.slider.viewDetails')}
              </button>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center items-center">
            {currentUpdate.imageUrl && <img src={currentUpdate.imageUrl} alt={t(currentUpdate.titleKey) || currentUpdate.originalTitle} className="rounded-lg shadow-md max-h-64 object-cover" />}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {updates.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-[var(--accent-primary)]' : 'bg-[var(--text-secondary)] opacity-50'
            }`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="Previous slide"
      >
        <SvgIcon iconName="arrowLeft" title="Previous" className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="Next slide"
      >
        <SvgIcon iconName="arrowRight" title="Next" className="w-6 h-6" />
      </button>

      {/* Autoplay Toggle */}
      <button
        onClick={() => setIsAutoPlay(!isAutoPlay)}
        className="absolute top-4 left-4 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label={isAutoPlay ? t('updates.slider.pauseAutoplay') : t('updates.slider.playAutoplay')}
      >
        {isAutoPlay ? <SvgIcon iconName="pause" title="Pause Autoplay" className="w-6 h-6" /> : <SvgIcon iconName="play" title="Play Autoplay" className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default UpdateSlider;