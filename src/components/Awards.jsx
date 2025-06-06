"use client"; // Added for client-side rendering compatibility if using Next.js App Router
import React, { useState, useEffect } from "react"; // Added useEffect for window dimensions
import { motion } from "framer-motion"; // Added motion for animations
import MediaMarquee from "../../public/awards/media/MediaMarquee";
import ImageModal from "./ImageModal";

// Data for awards images - ENSURE THESE FILENAMES EXACTLY MATCH those in public/awards/media/
// Based on your folder structure, these are the files located in public/awards/media/
const awardsImagesData = [
  { id: 'dailyhunt', imageName: 'dailyhunt_logo.png' },
  { id: 'loksatta', imageName: 'loksatta_logo.png' },
   { id: 'maritimegw', imageName: 'maritimegw_logo.png' },
  { id: 'newsarticle', imageName: 'newsarticle.jpg' },
  { id: 'nidhi', imageName: 'nidhi.jpg' },
  { id: 'nttdata', imageName: 'nttdata.png' },
  { id: 'sine', imageName: 'sine.png' },
  { id: 'smart50', imageName: 'smart50.png' },
  { id: 'toi', imageName: 'toi_logo.webp' },
  { id: 'yahoonews', imageName: 'yahoonews_logo.png' },
  // Add any other specific "award" images you have in public/awards/media/
];

// --- Shared Framer Motion Variants for Awards Section ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      duration: 0.5,
    },
  },
};

const card3DVariants = {
  initial: {
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    y: 0,
  },
  hover: {
    scale: 1.05,
    rotateY: [0, 5, -5, 0], // Subtle 3D rotation
    rotateX: [0, -5, 5, 0],
    y: -5, // Slight lift
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)", // More prominent shadow
    transition: {
      duration: 0.4,
      ease: "easeOut",
      yoyo: Infinity, // For a continuous subtle hover effect
      boxShadow: { duration: 0.2 },
    },
  },
};

// --- Motion Graphics: Floating Bubbles (Adjusted for visibility) ---
const bubbleVariants = {
  initial: (i) => ({
    opacity: 0,
    scale: 0,
    x: Math.random() * (window.innerWidth || 1000),
    y: (window.innerHeight || 1000) + Math.random() * 50,
    filter: `blur(${Math.random() * 2}px)`,
  }),
  animate: (i) => ({
    opacity: [0.15 + Math.random() * 0.1, 0.3 + Math.random() * 0.2, 0.15 + Math.random() * 0.1], // Increased opacity
    scale: [0.3 + Math.random() * 0.2, 0.8 + Math.random() * 0.5, 0.3 + Math.random() * 0.2], // Increased scale
    y: -50,
    x: `+=${Math.random() * 200 - 100}`,
    transition: {
      duration: 8 + Math.random() * 10,
      ease: "linear",
      repeat: Infinity,
      delay: Math.random() * 5,
    },
  }),
};

const numberOfBubbles = 80; // Even more bubbles for a richer effect
const bubbleColors = [
  "rgba(150, 200, 255, 0.2)", // Lighter blue
  "rgba(200, 255, 200, 0.2)", // Lighter green
  "rgba(255, 200, 200, 0.2)", // Lighter red
  "rgba(255, 255, 150, 0.2)", // Lighter yellow
];
const bubbleShadowColors = [
  "rgba(150, 200, 255, 0.4)",
  "rgba(200, 255, 200, 0.4)",
];


const Awards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState('');
  const [currentImageAlt, setCurrentImageAlt] = useState('');
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 }); // For particles

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });

      const handleResize = () => {
        setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const openModal = (src, alt) => {
    setCurrentImageSrc(src);
    setCurrentImageAlt(alt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImageSrc('');
    setCurrentImageAlt('');
  };

  return (
    <motion.section
      id="awards-recognition"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
      className="relative w-full px-6 py-12 max-w-7xl mx-auto my-16 overflow-hidden min-h-screen
                 bg-gradient-to-br from-white via-blue-50 to-gray-50 rounded-lg shadow-xl" // Light gradient background, rounded corners, shadow
    >
      {/* Animated Bubbles (Motion Graphics) */}
      {windowDimensions.width > 0 && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {Array.from({ length: numberOfBubbles }).map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={bubbleVariants}
              initial="initial"
              animate="animate"
              className="absolute rounded-full"
              style={{
                width: `${15 + Math.random() * 25}px`, // Larger bubbles
                height: `${15 + Math.random() * 25}px`,
                backgroundColor: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
                boxShadow: `0 0 ${20 + Math.random() * 30}px ${bubbleShadowColors[Math.floor(Math.random() * bubbleShadowColors.length)]}`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content (Z-index ensures it's above bubbles) */}
      <div className="relative z-10 text-center"> {/* Centered text */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-patua-one text-blue-800 mb-4 drop-shadow-md" // Larger, more prominent heading
          variants={itemVariants}
        >
          Awards & Recognition
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Some recognition we have received for our products.
        </motion.p>

        {/* Awards Images Carousel */}
        <motion.div
          className="flex justify-center items-center mt-8"
          variants={itemVariants}
        >
          <div className="w-full overflow-x-auto flex gap-6 p-4 scrollbar-hide"> {/* Increased gap */}
            {awardsImagesData.map((award) => {
              const imgSrc = `/awards/media/${award.imageName}`; // Corrected path to public/awards/media/
              return (
                <motion.div
                  key={award.id}
                  className="flex-shrink-0 w-64 h-48 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center cursor-pointer border border-blue-200 perspective-1000" // Glassmorphism, border
                  variants={card3DVariants} // Apply 3D card effects
                  initial="initial"
                  whileHover="hover"
                  onClick={() => openModal(imgSrc, award.id)}
                >
                  <img
                    src={imgSrc}
                    alt={award.id}
                    className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105" // Padding for image
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.h3
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mt-16 mb-8 drop-shadow-sm" // Larger heading
          variants={itemVariants}
        >
          Media our products have been featured in
        </motion.h3>

        {/* Media Marquee */}
        <motion.div className="w-full mt-6" variants={itemVariants}>
          <MediaMarquee />
        </motion.div>
      </div>

      {/* Image Modal Component */}
      <ImageModal
        isOpen={isModalOpen}
        imageSrc={currentImageSrc}
        onClose={closeModal}
        altText={currentImageAlt}
      />
    </motion.section>
  );
};

export default Awards;