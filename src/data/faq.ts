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
    categoryKey: 'technicalAspects',
    questions: [
      { id: 'q1' },
      { id: 'q2' },
    ],
  },
  {
    categoryKey: 'futureDevelopment',
    questions: [
      { id: 'q1' },
      { id: 'q2' },
      { id: 'q3' },
    ],
  },
];