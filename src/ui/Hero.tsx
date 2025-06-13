'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { heroVariants, calculateParallax } from '../app/lib/animations';
import { useLanguage } from '../app/context/LanguageContext'; // Corrected path
import Image from 'next/image'; // Import Image component
import SvgIcon from './SvgIcon'; // Import SvgIcon

interface HeroProps {} // Define an empty interface for component props

const Hero: React.FC<HeroProps> = () => {
  const [showDownloadMenu, setShowDownloadMenu] = useState<boolean>(false); // Explicitly type boolean
  const [hoveredButton, setHoveredButton] = useState<string | null>(null); // Explicitly type string or null
  const downloadButtonRef = useRef<HTMLDivElement>(null); // Explicitly type the ref element

  const { t } = useLanguage(); // Use the translation hook

  // Motion values for parallax effect
  const rotateX = useMotionValue<number>(0); // Explicitly type number
  const rotateY = useMotionValue<number>(0); // Explicitly type number

  // Removed modifyIconColor as SvgIcon handles color via CSS

  const handleMouseLeave = (): void => { // Add type annotation for return type
    setHoveredButton(null);
    // Reset parallax effect
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.section
      variants={heroVariants.container}
      initial="hidden"
      animate="show"
      className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-24 lg:pb-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            variants={heroVariants.title}
            className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0"
          >
            <motion.h1
              className="text-[var(--color-text-primary)] text-[var(--font-size-h1)] font-bold mb-3 sm:mb-4 md:mb-6"
              variants={heroVariants.title}
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              variants={heroVariants.paragraph}
              className="text-[var(--color-text-secondary)] text-[var(--font-size-md)] mb-5 sm:mb-6 md:mb-8 max-w-[90%] mx-auto lg:mx-0"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              variants={heroVariants.buttons}
              className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            >

              <div className="relative" ref={downloadButtonRef}>
                <motion.button
                  onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                  className="group inline-flex items-center gap-2 w-full bg-[var(--color-surface-dark)] sm:w-auto text-[var(--color-text-primary)] px-6 md:px-8 py-3 rounded-full hover:bg-[var(--color-primary)] hover:text-[var(--color-background-dark)] transition-colors text-[var(--font-size-sm)] sm:text-[var(--font-size-base)] md:text-[var(--font-size-md)]"
                  whileTap={{ scale: 0.95 }}
                >
                  <SvgIcon iconName="download" title="Download" className="w-5 h-5 text-[var(--color-primary)] group-hover:text-[var(--color-background-dark)]" />
                  {t('hero.downloadButton')}
                </motion.button>

                <AnimatePresence>
                  {showDownloadMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[var(--color-surface-dark)] ring-1 ring-black ring-opacity-5"
                      style={{
                        zIndex: 100,
                        position: 'absolute',
                        top: '100%',
                        marginTop: '0.5rem'
                      }}
                    >
                      <div className="py-1" style={{ position: 'relative', backgroundColor: 'var(--color-surface-dark)' }}>
                        <a
                          href="public/files/desktop-app.zip"
                          download
                          className="group flex items-center px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-background-dark)] transition-colors"
                          onClick={() => setShowDownloadMenu(false)}
                        >
                          <SvgIcon iconName="windows" title="Windows" className="w-5 h-5 mr-2 text-[var(--color-primary)] group-hover:text-[var(--color-background-dark)]" />
                          {t('hero.downloadWindows')}
                        </a>
                        <a
                          href="public/files/android-app.apk"
                          download
                          className="group flex items-center px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-background-dark)] transition-colors"
                          onClick={() => setShowDownloadMenu(false)}
                        >
                          <SvgIcon iconName="android" title="Android" className="w-5 h-5 mr-2 text-[var(--color-primary)] group-hover:text-[var(--color-background-dark)]" />
                          {t('hero.downloadAndroid')}
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={heroVariants.image}
            className="lg:w-1/2 mt-8 lg:mt-0"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <div className="relative"> {/* Replaced styles.deviceImage, screenGlow, deviceShadow */}
              <Image
                src="/images/logo.png" // Assuming a local image for the app screenshot
                alt="BrainMessenger App"
                width={600} // Adjust based on actual image dimensions
                height={400} // Adjust based on actual image dimensions
                className="w-full max-w-[90%] md:max-w-2xl mx-auto relative"
                priority // Prioritize loading for LCP
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Removed SVG filter as it's related to old circularDistort effect */}
    </motion.section>
  );
};

export default Hero;