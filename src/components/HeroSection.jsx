"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Animated text component for letter-by-letter animation
const AnimatedText = ({ text, className, delay = 0 }) => {
  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 120
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 120
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
            scale: 1.3,
            color: "#ff4081",
            transition: { duration: 0.2 }
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Floating particles component with vibrant colors
const FloatingParticles = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 12 : 25;
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

  const colors = ["from-yellow-400 to-orange-500", "from-cyan-400 to-blue-500", "from-pink-400 to-red-500"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className={`absolute w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r ${colors[particle % colors.length]} rounded-full opacity-40`}
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            y: [null, -120, null],
            x: [null, Math.random() * 80 - 40, null],
            scale: [1, 1.7, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
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
    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;

    setMousePosition({ x: rotateY, y: rotateX });
  };

  return (
    <motion.div
      ref={ref}
      className={`transform-gpu perspective-1200 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      animate={{
        rotateX: isHovered ? mousePosition.y : 0,
        rotateY: isHovered ? mousePosition.x : 0,
        scale: isHovered ? 1.08 : 1,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative"
        animate={{
          z: isHovered ? 60 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default function HeroSection() {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -60]);
  const y2 = useTransform(scrollY, [0, 300], [0, -120]);

  useEffect(() => {
    setIsLoading(true);
    fetch("/lote-anime/hero.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load animation");
        return res.json();
      })
      .then((data) => {
        setAnimationData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading Lottie animation:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  return (
    <motion.section
      ref={containerRef}
      id="hero"
      className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen gap-4 sm:gap-6 lg:gap-12 px-4 sm:px-6 py-8 sm:py-20 lg:py-24 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: isMobile
          ? `linear-gradient(135deg, #fff3e0 0%, #ffebee 25%, #e1f5fe 50%, #fff3e0 100%)`
          : `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              rgba(255, 235, 59, 0.2) 0%, 
              rgba(255, 87, 34, 0.2) 25%, 
              rgba(33, 150, 243, 0.2) 50%, 
              transparent 70%),
              linear-gradient(135deg, 
              #fff3e0 0%, 
              #ffebee 25%, 
              #e1f5fe 50%, 
              #fff3e0 100%)`,
      }}
    >
      {/* Animated Background Elements */}
      <FloatingParticles />

      {/* Geometric shapes in background - hidden on mobile for performance */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-10 sm:top-20 left-4 sm:left-20 w-16 h-16 sm:w-32 sm:h-32 border-2 border-yellow-400/40 rounded-[20%]"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 18, repeat: Infinity, ease: "linear" },
              scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ y: y1 }}
          />
          <motion.div
            className="absolute bottom-16 sm:bottom-32 right-4 sm:right-32 w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-r from-cyan-300/30 to-orange-300/30 rounded-[20%]"
            animate={{
              rotate: -360,
              y: [-15, 15, -15],
            }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ y: y2 }}
          />
        </>
      )}

      {/* Content Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full max-w-7xl mx-auto px-4 sm:px-6 z-10">
        {/* Left Content */}
        <motion.div
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-2xl lg:max-w-none mb-2 lg:mb-0"
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card3D className="w-full max-w-xl">
            <motion.div
              className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white/70 to-blue-100/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-cyan-300/50"
              whileHover={
                !isMobile
                  ? {
                      boxShadow: "0 20px 40px -10px rgba(255, 87, 34, 0.3)",
                    }
                  : {}
              }
            >
              <AnimatedText
                text="Welcome to"
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-1 sm:mb-2"
                delay={0.5}
              />
              <AnimatedText
                text="GYANSOPAN"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-2 sm:mb-4 leading-tight"
                delay={1.2}
              />
              {/* Glowing underline */}
              <motion.div
                className="h-0.5 sm:h-1 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 2 }}
              />
            </motion.div>
          </Card3D>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 2.5 }}
            className="w-full max-w-xl lg:max-w-2xl mt-4 sm:mt-6"
          >
            <AnimatedText
              text="An AI-powered tool has enhanced learning and performance for teachers and students."
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 font-medium mb-6 sm:mb-8 leading-relaxed"
              delay={2.8}
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 3.5 }}
          >
            <motion.a
              href="https://app.gyansopan.com/"
              className="relative px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm sm:text-base font-semibold rounded-lg overflow-hidden group"
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10">Log In</span>
            </motion.a>

            <motion.a
              href="https://app.gyansopan.com/"
              className="px-6 py-3 border-2 border-cyan-400 text-cyan-600 text-sm sm:text-base font-semibold rounded-lg hover:bg-cyan-100/50 transition-all duration-300"
              whileHover={
                !isMobile
                  ? {
                      scale: 1.05,
                      borderColor: "#ff4081",
                      color: "#ff4081",
                    }
                  : {
                      borderColor: "#ff4081",
                      color: "#ff4081",
                    }
              }
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Content - Lottie Animation */}
        <motion.div
          className="flex-1 flex items-center justify-center w-full lg:max-w-none mt-8 lg:mt-0"
          initial={{ opacity: 0, scale: 0.8, rotateY: isMobile ? 0 : 90 }}
          animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
          transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 120 }}
        >
          <Card3D>
            <motion.div
              className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white/60 to-cyan-100/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-yellow-300/40"
              animate={
                !isMobile
                  ? {
                      boxShadow: [
                        "0 0 25px rgba(255, 235, 59, 0.4)",
                        "0 0 45px rgba(33, 150, 243, 0.4)",
                        "0 0 25px rgba(255, 235, 59, 0.4)",
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <AnimatePresence>
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px]"
                  >
                    <img
                      src="/placeholder-kids.png"
                      alt="Loading fun animation..."
                      className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                    />
                    <span className="text-sm text-gray-600 mt-2">Loading fun...</span>
                  </motion.div>
                ) : animationData ? (
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
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px]"
                  >
                    <img
                      src="/placeholder-kids.png"
                      alt="Fun animation placeholder"
                      className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                    />
                    <span className="text-sm text-gray-600 mt-2">Let's learn!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Orbital rings around animation - hidden on mobile */}
              {!isMobile && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    className="absolute w-[120%] h-[120%] border-2 border-yellow-400/30 rounded-[20%]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute w-[140%] h-[140%] border-2 border-cyan-400/30 rounded-[20%]"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              )}
            </motion.div>
          </Card3D>
        </motion.div>
      </div>

      {/* Scroll indicator - hidden on mobile in landscape */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 4 }}
        >
          <motion.div
            className="flex flex-col items-center text-gray-600"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs sm:text-sm mb-2 font-medium">Scroll for fun!</span>
            <motion.div
              className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center"
              whileHover={{ borderColor: "#ff4081" }}
            >
              <motion.div
                className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
}