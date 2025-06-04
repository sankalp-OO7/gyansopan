'use client'; // This component uses Framer Motion, so it needs to be a client component

import React from 'react';
import { motion } from 'framer-motion';

// --- Framer Motion Variants ---

// Variants for the overall footer section
const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

// Variants for the sun-like semicircle animation
const semicircleVariants = {
  hidden: { scale: 0, opacity: 0, rotate: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 360, // Full rotation
    transition: {
      duration: 25, // Long duration for subtle continuous animation
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

// Variants for the copyright text animation
const copyrightVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

// Variants for the logo/icon animation
const logoVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring", // Bouncy effect
      stiffness: 120,
      damping: 15,
    },
  },
  pulse: {
    scale: [1, 1.05, 1], // Subtle pulse effect
    opacity: [1, 0.9, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1.5, // Start pulsing after initial animation
    },
  },
};


// --- Footer Component ---
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      // Changed background to a consistent black theme with subtle dark gray gradient
      className="relative w-full py-8 md:py-12 bg-gradient-to-br from-black via-gray-950 to-black text-white shadow-2xl mt-0 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerVariants}
    >
      {/* Sun-like Semicircle Effect - Adjusted for a more subtle glow on this darker background */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[180vw] h-[90vw] md:w-[140vw] md:h-[70vw] /* Even larger */
                   rounded-t-full bg-gradient-to-t from-blue-400/10 to-purple-600/0 dark:from-blue-600/5 dark:to-purple-800/0 /* Softer blue/purple glow */
                   filter blur-3xl opacity-40 z-0 /* Reduced opacity and blur for subtlety */
                   animate-pulse-slow" /* Added a subtle pulse animation */
        variants={semicircleVariants}
        initial="hidden"
        animate="visible"
        style={{
          borderTopLeftRadius: '50% 100%',
          borderTopRightRadius: '50% 100%',
          transformOrigin: 'bottom center',
        }}
      />

      {/* Subtle Background Grid Pattern - Reduced opacity for more subtlety on dark background */}
      <div
        className="absolute inset-0 z-0 opacity-2" /* Further reduced opacity for extreme subtlety */
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)', // Lighter grid for dark background
          backgroundSize: '20px 20px',
          backgroundBlendMode: 'overlay',
        }}
      />

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center">
        {/* Logo/Icon Section - Changed background to a blue/white gradient for contrast */}
        <motion.div
          className="mb-8 p-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg flex items-center justify-center" /* Blue gradient for logo background */
          variants={logoVariants}
          initial="hidden"
          animate={["visible", "pulse"]} /* Play both initial and pulse animations */
        >
          {/* Favicon for logo */}
          <img
            src="/favicon.ico" // Using favicon.ico as requested
            alt="Chainworks Logo"
            className="w-12 h-12 rounded-full" // Ensure favicon is rounded and sized appropriately
          />
        </motion.div>

        {/* Copyright Text - Changed to white for high contrast */}
        <motion.span className="text-white text-lg md:text-xl font-semibold tracking-wide" variants={copyrightVariants}>
          © {currentYear} Chainworks. All rights reserved.
        </motion.span>

        {/* Subtle Separator Line - Changed to a vibrant blue for effect */}
        <motion.div
          className="w-32 h-1.5 bg-blue-400 rounded-full mt-6 mb-4 shadow-md" /* Using a vibrant blue for the line */
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
        />

        {/* Tagline/Mission Statement - Removed as requested */}
      </div>
    </motion.footer>
  );
}