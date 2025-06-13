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
  const { isDark } = useTheme();
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
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: isActive 
          ? `rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`
          : 'none',
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Card glow effect */}
      <motion.div
        className="absolute -inset-2 rounded-2xl opacity-0"
        animate={{
          opacity: isActive ? 0.15 : 0,
          scale: isActive ? 1.05 : 1
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at center, var(--color-primary), transparent 70%)`,
          filter: 'blur(15px)',
          zIndex: -1
        }}
      />

      {/* Main card content */}
      <motion.div
        className={`relative backdrop-blur-sm rounded-xl p-6 
          ${isMore 
            ? 'bg-[var(--color-primary)] text-[var(--color-background-dark)] hover:bg-[var(--color-primary)]' 
            : 'bg-[var(--color-surface-dark)] border border-[var(--color-border)]'} 
          transition-colors cursor-pointer group`}
        whileHover={{ scale: isActive ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-start gap-4">
          <div className={`text-2xl ${isMore ? 'text-[var(--color-background-dark)]' : 'text-[var(--color-primary)]'}`}>
            {iconUrl && (
              <Image
                src={iconUrl}
                alt={t(titleKey) || originalTitle || ''}
                width={32}
                height={32}
                className="object-contain"
              />
            )}
          </div>
          <div className="flex-1">
            <h3 className={`font-semibold mb-2 ${isMore ? 'text-[var(--color-background-dark)]' : 'text-[var(--color-text-primary)]'}`}>
              {t(titleKey)}
            </h3>
            <p className={isMore ? 'text-[var(--color-background-dark)]' : 'text-[var(--color-text-secondary)]'}>
              {t(descriptionKey)}
            </p>
          </div>
          {isMore && (
            <motion.div
              className="text-[var(--color-background-dark)] text-xl"
              initial={{ x: 0 }}
              animate={{ x: isActive ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <SvgIcon iconName="arrowRight" title="Read More" className="w-6 h-6" />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NewsCard;
