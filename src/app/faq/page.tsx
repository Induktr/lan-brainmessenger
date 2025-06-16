'use client';

import React from 'react';
import Accordion from '@/components/Accordion/Accordion';
import { faqData } from '@/data/faqData';
import Container from '@/components/Container';
import { useLanguage } from '@/app/context/LanguageContext'; // Import useLanguage hook

const FAQPage: React.FC = () => {
  const { t } = useLanguage(); // Use the language hook

  // Map faqData to include translated questions and answers
  const translatedFaqData = faqData.map(category => {
    const translatedQuestions = category.questions.map(question => {
      const questionKey = `faq.questionsData.${category.categoryKey}.${question.id}.question`;
      const answerKey = `faq.questionsData.${category.categoryKey}.${question.id}.answer`;
      const translatedQuestion = t(questionKey);
      const translatedAnswer = t(answerKey);

      console.log(`Key: ${questionKey}, Translated: ${translatedQuestion}`);
      console.log(`Key: ${answerKey}, Translated: ${translatedAnswer}`);

      return {
        id: question.id,
        question: translatedQuestion,
        answer: translatedAnswer,
      };
    });
    return {
      ...category,
      questions: translatedQuestions,
    };
  });

  console.log('Translated FAQ Data:', translatedFaqData);

  return (
    <Container className="faq-page-container">
      <header className="faq-header-section">
        <h1 className="faq-page-title">
          {t('faq.title')}
        </h1>
        <p className="faq-page-subtitle">
          {t('faq.subtitle')}
        </p>
      </header>
      <div className="faq-accordion-wrapper">
        <Accordion items={translatedFaqData} />
      </div>
    </Container>
  );
};

export default FAQPage;
