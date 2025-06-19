'use client';

import React, { useState } from 'react';
import Accordion from '@/components/Accordion/Accordion';
import { faqData } from '@/data/faqData';
import Container from '@/components/Container';
import { useLanguage } from '@/app/context/LanguageContext'; // Import useLanguage hook
import Input from '@/components/Input'; // Import Input component
import SvgIcon from '@/ui/SvgIcon'; // Import SvgIcon component

const FAQPage: React.FC = () => {
  const { t } = useLanguage(); // Use the language hook

  // Map faqData to include translated questions and answers
  const translatedFaqData = faqData.map(category => {
    const translatedQuestions = category.questions.map(question => {
      const questionKey = `faq.questionsData.${category.categoryKey}.${question.id}.question`;
      const answerKey = `faq.questionsData.${category.categoryKey}.${question.id}.answer`;
      const translatedQuestion = t(questionKey) as string;
      const translatedAnswer = t(answerKey) as string;

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

  // Add state for search term and selected category
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filtering logic
  const filteredFaqData = translatedFaqData
    .map(category => {
      // Filter questions within each category based on search term
      const filteredQuestions = category.questions.filter(question => {
        if (!searchTerm) return true; // If no search term, include all questions
        const lowerSearchTerm = searchTerm.toLowerCase();
        return (
          question.question.toLowerCase().includes(lowerSearchTerm) ||
          question.answer.toLowerCase().includes(lowerSearchTerm)
        );
      });

      // Only include categories that have questions matching the search term
      // or if no search term is active
      if (filteredQuestions.length > 0 || !searchTerm) {
        return {
          ...category,
          questions: filteredQuestions,
        };
      }
      return null; // Exclude category if no questions match search term
    })
    .filter(category => category !== null); // Remove null categories

  // Further filter by selected category if one is chosen
  const finalFaqData = selectedCategory
    ? filteredFaqData.filter(category => category.categoryKey === selectedCategory)
    : filteredFaqData;


  return (
    <Container className="faq-page-container">
      <header className="faq-header-section">
        <h1 className="faq-page-title">
          {t('faq.title') as string}
        </h1>
        <p className="faq-page-subtitle">
          {t('faq.subtitle') as string}
        </p>
        <div className="faq-search-input-centered">
          <Input
            placeholder={t('faq.searchPlaceholder') as string}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<SvgIcon iconName="search" className="faq-search-icon" />} // Add search icon
          >
          </Input>
        </div>


        {/* Category buttons */}
        <div className="faq-category-buttons">
          <button
            className={`faq-category-button ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            {t('faq.allQuestions') as string} {/* Assuming you have a translation key for "All Questions" */}
          </button>
          {faqData.map(category => (
            <button
              key={category.categoryKey}
              className={`faq-category-button ${selectedCategory === category.categoryKey ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.categoryKey)}
            >
              {t(`faq.categories.${category.categoryKey}`) as string} {/* Assuming translation keys for categories */}
            </button>
          ))}
        </div>

      </header>
      <div className="faq-accordion-wrapper">
        {finalFaqData.length > 0 ? (
          <Accordion items={finalFaqData} />
        ) : (
          <div className="faq-no-results">
            {t('faq.noResults') as string} {/* Assuming translation key for "Not found questions" */}
          </div>
        )}
      </div>
    </Container>
  );
};

export default FAQPage;