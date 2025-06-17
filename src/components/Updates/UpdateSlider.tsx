"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image'; // Import Image component
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
    <div className="update-slider-container">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="update-slider-content"
        >
          <div className="update-slider-text-section">
            <div className="update-slider-header">
              <div className="update-slider-icon-wrapper">
                {currentUpdate.iconUrl && (
                  <Image
                    src={currentUpdate.iconUrl}
                    alt={(t(currentUpdate.titleKey) as string) || currentUpdate.originalTitle as string}
                    width={32} // Specify width
                    height={32} // Specify height
                    className="update-slider-icon"
                  />
                )}
              </div>
              <div>
                <h3 className="update-slider-title">{t(currentUpdate.titleKey) as string}</h3>
                <p className="update-slider-date">{t(currentUpdate.dateKey) as string}</p>
              </div>
            </div>
            <p className="update-slider-description">{t(currentUpdate.descriptionKey) as string}</p>
            <div className="update-slider-buttons">
              <button className="update-slider-button-primary">
                {t('updates.slider.learnMore') as string}
              </button>
              <button className="update-slider-button-secondary">
                {t('updates.slider.viewDetails') as string}
              </button>
            </div>
          </div>
          <div className="update-slider-image-section">
            {currentUpdate.imageUrl && (
              <Image
                src={currentUpdate.imageUrl}
                alt={(t(currentUpdate.titleKey) as string) || currentUpdate.originalTitle as string}
                width={256} // Example width, adjust as needed
                height={144} // Example height, adjust as needed
                className="update-slider-image"
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="update-slider-dots">
        {updates.map((_, index) => (
          <button
            key={index}
            className={`update-slider-dot ${
              currentIndex === index ? 'active' : 'inactive'
            }`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="update-slider-arrow left"
        aria-label="Previous slide"
      >
        <SvgIcon iconName="arrowLeft" title="Previous" className="update-slider-arrow-icon" />
      </button>
      <button
        onClick={handleNext}
        className="update-slider-arrow right"
        aria-label="Next slide"
      >
        <SvgIcon iconName="arrowRight" title="Next" className="update-slider-arrow-icon" />
      </button>

      {/* Autoplay Toggle */}
      <button
        onClick={() => setIsAutoPlay(!isAutoPlay)}
        className="update-slider-autoplay-toggle"
        aria-label={isAutoPlay ? t('updates.slider.pauseAutoplay') as string : t('updates.slider.playAutoplay') as string}
      >
        {isAutoPlay ? <SvgIcon iconName="pause" title="Pause Autoplay" className="update-slider-autoplay-icon" /> : <SvgIcon iconName="play" title="Play Autoplay" className="update-slider-autoplay-icon" />}
      </button>
    </div>
  );
};

export default UpdateSlider;