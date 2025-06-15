export interface FAQQuestion {
  id: string;
}

export interface FAQCategory {
  categoryKey: string;
  questions: FAQQuestion[];
}

export const faqDataStructure: FAQCategory[] = [
  {
    categoryKey: 'generalProject',
    questions: [
      { id: 'q1' },
      { id: 'q2' },
      { id: 'q3' },
    ],
  },
  {
    categoryKey: 'technicalQuestions',
    questions: [
      { id: 'q1' },
      { id: 'q2' },
      { id: 'q3' },
      { id: 'q4' },
      { id: 'q5' },
      { id: 'q6' },
    ],
  },
  {
    categoryKey: 'statusRoadmapFuture',
    questions: [
      { id: 'q1' },
      { id: 'q2' },
      { id: 'q3' },
    ],
  },
];