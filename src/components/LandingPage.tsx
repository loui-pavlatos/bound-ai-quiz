import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/user-info');
  };

  return (
    <div className="min-h-screen bg-gradient-brand flex items-center justify-center px-4">
      <div className="text-center text-white max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
        >
          Find out how your business can be automated
        </motion.h1>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartQuiz}
          className="bg-white text-brand-blue text-xl font-semibold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform"
        >
          Start Quiz
        </motion.button>
      </div>
    </div>
  );
};

export default LandingPage;