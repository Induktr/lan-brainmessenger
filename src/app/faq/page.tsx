"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiChevronDown } from 'react-icons/fi';
import { useTheme } from '../../app/context/ThemeContext'; // Corrected path
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
  const { isDark } = useTheme(); // Corrected destructuring
  const { t, language, isLoading: languageIsLoading } = useLanguage();
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
  }, [language, t, languageIsLoading]);

  const filteredQuestions = allQuestions.filter(q => {
    const translatedQuestion = t(q.questionKey) || '';
    const matchesSearch = searchQuery.trim() === '' ||
      translatedQuestion.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategoryKey === 'all' || q.categoryKey === activeCategoryKey;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[var(--primary)] text-[var(--text-primary)]">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-8 text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors"
          >
            <SvgIcon iconName="arrowLeft" title={t('common.backToHome')} className="w-5 h-5" />
            {t('common.backToHome')}
          </Link>
          <h1 className="text-4xl font-bold mt-6 mb-4">{t('faq.title')}</h1>
          <p className="text-[var(--text-secondary)]">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <SvgIcon
              iconName="support"
              title={t('faq.searchAlt')}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ filter: 'invert(42%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(92%) contrast(82%)' }}
            />
            <input
              type="text"
              placeholder={t('faq.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--secondary)] border border-[var(--border)]
                text-[var(--text-primary)] placeholder-[var(--text-secondary)]
                focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategoryKey('all')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap
                ${activeCategoryKey === 'all'
                  ? 'bg-[var(--accent-primary)] text-[var(--primary)]'
                  : 'bg-[var(--secondary)] text-[var(--text-primary)] hover:bg-[var(--tertiary)]'
                }`}
            >
              {t('faq.allQuestions')}
            </button>
            {displayableCategoryKeys.map((catKey: string) => (
              <button
                key={catKey}
                onClick={() => setActiveCategoryKey(catKey)}
                className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap
                  ${activeCategoryKey === catKey
                    ? 'bg-[var(--accent-primary)] text-[var(--primary)]'
                    : 'bg-[var(--secondary)] text-[var(--text-primary)] hover:bg-[var(--tertiary)]'
                  }`}
              >
                {t(`faq.categories.${catKey}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredQuestions.map((item) => (
              <ErrorBoundary key={item.id}> {/* Using the imported ErrorBoundary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="rounded-xl bg-[var(--secondary)] border border-[var(--border)] overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(item.id)}
                    className="w-full p-6 flex items-start justify-between gap-4 text-left"
                  >
                    <span className="text-[var(--text-primary)] font-medium">
                      {t(item.questionKey)}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedQuestions.has(item.id) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 text-[var(--text-secondary)]"
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
                        className="px-6 pb-6"
                      >
                        <div className="pt-4 border-t border-[var(--border)]">
                          <p className="text-[var(--text-secondary)]">
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
              className="text-center py-12 text-[var(--text-secondary)]"
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