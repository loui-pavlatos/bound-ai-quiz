import type { QuizAnswer, UserInfo, ReportData } from '../types/quiz';

export const calculateBoundAIProductApplicability = async (answers: QuizAnswer[]): Promise<number> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  let score = 0;
  
  for (const answer of answers) {
    switch (answer.questionId) {
      case '1':
        if (typeof answer.answer === 'string') {
          const industryScores: { [key: string]: number } = {
            'Technology': 25,
            'Healthcare': 20,
            'Finance': 22,
            'Manufacturing': 18,
            'Retail': 15,
            'Education': 12,
            'Other': 10
          };
          score += industryScores[answer.answer] || 10;
        }
        break;
      
      case '2':
        if (typeof answer.answer === 'string') {
          const sizeScores: { [key: string]: number } = {
            '1-10': 10,
            '11-50': 15,
            '51-200': 20,
            '201-500': 25,
            '500+': 25
          };
          score += sizeScores[answer.answer] || 10;
        }
        break;
      
      case '3':
        if (Array.isArray(answer.answer)) {
          score += Math.min(answer.answer.length * 5, 25);
        }
        break;
      
      case '4':
        if (typeof answer.answer === 'string') {
          const timeScores: { [key: string]: number } = {
            'Less than 5 hours': 5,
            '5-15 hours': 10,
            '16-30 hours': 15,
            '31-40 hours': 20,
            'More than 40 hours': 25
          };
          score += timeScores[answer.answer] || 5;
        }
        break;
      
      case '5':
        score += 10;
        break;
    }
  }
  
  return Math.min(score, 100);
};

export const calculateExpectedTimeSavings = (answers: QuizAnswer[]): number => {
  let baseSavings = 0;
  
  for (const answer of answers) {
    switch (answer.questionId) {
      case '2':
        if (typeof answer.answer === 'string') {
          const sizeSavings: { [key: string]: number } = {
            '1-10': 5,
            '11-50': 15,
            '51-200': 30,
            '201-500': 50,
            '500+': 80
          };
          baseSavings += sizeSavings[answer.answer] || 5;
        }
        break;
      
      case '3':
        if (Array.isArray(answer.answer)) {
          baseSavings += answer.answer.length * 3;
        }
        break;
      
      case '4':
        if (typeof answer.answer === 'string') {
          const timeSavings: { [key: string]: number } = {
            'Less than 5 hours': 2,
            '5-15 hours': 8,
            '16-30 hours': 15,
            '31-40 hours': 25,
            'More than 40 hours': 35
          };
          baseSavings += timeSavings[answer.answer] || 2;
        }
        break;
    }
  }
  
  return baseSavings;
};

export const getProductRecommendations = (answers: QuizAnswer[], automationScore: number): string[] => {
  const recommendations: string[] = [];
  
  if (automationScore >= 80) {
    recommendations.push(
      'Bound AI Enterprise Suite - Comprehensive automation platform for large-scale operations',
      'Bound AI Process Intelligence - Advanced analytics and process optimization',
      'Bound AI Custom Integration - Tailored solutions for complex business workflows'
    );
  } else if (automationScore >= 60) {
    recommendations.push(
      'Bound AI Business Automation - Mid-tier solution for growing businesses',
      'Bound AI Smart Analytics - Data-driven insights and reporting automation',
      'Bound AI Workflow Builder - Visual automation designer for common processes'
    );
  } else if (automationScore >= 40) {
    recommendations.push(
      'Bound AI Starter Pack - Entry-level automation for small businesses',
      'Bound AI Task Automation - Simple, rule-based task automation',
      'Bound AI Data Connector - Automated data synchronization between systems'
    );
  } else {
    recommendations.push(
      'Bound AI Consultation - Strategic automation planning and roadmap development',
      'Bound AI Process Assessment - Detailed analysis of automation opportunities',
      'Bound AI Training Program - Team education on automation best practices'
    );
  }
  
  const processesAnswer = answers.find(a => a.questionId === '3');
  if (Array.isArray(processesAnswer?.answer)) {
    if (processesAnswer.answer.includes('Customer service inquiries')) {
      recommendations.push('Bound AI Customer Service Bot - Automated customer support solution');
    }
    if (processesAnswer.answer.includes('Financial reporting')) {
      recommendations.push('Bound AI Financial Automation - Automated reporting and compliance tools');
    }
    if (processesAnswer.answer.includes('HR processes')) {
      recommendations.push('Bound AI HR Assistant - Streamlined HR workflow automation');
    }
  }
  
  return recommendations.slice(0, 4);
};

export const generateReport = async (answers: QuizAnswer[], userInfo: UserInfo): Promise<ReportData> => {
  const automationPotential = await calculateBoundAIProductApplicability(answers);
  const timeSavingsPerMonth = calculateExpectedTimeSavings(answers);
  const productRecommendations = getProductRecommendations(answers, automationPotential);
  
  return {
    automationPotential,
    timeSavingsPerMonth,
    productRecommendations,
    userInfo
  };
};