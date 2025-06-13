"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SvgIcon from './SvgIcon';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-[var(--color-surface-dark)] p-6 rounded-xl transition-shadow"
    >
      <div className="w-8 h-8 text-[var(--color-primary)] mb-4">
        <SvgIcon iconName={icon} title={title} className="w-8 h-8" />
      </div>
      <h3 className="text-[var(--font-size-lg)] text-[var(--color-text-primary)] font-semibold mb-2">{title}</h3>
      <p className="text-[var(--font-size-base)] text-[var(--color-text-secondary)]">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;