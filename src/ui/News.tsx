'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import NewsCard from './NewsCard'; // Corrected path
import { updates } from '../data/updates'; // Corrected path
import Link from 'next/link'; // Corrected import
import { useTranslation } from 'react-i18next'; // Import useTranslation
import SvgIcon from './SvgIcon'; // Corrected path

interface UpdateItem {
  iconUrl: string;
  titleKey: string;
  descriptionKey: string;
  dateKey: string;
  originalTitle?: string;
}

const News: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const {} = useAnimation();

  const { t } = useTranslation(); // Use the useTranslation hook

  // Take only the first 5 updates for the carousel
  const carouselUpdates: UpdateItem[] = updates.slice(0, 5); // Apply UpdateItem interface

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % carouselUpdates.length);
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, carouselUpdates.length]);

  const handleNext = (): void => { // Add type annotation
    if (activeIndex < carouselUpdates.length - 1) {
      setActiveIndex(prev => prev + 1);
      if (isAutoPlay) setIsAutoPlay(false);
    }
  };

  const handlePrev = (): void => { // Add type annotation
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
      if (isAutoPlay) setIsAutoPlay(false);
    }
  };

  const toggleAutoPlay = (): void => { // Add type annotation
    setIsAutoPlay(prev => !prev);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>): void => { // Add type annotation
    e.preventDefault();

    if (wheelTimeoutRef.current) {
      clearTimeout(wheelTimeoutRef.current);
    }

    wheelTimeoutRef.current = setTimeout(() => {
      if (e.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }, 50);
  };

  return (
    <section className="news-section">
      <div className="container">
        <div className="news-header">
          <h2 className="news-title">
            {t('news.latestNews') as string}
          </h2>
          <Link
            href="/updates"
            className="news-read-more-link"
            aria-label={t('news.readMore') as string}
          >
            <span>{t('news.readMore') as string}</span>
            <SvgIcon iconName="arrowRight" title={t('news.readMore') as string} className="svg-icon" />
          </Link>
        </div>

        <div className="news-carousel-container">
          <div className="news-carousel-nav">
            <button
              onClick={handlePrev}
              className="news-carousel-button"
              disabled={activeIndex === 0}
            >
              <SvgIcon iconName="arrowLeft" title="Previous" className="svg-icon" />
            </button>

            <button
              onClick={toggleAutoPlay}
              className="news-carousel-button"
            >
              {isAutoPlay ? <SvgIcon iconName="pause" title="Pause Autoplay" className="svg-icon" /> : <SvgIcon iconName="play" title="Play Autoplay" className="svg-icon" />}
            </button>

            <button
              onClick={handleNext}
              className="news-carousel-button"
              disabled={activeIndex === carouselUpdates.length - 1}
            >
              <SvgIcon iconName="arrowRight" title="Next" className="svg-icon" />
            </button>
          </div>

          <div
            className="news-carousel-track"
            onWheel={handleWheel}
          >
            <div className="news-carousel-item-wrapper">
              {carouselUpdates.map((item, index) => {
                const position = index - activeIndex;
                const isActive = position === 0;

                let xOffset = 0;
                let scale = 1;
                const zIndex = carouselUpdates.length - Math.abs(position);

                if (position < 0) {
                  xOffset = -40 * Math.abs(position);
                  scale = 0.9;
                } else if (position > 0) {
                  xOffset = 40 * position;
                  scale = 0.9;
                }

                return (
                  <motion.div
                    key={index}
                    className="news-carousel-item"
                    style={{
                      x: '-50%',
                      y: '-50%'
                    }}
                    animate={{
                      x: `calc(-50% + ${xOffset}px)`,
                      scale,
                      zIndex,
                      opacity: Math.abs(position) >= 3 ? 0 : 1
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  >
                    <div style={{ width: 'var(--news-card-width)' }}>
                      <NewsCard
                        {...item}
                        isActive={isActive}
                        isMore={index === carouselUpdates.length - 1}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
