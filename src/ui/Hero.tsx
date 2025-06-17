'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroVariants } from '../app/lib/animations';
import { useLanguage } from '../app/context/LanguageContext'; // Corrected path
import Image from 'next/image'; // Import Image component
import SvgIcon from './SvgIcon'; // Import SvgIcon
import Link from 'next/link';
import { LINKS } from '../app/lib/constants';

const Hero: React.FC = () => {
  const [showDownloadMenu, setShowDownloadMenu] = useState<boolean>(false);
  // const [hoveredButton, setHoveredButton] = useState<string | null>(null); // Removed as unused
  const downloadButtonRef = useRef<HTMLDivElement>(null);

  const { t } = useLanguage();

  // Motion values for parallax effect

  // Removed modifyIconColor as SvgIcon handles color via CSS

  // const handleMouseLeave = (): void => { // Removed as unused
  //   setHoveredButton(null);
  //   // Reset parallax effect
  //   rotateX.set(0);
  //   rotateY.set(0);
  // };

  return (
    <motion.section
      variants={heroVariants.container}
      initial="hidden"
      animate="show"
      className="hero-section"
    >
      <div className="container">
        <div className="hero-content">
          <motion.div
            variants={heroVariants.title}
            className="hero-text-section"
          >
            <motion.h1
              className="hero-title"
              variants={heroVariants.title}
            >
              {t('hero.title') as string}
            </motion.h1>

            <motion.p
              variants={heroVariants.paragraph}
              className="hero-subtitle"
            >
              {t('hero.subtitle') as string}
            </motion.p>

            <motion.div
              variants={heroVariants.buttons}
              className="hero-buttons"
            >

              <div className="" ref={downloadButtonRef}>
                <motion.button
                  onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                  className="hero-download-button"
                  whileTap={{ scale: 0.95 }}
                >
                  <SvgIcon iconName="download" title="Download" className="svg-icon" />
                  {t('hero.downloadButton') as string}
                </motion.button>

                <AnimatePresence>
                  {showDownloadMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="hero-download-menu"
                    >
                      <div className="hero-download-menu-container">
                        <Link
                          href={LINKS.downloadAndroidApp}
                          download
                          className="hero-download-menu-item"
                          onClick={() => setShowDownloadMenu(false)}
                        >
                          <SvgIcon iconName="android" title="Android" className="svg-icon" />
                          {t('hero.downloadAndroid') as string}
                        </Link>
                      </div>
                    </motion.div>
                  )}
                   {showDownloadMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="hero-routing"
                    >
                      <div className="hero-routing-container">
                        <Link
                          href={LINKS.webApp}
                          download
                          className="hero-routing-item"
                          onClick={() => setShowDownloadMenu(false)}
                        >
                          <SvgIcon iconName="globe" title="Web" className="svg-icon" />
                          {t('hero.routingWebApp') as string}
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={heroVariants.image}
            className="hero-image-section"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="hero-image">
              <Image
                src="/images/logo.png" // Assuming a local image for the app screenshot
                alt="BrainMessenger App"
                width={600} // Adjust based on actual image dimensions
                height={400} // Adjust based on actual image dimensions
                className="hero-image-inner"
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