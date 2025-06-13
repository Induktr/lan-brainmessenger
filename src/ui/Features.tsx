"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FeatureCard from './FeatureCard';
import { useLanguage } from '../app/context/LanguageContext';
import SvgIcon from './SvgIcon';

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

interface FeaturesProps {}

const Features: React.FC<FeaturesProps> = () => {
  const { t } = useLanguage();
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
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-[var(--font-size-h2)] text-[var(--color-text-primary)] font-bold mb-4">
            {t('features.featuresTitle')}
          </h2>
          <p className="text-[var(--font-size-base)] text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            {t('features.featuresSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.iconName}
              title={t(feature.titleKey)}
              description={t(feature.descriptionKey)}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;