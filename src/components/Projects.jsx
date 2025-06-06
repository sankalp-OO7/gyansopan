"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Enhanced Animated text component with better responsiveness
const AnimatedText = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.8,
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2 md:mr-3"
          variants={child}
          whileHover={{
            scale: 1.1,
            color: "#ff6b9d",
            textShadow: "0 0 15px rgba(255, 107, 157, 0.8)",
            transition: { duration: 0.2 },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Enhanced floating particles with more child-friendly shapes
const FloatingParticles = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particleCount = typeof window !== "undefined" && window.innerWidth < 768 ? 30 : 60;
  const particles = Array.from({ length: particleCount }, (_, i) => i);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (dimensions.width === 0) return null;

  const shapes = ["star", "heart", "circle", "diamond"];
  const colors = [
    "from-pink-400 to-rose-400",
    "from-purple-400 to-violet-400",
    "from-green-400 to-emerald-400",
    "from-yellow-400 to-orange-400",
    "from-blue-400 to-cyan-400",
    "from-red-400 to-pink-400",
  ];

  const getShapeClass = (shape) => {
    switch (shape) {
      case "star":
        return "clip-star";
      case "heart":
        return "rounded-full before:content-[''] before:absolute before:w-3 before:h-3 before:bg-inherit before:rounded-full before:-top-1 before:left-1 after:content-[''] after:absolute after:w-3 after:h-3 after:bg-inherit after:rounded-full after:-top-1 after:right-1";
      case "diamond":
        return "rotate-45";
      default:
        return "rounded-full";
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => {
        const shape = shapes[particle % shapes.length];
        const color = colors[particle % colors.length];
        
        return (
          <motion.div
            key={particle}
            className={`absolute w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r ${color} ${getShapeClass(shape)} opacity-70 shadow-lg`}
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
            }}
            animate={{
              y: [null, -200, null],
              x: [null, Math.random() * 150 - 75, null],
              scale: [1, 2.5, 1],
              opacity: [0.7, 1, 0.7],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        );
      })}
    </div>
  );
};

