import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { QuizAnswer, UserInfo, ReportData } from '../types/quiz';
import { generateReport } from '../utils/reportGeneration';

const ReportPage = () => {
  const navigate = useNavigate();
  const reportRef = useRef<HTMLDivElement>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const userInfoString = localStorage.getItem('userInfo');
        const answersString = localStorage.getItem('quizAnswers');
        
        if (!userInfoString || !answersString) {
          navigate('/');
          return;
        }

        const userInfo: UserInfo = JSON.parse(userInfoString);
        const answers: QuizAnswer[] = JSON.parse(answersString);
        
        const report = await generateReport(answers, userInfo);
        setReportData(report);
      } catch (error) {
        console.error('Error generating report:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, [navigate]);

  const downloadPDF = async () => {
    if (!reportRef.current || !reportData) return;

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${reportData.userInfo.companyName}_automation_report.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const resetQuiz = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('quizAnswers');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your report...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Error loading report data</p>
          <button
            onClick={() => navigate('/')}
            className="bg-brand-blue text-white px-6 py-2 rounded-lg"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            Your Automation Report is Ready!
          </motion.h1>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadPDF}
              style={{
                background: 'linear-gradient(135deg, #416aa0 0%, #35b4dd 100%)',
                color: '#f5f5f7'
              }}
              className="px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Download PDF Report
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Take Quiz Again
            </motion.button>
          </div>
        </div>

        <motion.div
          ref={reportRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div
            className="text-white p-8 text-center"
            style={{
              background: 'linear-gradient(135deg, #416aa0 0%, #35b4dd 100%)'
            }}
          >
            <h2 className="text-3xl font-bold mb-2">
              Automation Potential for {reportData.userInfo.companyName}
            </h2>
            <p className="text-lg opacity-90">Custom Business Automation Analysis</p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Automation Potential</h3>
                <div className="relative">
                  <div className="w-32 h-32 mx-auto">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        strokeDasharray={`${reportData.automationPotential}, 100`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#416aa0" />
                          <stop offset="100%" stopColor="#35b4dd" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold" style={{ color: '#35b4dd' }}>
                        {reportData.automationPotential}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Estimated Time Savings</h3>
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="text-4xl font-bold mb-2" style={{ color: '#35b4dd' }}>
                    {reportData.timeSavingsPerMonth}
                  </div>
                  <div className="text-lg text-gray-600">hours per month</div>
                  <div className="text-sm text-gray-500 mt-2">
                    That's {Math.round(reportData.timeSavingsPerMonth / 4)} hours per week!
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Recommended Bound AI Products
              </h3>
              <div className="space-y-4">
                {reportData.productRecommendations.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg p-4"
                    style={{ borderLeft: '4px solid #35b4dd' }}
                  >
                    <div className="flex items-start">
                      <div
                        className="rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1"
                        style={{ background: '#35b4dd', color: '#fff' }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {product.split(' - ')[0]}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {product.split(' - ')[1]}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="border-t pt-8 mt-8 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Next Steps</h3>
              <p className="text-gray-600 mb-6">
                Ready to transform your business with automation? Contact our team to discuss how
                Bound AI can help you achieve these time savings and efficiency gains.
              </p>
              <div
                className="text-white rounded-lg p-6"
                style={{
                  background: 'linear-gradient(135deg, #416aa0 0%, #35b4dd 100%)'
                }}
              >
                <h4 className="text-lg font-semibold mb-2">Get Started Today</h4>
                <p className="mb-4">Schedule a free consultation with our automation experts</p>
                <div className="space-y-2 text-sm">
                  <p>📧 Your Contact Email: {reportData.userInfo.email}</p>
                  <p>🏢 Your Company: {reportData.userInfo.companyName}</p>
                  <p>🌐 Visit: {' '}
                    <a
                      href="https://www.boundai.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white underline-offset-2 hover:underline transition-all"
                      style={{ color: '#fff' }}
                    >
                      www.boundai.ai
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportPage;