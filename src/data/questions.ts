import type { QuizQuestion } from '../types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    type: 'multiple-choice',
    question: 'What best describes you or your organization?',
    options: [
      'MGA',
      'Carrier',
      'Agent/Broker',
      'Technology Provider',
      'Other'
    ],
    required: true
  },
  {
    id: '2',
    type: 'multiple-choice',
    question: 'Do you specialize in any particular insurance lines?',
    options: [
      'Yes',
      'No'
    ],
    required: true
  },
  {
    id: '3',
    type: 'multiple-choice',
    question: 'What is your primary line of business?',
    options: [
      'Commercial General Liability and/or Property',
      'Personal Property & Casualty',
      'E&O/D&O',
      'Health/Life',
      'Workers Compensation',
      'Specialty Lines',
      'Other Lines'
    ],
    required: true
  },
  {
    id: '4',
    type: 'multiple-choice',
    question: 'How many documents does your company or team process on average each month?',
    options: [
      '10,000+',
      '5,000-10,000',
      '2,500-5,000',
      '1,000-2,500',
      '500-1,000',
      '100-500',
      'Less than 100'
    ],
    required: true
  },
  {
    id: '5',
    type: 'multiple-choice',
    question: 'How would you describe your company or team’s current document quality?',
    options: [
      'Standardized and high quality',
      'Standardized but variable quality',
      'Mix of standardized and unstandardized documents',
      'Incomplete, inconsistent, or containing handwritten notes'
    ],
    required: true
  },
  {
    id: '6',
    type: 'multiple-choice',
    question: 'What is your current document workflow?',
    options: [
      'Fully automated',
      'Partially automated, with exceptions for specific tasks',
      'Manual with some digital tools (e.g. email, shared drives)',
      'Manual with minimal digital tools',
      'Entirely manual (e.g. paper-based)'
    ],
    required: true
  },
  {
    id: '7',
    type: 'multiple-choice',
    question: 'What capabilities best describe your current systems ability to connect with new software?',
    options: [
      'Systems have APIs and can easily integrate with new software',
      'Systems require support from IT to integrate with new software',
      'Systems are legacy and difficult to integrate with new software',
      'Systems are legacy and no IT support is available',
      'Unsure'
    ],
    required: true
  },
  {
    id: '8',
    type: 'box-select',
    question: 'What are the significant operational challenge(s) your company or team is facing today?',
    options: [
      'Slow turnaround times',
      'High error rates from manual data entry',
      'Struggling to handle high volumes of documents',
      'Skilled staff such as underwriters are spending too much time on clerical tasks',
      'Reports and insights are hard to generate'
    ],
    required: false
  }
];