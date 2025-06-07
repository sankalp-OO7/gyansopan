"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// --- Nav items (Original names maintained) ---
const navItems = [
  { label: 'Use?', to: 'about-us' },
  { label: 'About Us', to: 'tools-approach' },
  { label: 'Features', to: 'why-choose-us' },
  { label: 'Pricing', to: 'pricing' },
  { label: 'Jee', to: 'jee' },
  { label: 'Olympiad', to: 'olympiad' },
  { label: 'Scholorship', to: 'scholorship' },
  { label: 'Contact', to: 'team' },

 
];

// --- Utility: Smooth scroll ---
function scrollToSection(id) {
  if (typeof window !== 'undefined') {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// --- Per-letter gradient logo ---
const logo = "GYANSOPAN"; // Maintained GYANSOPAN logo

// --- Particle (floating circles) configuration ---
const PARTICLE_COUNT = 35; // Increased particle count for more vibrancy!
const PARTICLE_COLORS = [
  "bg-red-400/70",     // Bright Red
  "bg-yellow-300/70",   // Sunny Yellow
  "bg-green-400/70",    // Lively Green
  "bg-blue-400/70",     // Ocean Blue
  "bg-purple-400/70",   // Cheerful Purple
  "bg-pink-400/70",     // Playful Pink
  "bg-orange-400/70"    // Zesty Orange
];

// --- Variants ---
const navbarVariants = {
  initial: { y: -100, opacity: 0, filter: "blur(15px)" },
  animate: { 
    y: 0, 
    opacity: 1, 
    filter: "blur(0px)", 
    transition: { type: "spring", stiffness: 80, damping: 18, mass: 1.5, delay: 0.1 } 
  }
};

const navItemVariants = {
  initial: { scale: 1, rotateX: 0, rotateY: 0, z: 0, translateY: 0 }, // Added translateY
  hover: { 
    scale: 1.12, // Slightly reduced scale for smaller size
    rotateX: 10, 
    rotateY: -8, 
    z: 16, 
    translateY: -3, // Subtle lift effect
    boxShadow: "0 12px 48px rgba(255, 105, 180, 0.5), 0 0 20px rgba(255,255,255,0.9) inset", // More prominent shadow
    transition: { type: "spring", stiffness: 280, damping: 18 } 
  },
  tap: { scale: 0.92 }
};

const underlineVariants = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1, transition: { type: 'spring', stiffness: 350, damping: 25 } }
};

const logoLetterVariants = {
  hidden: { y: -30, opacity: 0, scale: 0.7 },
  visible: i => ({
    y: 0, opacity: 1, scale: 1,
    transition: { delay: i * 0.04, type: "spring", stiffness: 160, damping: 14 }
  }),
  hover: { y: -12, color: "#FFD700", scale: 1.15, rotate: '7deg' } // Increased y-lift and rotation
};

// --- Particle floating animation ---
const getParticleMotionProps = (i) => ({
  initial: { y: -80, opacity: 0, scale: 0.1, x: 0, rotate: 0 },
  animate: {
    y: [0, 30, -25, 20, 0], 
    opacity: [0.4, 0.8, 0.9, 0.7, 0.4], 
    scale: [0.5, 1.5, 1.8, 1.2, 0.5], 
    x: [0, 25, -30, 28, 0], 
    rotate: [0, 180, 360, 540, 720], 
    transition: {
      duration: 4 + (i % 8), 
      repeat: Infinity, 
      repeatType: "reverse", 
      ease: "easeInOut", 
      delay: (i * 0.06) % 4 
    }
  }
});

// Particles component that only renders on client
const Particles = ({ isDesktop }) => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const generatedParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      width: 20 + (i * 10) % 40, 
      height: 20 + (i * 8) % 40,
      left: (i * 17) % 100, 
      top: (i * 23) % 50 - 25, 
    }));
    setParticles(generatedParticles);
  }, []);

  if (!isDesktop || particles.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-20 z-40 pointer-events-none overflow-hidden"> {/* Reduced height */}
      {particles.map((particle, i) => (
        <motion.div
          key={particle.id}
          {...getParticleMotionProps(i)}
          className={`absolute rounded-full ${PARTICLE_COLORS[i % PARTICLE_COLORS.length]}`}
          style={{
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            left: `${particle.left}%`,
            top: `${particle.top}px`,
            filter: 'blur(5px)',
            zIndex: 0
          }}
        />
      ))}
    </div>
  );
};

