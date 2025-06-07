'use client' // This directive is crucial for using hooks and client-side libraries like framer-motion

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Existing component imports
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import AboutUs from '@/components/Use'
import Projects from '@/components/Projects'
import ToolsApproach from '@/components/About'
import Team from '@/components/Contact'
import Pricing from '@/components/Pricing'
import Jee from '@/components/Jee'
import Olympiad from '@/components/Olympiad'
import Scholorship from '@/components/Scholorship'
import WhyChooseUs from '@/components/Features'

// --- Animation Variants ---

// Variant for the main content to fade in after loading
const contentFadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.8, // Adjust delay to ensure loading screen fades first
      duration: 1,
      ease: 'easeOut',
    },
  },
};

// Variant for individual sections to slide up and fade in
const sectionSlideIn = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7, // Smoother transition
      ease: 'easeOut',
    },
  },
};

// Variants for the initial loading overlay
const loadingOverlayVariants = {
  initial: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.8, // How long the overlay takes to disappear
      ease: 'easeOut',
      delay: 0.2, // Small delay before it starts fading
    },
  },
};

// Variants for the logo inside the loading overlay
const logoVariants = {
  initial: { scale: 0.8, opacity: 0, y: -20 },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring', // Bouncy effect
      stiffness: 120,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    y: 20,
    transition: {
      duration: 0.5,
      ease: 'easeIn',
    },
  },
};

export default function Home() {
  // Always initialize isLoading to true for both server and client.
  // The client-side check will happen in useEffect.
  const [isLoading, setIsLoading] = useState(true);
  // This new state tracks if the animation has definitively played in this session.
  const [animationPlayedThisSession, setAnimationPlayedThisSession] = useState(false);

  useEffect(() => {
    // This code runs only on the client side after initial render (hydration)
    const hasAnimatedPreviously = sessionStorage.getItem('hasAnimated');

    if (hasAnimatedPreviously) {
      // If animation has played before, immediately set loading to false
      // and ensure scrolling is enabled.
      setIsLoading(false);
      setAnimationPlayedThisSession(true); // Mark that it has played
      document.body.style.overflow = 'unset';
      return; // Exit early, no need for timer
    }

    // If it's the first time in this session, disable scrolling and start the timer
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsLoading(false);
      setAnimationPlayedThisSession(true); // Mark that animation has now played
      sessionStorage.setItem('hasAnimated', 'true'); // Store this in session storage
      document.body.style.overflow = 'unset'; // Re-enable scrolling
    }, 2000); // Adjust this duration as needed

    // Cleanup function to ensure scrolling is re-enabled if component unmounts
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      {/* Initial Loading Overlay */}
      {/* Show overlay only if isLoading is true AND the animation hasn't played this session yet */}
      <AnimatePresence>
        {isLoading && !animationPlayedThisSession && (
          <motion.div
            className="fixed inset-0 bg-gray-900 flex items-center justify-center z-[9999]"
            variants={loadingOverlayVariants}
            initial="initial"
            exit="exit"
          >
            <motion.span
              className="
                text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl
                font-extrabold
                bg-gradient-to-r from-blue-400 to-purple-600
                bg-clip-text text-transparent
                inline-block
                p-4 rounded-lg shadow-xl
                whitespace-nowrap
              "
              variants={logoVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              GYANSOPAN
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Wrapper */}
      <motion.div
        // Initial state for content: if animationPlayedThisSession is true (meaning loading is skipped),
        // or if isLoading becomes false, the content is visible. Otherwise, it starts hidden.
        initial={isLoading || !animationPlayedThisSession ? "hidden" : "visible"}
        // Animate content to visible when isLoading becomes false OR if animation has already played
        animate={!isLoading || animationPlayedThisSession ? "visible" : "hidden"}
        // Apply transition only if it's the first time content is becoming visible after a real load
        transition={!isLoading && !animationPlayedThisSession ? contentFadeIn.visible.transition : { duration: 0 }}
        // FIX: Removed the explicit background color from here
        className="min-h-screen text-gray-100" // Removed bg-gray-900 dark:bg-black
      >
        <Navbar />
        <main>
          {/* Section animations: Only apply delays/transitions if the initial loading animation occurred */}
          <motion.section
            id="hero"
            variants={sectionSlideIn}
            initial={!animationPlayedThisSession ? "hidden" : "visible"}
            animate="visible"
            transition={!animationPlayedThisSession ? { delay: 0.1 } : { duration: 0 }}
          >
            <HeroSection />
          </motion.section>


          <motion.section
            id="about-us"
            variants={sectionSlideIn}
            initial={!animationPlayedThisSession ? "hidden" : "visible"}
            animate="visible"
            transition={!animationPlayedThisSession ? { delay: 0.2 } : { duration: 0 }}
          >
            <AboutUs />
          </motion.section>
          <motion.section
            id="tools-approach"
            variants={sectionSlideIn}
            initial={!animationPlayedThisSession ? "hidden" : "visible"}
            animate="visible"
            transition={!animationPlayedThisSession ? { delay: 0.4 } : { duration: 0 }}
          >
            <ToolsApproach />
          </motion.section>
          <motion.section
            id="why-choose-us"
            variants={sectionSlideIn}
            initial={!animationPlayedThisSession ? "hidden" : "visible"}
            animate="visible"
            transition={!animationPlayedThisSession ? { delay: 0.8 } : { duration: 0 }}
          >
            <WhyChooseUs />
          </motion.section>
 
          <motion.section
            id="projects"
            variants={sectionSlideIn}
            initial={!animationPlayedThisSession ? "hidden" : "visible"}
            animate="visible"
            transition={!animationPlayedThisSession ? { delay: 0.3 } : { duration: 0 }}
          >
            <Projects />
          </motion.section>

 

        <motion.section
            id="pricing"
            variants={sectionSlideIn}
            initial={!animationPlayedThisSession ? "hidden" : "visible"}
            animate="visible"
            transition={!animationPlayedThisSession ? { delay: 0.5 } : { duration: 0 }}
          >
            <Pricing />
          </motion.section>          <motion.section
            id="jee"
            variants={sectionSlideIn}
            initial={!animationPlayedThisSession ? "hidden" : "visible"}
            animate="visible"
            transition={!animationPlayedThisSession ? { delay: 0.5 } : { duration: 0 }}
          >
            <Jee />
          </motion.section>          <motion.section
            id="olympiad"
            variants={sectionSlideIn}
            initial={!animationPlayedThisSession ? "hidden" : "visible"}
            animate="visible"
            transition={!animationPlayedThisSession ? { delay: 0.5 } : { duration: 0 }}
          >
            <Olympiad />
          </motion.section>
          <motion.section
            id="scholorship"
            variants={sectionSlideIn}
            initial={!animationPlayedThisSession ? "hidden" : "visible"}
            animate="visible"
            transition={!animationPlayedThisSession ? { delay: 0.5 } : { duration: 0 }}
          >
            <Scholorship />
          </motion.section>         <motion.section
            id="team"
            variants={sectionSlideIn}
            initial={!animationPlayedThisSession ? "hidden" : "visible"}
            animate="visible"
            transition={!animationPlayedThisSession ? { delay: 0.5 } : { duration: 0 }}
          >
            <Team />
          </motion.section>
        </main>
        <Footer />
      </motion.div>
    </>
  );
}