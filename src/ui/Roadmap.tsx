"use client";

import React from 'react';
import { useTheme } from '../app/context/ThemeContext';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import SvgIcon from './SvgIcon';
import { ROADMAP_ICONS } from '@/app/lib/constants';

interface Milestone {
  dateKey: string;
  titleKey: string;
  descriptionKey: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  icon: string;
  featuresKeys: string[];
}

const Roadmap: React.FC = () => {
  const { } = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const { t } = useTranslation(); // Use the useTranslation hook

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const milestones: Milestone[] = [
    {
      dateKey: 'roadmap.date.dec2024',
      titleKey: 'roadmap.title.phase0',
      descriptionKey: 'roadmap.description.phase0',
      status: 'completed',
      icon: ROADMAP_ICONS.landingPage,
      featuresKeys: [
        'roadmap.features.landingPageTextKey',
        'roadmap.features.settingsNavCta',
        'roadmap.features.basicAdaptationCrossBrowse',
        'roadmap.features.basicLoc',
        'roadmap.features.seoAnalytics',
      ]
    },
    {
      dateKey: 'roadmap.date.jun2025',
      titleKey: 'roadmap.title.phase1',
      descriptionKey: 'roadmap.description.phase1',
      status: 'completed',
      icon: ROADMAP_ICONS.devStack,
      featuresKeys: [
        'roadmap.features.tehnoStack',
        'roadmap.features.mvpFunc',
        'roadmap.features.coreMvp'
      ]
    },
    {
      dateKey: 'roadmap.date.jul2025',
      titleKey: 'roadmap.title.phase2',
      descriptionKey: 'roadmap.description.phase2',
      status: 'upcoming',
      icon: ROADMAP_ICONS.bubble,
      featuresKeys: [
        'roadmap.features.authentication',
        'roadmap.features.basicBackenChatLogic',
        'roadmap.features.frontendUiChat',
        'roadmap.features.integrationFrontBack',
        'roadmap.features.basicTesting',
        'roadmap.features.initAndroidProject',
        'roadmap.features.authAndroid',
        'roadmap.features.UiChatAndroid',
      ]
    },
    {
      dateKey: 'roadmap.date.jul2025',
      titleKey: 'roadmap.title.phase3',
      descriptionKey: 'roadmap.description.phase3',
      status: 'upcoming',
      icon: ROADMAP_ICONS.rocket,
      featuresKeys: [
        'roadmap.features.phasePlaningTesting'
      ]
    },
    {
      dateKey: 'roadmap.date.jul2025',
      titleKey: 'roadmap.title.phase4',
      descriptionKey: 'roadmap.description.phase4',
      status: 'upcoming',
      icon: ROADMAP_ICONS.launch,
      featuresKeys: [
        'roadmap.features.phasePlaningLaunch'
      ]
    }
  ];

  const getStatusColor = (status: Milestone['status']): string => {
    switch (status) {
      case 'completed':
        return 'bg-primary';
      case 'in-progress':
        return 'bg-warning';
      default:
        return 'bg-surface-dark';
    }
  };

  const getTranslatedStatus = (status: Milestone['status']): string => {
    switch (status) {
      case 'completed':
        return t('roadmap.status.completed') as string;
      case 'in-progress':
        return t('roadmap.status.inProgress') as string;
      default:
        return t('roadmap.status.upcoming') as string;
    }
  };

  const iconVariants: Variants = {
    hidden: {
      scale: 0,
      opacity: 0,
      rotate: -180,
    },
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        delay: 0.3 + (index * 0.2),
        duration: 0.6,
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    })
  };

  return (
    <div id="roadmap" className="roadmap-section">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        className="container"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 }
            }
          }}
          className="roadmap-header"
        >
          <h2 className="roadmap-title">
            {t('roadmap.title.section') as string}
          </h2>
          <p className="roadmap-subtitle">
            {t('roadmap.subtitle.section') as string}
          </p>
        </motion.div>

        <div className="roadmap-timeline-container">
          <motion.div
            variants={{
              hidden: { scaleY: 0 },
              visible: {
                scaleY: 1,
                transition: {
                  duration: 1,
                  ease: "easeInOut"
                }
              }
            }}
            className="roadmap-timeline-line"
          />

          <div className="roadmap-milestones-wrapper">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.dateKey}
                variants={{
                  hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.2 * index
                    }
                  }
                }}
                className={`roadmap-milestone-item ${
                  index % 2 === 0 ? 'even' : 'odd'
                }`}
              >
                <div className="roadmap-milestone-content-wrapper">
                  <div className={`roadmap-milestone-card ${
                    milestone.status === 'completed' ? 'completed' : ''
                  }`}>
                    <div className="roadmap-milestone-header">
                      <div className="roadmap-milestone-title-group">
                        <motion.div
                          variants={iconVariants}
                          custom={index}
                        >
                          <SvgIcon iconName={milestone.icon} title={t(milestone.titleKey) as string} className="roadmap-milestone-icon" />
                        </motion.div>
                        <h3 className="roadmap-milestone-title">
                          {t(milestone.titleKey) as string}
                        </h3>
                      </div>
                      <span className={`roadmap-milestone-status ${milestone.status}`}>
                        {getTranslatedStatus(milestone.status) as string}
                      </span>
                    </div>
                    <p className="roadmap-milestone-description">
                      {t(milestone.descriptionKey) as string}
                    </p>
                    <ul className="roadmap-milestone-features-list">
                      {milestone.featuresKeys.map((featureKey, idx) => (
                        <motion.li
                          key={idx}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: {
                                opacity: 1,
                                x: 0,
                                transition: {
                                  duration: 0.3,
                                  delay: 0.1 * idx
                                }
                              }
                            }}
                            className="roadmap-milestone-feature-item"
                          >
                            <span className="roadmap-milestone-feature-bullet" />
                            {t(featureKey) as string}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="roadmap-milestone-dot-wrapper">
                    <motion.div
                      variants={{
                        hidden: { scale: 0 },
                        visible: {
                          scale: 1,
                          transition: {
                            duration: 0.4,
                            delay: 0.2 + (0.1 * index)
                          }
                        }
                      }}
                      className="roadmap-milestone-dot"
                    >
                      <div className={`roadmap-milestone-dot-inner ${getStatusColor(milestone.status)}`} />
                      <div className="roadmap-milestone-dot-ping" />
                    </motion.div>
                  </div>

                  <div className="roadmap-milestone-date-wrapper">
                    <motion.span
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            duration: 0.4,
                            delay: 0.3 + (0.1 * index)
                          }
                        }
                      }}
                      className="roadmap-milestone-date"
                    >
                      {t(milestone.dateKey) as string}
                    </motion.span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

export default Roadmap;