// Enhanced 3D Card with more playful effects
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
    const rotateX = (y - centerY) / 6;
    const rotateY = (centerX - x) / 6;

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
        scale: isHovered ? 1.08 : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative"
        animate={{
          z: isHovered ? 80 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default function HowToUseSection() {
  const [animationData, setAnimationData] = useState({
    courseContent: null,
    questionBank: null,
    imageQuestion: null,
  });
  const [isLoading, setIsLoading] = useState({
    courseContent: true,
    questionBank: true,
    imageQuestion: true,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -80]);
  const y2 = useTransform(scrollY, [0, 300], [0, -120]);

  useEffect(() => {
    const animations = [
      { key: "courseContent", path: "/lote-anime/course-content.json" },
      { key: "questionBank", path: "/lote-anime/question-bank.json" },
      { key: "imageQuestion", path: "/lote-anime/image-question.json" },
    ];

    animations.forEach(({ key, path }) => {
      setIsLoading((prev) => ({ ...prev, [key]: true }));
      fetch(path)
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to load ${key} animation`);
          return res.json();
        })
        .then((data) => {
          setAnimationData((prev) => ({ ...prev, [key]: data }));
          setIsLoading((prev) => ({ ...prev, [key]: false }));
        })
        .catch((error) => {
          console.error(`Error loading ${key} Lottie animation:`, error);
          setIsLoading((prev) => ({ ...prev, [key]: false }));
        });
    });
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
      id="how-to-use"
      className="relative flex flex-col items-center justify-center min-h-screen gap-12 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: isMobile
          ? `linear-gradient(135deg, 
              #fef3c7 0%, 
              #fde2e9 20%, 
              #e0f2fe 40%, 
              #d4edda 60%, 
              #f3e5f5 80%, 
              #fff2cc 100%)`
          : `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              rgba(255, 182, 193, 0.6) 0%, 
              rgba(152, 251, 152, 0.6) 25%, 
              rgba(255, 218, 185, 0.6) 50%, 
              rgba(173, 216, 230, 0.6) 75%, 
              transparent 85%),
              linear-gradient(135deg, 
              #fef3c7 0%, 
              #fde2e9 20%, 
              #e0f2fe 40%, 
              #d4edda 60%, 
              #f3e5f5 80%, 
              #fff2cc 100%)`,
      }}
    >
      {/* Enhanced Floating Particles */}
      <FloatingParticles />

      {/* Playful background shapes for desktop */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-20 left-16 w-20 h-20 lg:w-28 lg:h-28 bg-gradient-to-r from-pink-400/60 to-rose-400/60 clip-star shadow-2xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.4, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ y: y1 }}
          />
          <motion.div
            className="absolute top-32 right-20 w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-r from-purple-400/50 to-violet-400/50 rounded-full shadow-xl"
            animate={{
              rotate: [-360, 0],
              y: [-30, 30, -30],
              scale: [1, 1.3, 1],
            }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ y: y2 }}
          />
          <motion.div
            className="absolute bottom-32 left-24 w-12 h-12 lg:w-20 lg:h-20 bg-gradient-to-r from-green-400/50 to-emerald-400/50 rotate-45 shadow-lg"
            animate={{
              rotate: [45, 405],
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </>
      )}

      {/* Main Content Container */}
      <div className="flex flex-col w-full max-w-7xl mx-auto z-10 space-y-16 lg:space-y-24">
        {/* Section 1: Course Content Creation */}
        <motion.div
          className="flex flex-col xl:flex-row items-center justify-between gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <Card3D className="flex-1 w-full max-w-lg xl:max-w-md">
            <motion.div
              className="relative p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-white/90 to-pink-50/90 backdrop-blur-xl border-2 border-pink-200/70 shadow-2xl"
              whileHover={
                !isMobile
                  ? {
                      boxShadow: "0 35px 70px -20px rgba(255, 182, 193, 0.6)",
                      borderColor: "rgba(152, 251, 152, 0.8)",
                    }
                  : {}
              }
            >
              <AnimatePresence>
                {isLoading.courseContent ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px] mx-auto"
                  >
                    <img
                      src="/placeholder-kids.png"
                      alt="Loading magical animation..."
                      className="w-24 h-24 sm:w-32 sm:h-32 object-contain animate-bounce"
                    />
                    <span className="text-base sm:text-lg text-purple-700 mt-4 font-semibold animate-pulse">
                      Loading magic... ✨
                    </span>
                  </motion.div>
                ) : animationData.courseContent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.2 }}
                    transition={{ duration: 1.2, type: "spring" }}
                    className="mx-auto"
                  >
                    <Lottie
                      animationData={animationData.courseContent}
                      loop
                      className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px]"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px] mx-auto"
                  >
                    <img
                      src="/placeholder-kids.png"
                      alt="Fun learning placeholder"
                      className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                    />
                    <span className="text-base sm:text-lg text-blue-700 mt-4 font-semibold">
                      Let's learn together! 🎓
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Card3D>
          
          <motion.div
            className="flex-1 w-full max-w-2xl text-center xl:text-left mt-8 xl:mt-0"
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <AnimatedText
              text="Create Amazing Courses in Any Language"
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 mb-6 leading-tight"
              delay={0.7}
            />
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-gray-800 font-semibold leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Tutors can create wonderful learning modules in any language with clear goals and fun quizzes that make students excited to learn more! 🌟
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Section 2: Question Bank Access */}
        <motion.div
          className="flex flex-col xl:flex-row-reverse items-center justify-between gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <Card3D className="flex-1 w-full max-w-lg xl:max-w-md">
            <motion.div
              className="relative p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-white/90 to-green-50/90 backdrop-blur-xl border-2 border-green-200/70 shadow-2xl"
              whileHover={
                !isMobile
                  ? {
                      boxShadow: "0 35px 70px -20px rgba(152, 251, 152, 0.6)",
                      borderColor: "rgba(255, 218, 185, 0.8)",
                    }
                  : {}
              }
            >
              <AnimatePresence>
                {isLoading.questionBank ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px] mx-auto"
                  >
                    <img
                      src="/placeholder-kids.png"
                      alt="Loading wonderful animation..."
                      className="w-24 h-24 sm:w-32 sm:h-32 object-contain animate-spin"
                    />
                    <span className="text-base sm:text-lg text-green-700 mt-4 font-semibold animate-pulse">
                      Loading wonder... 🎈
                    </span>
                  </motion.div>
                ) : animationData.questionBank ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.2 }}
                    transition={{ duration: 1.2, type: "spring" }}
                    className="mx-auto"
                  >
                    <Lottie
                      animationData={animationData.questionBank}
                      loop
                      className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px]"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px] mx-auto"
                  >
                    <img
                      src="/placeholder-kids.png"
                      alt="Question adventure placeholder"
                      className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                    />
                    <span className="text-base sm:text-lg text-green-700 mt-4 font-semibold">
                      Question adventure! 🎯
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Card3D>
          
          <motion.div
            className="flex-1 w-full max-w-2xl text-center xl:text-left mt-8 xl:mt-0"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 1.0 }}
          >
            <AnimatedText
              text="Access a Treasure Bank of Questions"
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 mb-6 leading-tight"
              delay={1.3}
            />
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-gray-800 font-semibold leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.7 }}
            >
              Organize super cool questions by topics and difficulty levels to help students grow! Keep questions fresh, fun, and perfectly matched for amazing learning adventures! 🚀
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Section 3: Image-Based Question Entry */}
        <motion.div
          className="flex flex-col xl:flex-row items-center justify-between gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 1.3 }}
        >
          <Card3D className="flex-1 w-full max-w-lg xl:max-w-md">
            <motion.div
              className="relative p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl border-2 border-blue-200/70 shadow-2xl"
              whileHover={
                !isMobile
                  ? {
                      boxShadow: "0 35px 70px -20px rgba(173, 216, 230, 0.6)",
                      borderColor: "rgba(255, 182, 193, 0.8)",
                    }
                  : {}
              }
            >
              <AnimatePresence>
                {isLoading.imageQuestion ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px] mx-auto"
                  >
                    <img
                      src="/placeholder-kids.png"
                      alt="Loading fantastic animation..."
                      className="w-24 h-24 sm:w-32 sm:h-32 object-contain animate-pulse"
                    />
                    <span className="text-base sm:text-lg text-blue-700 mt-4 font-semibold animate-bounce">
                      Loading magic... 🎨
                    </span>
                  </motion.div>
                ) : animationData.imageQuestion ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.2 }}
                    transition={{ duration: 1.2, type: "spring" }}
                    className="mx-auto"
                  >
                    <Lottie
                      animationData={animationData.imageQuestion}
                      loop
                      className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px]"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px] mx-auto"
                  >
                    <img
                      src="/placeholder-kids.png"
                      alt="Picture perfect placeholder"
                      className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                    />
                    <span className="text-base sm:text-lg text-blue-700 mt-4 font-semibold">
                      Picture perfect! 📸
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Card3D>
          
          <motion.div
            className="flex-1 w-full max-w-2xl text-center xl:text-left mt-8 xl:mt-0"
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 1.5 }}
          >
            <AnimatedText
              text="Super Easy Picture Question Magic"
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-purple-500 mb-6 leading-tight"
              delay={1.8}
            />
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-gray-800 font-semibold leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 2.2 }}
            >
              GYANSOPAN's amazing picture question feature lets you upload any question image, and like magic, it automatically goes into your question treasure chest for super easy use! 🎪✨
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}