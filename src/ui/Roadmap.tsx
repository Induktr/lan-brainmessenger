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

interface RoadmapProps {}

const Roadmap: React.FC<RoadmapProps> = () => {
  const { isDark } = useTheme();
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
        return 'bg-[var(--color-primary)]';
      case 'in-progress':
        return 'bg-[var(--color-warning)]';
      default:
        return 'bg-[var(--color-surface-dark)]';
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
    <div id="roadmap" className="w-full bg-[var(--color-background-dark)] py-24 overflow-hidden">
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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
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
          className="text-center mb-20"
        >
          <h2 className="text-[var(--font-size-h2)] font-bold text-[var(--color-text-primary)] mb-4">
            {t('roadmap.title.section')}
          </h2>
          <p className="text-[var(--color-text-secondary)] text-[var(--font-size-base)]">
            {t('roadmap.subtitle.section')}
          </p>
        </motion.div>

        <div className="relative">
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
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full origin-top bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary)]"
          />

          <div className="relative z-10">
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
                className={`flex items-center mb-20 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="w-5/12">
                  <div className={`p-6 rounded-lg bg-[var(--color-surface-dark)] shadow-xl backdrop-blur-sm bg-opacity-80 transform transition-all duration-300 hover:scale-105 ${
                    milestone.status === 'completed' ? 'border-l-4 border-[var(--color-primary)]' : ''
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          variants={iconVariants}
                          custom={index}
                        >
                          <SvgIcon iconName={milestone.icon} title={t(milestone.titleKey)} className="w-7 h-7 text-[var(--color-primary)]" />
                        </motion.div>
                        <h3 className="text-[var(--font-size-lg)] font-semibold text-[var(--color-text-primary)]">
                          {t(milestone.titleKey)}
                        </h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(milestone.status)} text-[var(--color-background-dark)]`}>
                        {getTranslatedStatus(milestone.status)}
                      </span>
                    </div>
                    <p className="text-[var(--color-text-secondary)] text-[var(--font-size-base)] mb-4">
                      {t(milestone.descriptionKey)}
                    </p>
                    <ul className="space-y-2">
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
                            className="flex items-center gap-2 text-[var(--color-text-secondary)] text-[var(--font-size-sm)]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                            {t(featureKey)}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="w-2/12 flex justify-center">
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
                      className="relative"
                    >
                      <div className={`w-6 h-6 rounded-full ${getStatusColor(milestone.status)} shadow-lg`} />
                      <div className="absolute -inset-2 bg-[var(--color-primary)] rounded-full opacity-20 animate-ping" />
                    </motion.div>
                  </div>

                  <div className="w-5/12 flex justify-center">
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
                      className="text-[var(--color-text-primary)] text-[var(--font-size-base)] font-semibold bg-[var(--color-surface-dark)] px-4 py-2 rounded-full shadow-md"
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
