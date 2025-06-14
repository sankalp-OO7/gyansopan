"use client"; // This component uses Framer Motion, so it needs to be a client component

import React from "react";
import { motion } from "framer-motion";

// --- Framer Motion Variants ---

const footerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const semicircleVariants = {
  hidden: { scale: 0, opacity: 0, rotate: 0 },
  visible: {
    scale: 1,
    opacity: 0.3,
    rotate: 360,
    transition: {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

const copyrightVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } },
};

const logoVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
  pulse: {
    scale: [1, 1.03, 1],
    opacity: [1, 0.95, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1,
    },
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="
        relative
        w-full
        py-6 sm:py-8
        bg-gradient-to-r
          from-gray-900
          via-blue-900
          to-gray-900
        text-white
        overflow-hidden
        border-t border-gray-800
      "
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={footerVariants}
    >
      {/* Sun-like Semicircle Glow */}
      <motion.div
        className="
          absolute
          bottom-0
          left-1/2
          transform -translate-x-1/2
          w-[150vw]
          h-[75vw]
          md:w-[120vw]
          md:h-[60vw]
          rounded-t-full
          bg-gradient-to-t
            from-blue-500/20
            via-purple-500/10
            to-transparent
          filter
          blur-2xl
          z-0
        "
        variants={semicircleVariants}
        initial="hidden"
        animate="visible"
        style={{
          transformOrigin: "bottom center",
        }}
      />

      {/* Subtle Grid Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          backgroundBlendMode: "overlay",
        }}
      />

      {/* Footer Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-center sm:justify-between flex-col sm:flex-row">
        {/* Logo/Icon and Copyright */}
        <div className="flex items-center mb-4 sm:mb-0">
          <motion.div
            className="
              mr-3
              p-3
              rounded-md
              bg-gradient-to-br
                from-purple-600
                to-blue-700
              shadow-md
              flex
              items-center
              justify-center
            "
            variants={logoVariants}
            initial="hidden"
            animate={["visible", "pulse"]}
          >
            <img
              src="/favicon.ico"
              alt="GyanSopan Logo"
              className="w-8 h-8 rounded-md"
            />
          </motion.div>
          <motion.span
            className="text-sm sm:text-base font-medium tracking-wide"
            variants={copyrightVariants}
          >
            © {currentYear} Finlei GyanSopan. All rights reserved.
          </motion.span>
        </div>
      </div>
    </motion.footer>
  );
}
