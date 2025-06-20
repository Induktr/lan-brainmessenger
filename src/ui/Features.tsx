"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FeatureCard from './FeatureCard';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const FEATURES_ICONS = {
  lock: 'lock',
  group: 'group',
  energy: 'increase',
  privacy: 'shield',
  crossplatform: 'globe',
};

interface FeatureItem {
  iconName: string;
  altKey: string;
  titleKey: string;
  descriptionKey: string;
}

const Features: React.FC = () => {
  const { t } = useTranslation(); // Use the useTranslation hook
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const featuresData: FeatureItem[] = [
    {
      iconName: FEATURES_ICONS.lock,
      altKey: 'features.secureMessaging',
      titleKey: 'features.secureMessaging',
      descriptionKey: 'features.secureMessagingDesc'
    },
    {
      iconName: FEATURES_ICONS.energy,
      altKey: 'features.smartAssistant',
      titleKey: 'features.smartAssistant',
      descriptionKey: 'features.smartAssistantDesc'
    },
    {
      iconName: FEATURES_ICONS.group,
      altKey: 'features.groupChats',
      titleKey: 'features.groupChats',
      descriptionKey: 'features.groupChatsDesc'
    },
    {
      iconName: FEATURES_ICONS.crossplatform,
      altKey: 'features.crossPlatform',
      titleKey: 'features.crossPlatform',
      descriptionKey: 'features.crossPlatformDesc'
    },
    {
      iconName: FEATURES_ICONS.privacy,
      altKey: 'features.privacyFirst',
      titleKey: 'features.privacyFirst',
      descriptionKey: 'features.privacyFirstDesc'
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="features-header"
        >
          <h2 className="features-title">
            {t('features.featuresTitle') as string}
          </h2>
          <p className="features-subtitle">
            {t('features.featuresSubtitle') as string}
          </p>
        </motion.div>

        <div className="features-grid">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.iconName}
              title={t(feature.titleKey) as string}
              description={t(feature.descriptionKey) as string}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
