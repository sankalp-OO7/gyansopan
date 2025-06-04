"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import lottie-react
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Animated text component for letter-by-letter animation
const AnimatedText = ({ text, className, delay = 0 }) => {
  const letters = text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
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
            scale: 1.2,
            color: "#34d399",
            transition: { duration: 0.3 }
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Floating particles component
const FloatingParticles = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 16;
  const particles = Array.from({ length: particleCount }, (_, i) => i);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (dimensions.width === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-30"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            y: [null, -100, null],
            x: [null, Math.random() * 80 - 40, null],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// 3D Card component with hover effects
const Card3D = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setMousePosition({ x: rotateY, y: rotateX });
  };

  return (
    <motion.div
      ref={ref}
      className={`transform-gpu perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      animate={{
        rotateX: isHovered ? mousePosition.y : 0,
        rotateY: isHovered ? mousePosition.x : 0,
        scale: isHovered ? 1.03 : 1,
      }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="relative"
        animate={{ z: isHovered ? 40 : 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default function AboutUs() {
  const [animationData, setAnimationData] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-120px" });

  // Load the Lottie animation
  useEffect(() => {
    fetch("/lote-anime/about.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(setAnimationData)
      .catch((error) => console.error("Failed to load Lottie animation:", error));
  }, []);

  // Determine mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle mouse movement for radial gradient background
  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
  };

  // Variants for staggered word animation
  const paragraphVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.015, delayChildren: 0.1 }
    }
  };
  const paragraphChildVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  const splitParagraphIntoAnimatedWords = (text) =>
    text.split(" ").map((word, index) => (
      <motion.span
        key={index}
        variants={paragraphChildVariants}
        className="inline-block whitespace-nowrap mr-[0.2em]"
      >
        {word}
      </motion.span>
    ));

  return (
    <motion.section
      ref={containerRef}
      id="about-us"
      className="relative flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen gap-6 px-4 py-8 lg:py-24 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        minHeight: "100dvh",
        background: isMobile
          ? `linear-gradient(135deg, #0a0a0a 0%, #1f2937 25%, #111827 50%, #0a0a0a 100%)`
          : `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
             rgba(52, 211, 153, 0.1) 0%, 
             rgba(16, 185, 129, 0.1) 25%, 
             rgba(34, 197, 94, 0.1) 50%, 
             transparent 70%),
             linear-gradient(135deg, #0a0a0a 0%, #1f2937 25%, #111827 50%, #0a0a0a 100%)`,
      }}
    >
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Geometric Shapes (hidden on mobile) */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-12 left-8 w-20 h-20 sm:w-32 sm:h-32 border border-green-400/30 rounded-full"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          <motion.div
            className="absolute bottom-16 right-8 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-emerald-400/20 to-lime-400/20 rounded-md"
            animate={{
              rotate: -360,
              y: [-10, 10, -10],
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </>
      )}

      <div className="relative flex flex-col-reverse lg:flex-row items-center justify-center w-full h-full max-w-7xl mx-auto px-4 sm:px-6 z-10">
        {/* Left: Lottie Animation (swapped) */}
        <motion.div
          className="flex-1 flex items-center justify-center w-full lg:max-w-none mb-8 lg:mb-0"
          initial={{ opacity: 0, scale: 0.8, rotateY: isMobile ? 0 : -90 }}
          animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
          transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
        >
          <Card3D>
            <motion.div
              className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-800/30 to-slate-700/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-slate-600/30"
              animate={!isMobile ? {
                boxShadow: [
                  "0 0 20px rgba(16, 185, 129, 0.3)",
                  "0 0 40px rgba(34, 197, 94, 0.3)",
                  "0 0 20px rgba(16, 185, 129, 0.3)",
                ],
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <AnimatePresence>
                {animationData && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Lottie
                      animationData={animationData}
                      loop
                      className="w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px]"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Orbital rings (hidden on mobile) */}
              {!isMobile && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    className="absolute w-[125%] h-[125%] border border-green-400/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute w-[145%] h-[145%] border border-lime-400/20 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              )}
            </motion.div>
          </Card3D>
        </motion.div>

        {/* Right: Text Content (swapped) */}
        <motion.div
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-2xl lg:max-w-none"
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card3D className="w-full max-w-xl">
            <motion.div
              className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-700/50"
              whileHover={!isMobile ? {
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              } : {}}
            >
              <AnimatedText
                text="About Us & Our Mission"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-green-400 to-green-500 mb-4 sm:mb-6 leading-tight"
                delay={0.5}
              />
              
              {/* Glowing underline */}
              <motion.div
                className="h-0.5 sm:h-1 bg-gradient-to-r from-green-400 to-lime-400 rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 1 }}
              />
            </motion.div>
          </Card3D>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="w-full max-w-xl lg:max-w-2xl mt-4 sm:mt-6"
          >
            <motion.p
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light mb-4 sm:mb-6 leading-relaxed"
            >
              {splitParagraphIntoAnimatedWords("At Chainworks.io, our mission is to empower enterprises and governments to embrace the transformative potential of blockchain technology.")}
            </motion.p>

            <motion.p
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-4 sm:mb-6 leading-relaxed"
            >
              {splitParagraphIntoAnimatedWords("By focusing on innovative, secure, and scalable solutions, we aim to revolutionize the way businesses operate, ensuring transparency, efficiency, and trust.")}
            </motion.p>

            <motion.p
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 leading-relaxed"
            >
              {splitParagraphIntoAnimatedWords("With over 15 years of collective expertise in product research, development, and implementation, we are committed to guiding our clients from ideation to execution, helping them thrive in a rapidly evolving digital economy.")}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
