import React from 'react';
import AccordionItem from './AccordionItem';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: FAQItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div className="accordion-container">
      {items.map((item) => (
        <AccordionItem key={item.id} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default Accordion;