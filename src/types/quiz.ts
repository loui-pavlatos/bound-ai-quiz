export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'box-select' | 'free-write';
  question: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export interface QuizAnswer {
  questionId: string;
  answer: string | string[];
}

export interface UserInfo {
  companyName: string;
  email: string;
}

export interface ReportData {
  automationPotential: number;
  timeSavingsPerMonth: number;
  productRecommendations: string[];
  userInfo: UserInfo;
}