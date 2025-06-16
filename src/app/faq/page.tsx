import React from 'react';
import Accordion from '@/components/Accordion/Accordion';
import { faqData } from '@/data/faqData';
import Container from '@/components/Container'; // Предполагаем, что Container используется для центрирования контента

const FAQPage: React.FC = () => {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Часто задаваемые вопросы
        </h1>
        <p className="mt-6 text-base text-gray-700 dark:text-gray-300">
          Здесь вы найдете ответы на наиболее часто задаваемые вопросы о BrainMessenger.
        </p>
      </header>
      <div className="mt-10">
        <Accordion items={faqData} />
      </div>
    </Container>
  );
};

export default FAQPage;