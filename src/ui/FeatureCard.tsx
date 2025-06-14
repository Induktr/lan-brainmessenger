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
      className="feature-card"
    >
      <div className="feature-card-icon">
        <SvgIcon iconName={icon} title={title} />
      </div>
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-description">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;