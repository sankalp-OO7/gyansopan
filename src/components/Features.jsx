"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Helper component for text animations
const AnimatedText = ({ text, className, delay = 0 }) => {
  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay } // Slightly slower stagger for kid-friendly feel
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 8, // More damping for a bouncier feel
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 15, // Slightly more pronounced initial y
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block"
          whileHover={{
            scale: 1.2, // More pronounced pop
            color: "#ec4899", // pink-500 for playful hover
            transition: { duration: 0.2, type: "spring", stiffness: 200 }
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Feature data with playful colors and placeholder Lottie paths
const featuresData = [
  {
    id: 'duplicate-detection',
    title: 'Clever Question Detective',
    description: 'GyanSopan has a super smart AI that finds if questions are hiding any duplicates! This helps teachers make sure every puzzle is new and exciting, so your question bank is full of unique challenges.',
    lottiePath: '/lote-anime/duplicate_detection.json', // Placeholder: Replace with your Lottie animation path
    color: 'orange', // Playful color
  },
  {
    id: 'student-assessment',
    title: 'Your AI Learning Buddy',
    description: 'Meet your personal AI learning buddy! It watches how you play quizzes and tests, then gives you special tips and cheering to help you get even better and reach your full potential!',
    lottiePath: '/lote-anime/student_assessment.json', // Placeholder: Replace with your Lottie animation path
    color: 'pink', // Playful color
  },
  {
    id: 'ai-proctoring',
    title: 'Easy-Peasy Exam Fun!',
    description: 'GYANSOPAN makes exams super easy and fair with its AI helper! It helps teachers create fun questions, makes sure everyone plays by the rules during the exam, and even helps share the results super fast. No more exam worries!',
    slogan: 'Setting Examinations is more easier!',
    lottiePath: '/lote-anime/ai_proctoring.json', // Placeholder: Replace with your Lottie animation path
    color: 'sky', // Playful color
  },
];

// Reusable Feature Card component
const FeatureCard = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lottieAnimData, setLottieAnimData] = useState(null);
  const [isLottieLoading, setIsLottieLoading] = useState(true);

  // Dynamic Lottie import
  useEffect(() => {
    setIsLottieLoading(true);
    fetch(feature.lottiePath)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load animation");
        return res.json();
      })
      .then((data) => {
        setLottieAnimData(data);
        setIsLottieLoading(false);
      })
      .catch((error) => {
        console.error(`Error loading Lottie animation for ${feature.lottiePath}:`, error);
        setIsLottieLoading(false);
      });
  }, [feature.lottiePath]);

  // Determine flex direction for alternating layout
  // First card (index 0) has animation on left, text on right
  // Second card (index 1) has animation on right, text on left, and so on.
  const isAnimationLeft = index % 2 === 0;
  const flexDirectionClass = isAnimationLeft ? 'lg:flex-row' : 'lg:flex-row-reverse';
  const textAlignClass = isAnimationLeft ? 'md:text-left' : 'md:text-right';

  // Dynamic colors for the theme
  const borderColorClass = {
    orange: 'border-orange-400',
    pink: 'border-pink-400',
    sky: 'border-sky-400',
  }[feature.color];

  const titleColorClass = {
    orange: 'text-orange-600',
    pink: 'text-pink-600',
    sky: 'text-sky-600',
  }[feature.color];

  const bgColorClass = {
    orange: 'from-orange-50/70 to-orange-100/70',
    pink: 'from-pink-50/70 to-pink-100/70',
    sky: 'from-sky-50/70 to-sky-100/70',
  }[feature.color];

  const hoverShadowColor = {
    orange: 'shadow-orange-300',
    pink: 'shadow-pink-300',
    sky: 'shadow-sky-300',
  }[feature.color];


  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${flexDirectionClass} items-center bg-gradient-to-br ${bgColorClass} backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg ${borderColorClass} border-2`}
      initial={{ opacity: 0, y: 120, scale: 0.85, rotateX: 20 }} // Softer, bouncier entrance
      animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut", type: "spring", stiffness: 60, damping: 10 }}
      whileHover={{
        scale: 1.05, // More pronounced pop
        y: -10, // Higher lift
        boxShadow: `0 20px 40px -10px ${hoverShadowColor}`, // Softer, more diffuse shadow
        borderColor: {
          orange: 'rgb(249, 115, 22)', // orange-500
          pink: 'rgb(236, 72, 153)', // pink-500
          sky: 'rgb(14, 165, 233)', // sky-500
        }[feature.color],
        transition: { type: "spring", stiffness: 250, damping: 15 }
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Lottie Animation Container */}
      <motion.div
        className={`flex-shrink-0 w-full md:w-2/5 lg:w-1/2 flex items-center justify-center p-4 relative overflow-hidden`}
        initial={{ opacity: 0, scale: 0.7, rotateY: isAnimationLeft ? -90 : 90 }} // Flip-in effect
        animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.15 + 0.3, type: "spring", stiffness: 90 }}
        whileHover={{
          scale: 1.08, // More playful pop
          rotate: isAnimationLeft ? -5 : 5, // A little wiggle
          transition: { type: "spring", stiffness: 200, damping: 15 }
        }}
      >
        <AnimatePresence mode="wait">
          {isLottieLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px] text-gray-500 relative z-10"
            >
              <svg className="animate-spin h-8 w-8 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="mt-2 text-sm">Loading fun...</span>
            </motion.div>
          ) : lottieAnimData ? (
            <motion.div
              key="lottie"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
              className="relative z-10"
            >
              <Lottie
                animationData={lottieAnimData}
                loop
                className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px]"
              />
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px] text-gray-500 relative z-10"
            >
              <div className="text-6xl">✨</div>
              <span className="mt-2 text-sm">Animation Failed</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Text Content */}
      <div className={`flex-1 ${textAlignClass} flex flex-col justify-center text-center`}>
        <AnimatedText
          text={feature.title}
          className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 ${titleColorClass} leading-tight`}
          delay={0.6 + index * 0.1}
        />
        <motion.p
          className="text-gray-700 text-base sm:text-lg mb-4 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
        >
          {feature.description}
        </motion.p>
        {feature.slogan && (
          <motion.p
            className="text-lg sm:text-xl font-semibold mt-4 text-sky-700 italic" // Slogan color adjusted for sky theme
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
          >
            {feature.slogan}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};


export default function FeaturesSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-150px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Typical mobile breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  return (
    <motion.section
      id="features"
      ref={containerRef}
      className="relative py-16 md:py-24 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 overflow-hidden" // Playful background gradient
      initial={{ background: `radial-gradient(circle at 50% 50%, rgba(255, 236, 179, 0.4), rgba(255, 255, 255, 0.8))` }} // Amber-like start
      animate={{ background: `radial-gradient(circle at 60% 40%, rgba(255, 205, 210, 0.5), rgba(255, 255, 255, 0.9))` }} // Pink-like end
      transition={{ duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} // Slow, gentle pulse
    >
      {/* Dynamic Background Motion Elements (Playful Bubbles/Orbs) */}
      {!isMobile && ( // Render only on non-mobile for performance/cleanliness
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-300 rounded-full blur-2xl opacity-30"
            animate={{ x: ['0%', '100%', '0%'], y: ['0%', '100%', '0%'], scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-pink-300 rounded-full blur-2xl opacity-30"
            animate={{ x: ['0%', '-100%', '0%'], y: ['0%', '-100%', '0%'], scale: [1, 0.8, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear", delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 left-0 w-24 h-24 bg-sky-300 rounded-full blur-2xl opacity-30"
            animate={{ y: ['0%', '50%', '0%'], x: ['0%', '20%', '0%'], scale: [1, 1.1, 1] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-0 right-1/3 w-36 h-36 bg-orange-200 rounded-full blur-2xl opacity-30"
            animate={{ x: ['0%', '-100%', '0%'], y: ['0%', '50%', '0%'], scale: [1, 0.9, 1] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear", delay: 5 }}
          />
          {/* Smaller, more frequent "sparkle" orbs */}
          <motion.div
            className="absolute top-[10%] right-[15%] w-10 h-10 bg-pink-200 rounded-full blur-md opacity-40"
            animate={{ rotate: 360, scale: [1, 1.3, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
          />
          <motion.div
            className="absolute bottom-[20%] left-[10%] w-8 h-8 bg-sky-200 rounded-full blur-md opacity-40"
            animate={{ x: ['0%', '50%', '0%'], y: ['0%', '-50%', '0%'], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </>
      )}


      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-16 leading-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Learning Fun with <span className="text-orange-600">GyanSopan AI</span>!
        </motion.h2>

        <div className="space-y-12"> {/* Gap between feature cards */}
          {featuresData.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
