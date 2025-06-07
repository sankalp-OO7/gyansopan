'use client'; // This directive is necessary for client-side components in Next.js App Router

import { motion } from 'framer-motion';
import Link from 'next/link'; // For navigation

export default function JeePrepPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animations for child elements
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } },
  };

  const featureIconVariants = {
    hidden: { scale: 0, rotate: -180 },
    show: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 200, damping: 12 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 font-inter">
  

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 md:px-12 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-pattern-dots opacity-10"></div> {/* Subtle background pattern */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight font-quicksand">
            Conquer JEE with GyanSopan! 🚀
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl mb-8 opacity-90">
            Your personalized AI-powered guide to cracking the toughest engineering entrance exam.
          </motion.p>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-indigo-900 font-bold px-10 py-5 rounded-full text-2xl shadow-lg hover:bg-yellow-300 transition-colors duration-300 transform"
          >
            Start Your JEE Journey Now! ✨
          </motion.button>
        </motion.div>
      </section>

      {/* Why Choose GyanSopan for JEE? */}
      <section className="py-16 px-6 md:px-12 bg-white text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 font-quicksand">
          Why GyanSopan is Your Secret Weapon for JEE? 🎯
        </h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
        >
          {/* Feature Card 1 */}
          <motion.div variants={itemVariants} className="bg-indigo-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-b-4 border-indigo-400">
            <motion.div variants={featureIconVariants} className="text-6xl mb-4">📚</motion.div>
            <h3 className="text-2xl font-bold text-indigo-700 mb-3 font-quicksand">Extensive JEE Question Bank</h3>
            <p className="text-gray-700 leading-relaxed">
              Access millions of past JEE questions, categorized by topic, difficulty, and year. Includes detailed solutions.
            </p>
          </motion.div>
          {/* Feature Card 2 */}
          <motion.div variants={itemVariants} className="bg-purple-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-b-4 border-purple-400">
            <motion.div variants={featureIconVariants} className="text-6xl mb-4">🤖</motion.div>
            <h3 className="text-2xl font-bold text-purple-700 mb-3 font-quicksand">AI-Powered Doubt Solving</h3>
            <p className="text-gray-700 leading-relaxed">
              Get instant, step-by-step solutions to your doubts using our advanced AI, available 24/7.
            </p>
          </motion.div>
          {/* Feature Card 3 */}
          <motion.div variants={itemVariants} className="bg-green-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-b-4 border-green-400">
            <motion.div variants={featureIconVariants} className="text-6xl mb-4">📈</motion.div>
            <h3 className="text-2xl font-bold text-green-700 mb-3 font-quicksand">Personalized Performance Analysis</h3>
            <p className="text-gray-700 leading-relaxed">
              Identify your strengths and weaknesses with AI-driven reports and get tailored recommendations for improvement.
            </p>
          </motion.div>
          {/* Feature Card 4 */}
          <motion.div variants={itemVariants} className="bg-yellow-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-b-4 border-yellow-400">
            <motion.div variants={featureIconVariants} className="text-6xl mb-4">⏱️</motion.div>
            <h3 className="text-2xl font-bold text-yellow-700 mb-3 font-quicksand">Realistic Mock Tests & AI Proctoring</h3>
            <p className="text-gray-700 leading-relaxed">
              Experience exam-like conditions with full-length mock tests and AI proctoring for authentic results.
            </p>
          </motion.div>
          {/* Feature Card 5 */}
          <motion.div variants={itemVariants} className="bg-red-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-b-4 border-red-400">
            <motion.div variants={featureIconVariants} className="text-6xl mb-4">🎯</motion.div>
            <h3 className="text-2xl font-bold text-red-700 mb-3 font-quicksand">Targeted Study Paths</h3>
            <p className="text-gray-700 leading-relaxed">
              Our AI creates dynamic study plans focused on high-weightage topics and your learning style.
            </p>
          </motion.div>
          {/* Feature Card 6 */}
          <motion.div variants={itemVariants} className="bg-blue-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-b-4 border-blue-400">
            <motion.div variants={featureIconVariants} className="text-6xl mb-4">🧑‍🏫</motion.div>
            <h3 className="text-2xl font-bold text-blue-700 mb-3 font-quicksand">Teacher-Led Content</h3>
            <p className="text-gray-700 leading-relaxed">
              Benefit from high-quality, curated content and modules designed by experienced educators.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* How it Works: JEE Specific */}
      <section className="py-16 px-6 md:px-12 bg-purple-600 text-white text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 font-quicksand">
          How GyanSopan Empowers Your JEE Success
        </h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          <motion.div variants={itemVariants} className="flex items-start gap-4 text-left">
            <div className="text-6xl flex-shrink-0">1️⃣</div>
            <div>
              <h3 className="text-2xl font-bold mb-2 font-quicksand">Assess & Personalize</h3>
              <p className="text-lg opacity-90">
                Take diagnostic tests. Our AI pinpoints your weak areas and crafts a dynamic, personalized study schedule for you.
              </p>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-start gap-4 text-left">
            <div className="text-6xl flex-shrink-0">2️⃣</div>
            <div>
              <h3 className="text-2xl font-bold mb-2 font-quicksand">Learn & Practice Smart</h3>
              <p className="text-lg opacity-90">
                Access curated JEE modules, practice with intelligent question sets, and get instant doubt resolution from our AI.
              </p>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-start gap-4 text-left">
            <div className="text-6xl flex-shrink-0">3️⃣</div>
            <div>
              <h3 className="text-2xl font-bold mb-2 font-quicksand">Test & Analyze</h3>
              <p className="text-lg opacity-90">
                Attempt full-length JEE mocks with AI proctoring. Get deep performance analytics to refine your strategy.
              </p>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-start gap-4 text-left">
            <div className="text-6xl flex-shrink-0">4️⃣</div>
            <div>
              <h3 className="text-2xl font-bold mb-2 font-quicksand">Revise & Excel</h3>
              <p className="text-lg opacity-90">
                AI-driven revision prompts ensure you never forget crucial concepts. Turn weaknesses into strengths!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

 

      {/* Call to Action - Final Push */}
      <section className="bg-blue-700 py-20 px-6 md:px-12 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6 font-quicksand"
        >
          Ready to Ace JEE? Your Success Awaits! 💪
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
        >
          Join thousands of successful aspirants who chose GyanSopan for their JEE journey.
        </motion.p>
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-400 text-blue-800 font-bold px-12 py-6 rounded-full text-3xl shadow-xl hover:bg-yellow-300 transition-colors duration-300 transform"
        >
          Enroll in JEE Plan! 🎉
        </motion.button>
      </section>

    
    </div>
  );
}