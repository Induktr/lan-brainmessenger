import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import NewsCard from '../News/NewsCard';
import { updates } from '../../data/updates';
import { Link } from 'react-router-dom';
import { ICONS } from '../Icons/constants';
import { useLanguage } from '../../context/LanguageContext'; // Import useLanguage
import SvgIcon from '../ui/SvgIcon'; // Import SvgIcon

interface NewsProps {} // Define an empty interface for component props

interface UpdateItem {
  iconUrl: string;
  titleKey: string;
  descriptionKey: string;
  dateKey: string;
  originalTitle?: string;
}

const News: React.FC<NewsProps> = () => {
  const [activeIndex, setActiveIndex] = useState<number>(1); // Explicitly type number
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true); // Explicitly type boolean
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null); // Explicitly type interval ID or null
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Explicitly type timeout ID or null
  const controls = useAnimation(); // Type inferred by framer-motion

  const { t } = useLanguage(); // Use the translation hook

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
    <section className="py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-4 mb-12">
          <h2 className="text-[24px] text-[var(--text-primary)] font-bold text-center">
            {t('news.latestNews')} {/* Use translation key */}
          </h2>
          <Link
            to="/updates"
            className="group flex items-center gap-2 text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors"
            aria-label={t('news.readMore')} // Use translation key for aria-label
          >
            <span>{t('news.readMore')}</span> {/* Use translation key */}
            <SvgIcon iconName="arrowRight" title={t('news.readMore')} className="w-5 h-5" />
          </Link>
        </div>

        <div className="relative h-[350px]">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-60px] flex items-center gap-4 z-10 mb-10">
            <button
              onClick={handlePrev}
              className={`w-10 h-10 rounded-full flex items-center justify-center bg-[var(--secondary)] transition-colors
                ${activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#3a3a3a]'}`}
              disabled={activeIndex === 0}
            >
              <SvgIcon iconName="arrowLeft" title="Previous" className="w-5 h-5" />
            </button>

            <button
              onClick={toggleAutoPlay}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--secondary)] hover:bg-[#3a3a3a] transition-colors"
            >
              {isAutoPlay ? <SvgIcon iconName="pause" title="Pause Autoplay" className="w-5 h-5" /> : <SvgIcon iconName="play" title="Play Autoplay" className="w-5 h-5" />}
            </button>

            <button
              onClick={handleNext}
              className={`w-10 h-10 rounded-full flex items-center justify-center bg-[var(--secondary)] transition-colors
                ${activeIndex === carouselUpdates.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#3a3a3a]'}`}
              disabled={activeIndex === carouselUpdates.length - 1}
            >
              <SvgIcon iconName="arrowRight" title="Next" className="w-5 h-5" />
            </button>
          </div>

          <div
            className="absolute inset-0 flex items-center justify-center"
            onWheel={handleWheel}
          >
            <div className="relative" style={{ width: '800px' }}>
              {carouselUpdates.map((item, index) => {
                const position = index - activeIndex;
                const isActive = position === 0;

                let xOffset = 0;
                let scale = 1;
                let zIndex = carouselUpdates.length - Math.abs(position);

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
                    className="absolute left-1/2 top-1/2"
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
                    <div style={{ width: '350px' }}>
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