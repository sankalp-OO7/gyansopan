'use client' // This directive is crucial for using hooks and client-side libraries like framer-motion

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Existing component imports (as requested)
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import AboutUs from '@/components/AboutUs'
import Projects from '@/components/Projects'
import ToolsApproach from '@/components/ToolsApproach'
import Team from '@/components/Team'
import Awards from '@/components/Awards'
import Career from '@/components/Career'
import ContactUs from '@/components/ContactUs'
import WhyChooseUs from '@/components/WhyChooseUs'

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling when the component mounts and loading is active
    document.body.style.overflow = 'hidden';

    // Simulate a loading time before content becomes visible
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Re-enable scrolling after the loading screen fades out
      document.body.style.overflow = 'unset'; // 'unset' or 'auto'
    }, 2000); // Adjust this duration as needed (e.g., based on actual data fetching)

    // Cleanup function to ensure scrolling is re-enabled if the component unmounts prematurely
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      {/* Initial Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
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
              CHAINWORKS
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>  

      {/* Main Content Wrapper (fades in after loading) */}
      <motion.div
        variants={contentFadeIn}
        initial="hidden"
        animate={isLoading ? "hidden" : "visible"} // Only animate to visible when loading is done
        className="min-h-screen" // Ensure enough height for content
      >
        <Navbar />
        <main>
          <motion.section
            id="hero"
            variants={sectionSlideIn}
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
            transition={{ delay: 0.1 }} // Staggered delay for each section
          >
            <HeroSection />
          </motion.section>

          <motion.section
            id="about-us"
            variants={sectionSlideIn}
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
            transition={{ delay: 0.2 }}
          >
            <AboutUs />
          </motion.section>
          <motion.section
            id="why-choose-us"
            variants={sectionSlideIn}
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
            transition={{ delay: 0.8 }}
          >
            <WhyChooseUs />
          </motion.section>
          <motion.section
            id="projects"
            variants={sectionSlideIn}
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
            transition={{ delay: 0.3 }}
          >
            <Projects />
          </motion.section>

          <motion.section
            id="tools-approach"
            variants={sectionSlideIn}
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
            transition={{ delay: 0.4 }}
          >
            <ToolsApproach />
          </motion.section>

          <motion.section
            id="team"
            variants={sectionSlideIn}
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
            transition={{ delay: 0.5 }}
          >
            <Team />
          </motion.section>

          <motion.section
            id="awards"
            variants={sectionSlideIn}
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
            transition={{ delay: 0.6 }}
          >
            <Awards />
          </motion.section>

          <motion.section
            id="career"
            variants={sectionSlideIn}
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
            transition={{ delay: 0.7 }}
          >
            <Career />
          </motion.section>

          <motion.section
            id="contact-us"
            variants={sectionSlideIn}
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
            transition={{ delay: 0.8 }}
          >
            <ContactUs />

          </motion.section>
    
        </main>
        <Footer />
      </motion.div>
    </>
  )
}