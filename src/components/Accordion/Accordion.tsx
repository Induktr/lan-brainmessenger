import React from 'react';
import AccordionItem from './AccordionItem';

interface FAQQuestion {
  id: string;
}

interface FAQCategory {
  categoryKey: string;
  questions: FAQQuestion[];
}

interface AccordionProps {
  items: FAQCategory[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div className="accordion-container">
      {items.map((category) => (
        <React.Fragment key={category.categoryKey}>
          {category.questions.map((question) => (
            <AccordionItem
              key={question.id}
              questionId={question.id}
              categoryKey={category.categoryKey}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Accordion;