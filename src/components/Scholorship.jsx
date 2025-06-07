'use client'; // Client Component for Framer Motion

import { motion } from 'framer-motion';

export default function ScholarshipExamPage() {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 10 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 10 } },
  };

  const processStepVariants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120, damping: 12 } },
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 font-inter">

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 md:px-12 text-center bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-xl">
        <div className="absolute inset-0 bg-pattern-hexagons opacity-10"></div> {/* Custom geometric pattern */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight font-quicksand drop-shadow-lg">
            Conquer India's Scholarship Exams! 🌟
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl mb-8 opacity-90">
            Master NTSE, MTSE, and all major talent search exams with GyanSopan's AI-powered platform.
          </motion.p>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-indigo-900 font-bold px-10 py-5 rounded-full text-2xl shadow-lg hover:bg-yellow-300 transition-all duration-300 transform"
          >
            Start Your Scholarship Journey! 🚀
          </motion.button>
        </motion.div>
      </section>

      {/* Why GyanSopan for Scholarship Exams? */}
      <section className="py-16 px-6 md:px-12 bg-white text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 font-quicksand">
          Your Edge in Competitive Scholarship Exams 🧠
        </h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
        >
          {/* Feature Card 1 */}
          <motion.div variants={cardVariants} whileHover={{ translateY: -10, boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.1)" }} className="bg-teal-50 p-8 rounded-xl shadow-lg border-b-4 border-teal-400">
            <div className="text-6xl mb-4 text-teal-600">🎯</div>
            <h3 className="text-2xl font-bold text-teal-700 mb-3 font-quicksand">Exam-Specific Modules</h3>
            <p className="text-gray-700 leading-relaxed">
              Targeted content and practice for NTSE, MTSE, JSTSE, Olympiads, and other state-level scholarships.
            </p>
          </motion.div>
          {/* Feature Card 2 */}
          <motion.div variants={cardVariants} whileHover={{ translateY: -10, boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.1)" }} className="bg-orange-50 p-8 rounded-xl shadow-lg border-b-4 border-orange-400">
            <div className="text-6xl mb-4 text-orange-600">📊</div>
            <h3 className="text-2xl font-bold text-orange-700 mb-3 font-quicksand">Advanced Mock Test Series</h3>
            <p className="text-gray-700 leading-relaxed">
              Full-length mock tests mimicking actual exam patterns (MAT & SAT) with instant results and analytics.
            </p>
          </motion.div>
          {/* Feature Card 3 */}
          <motion.div variants={cardVariants} whileHover={{ translateY: -10, boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.1)" }} className="bg-purple-50 p-8 rounded-xl shadow-lg border-b-4 border-purple-400">
            <div className="text-6xl mb-4 text-purple-600">🤖</div>
            <h3 className="text-2xl font-bold text-purple-700 mb-3 font-quicksand">AI-Powered Doubt Resolution</h3>
            <p className="text-gray-700 leading-relaxed">
              Stuck on a tricky problem? Our AI provides instant, step-by-step solutions and conceptual explanations.
            </p>
          </motion.div>
          {/* Feature Card 4 */}
          <motion.div variants={cardVariants} whileHover={{ translateY: -10, boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.1)" }} className="bg-blue-50 p-8 rounded-xl shadow-lg border-b-4 border-blue-400">
            <div className="text-6xl mb-4 text-blue-600">📈</div>
            <h3 className="text-2xl font-bold text-blue-700 mb-3 font-quicksand">Personalized Performance Analytics</h3>
            <p className="text-gray-700 leading-relaxed">
              Identify your strengths and weaknesses across subjects and topics with detailed performance reports.
            </p>
          </motion.div>
          {/* Feature Card 5 */}
          <motion.div variants={cardVariants} whileHover={{ translateY: -10, boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.1)" }} className="bg-green-50 p-8 rounded-xl shadow-lg border-b-4 border-green-400">
            <div className="text-6xl mb-4 text-green-600">⏱️</div>
            <h3 className="text-2xl font-bold text-green-700 mb-3 font-quicksand">Speed & Accuracy Drills</h3>
            <p className="text-gray-700 leading-relaxed">
              Improve your problem-solving speed and minimize errors with timed practice sessions tailored by AI.
            </p>
          </motion.div>
          {/* Feature Card 6 */}
          <motion.div variants={cardVariants} whileHover={{ translateY: -10, boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.1)" }} className="bg-pink-50 p-8 rounded-xl shadow-lg border-b-4 border-pink-400">
            <div className="text-6xl mb-4 text-pink-600">📜</div>
            <h3 className="text-2xl font-bold text-pink-700 mb-3 font-quicksand">Previous Year Papers & Trends</h3>
            <p className="text-gray-700 leading-relaxed">
              Access an extensive archive of past papers and AI-driven insights into recurring patterns and important topics.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Path to Scholarship Success */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-l from-blue-700 to-purple-800 text-white text-center"> {/* Main section background remains blue-purple gradient */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 font-quicksand drop-shadow">
          GyanSopan's Winning Strategy for Scholarship Exams 🏆
        </h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
          className="max-w-5xl mx-auto space-y-10"
        >
          {/* Step 1: Diagnose & Plan */}
          <motion.div variants={processStepVariants} className="flex items-start gap-6 bg-indigo-900 bg-opacity-30 p-6 rounded-lg shadow-md hover:bg-opacity-50 transition-all duration-300 border-l-4 border-pink-400"> {/* Changed box background to translucent dark indigo, increased opacity for hover */}
            <div className="text-6xl flex-shrink-0">1️⃣</div>
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-2 font-quicksand text-white">Diagnose & Plan</h3> {/* Explicitly set text to white for clarity */}
              <p className="text-lg opacity-90 text-white"> {/* Explicitly set text to white for clarity */}
                Begin with diagnostic tests to pinpoint your current knowledge level and identify specific areas needing improvement.
              </p>
            </div>
          </motion.div>
          {/* Step 2: Learn & Master */}
          <motion.div variants={processStepVariants} className="flex items-start gap-6 bg-indigo-900 bg-opacity-30 p-6 rounded-lg shadow-md hover:bg-opacity-50 transition-all duration-300 border-l-4 border-orange-400">
            <div className="text-6xl flex-shrink-0">2️⃣</div>
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-2 font-quicksand text-white">Learn & Master</h3>
              <p className="text-lg opacity-90 text-white">
                Engage with AI-curated lessons and practice questions that focus on fundamental concepts and advanced problem-solving techniques for your target exam.
              </p>
            </div>
          </motion.div>
          {/* Step 3: Practice & Analyze */}
          <motion.div variants={processStepVariants} className="flex items-start gap-6 bg-indigo-900 bg-opacity-30 p-6 rounded-lg shadow-md hover:bg-opacity-50 transition-all duration-300 border-l-4 border-cyan-400">
            <div className="text-6xl flex-shrink-0">3️⃣</div>
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-2 font-quicksand text-white">Practice & Analyze</h3>
              <p className="text-lg opacity-90 text-white">
                Take timed mock tests, review detailed performance reports, and use AI feedback to refine your strategy and improve weak areas.
              </p>
            </div>
          </motion.div>
          {/* Step 4: Achieve & Succeed */}
          <motion.div variants={processStepVariants} className="flex items-start gap-6 bg-indigo-900 bg-opacity-30 p-6 rounded-lg shadow-md hover:bg-opacity-50 transition-all duration-300 border-l-4 border-yellow-400">
            <div className="text-6xl flex-shrink-0">4️⃣</div>
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-2 font-quicksand text-white">Achieve & Succeed</h3>
              <p className="text-lg opacity-90 text-white">
                Walk into your scholarship exam with confidence, equipped with the knowledge and skills to secure top ranks and the scholarship!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Call to Action - Join the Winning Team */}
      <section className="bg-gradient-to-r from-red-500 to-orange-600 py-20 px-6 md:px-12 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-4xl md:text-5xl font-bold mb-6 font-quicksand drop-shadow-md"
        >
          Ready to Win Your Scholarship? ✨
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
        >
          Enroll in GyanSopan's Scholarship Exam Prep and gain the advantage you need to succeed.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-orange-700 font-bold px-12 py-6 rounded-full text-3xl shadow-xl hover:bg-gray-100 transition-all duration-300 transform"
        >
          Sign Up for Exam Prep! 🏅
        </motion.button>
      </section>
    </div>
  );
}