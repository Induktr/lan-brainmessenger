'use client';

import React, { useState } from 'react';
import SvgIcon from '@/ui/SvgIcon'; // Убедитесь, что путь к SvgIcon правильный

interface AccordionItemProps {
  question: string;
  answer: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item border-b border-gray-200 dark:border-gray-700">
      <button
        className="accordion-header w-full flex justify-between items-center py-4 px-6 text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-gray-100">{question}</span>
        <SvgIcon
          iconName="arrowRight" // Используем иконку стрелки вправо
          title="Toggle" // Используем title вместо alt для SvgIcon
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
        />
      </button>
      <div
        className={`accordion-content overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100 py-4 px-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-700 dark:text-gray-300">{answer}</p>
      </div>
    </div>
  );
};

export default AccordionItem;