"use client"; // Added for client-side rendering compatibility if using Next.js App Router
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa'; // LinkedIn icon from react-icons/fa

// Placeholder image if a team member's image fails to load
// Ensure you have a placeholder image at this path or adjust accordingly.
const PLACEHOLDER_IMAGE = '/team/placeholder-person.png'; // Assuming a placeholder image exists in public/team/

// Base path for images as per your file structure
const IMAGE_BASE_PATH = '/team/'; 

// --- Data for Founders ---
const foundersData = [
  {
    name: "Jitendra Franciss Sadangi",
    position: "CEO",
    experiences: ["M.Sc Mathematics IIT Bombay"],
    imageName: "jitendra.jpg", // Only store the image file name
    linkedinUrl: "https://in.linkedin.com/in/jitendra-franciss-sadangi-045154a3",
  },
  {
    name: "Chandrakant Juluri",
    position: "CTO",
    experiences: ["MCA - VIT Pune"],
    imageName: "chandrakant.jpeg", 
    linkedinUrl: "https://www.linkedin.com/in/ketanbhokray",
  },
  {
    name: "Tejasharee Gaidhani",
    position: "COO",
    experiences: ["M.Sc Mathematics Pune University"],
    imageName: "tejashree.jpg", 
    linkedinUrl: "https://in.linkedin.com/in/tejashree-makarand-gaidhani-048a18196",
  },
  {
    name: "Sayali Chinchansure",
    position: "CMO",
    experiences: ["MPM Pune University"],
    imageName: "sayli.png", 
    linkedinUrl: "https://in.linkedin.com/in/tejashree-makarand-gaidhani-048a18196", 
  },
];

// --- Data for Team Members ---
const teamMembersData = [
  { name: "Uttara Sawant", imageName: "uttara.jpeg", linkedinUrl: "http://www.linkedin.com/in/uttaradsawant" },
  { name: "Purushottam Samleti", imageName: "purushotam.jpeg", linkedinUrl: "http://www.linkedin.com/in/purushottamsamleti" },
  { name: "Balu Gayake", imageName: "baluGayake.jpeg", linkedinUrl: "https://www.linkedin.com/in/balu-gayake/" },
  { name: "Premchand Sandangi", imageName: "premchand.jpeg", linkedinUrl: "https://www.linkedin.com/in/premchand-sandangi-0b0b3b1b4" },
  { name: "Prasad Patil", imageName: "prasadPatil.jpeg", linkedinUrl: "https://www.linkedin.com/in/imprasadpatil/" },
  { name: "Harikrishna Boomen", imageName: "harikrishna.jpg", linkedinUrl: "https://www.linkedin.com/in/harikrishnabomen" },
  { name: "Siddharth Chandekar", imageName: "sidhart.jpeg", linkedinUrl: "https://www.linkedin.com/in/siddharth-chandekar-0b0b3b1b4" },
  { name: "Sankalp Racchewar", imageName: "Sankalp.jpeg", linkedinUrl: "https://www.linkedin.com/in/sankalp-racchewar-440ba5293" },
  { name: "Snehal kathale", imageName: "snehal.jpeg", linkedinUrl: "https://www.linkedin.com/in/snehal-kathale-5662b4271" },
  { name: "Karan Dabhi", imageName: "karan.jpeg", linkedinUrl: "https://www.linkedin.com/in/karan-dabhi-308b12253" },
  { name: "Tanvi Indalkar", imageName: "tanvi.jpeg", linkedinUrl: "http://www.linkedin.com/in/tanvi-indalkar" },
  { name: "Pooja Rathi", imageName: "pooja.jpg", linkedinUrl: "https://www.linkedin.com/in/pooja-rathi-036248269?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { name: "Unnati Bansod", imageName: "unnati.jpeg", linkedinUrl: "https://www.linkedin.com/in/unnati-bansod-5b2236297" },
  { name: "Akshi Chandola", imageName: "akshi.jpeg", linkedinUrl: "https://www.linkedin.com/in/akshi-chandola-a8a968210?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" }
];

// --- Shared Framer Motion Variants ---
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
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", // Consistent shadow
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

const text3DVariants = {
  initial: {
    textShadow: "1px 1px 2px rgba(0,0,0,0.2)", // Subtle initial shadow
    y: 0,
  },
  animate: { // For constant subtle animation on text
    textShadow: [
      "1px 1px 2px rgba(0,0,0,0.2)",
      "2px 2px 4px rgba(0,0,0,0.3)",
      "1px 1px 2px rgba(0,0,0,0.2)",
    ],
    y: [0, -2, 0], // Slight bounce
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  hover: { // For a more pronounced effect on hover
    textShadow: "3px 3px 6px rgba(0,0,0,0.4)",
    y: -3,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  }
};

const pulseEffect = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1], // Gentle pulse
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
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
    filter: `blur(${Math.random() * 2}px)`, // Slightly more blur
  }),
  animate: (i) => ({
    opacity: [0.1 + Math.random() * 0.1, 0.2 + Math.random() * 0.15, 0.1 + Math.random() * 0.1], // Increased opacity
    scale: [0.2 + Math.random() * 0.2, 0.6 + Math.random() * 0.4, 0.2 + Math.random() * 0.2], // Increased scale
    y: -50,
    x: `+=${Math.random() * 200 - 100}`, // Subtle horizontal drift
    transition: {
      duration: 8 + Math.random() * 10, // Slower movement
      ease: "linear",
      repeat: Infinity,
      delay: Math.random() * 5,
    },
  }),
};

