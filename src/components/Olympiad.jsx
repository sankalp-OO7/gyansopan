'use client'; // Client Component for Framer Motion

import { motion } from 'framer-motion';

export default function OlympiadPage() {
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 10 } },
  };

  const bounceVariants = {
    hidden: { scale: 0 },
    show: { scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
  };

  const rotateInVariants = {
    hidden: { opacity: 0, rotate: -90, scale: 0.5 },
    show: { opacity: 1, rotate: 0, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 10, delay: 0.3 } },
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-50 font-inter">

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 md:px-12 text-center bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-xl">
        <div className="absolute inset-0 bg-pattern-grid opacity-10"></div> {/* Custom grid pattern for background */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight font-quicksand drop-shadow-lg">
            Become an Olympiad Champion! 🏆
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl mb-8 opacity-90">
            Unleash your genius with GyanSopan's specialized AI training for Olympiad success.
          </motion.p>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-300 text-teal-800 font-bold px-10 py-5 rounded-full text-2xl shadow-xl hover:bg-yellow-200 transition-all duration-300 transform"
          >
            Start Your Gold Medal Quest! 🥇
          </motion.button>
        </motion.div>
      </section>

      {/* What Makes GyanSopan Perfect for Olympiads? */}
      <section className="py-16 px-6 md:px-12 bg-white text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 font-quicksand">
          Your Edge in Olympiad Preparation 🧠
        </h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
        >
          {/* Feature Card 1 */}
          <motion.div variants={itemVariants} className="bg-purple-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-b-4 border-purple-400 transform hover:-translate-y-2">
            <motion.div variants={bounceVariants} className="text-6xl mb-4 text-purple-600">🔢</motion.div>
            <h3 className="text-2xl font-bold text-purple-700 mb-3 font-quicksand">Advanced Problem Sets</h3>
            <p className="text-gray-700 leading-relaxed">
              Tackle challenging, non-routine problems specifically designed to sharpen Olympiad skills.
            </p>
          </motion.div>
          {/* Feature Card 2 */}
          <motion.div variants={itemVariants} className="bg-teal-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-b-4 border-teal-400 transform hover:-translate-y-2">
            <motion.div variants={bounceVariants} className="text-6xl mb-4 text-teal-600">💡</motion.div>
            <h3 className="text-2xl font-bold text-teal-700 mb-3 font-quicksand">Creative Problem Solving AI</h3>
            <p className="text-gray-700 leading-relaxed">
              Our AI guides you through logical reasoning and creative solutions, not just answers.
            </p>
          </motion.div>
          {/* Feature Card 3 */}
          <motion.div variants={itemVariants} className="bg-orange-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-b-4 border-orange-400 transform hover:-translate-y-2">
            <motion.div variants={bounceVariants} className="text-6xl mb-4 text-orange-600">🌐</motion.div>
            <h3 className="text-2xl font-bold text-orange-700 mb-3 font-quicksand">International Competition Focus</h3>
            <p className="text-gray-700 leading-relaxed">
              Content aligned with International Olympiad standards in Math, Science, and Informatics.
            </p>
          </motion.div>
          {/* Feature Card 4 */}
          <motion.div variants={itemVariants} className="bg-blue-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-b-4 border-blue-400 transform hover:-translate-y-2">
            <motion.div variants={bounceVariants} className="text-6xl mb-4 text-blue-600">⏱️</motion.div>
            <h3 className="text-2xl font-bold text-blue-700 mb-3 font-quicksand">Mock Olympiads & Scoring</h3>
            <p className="text-gray-700 leading-relaxed">
              Practice full-length Olympiad simulations with detailed performance metrics and ranks.
            </p>
          </motion.div>
          {/* Feature Card 5 */}
          <motion.div variants={itemVariants} className="bg-green-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-b-4 border-green-400 transform hover:-translate-y-2">
            <motion.div variants={bounceVariants} className="text-6xl mb-4 text-green-600">🌟</motion.div>
            <h3 className="text-2xl font-bold text-green-700 mb-3 font-quicksand">Concept Mastery Modules</h3>
            <p className="text-gray-700 leading-relaxed">
              Deep-dive modules covering fundamental and advanced concepts required for Olympiad success.
            </p>
          </motion.div>
          {/* Feature Card 6 */}
          <motion.div variants={itemVariants} className="bg-pink-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-b-4 border-pink-400 transform hover:-translate-y-2">
            <motion.div variants={bounceVariants} className="text-6xl mb-4 text-pink-600">👯</motion.div>
            <h3 className="text-2xl font-bold text-pink-700 mb-3 font-quicksand">Peer Collaboration Zone</h3>
            <p className="text-gray-700 leading-relaxed">
              Connect with fellow Olympiad enthusiasts, discuss problems, and learn collaboratively.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Journey to Gold Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-l from-indigo-500 to-violet-700 text-white text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 font-quicksand drop-shadow">
          Your Journey to Olympiad Gold 🏅
        </h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
          className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-around gap-12"
        >
          <motion.div variants={rotateInVariants} className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-full w-48 h-48 justify-center text-center shadow-xl">
            <div className="text-7xl mb-2">🔍</div>
            <h3 className="text-xl font-bold font-quicksand">Diagnose</h3>
            <p className="text-sm opacity-90">Find your core strengths & weaknesses.</p>
          </motion.div>
          <div className="text-white text-6xl md:text-8xl flex-shrink-0 animate-pulse hidden md:block">→</div> {/* Arrow animation */}
          <motion.div variants={rotateInVariants} className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-full w-48 h-48 justify-center text-center shadow-xl delay-100">
            <div className="text-7xl mb-2">📚</div>
            <h3 className="text-xl font-bold font-quicksand">Master</h3>
            <p className="text-sm opacity-90">Deep-dive into advanced concepts.</p>
          </motion.div>
          <div className="text-white text-6xl md:text-8xl flex-shrink-0 animate-pulse hidden md:block">→</div>
          <motion.div variants={rotateInVariants} className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-full w-48 h-48 justify-center text-center shadow-xl delay-200">
            <div className="text-7xl mb-2">💪</div>
            <h3 className="text-xl font-bold font-quicksand">Practice</h3>
            <p className="text-sm opacity-90">Solve complex problems with AI guidance.</p>
          </motion.div>
          <div className="text-white text-6xl md:text-8xl flex-shrink-0 animate-pulse hidden md:block">→</div>
          <motion.div variants={rotateInVariants} className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-full w-48 h-48 justify-center text-center shadow-xl delay-300">
            <div className="text-7xl mb-2">🥇</div>
            <h3 className="text-xl font-bold font-quicksand">Excel</h3>
            <p className="text-sm opacity-90">Dominate mock Olympiads & achieve top ranks!</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Call to Action - Join the League of Champions */}
      <section className="bg-gradient-to-r from-pink-400 to-orange-500 py-20 px-6 md:px-12 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-4xl md:text-5xl font-bold mb-6 font-quicksand drop-shadow-md"
        >
          Ready to Claim Your Olympiad Title? ✨
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
        >
          Join GyanSopan's elite Olympiad program and turn your potential into triumph!
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-orange-600 font-bold px-12 py-6 rounded-full text-3xl shadow-xl hover:bg-gray-100 transition-all duration-300 transform"
        >
          Enroll in Olympiad Plan! 🚀
        </motion.button>
      </section>
    </div>
  );
}