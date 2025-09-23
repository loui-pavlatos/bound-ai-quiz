import { base } from 'framer-motion/client';
import type { QuizAnswer, UserInfo, ReportData } from '../types/quiz';

export const calculateBoundAIProductApplicability = async (answers: QuizAnswer[]): Promise<number> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  let score = 0;
  
  for (const answer of answers) {
    switch (answer.questionId) {
      case '1':
        if (typeof answer.answer === 'string') {
          const industryScores: { [key: string]: number } = {
            'MGA': 19,
            'Carrier': 20,
            'Agent/Broker': 14,
            'Technology Provider': 20,
            'Other': 9
          };
          score += industryScores[answer.answer] || 0;
        } break;
      
      case '2':
        if (typeof answer.answer === 'string') {
          const yesnoScores: { [key: string]: number } = {
            'Yes': 5,
            'No': 0
          };
          score += yesnoScores[answer.answer] || 0;
        } break;
      
      case '3':
        if (typeof answer.answer === 'string') {
          const lobScores: { [key: string]: number } = {
            'Commercial General Liability and/or Property': 19,
            'Personal Property & Casualty': 19,
            'E&O/D&O': 19,
            'Health/Life': 14,
            'Workers Compensation': 14,
            'Specialty Lines': 10,
            'Other Lines': 10
          };
          score += lobScores[answer.answer] || 0;
        } break;
      
      case '4':
        if (typeof answer.answer === 'string') {
          const documentScores: { [key: string]: number } = {
            '10,000+': 10,
            '5,000-10,000': 10,
            '2,500-5,000': 7,
            '1,000-2,500': 5,
            '500-1,000': 3,
            '100-500': 2,
            'Less than 100': 1
          };
          score += documentScores[answer.answer] || 0;
        } break;

      case '5':
        if (typeof answer.answer === 'string') {
          const timeScore: { [key: string]: number } = {
            'Standardized and high quality': 10,
            'Standardized but variable quality': 10,
            'Mix of standardized and unstandardized documents': 7,
            'Incomplete, inconsistent, or containing handwritten notes': 1
          };
          score += timeScore[answer.answer] || 0;
        } break;

      case '6':
        if (typeof answer.answer === 'string') {
          const automateScore: { [key: string]: number } = {
            'Fully automated': 15,
            'Partially automated, with exceptions for specific tasks': 15,
            'Manual with some digital tools (e.g. email, shared drives)': 10,
            'Manual with minimal digital tools': 5,
            'Entirely manual (e.g. paper-based)': 1
          }; 
          score += automateScore[answer.answer] || 0;
        } break;

      case '7':
        if (typeof answer.answer === 'string') {
          const systemScore: { [key: string]: number } = {
            'Systems have APIs and can easily integrate with new software': 22,
            'Systems require support from IT to integrate with new software': 20,
            'Systems are legacy and difficult to integrate with new software': 10,
            'Systems are legacy and no IT support is available': 5,
            'Unsure': 10
          };
          score += systemScore[answer.answer] || 0;
        } break;

      case '8':
        if (Array.isArray(answer.answer)) {
          const slowScore: { [key: string]: number } = {
            'Slow turnaround times': 1,
            'High error rates from manual data entry': 1,
            'Struggling to handle high volumes of documents': 1,
            'Skilled staff such as underwriters are spending too much time on clerical tasks': 1,
            'Reports and insights are hard to generate': 1
          };
          for (const item of answer.answer) {
            score += slowScore[item] || 0;
          }
        } else if (typeof answer.answer === 'string') {
          const slowScore: { [key: string]: number } = {
            'Slow turnaround times': 1,
            'High error rates from manual data entry': 1,
            'Struggling to handle high volumes of documents': 1,
            'Skilled staff such as underwriters are spending too much time on clerical tasks': 1,
            'Reports and insights are hard to generate': 1
    };
    score += slowScore[answer.answer] || 0;
  }
  break;
    }
  }
  if (score > 100){
    score = 100;
  }
  return score;
};

