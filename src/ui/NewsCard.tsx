"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../app/context/ThemeContext';
import { useLanguage } from '../app/context/LanguageContext';
import Image from 'next/image';
import SvgIcon from './SvgIcon';

interface NewsCardProps {
  titleKey: string;
  descriptionKey: string;
  originalTitle?: string;
  iconUrl?: string;
  isMore?: boolean;
  isActive?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ titleKey, descriptionKey, originalTitle, iconUrl, isMore = false, isActive = false }) => {
  const { } = useTheme();
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = (): void => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className="news-card-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isActive
          ? `rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`
          : 'none',
      }}
    >
      {/* Card glow effect */}
      <motion.div
        className="news-card-glow"
        animate={{
          opacity: isActive ? 0.15 : 0,
          scale: isActive ? 1.05 : 1
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main card content */}
      <motion.div
        className={`news-card-content ${isMore ? 'more' : 'default'}`}
        whileHover={{ scale: isActive ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="news-card-header">
          <div className={`news-card-icon-wrapper ${isMore ? 'more' : 'default'}`}>
            {iconUrl && (
              <Image
                width={24}
                height={24}
                src={iconUrl}
                alt={t(titleKey) as string || originalTitle || ''}
                className="news-card-image news-card-image-icon"
              />
            )}
          </div>
          <div className="news-card-text-content">
            <h3 className={`news-card-title ${isMore ? 'more' : 'default'}`}>
              {t(titleKey) as string}
            </h3>
            <p className={`news-card-description ${isMore ? 'more' : 'default'}`}>
              {t(descriptionKey) as string}
            </p>
          </div>
          {isMore && (
            <motion.div
              className="news-card-arrow"
              initial={{ x: 0 }}
              animate={{ x: isActive ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <SvgIcon iconName="arrowRight" title="Read More" className="svg-icon" />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NewsCard;
