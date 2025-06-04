"use client"; // Added for client-side rendering compatibility if using Next.js App Router
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import { Dialog } from '@mui/material'; // Moved from Security component
// import x{ X } from 'lucide-react'; // Moved from Security component

// PDF imports - Moved from Security component
// import pdfDisclaimer from '../attachments/disclaimer.pdf';
// import pdfDatapolicy from '../attachments/datapolicy.pdf';
// import pdfBlockchain from '../attachments/blockchain.pdf';

// Dummy image data for demonstration, replace with actual imports or Gatsby query results
const toolsImages = [
  { id: '1', name: 'Quorum', src: '/tools-images/1_quorum_logo.png' },
  { id: '2', name: 'Fabric', 'src': '/tools-images/2_fabric_logo.png' },
  { id: '3', name: 'AWS', src: '/tools-images/3_aws_logo.png' },
  { id: '4', name: 'IBM Cloud', src: '/tools-images/4_ibmcloud_logo.png' },
  { id: '5', name: 'Serverless', src: '/tools-images/5_serverless_logo.png' },
  { id: '6', name: 'Node.js', src: '/tools-images/6_nodejs_logo.png' },
  { id: '7', name: 'React', src: '/tools-images/7_react_logo.png' },
  { id: '8', name: 'Mongo', src: '/tools-images/8_mongo_logo.png' },
  { id: '9', name: 'Gatsby', src: '/tools-images/9_gatsby_logo.png' },
  { id: '10', name: 'GraphQL', src: '/tools-images/91_graphql_logo.png' },
  { id: '11', name: 'Kubernetes', src: '/tools-images/92_kubernetes_logo.png' },
  { id: '13', 'name': 'React Native', src: '/tools-images/95_reactnative_logo.png' },
  { id: '14', 'name': 'Android', src: '/tools-images/96_android_logo.png' },
];

// Define paths to your Lottie animation JSON files in the public directory
const LOTTIE_ANIMATION_PATHS = {
  analysis: "/lote-anime/tools/analysis.json",
  development: "/lote-anime/tools/development.json",
  iteration: "/lote-anime/tools/iterate.json",
};

const animationCardsInitialData = [
  {
    title: "Analysis",
    description:
      "We prioritize identifying the correct problem before attempting a solution. We collaborate with customers to understand systems, stakeholders, and define an initial development scope.",
    animationPath: LOTTIE_ANIMATION_PATHS.analysis,
  },
  {
    title: "Development",
    description:
      "Our expertise in development frameworks allows us to create scaffolding projects for feedback. This iterative process ensures better problem-solving.",
    animationPath: LOTTIE_ANIMATION_PATHS.development,
  },
  {
    title: "Iteration",
    description:
      "We design modular, extensible products that evolve with stakeholder feedback. Starting with a solid core, our solutions grow with incremental updates.",
    animationPath: LOTTIE_ANIMATION_PATHS.iteration,
  },
];

// // Data for Security section - Moved from Security component
// const policies = [
//   {
//     key: 'PDFDATAPOLICY',
//     label: 'Data Policy',
//     file: pdfDatapolicy,
//   },
//   {
//     key: 'PDFBLOCKCHAIN',
//     label: 'Blockchain Policy',
//     file: pdfBlockchain,
//   },
//   {
//     key: 'PDFDISCLAIMER',
//     label: 'Disclaimer',
//     file: pdfDisclaimer,
//   },
// ];

const points = [
  'Data anonymization with single SPOC access.',
  'Role-based DB access with expirations.',
  'Industry-standard security practices using Snyk.',
  'CERT-in audits for OWASP compliance.',
  'HIPAA-compliant systems with SSO options.',
  'Data stored in region-defined HIPAA-compliant databases.',
];


