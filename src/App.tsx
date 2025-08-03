import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UserInfoPage from './components/UserInfoPage';
import QuizPage from './components/QuizPage';
import LoadingPage from './components/LoadingPage';
import ReportPage from './components/ReportPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user-info" element={<UserInfoPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
