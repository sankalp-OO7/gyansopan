"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// --- Nav items ---
const navItems = [
  { label: 'About', to: 'about-us' },
  { label: 'Why Us', to: 'why-choose-us' },
  { label: 'Projects', to: 'projects' },
  { label: 'Approach', to: 'tools-approach' },
  { label: 'Team', to: 'team' },
  { label: 'Awards', to: 'awards' },
  { label: 'Career', to: 'career' },
  { label: 'Contact', to: 'contact-us' },
];

// --- Utility: Smooth scroll ---
function scrollToSection(id) {
  if (typeof window !== 'undefined') {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// --- Per-letter gradient logo ---
const logo = "CHAINWORKS";

// --- Particle (floating circles) configuration ---
const PARTICLE_COUNT = 18;
const PARTICLE_COLORS = [
  "bg-blue-300/50 dark:bg-blue-700/40",
  "bg-purple-300/40 dark:bg-purple-600/50",
  "bg-cyan-200/60 dark:bg-cyan-600/50"
];

// --- Variants ---
const navbarVariants = {
  initial: { y: -80, opacity: 0, filter: "blur(10px)" },
  animate: { y: 0, opacity: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 60, damping: 14, mass: 1.3 } }
};

const navItemVariants = {
  initial: { scale: 1, rotateX: 0, rotateY: 0, z: 0 },
  hover: { scale: 1.09, rotateX: 10, rotateY: -8, z: 14, boxShadow: "0 8px 32px rgba(80,130,255,0.15)", transition: { type: "spring", stiffness: 250, damping: 16 } },
  tap: { scale: 0.97 }
};

const underlineVariants = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1, transition: { type: 'spring', stiffness: 320, damping: 20 } }
};

const logoLetterVariants = {
  hidden: { y: -20, opacity: 0, scale: 0.8 },
  visible: i => ({
    y: 0, opacity: 1, scale: 1,
    transition: { delay: i * 0.06, type: "spring", stiffness: 140, damping: 12 }
  }),
  hover: { y: -8, color: "#3b82f6", scale: 1.1 }
};

// --- Particle floating animation ---
const getParticleMotionProps = (i) => ({
  initial: { y: -32, opacity: 0.2, scale: 0.5, x: 0 },
  animate: {
    y: [0, 16, -10, 8, 0], 
    opacity: [0.23, 0.47, 0.55, 0.47, 0.23], 
    scale: [0.7, 1, 1.1, 0.9, 0.7], 
    x: [0, 8, -12, 10, 0],
    transition: {
      duration: 6 + (i % 6), 
      repeat: Infinity, 
      repeatType: "reverse", 
      ease: "easeInOut", 
      delay: (i * 0.14) % 2
    }
  }
});

// Particles component that only renders on client
const Particles = ({ isDesktop }) => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Generate particles only on client side
    const generatedParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      width: 10 + (i * 7) % 24,
      height: 10 + (i * 5) % 24,
      left: (i * 13) % 100,
      top: (i * 17) % 30 - 15,
    }));
    setParticles(generatedParticles);
  }, []);

  if (!isDesktop || particles.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-24 z-40 pointer-events-none overflow-hidden">
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
            filter: 'blur(3px)',
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

  // Handle mounting and responsive behavior
  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Active section logic
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

  // Don't render interactive elements until mounted
  if (!mounted) {
    return (
      <nav className="fixed top-0 z-50 w-full backdrop-blur-2xl bg-white/70 dark:bg-gray-900/80 shadow-2xl">
        <div className="mx-auto flex items-center justify-between px-8 py-4 max-w-7xl relative z-10">
          <div className="text-3xl font-black tracking-wide bg-gradient-to-r from-blue-600 via-indigo-400 to-sky-400 text-transparent bg-clip-text drop-shadow-xl">
            {logo}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Floating animated particles (Desktop only for perf) */}
      <Particles isDesktop={isDesktop} />
      
      {/* Main Navbar */}
      <motion.nav
        variants={navbarVariants}
        initial="initial"
        animate="animate"
        className="fixed top-0 z-50 w-full backdrop-blur-2xl bg-white/70 dark:bg-gray-900/80 shadow-2xl"
      >
        <div className="mx-auto flex items-center justify-between px-8 py-4 max-w-7xl relative z-10">
          {/* LOGO: Per-letter animation, gradient, hover */}
          <motion.button
            onClick={() => scrollToSection('hero')}
            className="text-3xl font-black tracking-wide bg-gradient-to-r from-blue-600 via-indigo-400 to-sky-400 text-transparent bg-clip-text drop-shadow-xl relative"
            aria-label="Scroll to Home section"
            whileTap={{ scale: 0.98 }}
            style={{ letterSpacing: '0.08em' }}
          >
            <motion.span
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ staggerChildren: 0.04 }}
              className="inline-block"
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
            {/* Underline animation for CHAINWORKS when 'hero' is active */}
            {activeSection === 'hero' && (
              <motion.div
                layoutId="underline"
                variants={underlineVariants}
                initial="initial"
                animate="animate"
                className="h-1.5 rounded bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-400 mt-1"
              />
            )}
          </motion.button>
          
          {/* Desktop Navigation */}
          {isDesktop && (
            <ul className="flex gap-2 ml-4">
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
                    onClick={() => scrollToSection(to)}
                    className={`
                      px-5 py-2 rounded-2xl font-semibold relative transition-all duration-150 bg-white/60 dark:bg-gray-900/60 shadow-lg
                      ${activeSection === to
                        ? "text-blue-700 dark:text-blue-300 bg-white/90 dark:bg-gray-700/80 font-bold"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-200"}
                    `}
                    style={{
                      border: activeSection === to ? "1.2px solid #4f90f7" : "1.2px solid transparent"
                    }}
                  >
                    {label}
                    {/* Animated underline for the active nav item */}
                    {activeSection === to && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute left-2 right-2 -bottom-1 h-[3px] rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-400"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 22 }}
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
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-200 focus:outline-none"
              aria-label="Open navigation menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
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
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { type: "spring", stiffness: 110, damping: 22 } }}
            exit={{ x: "100vw", opacity: 0, transition: { type: "spring", stiffness: 110, damping: 20 } }}
            className="fixed inset-0 z-[100] bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <motion.button
              onClick={() => setIsDrawerOpen(false)}
              whileTap={{ scale: 0.96 }}
              className="absolute top-7 right-7 p-2 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-200"
              aria-label="Close navigation menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            <ul className="flex flex-col gap-4 text-center">
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
                      px-8 py-4 text-2xl font-semibold rounded-xl transition-all duration-150 bg-white/70 dark:bg-gray-900/70 shadow-xl
                      ${activeSection === to
                        ? "text-blue-700 dark:text-blue-300 bg-white/90 dark:bg-gray-700/80 font-bold"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-200"}
                    `}
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
    <nav className="fixed top-0 z-50 w-full backdrop-blur-2xl bg-white/70 dark:bg-gray-900/80 shadow-2xl">
      <div className="mx-auto flex items-center justify-between px-8 py-4 max-w-7xl relative z-10">
        <div className="text-3xl font-black tracking-wide bg-gradient-to-r from-blue-600 via-indigo-400 to-sky-400 text-transparent bg-clip-text drop-shadow-xl">
          CHAINWORKS
        </div>
      </div>
    </nav>
  )
});

export default Navbar;