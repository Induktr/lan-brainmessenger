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
    <div className="accordion-item">
      <button
        className="accordion-header"
        onClick={toggleOpen}
      >
        <span className="accordion-question">{question}</span>
        <SvgIcon
          iconName="arrowRight" // Используем иконку стрелки вправо
          title="Toggle" // Используем title вместо alt для SvgIcon
          className={`accordion-icon ${isOpen ? 'is-open' : ''}`}
        />
      </button>
      <div
        className={`accordion-content ${isOpen ? 'is-open' : ''}`}
      >
        <div className="accordion-answer-inner">
          <p className="accordion-answer-text">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;