import React from 'react';
import Accordion from '@/components/Accordion/Accordion';
import { faqData } from '@/data/faqData';
import Container from '@/components/Container'; // Предполагаем, что Container используется для центрирования контента

const FAQPage: React.FC = () => {
  return (
    <Container className="faq-page-container">
      <header className="faq-header-section">
        <h1 className="faq-page-title">
        </h1>
        <p className="faq-page-subtitle">
        </p>
      </header>
      <div className="faq-accordion-wrapper">
        <Accordion items={faqData} />
      </div>
    </Container>
  );
};

export default FAQPage;