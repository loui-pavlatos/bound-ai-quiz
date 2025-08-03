import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { QuizAnswer } from '../types/quiz';
import { quizQuestions } from '../data/questions';

const QuizPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>('');

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/user-info');
    }
  }, [navigate]);

  const handleAnswerChange = (value: string | string[]) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      answer: currentAnswer
    };

    const updatedAnswers = [...answers];
    const existingIndex = answers.findIndex(a => a.questionId === currentQuestion.id);
    
    if (existingIndex >= 0) {
      updatedAnswers[existingIndex] = newAnswer;
    } else {
      updatedAnswers.push(newAnswer);
    }
    
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      localStorage.setItem('quizAnswers', JSON.stringify(updatedAnswers));
      navigate('/loading');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentAnswer('');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      const previousAnswer = answers.find(a => a.questionId === quizQuestions[currentQuestionIndex - 1].id);
      setCurrentAnswer(previousAnswer?.answer || '');
    }
  };

  const isAnswerValid = () => {
    if (!currentQuestion.required) return true;
    if (Array.isArray(currentAnswer)) {
      return currentAnswer.length > 0;
    }
    return currentAnswer.trim() !== '';
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerChange(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  currentAnswer === option
                    ? 'border-brand-blue bg-blue-50 text-brand-blue'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        );

      case 'box-select':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const currentAnswerArray = Array.isArray(currentAnswer) ? currentAnswer : [];
                  const isSelected = currentAnswerArray.includes(option);
                  
                  if (isSelected) {
                    handleAnswerChange(currentAnswerArray.filter(item => item !== option));
                  } else {
                    handleAnswerChange([...currentAnswerArray, option]);
                  }
                }}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  Array.isArray(currentAnswer) && currentAnswer.includes(option)
                    ? 'border-brand-blue bg-blue-50 text-brand-blue'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                    Array.isArray(currentAnswer) && currentAnswer.includes(option)
                      ? 'border-brand-blue bg-brand-blue'
                      : 'border-gray-300'
                  }`}>
                    {Array.isArray(currentAnswer) && currentAnswer.includes(option) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  {option}
                </div>
              </motion.button>
            ))}
          </div>
        );

      case 'free-write':
        return (
          <textarea
            value={currentAnswer as string}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-brand-blue focus:outline-none transition-all duration-200 min-h-32"
            rows={4}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <motion.div
              className="bg-gradient-brand h-2 rounded-full"
              initial={{ width: '33%' }}
              animate={{ width: `${Math.max(33, progress)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {currentQuestion.question}
            </h2>

            {renderQuestion()}

            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  currentQuestionIndex === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                Previous
              </button>

              <motion.button
                whileHover={{ scale: isAnswerValid() ? 1.02 : 1 }}
                whileTap={{ scale: isAnswerValid() ? 0.98 : 1 }}
                onClick={handleNext}
                disabled={!isAnswerValid()}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  isAnswerValid()
                    ? 'bg-gradient-brand text-white hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isLastQuestion ? 'Generate My Custom Automation Report' : 'Next'}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizPage;