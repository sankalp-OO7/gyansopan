"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

// --- Reusable Utility Component (copied for context) ---
// In a real project, this would ideally be imported from a shared components directory.

// Animated text component for letter-by-letter animation
const AnimatedText = ({ text, className, delay = 0 }) => {
  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 7,
        stiffness: 140,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 7,
        stiffness: 140,
      },
    },
  };

  return (
    <motion.div
      className={`${className} text-wrap`} // Ensures words don't split, and lines are balanced
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
            scale: 1.5,
            color: "#ff77a9",
            textShadow: "0 0 12px rgba(255, 119, 169, 0.8)",
            transition: { duration: 0.1 },
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- New Components for this Section's Visuals ---

const FloatingDecorativeElement = ({ content, className, delay = 0, duration = 5 }) => (
  <motion.div
    className={`${className} absolute text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 opacity-60 filter blur-[1.5px] pointer-events-none`}
    initial={{ opacity: 0, y: 0, scale: 0.8 }}
    animate={{
      opacity: [0.6, 0.9, 0.6],
      y: [0, -20, 0],
      scale: [0.9, 1.1, 0.9],
      rotate: [0, 5, -5, 0]
    }}
    transition={{
      delay,
      duration: duration + Math.random() * 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {content}
  </motion.div>
);

const RotatedSquare = ({ className, delay = 0, duration = 4 }) => (
  <motion.div
    className={`${className} w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-300 to-purple-400 opacity-70 transform rotate-45 blur-sm`}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: [1, 1.1, 1], rotate: [45, 60, 45] }}
    transition={{ delay, duration, repeat: Infinity, ease: "easeInOut" }}
  />
);

// --- Main Contact Us Section Component ---

export default function ContactUsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-150px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <motion.section
      ref={containerRef}
      id="contact-us"
      className="relative flex flex-col items-center justify-center min-h-screen gap-12 px-4 sm:px-10 py-16 sm:py-28 lg:py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: isMobile
          ? `linear-gradient(135deg, #e3f2fd 0%, #ffe0f6 50%, #e0f7fa 100%)`
          : `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              rgba(173, 216, 230, 0.5) 0%,   /* Light Blue */
              rgba(255, 192, 203, 0.5) 20%, /* Light Pink */
              rgba(144, 238, 144, 0.5) 40%,  /* Light Green */
              transparent 70%),
              linear-gradient(135deg, 
              #f0f8ff 0%, /* Alice Blue */
              #fdf5e6 25%, /* Old Lace */
              #ffe4e1 50%, /* Misty Rose */
              #e0f7fa 100%)`, // Light Cyan
      }}
    >
      {/* Decorative Elements (hidden on mobile) */}
      {!isMobile && (
        <>
          <FloatingDecorativeElement content="B" className="top-[10%] left-[10%]" delay={0.3} />
          <RotatedSquare className="top-[15%] right-[15%]" delay={0.7} />
          <FloatingDecorativeElement content="C" className="bottom-[20%] left-[8%]" delay={1.1} />
          <FloatingDecorativeElement content="4" className="top-[25%] right-[5%]" delay={0.9} />
          <FloatingDecorativeElement content="1" className="bottom-[10%] right-[10%]" delay={1.5} />
        </>
      )}

      {/* Main Content Container */}
      <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-10 z-10 text-center space-y-12 sm:space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <AnimatedText
            text="Want to learn more?"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 mb-4"
            delay={0.5}
          />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 drop-shadow-sm">GyanSopan</h2>
          <p className="text-xl sm:text-2xl text-gray-800 font-semibold mt-4">Reach out!</p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl max-w-lg mx-auto border border-blue-200"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4">Contact Details</h3>
          <div className="space-y-3 text-lg sm:text-xl font-medium text-gray-800">
            <p>
              Email:{" "}
              <a
                href="mailto:admin@gyansopan.com"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-300 underline"
              >
                admin@gyansopan.com
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:admin@fenlei.in"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-300 underline"
              >
                admin@fenlei.in
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href="tel:+919359022506"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-300 underline"
              >
+91 97663 74620
              </a>{" "}
              (Ms. Uttara Sawant)
            </p>
          </div>
        </motion.div>

        {/* Links Section */}
        <div className="flex flex-col lg:flex-row justify-center gap-6 sm:gap-8 max-w-5xl mx-auto w-full">
          {/* Policy Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex-1 bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-pink-200"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-pink-700 mb-4">Important Information</h3>
            <ul className="space-y-3 text-lg sm:text-xl font-medium text-gray-800">
              <li>
                <a
                  href="https://app.gyansopan.com/termsAndConditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800 transition-colors duration-300 underline"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="https://app.gyansopan.com/dataPolicy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800 transition-colors duration-300 underline"
                >
                  Data Policy
                </a>
              </li>
              <li>
                <a
                  href="https://app.gyansopan.com/privacyPolicy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800 transition-colors duration-300 underline"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </motion.div>

          {/* FAQs & Brochure */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex-1 bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-green-200"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-green-700 mb-4">Additional Information</h3>
            <ul className="space-y-3 text-lg sm:text-xl font-medium text-gray-800">
              <li>
                <a
                  href="https://app.gyansopan.com/faqs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 transition-colors duration-300 underline"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="https://drive.google.com/file/d/1pV3gcLrCcG4gKjYVs3pgNw_RoBdyqUpX/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 transition-colors duration-300 underline"
                >
                  GyanSopan Brochure
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}