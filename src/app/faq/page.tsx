"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiChevronDown } from 'react-icons/fi';
import { useLanguage } from '../../app/context/LanguageContext'; // Corrected path
import { faqDataStructure, FAQCategory } from '../../data/faq'; // Corrected path and imported FAQCategory
import SvgIcon from '../../ui/SvgIcon'; // Corrected path
import ErrorBoundary from '../../components/ErrorBoundary'; // Import the global ErrorBoundary

interface DisplayableFAQQuestion {
  id: string;
  categoryKey: string;
  questionKey: string;
  answerKey: string;
}

const FAQPage = () => { // Renamed to FAQPage for clarity as it's a Next.js page
  const { t, isLoading: languageIsLoading } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const toggleQuestion = (id: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedQuestions(newExpanded);
  };

  const { allQuestions, displayableCategoryKeys } = React.useMemo(() => {
    if (languageIsLoading) {
      return { allQuestions: [], displayableCategoryKeys: [] };
    }

    // Get the list of category keys from our faqDataStructure
    const categoryKeysFromData = faqDataStructure.map((cat: FAQCategory) => cat.categoryKey);
    
    // Filter displayableCategoryKeys: only show categories that have actual translations
    // and are present in faqDataStructure
    const currentFaqCategoriesRaw = t('faq.categories');
    const currentFaqCategories = (typeof currentFaqCategoriesRaw === 'object' && currentFaqCategoriesRaw !== null)
      ? currentFaqCategoriesRaw as Record<string, string>
      : {};

    const computedDisplayableCategoryKeys = categoryKeysFromData.filter((catKey: string) =>
      typeof currentFaqCategories[catKey] === 'string' && currentFaqCategories[catKey].trim() !== ''
    );

    const computedAllQuestions: DisplayableFAQQuestion[] = faqDataStructure.flatMap((category: FAQCategory) => {
      // Only process categories that are displayable (have a translated name)
      if (!computedDisplayableCategoryKeys.includes(category.categoryKey)) {
        return [];
      }
      return category.questions.map((question: { id: string }) => {
        const questionId = question.id; // e.g., "q1"
        return {
          id: `${category.categoryKey}-${questionId}`, // e.g., "generalProject-q1"
          categoryKey: category.categoryKey,
          questionKey: `faq.questionsData.${category.categoryKey}.${questionId}.question`,
          answerKey: `faq.questionsData.${category.categoryKey}.${questionId}.answer`,
        };
      });
    });
    
    return {
      allQuestions: computedAllQuestions,
      displayableCategoryKeys: computedDisplayableCategoryKeys,
    };
  }, [t, languageIsLoading]);

  console.log('languageIsLoading:', languageIsLoading);
  console.log('faq.categories translation:', t('faq.categories'));
  console.log('allQuestions:', allQuestions);

  const filteredQuestions = allQuestions.filter(q => {
    const translatedQuestion = t(q.questionKey) || '';
    const matchesSearch = searchQuery.trim() === '' ||
      translatedQuestion.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategoryKey === 'all' || q.categoryKey === activeCategoryKey;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="faq-page-container">
      <div className="faq-content-wrapper">
        <div className="faq-header-section">
          <Link
            href="/"
            className="faq-back-link"
          >
            <SvgIcon iconName="arrowLeft" title={t('common.backToHome')} className="faq-back-link-icon" />
            {t('common.backToHome')}
          </Link>
          <h1 className="faq-page-title">{t('faq.title')}</h1>
          <p className="faq-page-subtitle">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="faq-search-filter-section">
          <div className="faq-search-input-wrapper">
            <SvgIcon
              iconName="support"
              title={t('faq.searchAlt')}
              className="faq-search-icon"
            />
            <input
              type="text"
              placeholder={t('faq.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="faq-search-input"
            />
          </div>

          <div className="faq-category-buttons">
            <button
              onClick={() => setActiveCategoryKey('all')}
              className={`faq-category-button ${activeCategoryKey === 'all' ? 'active' : 'inactive'}`}
            >
              {t('faq.allQuestions')}
            </button>
            {displayableCategoryKeys.map((catKey: string) => (
              <button
                key={catKey}
                onClick={() => setActiveCategoryKey(catKey)}
                className={`faq-category-button ${activeCategoryKey === catKey ? 'active' : 'inactive'}`}
              >
                {t(`faq.categories.${catKey}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="faq-questions-list">
          <AnimatePresence>
            {filteredQuestions.map((item) => (
              <ErrorBoundary key={item.id}> {/* Using the imported ErrorBoundary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="faq-question-card"
                >
                  <button
                    onClick={() => toggleQuestion(item.id)}
                    className="faq-question-button"
                  >
                    <span className="faq-question-title">
                      {t(item.questionKey)}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedQuestions.has(item.id) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="faq-question-arrow"
                    >
                      <FiChevronDown />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedQuestions.has(item.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="faq-answer-wrapper"
                      >
                        <div className="faq-answer-content">
                          <p className="faq-answer-text">
                            {t(item.answerKey, { defaultValue: t('faq.answerComingSoon') })}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ErrorBoundary>
            ))}
          </AnimatePresence>

          {filteredQuestions.length === 0 && searchQuery.trim() !== '' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="faq-no-results"
            >
              {t('faq.noResults')}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;