const NewApproachComponent = () => {
  const [animationDataLoaded, setAnimationDataLoaded] = useState([]);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  // State for Security section - Moved from Security component
  const [open, setOpen] = useState(false);
  const [currentPdf, setCurrentPdf] = useState(null);

  // Function for Security section - Moved from Security component
  const openPdf = (file) => {
    setCurrentPdf(file);
    setOpen(true);
  };

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

  useEffect(() => {
    const fetchLottieData = async () => {
      const loadedData = await Promise.all(
        animationCardsInitialData.map(async (card) => {
          try {
            const response = await fetch(card.animationPath);
            if (!response.ok) {
              throw new Error(`Failed to fetch ${card.animationPath}: ${response.statusText}`);
            }
            const data = await response.json();
            return { ...card, animationData: data };
          } catch (error) {
            console.error("Error loading Lottie animation:", error);
            return { ...card, animationData: null };
          }
        })
      );
      setAnimationDataLoaded(loadedData);
    };

    fetchLottieData();
  }, []);

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

  const itemChildVariants = {
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
      boxShadow: "0 8px 16px rgba(0, 255, 0, 0.1)",
      y: 0,
    },
    hover: {
      scale: 1.1,
      rotateY: [0, 10, -10, 0],
      rotateX: [0, -10, 10, 0],
      y: -10,
      boxShadow: "0 30px 60px rgba(0, 255, 0, 0.6)",
      transition: {
        duration: 0.5,
        ease: "easeOut",
        yoyo: 1,
        boxShadow: {
          duration: 0.3,
        }
      },
    },
  };

  const text3DVariants = {
    initial: {
      textShadow: "2px 2px #0f0",
      y: 0,
    },
    hover: {
      textShadow: [
        "2px 2px #0f0",
        "5px 5px #0f0",
        "10px 10px #0f0",
        "5px 5px #0f0",
        "2px 2px #0f0",
      ],
      y: [0, -5, 0, 5, 0],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const lottieOptions = (animationData) => ({
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });

  const toolBgColors = [
    "bg-gray-100", "bg-blue-100", "bg-indigo-100", "bg-purple-100",
    "bg-pink-100", "bg-yellow-100", "bg-green-100", "bg-red-100",
    "bg-gray-200", "bg-blue-200", "bg-indigo-200", "bg-purple-200",
    "bg-pink-200", "bg-yellow-200",
  ];

  const bubbleVariants = {
    initial: (i) => ({
      opacity: 0,
      scale: 0,
      x: windowDimensions.width ? windowDimensions.width * Math.random() : Math.random() * 1000,
      y: windowDimensions.height ? windowDimensions.height + Math.random() * 50 : 1000 + Math.random() * 50,
      filter: `blur(${Math.random() * 2}px)`,
    }),
    animate: (i) => ({
      opacity: [0.05 + Math.random() * 0.05, 0.1 + Math.random() * 0.1, 0.05 + Math.random() * 0.05],
      scale: [0.1 + Math.random() * 0.1, 0.5 + Math.random() * 0.5, 0.1 + Math.random() * 0.1],
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

  const numberOfBubbles = 30;

  const bubbleColors = [
    "rgba(0, 255, 0, 0.08)",
    "rgba(0, 255, 0, 0.1)",
    "rgba(0, 200, 0, 0.08)",
    "rgba(0, 150, 255, 0.08)",
    "rgba(0, 100, 255, 0.1)",
    "rgba(50, 200, 255, 0.08)",
  ];

  const bubbleShadowColors = [
    "rgba(0, 255, 0, 0.3)",
    "rgba(0, 200, 255, 0.3)",
  ];

  return (
    <motion.section
      id="tools-approach"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className="relative w-full pt-32 pb-16 px-4 md:px-8 overflow-hidden min-h-screen
                 bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900 
                 animate-background-shift"
    >
      {/* Animated Bubbles (using Framer Motion for each bubble) */}
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
                width: `${5 + Math.random() * 15}px`,
                height: `${5 + Math.random() * 15}px`,
                backgroundColor: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
                boxShadow: `0 0 ${10 + Math.random() * 20}px ${bubbleShadowColors[Math.floor(Math.random() * bubbleShadowColors.length)]}`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        <motion.h2
          className="mb-6 text-center text-5xl md:text-6xl mt-6 font-extrabold uppercase tracking-widest text-green-700 drop-shadow-lg"
          variants={itemChildVariants}
          whileHover="hover"
          style={{ perspective: "1000px"  }}
        >
          <motion.span variants={text3DVariants}>
            Tools & Approach
          </motion.span>
        </motion.h2>

        <motion.p
          className="mb-16 text-center text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-4 md:px-0"
          variants={itemChildVariants}
        >
          True to Agile methodology, we build solutions that tackle core business problems and evolve based on stakeholder feedback. Our approach is three-pronged:
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-center mb-24 max-w-7xl mx-auto">
          {animationDataLoaded.map((card, index) => (
            <motion.div
              key={index}
              className="flex flex-col h-full perspective-1000"
              variants={itemChildVariants}
            >
              <motion.div
                className="relative rounded-2xl shadow-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out bg-white border border-green-300 group"
                initial="initial"
                whileHover="hover"
                variants={card3DVariants}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 opacity-90 rounded-2xl"></div>

                <div className="relative p-8 text-gray-900 flex flex-col items-center h-full">
                  <motion.div
                    className="mb-6"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                  >
                    <div className="w-40 h-40 bg-green-200 bg-opacity-70 rounded-full flex items-center justify-center p-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      {card.animationData && (
                        <Lottie
                          options={lottieOptions(card.animationData)}
                          height={150}
                          width={150}
                        />
                      )}
                      {!card.animationData && (
                          <p className="text-sm text-red-600">Loading...</p>
                      )}
                    </div>
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-4 text-center text-green-700 drop-shadow-md transform transition-transform duration-300 group-hover:scale-105">
                    {card.title}
                  </h3>
                  <p className="text-lg text-center leading-relaxed text-gray-700 px-2">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-20 mb-12 text-center text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-4 md:px-0"
          variants={itemChildVariants}
        >
          We bring expertise from diverse platforms to provide optimal solutions in terms of features, pricing, and security. Here are some tools and frameworks we specialize in:
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 lg:gap-8 items-center justify-center max-w-7xl mx-auto">
          {toolsImages.map((image, index) => (
            <motion.div
              key={image.id}
              className={`flex items-center justify-center p-6 rounded-xl shadow-lg border border-green-300 ${toolBgColors[index % toolBgColors.length]}`}
              variants={itemChildVariants}
              whileHover={{ 
                scale: 1.15, 
                rotate: 5, 
                boxShadow: "0 10px 25px rgba(0, 255, 0, 0.4)",
                transition: { duration: 0.3 }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <img
                src={image.src}
                alt={image.name}
                className="max-h-20 w-auto object-contain transition-all duration-300 ease-in-out"
              />
            </motion.div>
          ))}
        </div>

        {/* --- Data Protection & Security Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }} 
          className="w-full px-6 py-12 max-w-5xl mx-auto mt-24" // Added margin-top for separation
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-8 font-serif">Data Protection & Security</h2>

          <div className="bg-gradient-to-br from-pink-300 to-blue-200 rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center">
            <div className="text-blue-500 text-6xl mb-4 md:mb-0 md:mr-8">
              <i className="mdi mdi-shield-lock-outline" />
            </div>
            <div>
              <p className="text-gray-700 text-base font-medium mb-4">
                We follow strict data security practices and work with clients to meet internal standards.
              </p>
              <ul className="space-y-2 list-decimal list-inside text-gray-800 text-sm">
                {points.map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* <div className="mt-6 flex flex-wrap gap-4">
            {policies.map(({ key, label, file }) => (
              <button
                key={key}
                onClick={() => openPdf(file)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all"
              >
                {label}
              </button>
            ))}
          </div> */}

          <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
            <div className="relative w-full h-[80vh]">
         
              <iframe
                title="policy-pdf"
                src={`${currentPdf}#toolbar=0&view=FitH`}
                className="w-full h-full border-none"
              />
            </div>
          </Dialog>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default NewApproachComponent;