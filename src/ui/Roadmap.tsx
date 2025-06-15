"use client";

import React from 'react';
import { useTheme } from '../app/context/ThemeContext';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../app/context/LanguageContext';
import SvgIcon from './SvgIcon';

const ROADMAP_ICONS = {
  projectLaunch: 'rocket',
  security: 'shield',
  advancedcoloboration: 'group',
  mobile: 'mobile',
  authentication: 'checkmark',
  ai: 'brain',
  global: 'globe',
  ecosystem: 'castle',
  future: 'sun'
};

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

  const { t } = useLanguage();

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const milestones: Milestone[] = [
    {
      dateKey: 'roadmap.date.jan2024',
      titleKey: 'roadmap.title.projectLaunch',
      descriptionKey: 'roadmap.description.projectLaunch',
      status: 'completed',
      icon: ROADMAP_ICONS.projectLaunch,
      featuresKeys: [
        'roadmap.features.secureMessagingInfrastructure',
        'roadmap.features.crossPlatformCompatibility',
        'roadmap.features.basicUserInterface'
      ]
    },
    {
      dateKey: 'roadmap.date.mar2024',
      titleKey: 'roadmap.title.enhancedSecurity',
      descriptionKey: 'roadmap.description.enhancedSecurity',
      status: 'upcoming',
      icon: ROADMAP_ICONS.security,
      featuresKeys: [
        'roadmap.features.endToEndEncryption',
        'roadmap.features.twoFactorAuthentication',
        'roadmap.features.fileSharingCapabilities'
      ]
    },
    {
      dateKey: 'roadmap.date.jun2024',
      titleKey: 'roadmap.title.advancedCollaboration',
      descriptionKey: 'roadmap.description.advancedCollaboration',
      status: 'upcoming',
      icon: ROADMAP_ICONS.advancedcoloboration,
      featuresKeys: [
        'roadmap.features.teamWorkspaces',
        'roadmap.features.realTimeCollaboration',
        'roadmap.features.advancedFileSharing'
      ]
    },
    {
      dateKey: 'roadmap.date.sep2024',
      titleKey: 'roadmap.title.aiIntegration',
      descriptionKey: 'roadmap.description.aiIntegration',
      status: 'upcoming',
      icon: ROADMAP_ICONS.ai,
      featuresKeys: [
        'roadmap.features.smartMessageCategorization',
        'roadmap.features.automatedResponses',
        'roadmap.features.contentAnalysis'
      ]
    },
    {
      dateKey: 'roadmap.date.nov2024',
      titleKey: 'roadmap.title.mobileEnhancement',
      descriptionKey: 'roadmap.description.mobileEnhancement',
      status: 'upcoming',
      icon: ROADMAP_ICONS.mobile,
      featuresKeys: [
        'roadmap.features.nativeMobileApps',
        'roadmap.features.offlineFunctionality',
        'roadmap.features.pushNotifications'
      ]
    },
    {
      dateKey: 'roadmap.date.jan2025',
      titleKey: 'roadmap.title.aiIntegration',
      descriptionKey: 'roadmap.description.aiIntegration',
      status: 'upcoming',
      icon: ROADMAP_ICONS.ai,
      featuresKeys: [
        'roadmap.features.smartMessageCategorization',
        'roadmap.features.automatedResponses',
        'roadmap.features.contentAnalysis'
      ]
    },
    {
      dateKey: 'roadmap.date.mar2025',
      titleKey: 'roadmap.title.globalExpansion',
      descriptionKey: 'roadmap.description.globalExpansion',
      status: 'upcoming',
      icon: ROADMAP_ICONS.global,
      featuresKeys: [
        'roadmap.features.multiLanguageSupport',
        'roadmap.features.regionalDataCenters',
        'roadmap.features.culturalAdaptations'
      ]
    },
    {
      dateKey: 'roadmap.date.jun2025',
      titleKey: 'roadmap.title.enterpriseSolutions',
      descriptionKey: 'roadmap.description.enterpriseSolutions',
      status: 'upcoming',
      icon: ROADMAP_ICONS.ecosystem,
      featuresKeys: [
        'roadmap.features.advancedAdminControls',
        'roadmap.features.customIntegrations',
        'roadmap.features.enterpriseSupport'
      ]
    },
    {
      dateKey: 'roadmap.date.beyond2025',
      titleKey: 'roadmap.title.futureInnovation',
      descriptionKey: 'roadmap.description.futureInnovation',
      status: 'upcoming',
      icon: ROADMAP_ICONS.future,
      featuresKeys: [
        'roadmap.features.emergingTechnologies',
        'roadmap.features.communityDrivenFeatures',
        'roadmap.features.platformExpansion'
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
        return t('roadmap.status.completed');
      case 'in-progress':
        return t('roadmap.status.inProgress');
      default:
        return t('roadmap.status.upcoming');
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
            {t('roadmap.title.section')}
          </h2>
          <p className="roadmap-subtitle">
            {t('roadmap.subtitle.section')}
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
                          <SvgIcon iconName={milestone.icon} title={t(milestone.titleKey)} className="roadmap-milestone-icon" />
                        </motion.div>
                        <h3 className="roadmap-milestone-title">
                          {t(milestone.titleKey)}
                        </h3>
                      </div>
                      <span className={`roadmap-milestone-status ${milestone.status}`}>
                        {getTranslatedStatus(milestone.status)}
                      </span>
                    </div>
                    <p className="roadmap-milestone-description">
                      {t(milestone.descriptionKey)}
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
                            {t(featureKey)}
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
                      {t(milestone.dateKey)}
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
