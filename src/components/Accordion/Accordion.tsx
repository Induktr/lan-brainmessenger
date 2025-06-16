import React from 'react';
import AccordionItem from './AccordionItem';

interface FAQQuestion {
  id: string;
  question: string; // Add translated question
  answer: string;   // Add translated answer
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
              question={question.question} // Pass translated question
              answer={question.answer}     // Pass translated answer
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Accordion;
