'use client'; // This directive is necessary for client-side components in Next.js App Router

import { motion } from 'framer-motion';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-inter"> {/* Assuming 'Inter' as default body font */}
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 to-purple-100 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 font-quicksand" // Using 'quicksand' for headings
        >
          Unlock Your Potential with GyanSopan! ✨
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Revolutionizing learning and teaching with AI. Smarter education for a brighter future! 🚀
        </motion.p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
          className="inline-block bg-green-500 text-white text-2xl font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Absolutely FREE for Teachers! 🍎
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 font-quicksand">
          GyanSopan in Action! Your Journey Starts Here 🗺️
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-purple-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Sign Up & Gain Access</h3>
            <p className="text-gray-600">Your first step towards enhanced learning!</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Explore & Create</h3>
            <p className="text-gray-600">Dive into open content or build your own modules.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-5xl mb-4">🧠</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Utilize AI Services</h3>
            <p className="text-gray-600">Leverage powerful AI for personalized learning!</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-yellow-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-5xl mb-4">🔬</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Experiment & Innovate</h3>
            <p className="text-gray-600">Try new academic endeavors and push boundaries.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-red-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Engage & Collaborate</h3>
            <p className="text-gray-600">Connect with peers and share knowledge!</p>
          </motion.div>
        </div>
      </section>

      {/* Teachers: Free Access & Benefits Section */}
      <section className="bg-pink-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 font-quicksand">
            Teachers: Your Gateway to Smarter Classrooms - Absolutely FREE! 🎉
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-b-4 border-yellow-400"
            >
              <div className="text-4xl mb-4">🗣️</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Multi-Lingual Content Creation</h3>
              <p className="text-gray-600">Create engaging course content in ANY language with ease!</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-b-4 border-green-400"
            >
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Smart Question Bank Access</h3>
              <p className="text-gray-600">Image entry & AI duplicate detection for a robust question bank!</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-b-4 border-blue-400"
            >
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">AI-Powered Student Assessment</h3>
              <p className="text-gray-600">Track progress, provide feedback, and uplift student performance.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-b-4 border-red-400"
            >
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Seamless AI Proctoring & Exams</h3>
              <p className="text-gray-600">Simplify exam setup, conduct, and result publication.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-b-4 border-purple-400"
            >
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Collaborate & Innovate</h3>
              <p className="text-gray-600">Engage in collaborative content and explore new academic ventures.</p>
            </motion.div>
          </div>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 bg-yellow-500 text-white text-xl font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Teachers: Get Started Now - It's FREE! 🥳
          </motion.button>
        </div>
      </section>

      {/* Student Plans Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 font-quicksand">
            Student Plans: Choose Your Path to Success! 🎓
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Plan Card 1: Basic Learner */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-blue-500 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              <h3 className="text-3xl font-bold text-blue-600 mb-4">Basic Learner 📚</h3>
              <p className="text-gray-500 text-lg mb-6">Perfect for everyday learning!</p>
              <div className="text-5xl font-bold text-gray-800 mb-6">
                ₹ 99 <span className="text-xl text-gray-500">/ month</span>
              </div>
              <ul className="text-left text-gray-700 space-y-3 mb-8">
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>Access to Open Content</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>Basic AI Services</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>Standard Question Bank Access</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>Limited AI Study Tools</li>
              </ul>
              <button className="bg-blue-500 text-white font-bold px-8 py-3 rounded-full hover:bg-blue-600 transition-colors duration-300">
                Select Plan
              </button>
            </motion.div>

            {/* Plan Card 2: JEE Champion */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-green-500 hover:shadow-2xl transition-shadow duration-300 cursor-pointer relative"
            >
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-800 text-sm font-bold px-4 py-2 rounded-lg rotate-6">
                Popular! 🔥
              </div>
              <h3 className="text-3xl font-bold text-green-600 mb-4">JEE Champion 🚀</h3>
              <p className="text-gray-500 text-lg mb-6">Dedicated prep for engineering dreams!</p>
              <div className="text-5xl font-bold text-gray-800 mb-6">
                ₹ 499 <span className="text-xl text-gray-500">/ month</span>
              </div>
              <ul className="text-left text-gray-700 space-y-3 mb-8">
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>All Basic Features</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>JEE Specific Question Banks</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>Targeted AI Insights for JEE</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>Mock Tests & Performance Analysis</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>Priority Support</li>
              </ul>
              <button className="bg-green-500 text-white font-bold px-8 py-3 rounded-full hover:bg-green-600 transition-colors duration-300">
                Select Plan
              </button>
            </motion.div>

            {/* Plan Card 3: Olympiad Ace */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-purple-500 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              <h3 className="text-3xl font-bold text-purple-600 mb-4">Olympiad Ace 🏅</h3>
              <p className="text-gray-500 text-lg mb-6">For future global competitors!</p>
              <div className="text-5xl font-bold text-gray-800 mb-6">
                ₹ 399 <span className="text-xl text-gray-500">/ month</span>
              </div>
              <ul className="text-left text-gray-700 space-y-3 mb-8">
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>All Basic Features</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>Advanced Olympiad Q-Banks</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>Specialized AI Problem Solving</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>Olympiad Specific Mock Exams</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>Monthly Expert Webinars</li>
              </ul>
              <button className="bg-purple-500 text-white font-bold px-8 py-3 rounded-full hover:bg-purple-600 transition-colors duration-300">
                Select Plan
              </button>
            </motion.div>

            {/* Plan Card 4: Scholarship Star */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-red-500 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              <h3 className="text-3xl font-bold text-red-600 mb-4">Scholarship Star ⭐</h3>
              <p className="text-gray-500 text-lg mb-6">Unlock your academic funding!</p>
              <div className="text-5xl font-bold text-gray-800 mb-6">
                ₹ 299 <span className="text-xl text-gray-500">/ month</span>
              </div>
              <ul className="text-left text-gray-700 space-y-3 mb-8">
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>All Basic Features</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>Scholarship Exam Q-Banks</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>AI Guidance for Applications</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>Interview Prep Resources</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✔️</span>Personalized Scholarship Alerts</li>
              </ul>
              <button className="bg-red-500 text-white font-bold px-8 py-3 rounded-full hover:bg-red-600 transition-colors duration-300">
                Select Plan
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action / Footer Section */}
      <section className="bg-purple-600 py-16 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold mb-6 font-quicksand"
        >
          Ready to transform your learning journey? 🌟
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl mb-10 max-w-2xl mx-auto"
        >
          Join GyanSopan today and experience the future of education!
        </motion.p>
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
          className="bg-white text-purple-600 font-bold px-10 py-5 rounded-full text-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Get Started Now! ✨
        </motion.button>
      </section>

      
    </div>
  );
}