export const calculateExpectedTimeSavings = (answers: QuizAnswer[]): number => {
  let baseSavings = 0;
  let documentVolume = 0;
  
  for (const answer of answers) {
    switch (answer.questionId) {
      case '1':
        if (typeof answer.answer === 'string') {
          const industryTime: { [key: string]: number } = {
            'MGA': 100,
            'Carrier': 100,
            'Agent/Broker': 50,
            'Technology Provider': 100,
            'Other': 20
          };
          baseSavings += industryTime[answer.answer] || 0;
        } break;
      
      case '2':
        if (typeof answer.answer === 'string') {
          const yesnoTime: { [key: string]: number } = {
            'Yes': 10,
            'No': 0
          };
          baseSavings += yesnoTime[answer.answer] || 0;
        } break;
      
      case '3':
        if (typeof answer.answer === 'string') {
          const lobTime: { [key: string]: number } = {
            'Commercial General Liability and/or Property': 100,
            'Personal Property & Casualty': 100,
            'E&O/D&O': 100,
            'Health/Life': 50,
            'Workers Compensation': 100,
            'Specialty Lines': 50,
            'Other Lines': 50
          };
          baseSavings += lobTime[answer.answer] || 0;
        } break;
      
      case '4':
        if (typeof answer.answer === 'string') {
          const documentTime: { [key: string]: number } = {
            '10,000+': 200,
            '5,000-10,000': 180,
            '2,500-5,000': 150,
            '1,000-2,500': 100,
            '500-1,000': 50,
            '100-500': 20,
            'Less than 100': 10
          };
          switch(answer.answer){
            case '10,000+':
              documentVolume = 1;
              break;
            case '5,000-10,000':
              documentVolume = 1;
              break;
            case '2,500-5,000':
              documentVolume = 1;
              break;
            case '1,000-2,500':
              documentVolume = 2;
              break;
            case '500-1,000':
              documentVolume = 4;
              break;
            case '100-500':
              documentVolume = 6;
              break;
            case 'Less than 100':
              documentVolume = 8;
              break;
          }
          baseSavings += documentTime[answer.answer] || 0;
        } break;

      case '5':
        if (typeof answer.answer === 'string') {
          const timeTime: { [key: string]: number } = {
            'Standardized and high quality': 60,
            'Standardized but variable quality': 80,
            'Mix of standardized and unstandardized documents': 80,
            'Incomplete, inconsistent, or containing handwritten notes': 60
          };
          baseSavings += timeTime[answer.answer] || 0;
        } break;

      case '6':
        if (typeof answer.answer === 'string') {
          const automateTime: { [key: string]: number } = {
            'Fully automated': 40,
            'Partially automated, with exceptions for specific tasks': 40,
            'Manual with some digital tools (e.g. email, shared drives)': 50,
            'Manual with minimal digital tools': 60,
            'Entirely manual (e.g. paper-based)': 80
          }; 
          baseSavings += automateTime[answer.answer] || 0;
        } break;

      case '8':
        if (Array.isArray(answer.answer)) {
          const slowTime: { [key: string]: number } = {
            'Slow turnaround times': 40,
            'High error rates from manual data entry': 40,
            'Struggling to handle high volumes of documents': 40,
            'Skilled staff such as underwriters are spending too much time on clerical tasks': 40,
            'Reports and insights are hard to generate': 10
          };
          for (const item of answer.answer) {
            baseSavings += slowTime[item] || 0;
          }
        } else if (typeof answer.answer === 'string') {
          const slowTime: { [key: string]: number } = {
            'Slow turnaround times': 40,
            'High error rates from manual data entry': 40,
            'Struggling to handle high volumes of documents': 40,
            'Skilled staff such as underwriters are spending too much time on clerical tasks': 40,
            'Reports and insights are hard to generate': 10
    };
          baseSavings += slowTime[answer.answer] || 0;
  }
  break;
    }
  }
  baseSavings = Math.round(baseSavings/documentVolume);
  return baseSavings;
};

export const getProductRecommendations = (answers: QuizAnswer[], automationScore: number): string[] => {
  const recommendations: string[] = [];

  //Dynamic recommendations based on answers
  //Respondant type
  const processesAnswer = answers.find(a => a.questionId === '1');
  if (processesAnswer.answer.includes('Carrier')
    && automationScore >= 70) {
    recommendations.push(
    'Insur-OPS 360° - Comprehensive consulting and automation platform for large-scale operations',
    'Bound AI Loss Run Analysis Agent - Transforms inconsitent, multi-format loss run reports into accurate data for underwriter use.',);
  }
  if ((processesAnswer.answer.includes('MGA')
    || processesAnswer.answer.includes('Technology Provider'))
    && automationScore >= 80) {
    recommendations.push(
    'Insur-OPS 360° - Comprehensive consulting and automation platform for large-scale operations',);
  }
  //Respondant LOB type
  const processesAnswerLOB = answers.find(a => a.questionId === '3');
  if ((processesAnswerLOB &&
    processesAnswerLOB.answer.includes('Commercial General Liability and/or Property'))
    && automationScore >= 70) {
    recommendations.push('BoundAI SOV Processing Agent - Augment risk profiles, detect structural inconsistencies, and validate TIVs.',);
  }
  //Respondant document quality/operational challenges
  const processesAnswerQuality = answers.find(a => a.questionId === '5');
  const processesAnswerSlow = answers.find(a => a.questionId === '8');
  if ((!processesAnswerQuality.answer.includes('Standardized and high quality')
    || processesAnswerSlow.answer.includes('Skilled staff such as underwriters are spending too much time on clerical tasks')
    || processesAnswerSlow.answer.includes('High error rates from manual data entry'))
    && automationScore >= 70) {
    recommendations.push('Bound AI RiskClear Digital Worker - AI agent purpose-built to clean, validate, and structure data across submissions.',);
  }
  if ((processesAnswerSlow.answer.includes('Slow turnaround times') 
    || processesAnswerSlow.answer.includes('Struggling to handle high volumes of documents'))
    && automationScore >= 70) {
    recommendations.push('Bound AI Submission Triage Agent - Detects missing info, then triages, filters and prioritizes data.',);
  }

//Non-dynamic recommendations based on score
  if (automationScore >= 70) {
    recommendations.push(
      'Bound AI Policy Checking Agent - Immediate visibility into policy discrepencies, with 80% faster document review time.'
    );
  } else if (automationScore >= 50) {
    recommendations.push(
      'Bound AI Policy Checking Agent - Immediate visibility into policy discrepencies, with 80% faster document review time.',
      'OIP Underwriting Services - Faster turnaround, cleaner files, and increased profitability with expert underwriting support.',
      'OIP Strategic Technology Consulting - Optimize your tech stack with expert guidance grounded in underwriting logic.'
    );
  } else {
    recommendations.push(
      'Perhaps BoundAI is not the right fit at this time - Consider the following opportunities:',
      'OIP Underwriting Services - Faster turnaround, cleaner files, and increased profitability with expert underwriting support.',
      'OIP Strategic Technology Consulting and System Integration - Platform transitions, system implementations, and scalable architecture for future growth.',
    );
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