const numberOfBubbles = 60; // Significantly more bubbles
const bubbleColors = [
  "rgba(100, 180, 255, 0.15)", // Light blue with higher opacity
  "rgba(150, 255, 150, 0.15)", // Light green with higher opacity
  "rgba(255, 150, 150, 0.15)", // Light red with higher opacity
  "rgba(255, 255, 100, 0.15)", // Light yellow with higher opacity
];
const bubbleShadowColors = [
  "rgba(100, 180, 255, 0.3)",
  "rgba(150, 255, 150, 0.3)",
];

// --- Founder Card Component (Tailwind & Framer Motion) ---
const FounderCard = ({ name, position, experiences, imageName, linkedinUrl }) => {
  const imagePath = `${IMAGE_BASE_PATH}${imageName}`; // Construct full image path
  const [imgSrc, setImgSrc] = useState(imagePath);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImgSrc(PLACEHOLDER_IMAGE);
    setImageError(true);
  };

  return (
    <motion.div
      className="rounded-xl shadow-lg overflow-hidden bg-white/80 backdrop-blur-sm group cursor-pointer border border-blue-100 flex flex-col h-full perspective-1000" // Glassmorphism effect, subtle border
      variants={card3DVariants}
      initial="initial"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Image Container with Overlay */}
      <div className="relative h-64 overflow-hidden bg-blue-50 flex-shrink-0"> {/* Light blue background for image container */}
        <motion.div variants={pulseEffect} initial="initial" animate="animate" className="w-full h-full">
            {imageError ? (
            <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-400 text-center p-4">
                <span className="text-sm font-semibold">{name} <br/> (Image Failed to Load)</span>
            </div>
            ) : (
            <img
                src={imgSrc}
                alt={name}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                onError={handleImageError}
            />
            )}
        </motion.div>
        
        {/* Overlay for Linkedin Icon */}
        <motion.div
          className="absolute inset-0 bg-blue-600/70 flex items-center justify-center" // Slightly darker blue overlay for contrast
          variants={{
            initial: { opacity: 0 },
            hover: { opacity: 1, transition: { duration: 0.3 } }
          }}
          initial="initial"
          animate="initial" // Keep initial state until hovered
          whileHover="hover"
        >
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-300 transition-colors" // Lighter hover color
            aria-label={`LinkedIn profile of ${name}`}
          >
            <FaLinkedin size={40} /> 
          </a>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 text-center bg-white/90 flex-grow"> {/* Slightly transparent background */}
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-blue-800 font-bold text-sm mb-2">{position}</p> {/* Darker blue for prominence */}
        <div className="space-y-1">
          {experiences.map((exp, i) => (
            <p key={i} className="text-gray-700 text-xs">{exp}</p>  
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- Team Member Card Component (Tailwind & Framer Motion) ---
const TeamMemberCard = ({ name, imageName, linkedinUrl }) => {
  const imagePath = `${IMAGE_BASE_PATH}${imageName}`; // Construct full image path
  const [imgSrc, setImgSrc] = useState(imagePath);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImgSrc(PLACEHOLDER_IMAGE);
    setImageError(true);
  };

  // A slightly different variant for team members for subtle distinction
  const teamCardVariants = {
    initial: {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)",
    },
    hover: {
      scale: 1.05, // Slight increase
      rotateY: [0, 3, -3, 0],
      rotateX: [0, -3, 3, 0],
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
        yoyo: Infinity,
      },
    },
  };

  return (
    <motion.div
      className="rounded-xl shadow-md overflow-hidden group cursor-pointer flex flex-col h-full bg-white/80 backdrop-blur-sm border border-blue-100 perspective-1000" // Consistent light background/border
      variants={teamCardVariants}
      initial="initial"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="relative h-48 overflow-hidden bg-blue-50 flex-shrink-0">
        <motion.div variants={pulseEffect} initial="initial" animate="animate" className="w-full h-full">
            {imageError ? (
            <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-400 text-center p-4">
                <span className="text-sm font-semibold">{name} <br/> (Image Failed to Load)</span>
            </div>
            ) : (
            <img
                src={imgSrc}
                alt={name}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                onError={handleImageError}
            />
            )}
        </motion.div>
      </div>
      
      <div className={`p-3 flex items-center justify-center text-gray-800 text-center flex-grow bg-blue-500/10`}> {/* Soft blue transparent background */}
        <span className="font-semibold text-lg leading-tight">{name}</span>
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-700 hover:text-blue-500 transition-colors"
            aria-label={`LinkedIn profile of ${name}`}
          >
            <FaLinkedin size={20} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

// --- Main Team Component (Tailwind & Framer Motion) ---
export default function Team() {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

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

  return (
    <motion.section
      id="our-team"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
      // White light gradient background
      className="relative w-full px-6 py-12 max-w-7xl mx-auto my-16 overflow-hidden min-h-screen
                 bg-gradient-to-br from-white via-gray-50 to-blue-50" // Adjusted gradient for a soft, light feel
    >
      {/* Animated Bubbles (Motion Graphics) - Render only if window dimensions are available */}
      {windowDimensions.width > 0 && (
        <div className="absolute inset-0 z-0 pointer-events-none"> {/* z-0 for background */}
          {Array.from({ length: numberOfBubbles }).map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={bubbleVariants}
              initial="initial"
              animate="animate"
              className="absolute rounded-full"
              style={{
                width: `${10 + Math.random() * 20}px`,
                height: `${10 + Math.random() * 20}px`,
                backgroundColor: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
                boxShadow: `0 0 ${15 + Math.random() * 25}px ${bubbleShadowColors[Math.floor(Math.random() * bubbleShadowColors.length)]}`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content (Z-index ensures it's above bubbles) */}
      <div className="relative z-10"> {/* z-10 to bring content above background particles */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-blue-800 mb-4 font-serif" // Darker blue for prominence
          variants={itemVariants}
          initial="initial"
          animate="animate" // Apply constant text animation
          whileHover="hover" // Apply hover text animation
        >
          <motion.span variants={text3DVariants}>
            Our Team
          </motion.span>
        </motion.h2>
        <motion.p
          className="text-lg text-center text-gray-700 mb-12 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          The research and product development background of our team equips us to
          better manage our projects.
        </motion.p>

        {/* Founders Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
          {foundersData.map((founder, index) => (
            <FounderCard
              key={index}
              name={founder.name}
              position={founder.position}
              experiences={founder.experiences}
              imageName={founder.imageName} // Pass imageName instead of imagePath
              linkedinUrl={founder.linkedinUrl}
            />
          ))}
        </div>

        <motion.p
          className="text-lg text-center text-gray-700 mb-12 max-w-3xl mx-auto mt-16"
          variants={itemVariants}
        >
          Our key employees whose efforts make it all possible
        </motion.p>

        {/* Team Members Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {teamMembersData.map((member, index) => (
            <TeamMemberCard
              key={index}
              name={member.name}
              imageName={member.imageName} // Pass imageName instead of imagePath
              linkedinUrl={member.linkedinUrl}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}