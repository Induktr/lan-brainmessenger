'use client';

import React, { useState } from 'react';
import SvgIcon from '@/ui/SvgIcon'; // Убедитесь, что путь к SvgIcon правильный

interface AccordionItemProps {
  questionId: string;
  categoryKey: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ questionId, categoryKey }) => {
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
        <span className="accordion-question">{questionId}</span>
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
          <p className="accordion-answer-text">{categoryKey}</p>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;