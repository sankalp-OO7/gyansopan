"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

// Animated text component for letter-by-letter animation
const AnimatedText = ({ text, className, delay = 0 }) => {
  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay },
    },
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
      className={`${className}`}
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

// Floating particles component with optimized performance
const FloatingParticles = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particleCount =
    typeof window !== "undefined" && window.innerWidth < 768 ? 15 : 30;
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

  const colors = [
    "from-pink-300 to-rose-400",
    "from-yellow-300 to-amber-400",
    "from-blue-300 to-sky-400",
    "from-green-300 to-lime-400",
    "from-purple-300 to-violet-400",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className={`absolute w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r ${colors[particle % colors.length]} rounded-full opacity-70`}
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            scale: Math.random() * 0.8 + 0.5,
          }}
          animate={{
            y: [null, -150, null],
            x: [null, Math.random() * 50 - 25, null],
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// 3D Card component with optimized performance
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
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative"
        animate={{
          z: isHovered ? 30 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Floating Letter component
const FloatingLetter = ({ letter, className, delay = 0, duration = 5 }) => (
  <motion.div
    className={`${className} absolute text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 opacity-60 filter blur-[1.5px] pointer-events-none`}
    initial={{ opacity: 0, y: 0, scale: 0.8 }}
    animate={{
      opacity: [0.6, 0.9, 0.6],
      y: [0, -20, 0],
      scale: [0.9, 1.1, 0.9],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      delay,
      duration: duration + Math.random() * 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {letter}
  </motion.div>
);

// Shape components
const SemiCircleArc = ({ className, delay = 0, duration = 3 }) => (
  <motion.div
    className={`${className} w-10 h-5 sm:w-16 sm:h-8 rounded-t-full border-4 border-b-0`}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1, rotate: [0, 360, 0] }}
    transition={{ delay, duration, repeat: Infinity, ease: "linear" }}
  />
);

const RightTriangle = ({ className, delay = 0, duration = 4 }) => (
  <motion.div
    className={`${className} w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-300 to-orange-400 clip-path-[polygon(0%_100%,_100%_100%,_100%_0%)] opacity-70`}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: [1, 1.1, 1], rotate: [0, -15, 0] }}
    transition={{ delay, duration, repeat: Infinity, ease: "easeInOut" }}
  />
);

const SparkleShape = ({ className, delay = 0, duration = 2.5 }) => (
  <motion.div
    className={`${className} w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-300 to-sky-400 rounded-full opacity-80`}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: [1, 1.2, 1], rotate: [0, 90, 180, 270, 360] }}
    transition={{ delay, duration, repeat: Infinity, ease: "linear" }}
  />
);