// --- Component ---
function NavbarComponent() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => { setIsDesktop(window.innerWidth >= 1024); };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const options = { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 };
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };
    observerRef.current = new IntersectionObserver(callback, options);
    const sections = ['hero', ...navItems.map(item => item.to)]
      .map(id => document.getElementById(id)).filter(Boolean);
    sections.forEach(sec => observerRef.current?.observe(sec));
    return () => {
      if (observerRef.current) {
        sections.forEach(sec => observerRef.current?.unobserve(sec));
        observerRef.current.disconnect();
      }
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-pink-200 via-yellow-200 to-blue-200 shadow-2xl">
        <div className="mx-auto flex items-center justify-between px-8 py-3 max-w-7xl relative z-10">
          <div className="text-3xl font-black tracking-wide bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-transparent bg-clip-text drop-shadow-xl">
            {logo}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <Particles isDesktop={isDesktop} />
      
      <motion.nav
        variants={navbarVariants}
        initial="initial"
        animate="animate"
        className="fixed top-0 z-50 w-full 
                   bg-gradient-to-br from-pink-200/90 via-yellow-200/90 to-blue-200/90 /* Slightly more opaque */
                   shadow-2xl shadow-blue-400/50 
                   border-b-4 border-yellow-400"
      >
        <div className="mx-auto flex items-center justify-between px-8 py-3 max-w-7xl relative z-10"> {/* Reduced padding */}
          {/* LOGO */}
          <motion.button
            onClick={() => scrollToSection('hero')}
            className="text-3xl font-black tracking-wider /* Reduced font size */
                       bg-gradient-to-r from-red-500 via-yellow-500 to-lime-500 text-transparent bg-clip-text 
                       drop-shadow-lg relative cursor-pointer"
            aria-label="Scroll to Home section"
            whileTap={{ scale: 0.95 }}
            style={{ letterSpacing: '0.12em', fontFamily: 'Fredoka, sans-serif' }}
          >
            <motion.span
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ staggerChildren: 0.03 }}
              className="inline-block whitespace-nowrap" 
            >
              {[...logo].map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={logoLetterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
            {activeSection === 'hero' && (
              <motion.div
                layoutId="underline-gyansopan"
                variants={underlineVariants}
                initial="initial"
                animate="animate"
                className="h-2 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 mt-2 transform -skew-x-12"
              />
            )}
          </motion.button>
          
          {/* Desktop Navigation */}
          {isDesktop && (
            <ul className="flex gap-2 ml-4"> {/* Slightly reduced gap */}
              {navItems.map(({ label, to }) => (
                <motion.li
                  key={to}
                  variants={navItemVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="flex flex-col items-center group"
                >
                  <motion.button
                    onClick={() => scrollToSection(to)}
                    className={`
                      px-5 py-2 text-base font-extrabold rounded-full relative transition-all duration-200 /* Reduced padding and font size */
                      bg-white/80 
                      shadow-md border-2
                      whitespace-nowrap 
                      ${activeSection === to
                        ? "text-blue-700 bg-yellow-300/90 border-blue-500 font-black scale-105"
                        : "text-gray-700 border-transparent group-hover:border-pink-400 group-hover:text-pink-600"}
                    `}
                    style={{
                      fontFamily: 'Bubblegum Sans, cursive'
                    }}
                  >
                    {label}
                    {activeSection === to && (
                      <motion.div
                        layoutId="nav-underline-active"
                        className="absolute left-1 right-1 -bottom-1 h-[4px] rounded-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ type: "spring", stiffness: 450, damping: 25 }}
                      />
                    )}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          )}
          
          {/* Hamburger (Mobile) */}
          {!isDesktop && (
            <motion.button
              onClick={() => setIsDrawerOpen(true)}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-700 hover:text-red-500 focus:outline-none 
                         bg-white/80 rounded-full shadow-lg border border-transparent hover:border-red-400"
              aria-label="Open navigation menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* Slightly smaller icon */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          )}
        </div>
      </motion.nav>
      
      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && !isDesktop && (
          <motion.div
            initial={{ x: "100vw", opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120, damping: 25, duration: 0.5 } }}
            exit={{ x: "100vw", opacity: 0, scale: 0.8, transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.4 } }}
            className="fixed inset-0 z-[100] 
                       bg-gradient-to-br from-red-100 via-yellow-100 to-green-100 
                       backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <motion.button
              onClick={() => setIsDrawerOpen(false)}
              whileTap={{ scale: 0.9 }}
              className="absolute top-7 right-7 p-3 text-red-600 hover:text-red-800 
                         bg-white/90 rounded-full shadow-lg border border-red-400"
              aria-label="Close navigation menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            <ul className="flex flex-col gap-6 text-center">
              {navItems.map(({ label, to }) => (
                <motion.li
                  key={to}
                  variants={navItemVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="flex flex-col items-center"
                >
                  <motion.button
                    onClick={() => {
                      scrollToSection(to);
                      setIsDrawerOpen(false);
                    }}
                    className={`
                      px-7 py-3 text-2xl font-extrabold rounded-3xl transition-all duration-200 /* Slightly reduced padding and font size */
                      bg-white/90 shadow-xl border-2
                      whitespace-nowrap 
                      ${activeSection === to
                        ? "text-blue-700 bg-yellow-300/90 border-blue-500"
                        : "text-gray-700 border-transparent hover:border-pink-400 hover:text-pink-600"}
                    `}
                    style={{
                      fontFamily: 'Bubblegum Sans, cursive'
                    }}
                  >
                    {label}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Export as dynamic component with SSR disabled
const Navbar = dynamic(() => Promise.resolve(NavbarComponent), {
  ssr: false,
  loading: () => (
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-pink-200 via-yellow-200 to-blue-200 shadow-2xl">
      <div className="mx-auto flex items-center justify-between px-8 py-3 max-w-7xl relative z-10">
        <div className="text-3xl font-black tracking-wide bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-transparent bg-clip-text drop-shadow-xl">
          GYANSOPAN
        </div>
      </div>
    </nav>
  )
});

export default Navbar;