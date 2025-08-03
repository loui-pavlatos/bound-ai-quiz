import type { QuizQuestion } from '../types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    type: 'multiple-choice',
    question: 'What industry is your business in?',
    options: [
      'Technology',
      'Healthcare',
      'Finance',
      'Manufacturing',
      'Retail',
      'Education',
      'Other'
    ],
    required: true
  },
  {
    id: '2',
    type: 'multiple-choice',
    question: 'How many employees does your company have?',
    options: [
      '1-10',
      '11-50',
      '51-200',
      '201-500',
      '500+'
    ],
    required: true
  },
  {
    id: '3',
    type: 'box-select',
    question: 'Which business processes do you currently handle manually? (Select all that apply)',
    options: [
      'Customer service inquiries',
      'Data entry and processing',
      'Inventory management',
      'Financial reporting',
      'Marketing campaigns',
      'HR processes',
      'Quality control',
      'Project management'
    ],
    required: true
  },
  {
    id: '4',
    type: 'multiple-choice',
    question: 'How much time per week does your team spend on repetitive tasks?',
    options: [
      'Less than 5 hours',
      '5-15 hours',
      '16-30 hours',
      '31-40 hours',
      'More than 40 hours'
    ],
    required: true
  },
  {
    id: '5',
    type: 'multiple-choice',
    question: 'What is your primary goal for automation?',
    options: [
      'Reduce operational costs',
      'Improve efficiency',
      'Enhance customer experience',
      'Scale business operations',
      'Reduce human error',
      'Free up time for strategic work'
    ],
    required: true
  },
  {
    id: '6',
    type: 'free-write',
    question: 'Describe your biggest operational challenge that you think automation could help solve:',
    placeholder: 'e.g., We spend too much time manually processing customer orders and managing inventory...',
    required: false
  }
];