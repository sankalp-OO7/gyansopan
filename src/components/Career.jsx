'use client'; // This component uses useState, useEffect, and other client-side hooks

import React, { useState, useEffect } from 'react'; // Import useEffect
import { motion, AnimatePresence } from 'framer-motion';
// Ensure ALL necessary icons, including Mail and Send, are imported from react-feather
import { Briefcase, DollarSign, Heart, BookOpen, Globe, Users, Award, Zap, ChevronDown, CheckCircle, Mail, Send } from 'react-feather'; // Icons for benefits and accordion

// --- Framer Motion Variants ---

// Variants for section containers to fade in and slide up
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.1, // Stagger children animations
    },
  },
};

// Variants for individual items within sections (e.g., benefit cards, job listings)
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Variants for text elements
const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Variants for buttons/CTAs
const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)" },
  tap: { scale: 0.95 },
};

// Variants for accordion content
const accordionContentVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: "easeInOut" },
      opacity: { duration: 0.3, ease: "easeInOut" },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: "easeInOut" },
      opacity: { duration: 0.3, ease: "easeInOut" },
    },
  },
};

// --- Dummy Job Data ---
const jobOpenings = [
  {
    id: '1',
    title: 'Blockchain Developer',
    location: 'Pune (India)',
    type: 'Full-time',
    workMode: 'Work from office', // New field for work type flexibility
    description: `We are seeking a highly skilled Senior Blockchain Developer with expertise in smart contract development, decentralized applications (dApps), and blockchain protocols. You will be responsible for designing, developing, and deploying robust and secure blockchain solutions.`,
    requirements: [
      '2+ years of experience in blockchain development (Solidity, Rust, Go)', // Updated for 2+ years
      'Strong understanding of EVM, Web3.js/Ethers.js',
      'Experience with Layer 2 solutions (Polygon, Arbitrum) a plus',
      'Familiarity with cryptographic principles and security best practices',
      'Bachelor\'s or Master\'s degree in Computer Science or related field',
      'Relevant experience: Both experienced candidates and exceptional freshers with strong project portfolios are encouraged to apply.'
    ],
    responsibilities: [
      'Design, develop, and deploy smart contracts and dApps',
      'Collaborate with product and design teams to build innovative features',
      'Conduct code reviews and ensure high-quality code standards',
      'Research and implement new blockchain technologies',
      'Troubleshoot and resolve technical issues',
    ],
  },
  {
    id: '2',
    title: 'MERN Stack Developer',
    location: 'Pune, India', // Changed location
    type: 'Full-time',
    workMode: 'In-office / Hybrid (On discussion)', // New field for work type flexibility
    description: `Join our dynamic team as a Frontend Developer, focusing on building intuitive and high-performance user interfaces for our blockchain-powered applications. You'll work with modern React and Next.js frameworks.`,
    requirements: [
      '0-3 years of experience with React.js and Next.js', // Updated for 0-X years
      'Proficiency in HTML, CSS, JavaScript (ES6+)',
      'Experience with state management libraries (Redux, Zustand, Context API)',
      'Strong understanding of responsive design and cross-browser compatibility',
      'Familiarity with Web3 integration (connecting to wallets) a plus',
      'Relevant experience: Both experienced candidates and promising freshers are encouraged to apply.'
    ],
    responsibilities: [
      'Develop and maintain user-facing features using React/Next.js',
      'Optimize applications for maximum speed and scalability',
      'Collaborate with backend developers and UI/UX designers',
      'Implement responsive designs for various devices',
      'Write clean, maintainable, and well-documented code',
    ],
  },
  {
    id: '4',
    title: 'Python Developer',
    location: 'Remote',
    type: 'Full-time',
    workMode: 'Remote',
    description: `We are looking for a Python Developer who is skilled at writing efficient, scalable, and reliable code. You will collaborate on developing backend solutions and maintaining existing Python-based applications.`,
    requirements: [
      '0-5 years experience with Python development',
      'Proficiency with web frameworks like Django or Flask',
      'Experience in building RESTful APIs',
      'Familiarity with relational databases (PostgreSQL, MySQL) and NoSQL databases (MongoDB)',
      'Knowledge of front-end technologies (JavaScript, HTML, CSS) is beneficial',
      'Understanding of version control systems (Git)',
      'Strong problem-solving skills and attention to detail',
    ],
    responsibilities: [
      'Write clean, maintainable, and efficient Python code',
      'Develop backend components to improve responsiveness and overall performance',
      'Integrate user-facing elements developed by front-end developers with server-side logic',
      'Design and implement robust, scalable APIs',
      'Troubleshoot, debug, and optimize existing systems',
      'Collaborate closely with cross-functional teams to ensure timely delivery of projects',
    ],
  },
 
  {
    id: '5', // New job ID
    title: 'Blockchain/Web Development Intern',
    location: 'Pune, India / Remote (On discussion)', // Specific location for internship
    type: 'Internship', // Type for internship
    workMode: 'In-office / Remote (On discussion)', // New field for work type flexibility
    description: `Are you a budding developer eager to dive into the world of blockchain or modern web development? Chainworks.io offers an exciting internship opportunity for freshers to gain hands-on experience with cutting-edge technologies. You'll work alongside experienced mentors on real-world projects.`,
    requirements: [
      'Currently pursuing or recently completed a Bachelor\'s/Master\'s degree in Computer Science or a related field.',
      'Strong foundational knowledge in data structures, algorithms, and programming concepts.',
      'For Blockchain: Basic understanding of blockchain concepts (e.g., smart contracts, decentralized apps).',
      'For Web Development: Proficiency in HTML, CSS, JavaScript; familiarity with React/Next.js is a plus.',
      'Demonstrable passion for technology and a strong desire to learn and grow.',
      'Ability to work independently and as part of a team.',
      'Excellent problem-solving skills.',
      '**Note: This is an opportunity for freshers and students. Prior professional experience is not required.**', // Explicitly for freshers
    ],
    responsibilities: [
      'Assist in the development and testing of smart contracts and dApps OR frontend/backend web applications.',
      'Contribute to code reviews and documentation.',
      'Research and learn new blockchain/web technologies.',
      'Collaborate with senior developers and other team members.',
      'Participate in project planning and brainstorming sessions.',
    ],
  },
];