export default function AboutUsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
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
      id="about-us"
      className="relative flex flex-col items-center justify-center py-8 sm:py-12 lg:py-16 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: isMobile
          ? `linear-gradient(135deg, #fff3e0 0%, #e0f7fa 50%, #fce4ec 100%)`
          : `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255, 223, 186, 0.3) 0%, rgba(255, 192, 203, 0.3) 20%, rgba(173, 216, 230, 0.3) 40%, transparent 70%), linear-gradient(135deg, #ffe4e6 0%, #d4f4e4 25%, #fefcbf 50%, #e0f2fe 100%)`,
      }}
    >
      <style jsx>{`
        .fancy-title {
          position: relative;
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          background: linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 15px rgba(236, 72, 153, 0.5), 0 0 30px rgba(139, 92, 246, 0.3);
          line-height: 1.2;
        }
        .fancy-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: linear-gradient(to right, #ec4899, #3b82f6);
          border-radius: 2px;
        }
        .sparkle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
          border-radius: 50%;
          pointer-events: none;
          animation: sparkle 1.5s infinite;
        }
        .sparkle-1 { top: -10px; left: 10%; animation-delay: 0s; }
        .sparkle-2 { top: 0; right: 15%; animation-delay: 0.5s; }
        .sparkle-3 { bottom: -20px; left: 20%; animation-delay: 1s; }
        @keyframes sparkle {
          0%, 100% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* Background Particles */}
      <FloatingParticles />

      {/* Floating Letters and Shapes (hidden on mobile for performance) */}
      {!isMobile && (
        <>
          <FloatingLetter letter="A" className="top-[10%] left-[5%]" delay={0.5} />
          <FloatingLetter letter="B" className="top-[15%] left-[12%]" delay={1.2} />
           <FloatingLetter letter="F" className="top-[20%] left-[2%]" delay={2.1} />
          <FloatingLetter letter="G" className="top-[25%] left-[10%]" delay={1.7} />
          <FloatingLetter letter="C" className="top-[8%] right-[5%]" delay={0.7} />
          <FloatingLetter letter="Q" className="top-[15%] right-[10%]" delay={1.5} />
           <FloatingLetter letter="R" className="top-[20%] right-[3%]" delay={2.3} />
          <FloatingLetter letter="M" className="top-[25%] right-[12%]" delay={1.9} />
          <FloatingLetter letter="N" className="top-1/2 left-[5%] -translate-y-1/2" delay={0.3} />
          <RightTriangle className="top-1/2 left-[10%] -translate-y-1/2" delay={0.9} />
           <FloatingLetter letter="P" className="bottom-[10%] left-[8%]" delay={0.6} />
           <FloatingLetter letter="N" className="bottom-[5%] left-[2%]" delay={2.0} />
          <FloatingLetter letter="B" className="bottom-[18%] left-[20%]" delay={0.9} />
           <FloatingLetter letter="F" className="bottom-[22%] right-[15%]" delay={1.8} />
          <FloatingLetter letter="G" className="bottom-[10%] right-[5%]" delay={2.5} />
          <FloatingLetter letter="R" className="bottom-[5%] right-[18%]" delay={0.7} />
          <FloatingLetter letter="A" className="bottom-[12%] right-[2%]" delay={1.3} />
          <FloatingLetter letter="M" className="bottom-[16%] left-[25%]" delay={2.2} />
          <FloatingLetter letter="C" className="bottom-[20%] left-[10%]" delay={1.6} />
          <FloatingLetter letter="Q" className="bottom-[3%] left-[12%]" delay={0.9} />
         </>
      )}

      {/* Main Content */}
      <div className="flex flex-col w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-6">
        {/* Section Title */}
        <div className="text-center relative">
          <h1 className="fancy-title text-4xl sm:text-5xl lg:text-6xl">
            About Us
            <span className="sparkle sparkle-1"></span>
            <span className="sparkle sparkle-2"></span>
            <span className="sparkle sparkle-3"></span>
          </h1>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.9 }}
          className="w-full max-w-2xl mx-auto mt-8"
        >
          <Card3D className="w-full">
            <div className="p-8 rounded-2xl bg-white/90 backdrop-blur-md ring-1 ring-gray-200 hover:ring-gray-300 transition-all shadow-lg hover:shadow-xl">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <img
                  src="/jiten-sir.png"
                  alt="Jitendra Sadangi, CEO"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-300"
                />
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Meet Our Founder</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-normal">
                    Jitendra Sadangi, an esteemed IIT Bombay alumnus, leads GyanSopan with over 10 years of experience. He served as an invigilator for the International Mathematics Olympiad UK 2024 and holds an impressive IIT JAM AIR 7 rank. In February 2023, he was honored with the Most Prominent Contributors to Innovation Award by the World Innovation Congress, recognizing his significant contributions to educational innovation.
                  </p>
                </div>
              </div>
            </div>
          </Card3D>
        </motion.div>
        {/* Main Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-2xl mx-auto"
        >
          <Card3D className="w-full">
            <div className="p-8 rounded-2xl bg-white/90 backdrop-blur-md ring-1 ring-gray-200 hover:ring-gray-300 transition-all shadow-lg hover:shadow-xl">
              <AnimatedText
                text="Exploring new avenues in academia benefits both teachers and students. Embracing novelty nurtures creativity, adaptability, and growth for everyone involved, enriching the educational experience overall."
                className="text-base sm:text-lg lg:text-xl font-medium text-gray-800 leading-relaxed italic whitespace-normal"
                delay={1.0}
              />
            </div>
          </Card3D>
        </motion.div>

        {/* Mission Statements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-xl ring-1 ring-gray-200 hover:ring-gray-300 transition-all shadow-sm hover:shadow-md"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">Our Origin</h3>
            <p className="text-gray-700 leading-relaxed whitespace-normal">
              GyanSopan was created by graduates from IIT Bombay with the initial purpose of supporting Olympiad Mathematics teachers and students.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-xl ring-1 ring-gray-200 hover:ring-gray-300 transition-all shadow-sm hover:shadow-md"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">Our Expansion</h3>
            <p className="text-gray-700 leading-relaxed whitespace-normal">
              The program has now broadened its scope to provide affordable assistance to all users on the platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-xl ring-1 ring-gray-200 hover:ring-gray-300 transition-all shadow-sm hover:shadow-md"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">Our Impact</h3>
            <p className="text-gray-700 leading-relaxed whitespace-normal">
              The collaboration between teachers and students enhances learning and plays a vital role in our nation's progress.
            </p>
          </motion.div>
        </div>

        {/* CEO Section */}
       
      </div>
    </motion.section>
  );
}