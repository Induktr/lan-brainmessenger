"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';

interface ErrorMessageContext {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageContext> = ({ message }) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="error-message-container"
    >
      <FiAlertCircle />
      {message}
    </motion.div>
  );
};

export default ErrorMessage;