// --- Job Listing Component (for accordion effect) ---
const JobListing = ({ job }) => {
  const [isOpen, setIsOpen] = useState(false);
  // State to track if dark mode is active on the client
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // This runs only on the client side after the component mounts
    if (typeof window !== 'undefined') {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-4 cursor-pointer border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
      onClick={() => setIsOpen(!isOpen)}
      initial={false} // Disable initial animation for consistent behavior
      // FIX: Use isDarkMode state for background color animation
      animate={{ backgroundColor: isOpen ? (isDarkMode ? '#374151' : '#f3f4f6') : (isDarkMode ? '#1f2937' : '#ffffff') }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{job.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
            {job.location} &bull; {job.type}
          </p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-gray-500 dark:text-gray-400" size={24} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={accordionContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden pt-4"
          >
            <p className="text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">{job.description}</p>
            <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">Requirements:</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
            <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">Responsibilities:</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              {job.responsibilities.map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>
            <div className="mt-6 text-right">
              <motion.a
                // FIX: Changed mailto recipient to hi@chainworks.io
                href={`mailto:hi@chainworks.io?subject=Application for ${job.title}`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-300 shadow-md"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Apply Now
                <Send className="ml-2 h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


// --- Main Career Page Component ---
export default function CareerPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen font-sans">
      {/* Hero Section */}
      <motion.section
        id="career-hero"
        className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center bg-gradient-to-br from-blue-700 to-purple-800 dark:from-blue-900 dark:to-purple-950 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background animation elements */}
        <motion.div
          className="absolute inset-0 z-0 opacity-20"
          initial={{ scale: 1.2, rotate: 0 }}
          animate={{ scale: 1, rotate: 10 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: 'url("https://placehold.co/1200x800/2563eb/ffffff?text=Blockchain+Pattern")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <motion.div
          className="absolute inset-0 z-10 bg-black opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        <div className="relative z-20 p-6 max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            Build the Future with Chainworks
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
          >
            Innovate at the cutting edge of blockchain technology. Join a team that's shaping tomorrow's decentralized world.
          </motion.p>
          <motion.a
            href="#open-positions"
            className="inline-flex items-center px-10 py-4 bg-white text-blue-700 rounded-full font-bold text-lg shadow-xl hover:bg-gray-100 transition-colors duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Explore Openings
            <Briefcase className="ml-3" size={20} />
          </motion.a>
        </div>
      </motion.section>

      {/* Why Join Us Section */}
      <motion.section
        id="why-join-us"
        className="py-20 px-6 md:px-20 bg-white dark:bg-gray-800"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-12"
          variants={textVariants}
        >
          Why You'll Love Working Here
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: <Zap size={48} className="text-blue-500" />, title: 'Cutting-Edge Tech', description: 'Work on groundbreaking blockchain projects that redefine industries.' },
            { icon: <Users size={48} className="text-green-500" />, title: 'Collaborative Culture', description: 'Thrive in an environment that fosters teamwork, innovation, and mutual growth.' },
            { icon: <BookOpen size={48} className="text-purple-500" />, title: 'Continuous Learning', description: 'Access resources, workshops, and mentorship to expand your skills.' },
            { icon: <Award size={48} className="text-yellow-500" />, title: 'Impactful Work', description: 'Contribute to solutions that have a real-world impact on decentralization.' },
            { icon: <Globe size={48} className="text-teal-500" />, title: 'Global Opportunities', description: 'Collaborate with a diverse team from around the world, many roles are remote-friendly.' },
            { icon: <Heart size={48} className="text-pink-500" />, title: 'Employee Well-being', description: 'We prioritize your health, happiness, and work-life balance.' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="mb-4 mx-auto">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Our Values Section */}
      <motion.section
        id="our-values"
        className="py-20 px-6 md:px-20 bg-gray-50 dark:bg-gray-900"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-12"
          variants={textVariants}
        >
          Our Core Values
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {[
            {
              title: 'Innovation & Excellence',
              description: 'We push boundaries, embrace new ideas, and strive for the highest quality in everything we do.',
              icon: (
                <svg className="w-16 h-16 text-blue-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 20v-3m0 0l.688-.688c.482-.482.712-1.13.688-1.782A2.984 2.984 0 0012 12.582a2.984 2.984 0 00-2.35-.372c-.024.652.205 1.3.688 1.782L12 17m0 0l-.688.688c-.482.482-.712 1.13-.688 1.782A2.984 2.984 0 0012 21.418a2.984 2.984 0 002.35.372c.024-.652-.205-1.3-.688-1.782L12 17m0 0V9.582m0 0l.688-.688c.482-.482.712-1.13.688-1.782A2.984 2.984 0 0012 5.582a2.984 2.984 0 00-2.35-.372c-.024.652.205 1.3.688 1.782L12 9.582m0 0V3"></path>
                </svg>
              ),
            },
            {
              title: 'Transparency & Trust',
              description: 'Building trust through open communication, ethical practices, and clear processes in everything we do.',
              icon: (
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              ),
            },
            {
              title: 'Community & Empowerment',
              description: 'Fostering a strong community, empowering individuals, and decentralizing opportunities.',
              icon: (
                <svg className="w-16 h-16 text-purple-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M17 20v-2c0-.653-.109-1.28-.314-1.857M12 11V9m0 0V3m0 6a2 2 0 110 4 2 2 0 010-4zm-7 4v-2c0-.653.109-1.28.314-1.857M5 15v-2c0-.653.109-1.28.314-1.857"></path>
                </svg>
              ),
            },
            {
              title: 'Security & Integrity',
              description: 'Prioritizing robust security and maintaining the highest standards of integrity in all our solutions.',
              icon: (
                <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-2 4h4m6-10V7a4 4 0 00-4-4H8a4 4 0 00-4 4v3m6 10v-3a2 2 0 114 0v3m-4 0h-3a2 2 0 00-2 2v1a2 2 0 002 2h7.586a1 1 0 00.707-.293l4.414-4.414a1 1 0 00-.293-.707L12 15z"></path>
                </svg>
              ),
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {value.icon}
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{value.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Open Positions Section */}
      <motion.section
        id="open-positions"
        className="py-20 px-6 md:px-20 bg-white dark:bg-gray-800"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-12"
          variants={textVariants}
        >
          Current Openings
        </motion.h2>
        <div className="max-w-4xl mx-auto">
          {jobOpenings.map((job) => (
            <motion.div key={job.id} variants={itemVariants}>
              <JobListing job={job} />
            </motion.div>
          ))}
        </div>
        <motion.p
          className="text-center text-gray-700 dark:text-gray-300 mt-8"
          variants={textVariants}
        >
          Don't see a role that fits? Send us your resume anyway! We're always looking for talented individuals.
          <br/>
          <motion.a
            // FIX: Changed mailto recipient to hi@chainworks.io
            href="mailto:hi@chainworks.io?subject=Unsolicited%20Application"
            className="inline-flex items-center mt-4 px-6 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors duration-300 shadow-md"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Send Your Resume
            <Mail className="ml-2 h-5 w-5" />
          </motion.a>
        </motion.p>
      </motion.section>

      {/* Perks & Benefits Section */}
      <motion.section
        id="perks-benefits"
        className="py-20 px-6 md:px-20 bg-gray-50 dark:bg-gray-900"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-12"
          variants={textVariants}
        >
          Perks & Benefits
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: <DollarSign size={36} className="text-green-500" />, text: 'Competitive Compensation' },
            { icon: <Heart size={36} className="text-red-500" />, text: 'Comprehensive Health Benefits' },
            { icon: <Globe size={36} className="text-blue-500" />, text: 'Flexible & Remote Work Options' },
            { icon: <BookOpen size={36} className="text-purple-500" />, text: 'Learning & Development Budget' },
            { icon: <Users size={36} className="text-yellow-500" />, text: 'Strong Team & Culture' },
            { icon: <CheckCircle size={36} className="text-teal-500" />, text: 'Work-Life Balance' },
          ].map((perk, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.01 }}
            >
              <div className="flex-shrink-0">{perk.icon}</div>
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{perk.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Application Process Section */}
      <motion.section
        id="application-process"
        className="py-20 px-6 md:px-20 bg-white dark:bg-gray-800 text-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-12"
          variants={textVariants}
        >
          Our Application Process
        </motion.h2>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Apply Online', description: 'Submit your resume and cover letter through our portal or via email.' },
            { step: '2', title: 'Interviews', description: 'Engage in a series of interviews to assess your skills and cultural fit.' },
            { step: '3', title: 'Offer & Onboarding', description: 'Receive an offer and begin your exciting journey with Chainworks!' },
          ].map((processStep, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                {processStep.step}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{processStep.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{processStep.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Final Call to Action */}
      {/* <motion.section
        id="final-cta"
        className="py-16 px-6 md:px-20 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 text-white text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold mb-6 drop-shadow-md"
          variants={textVariants}
        >
          Ready to Make Your Mark?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          variants={textVariants}
        >
          Join Chainworks and be part of a team that's building the future of decentralized technology.
        </motion.p>
         <motion.a
          href="#open-positions"
          className="inline-flex items-center px-10 py-4 bg-white text-blue-700 rounded-full font-bold text-lg shadow-xl hover:bg-gray-100 transition-colors duration-300"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          View All Openings
          <Briefcase className="ml-3" size={20} />
        </motion.a>
      </motion.section> */}
    </div>
  );
}
