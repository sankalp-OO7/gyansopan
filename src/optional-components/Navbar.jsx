'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useMediaQuery } from '@mui/material'

// Floating particles configuration
const particles = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  size: Math.random() * 3 + 1, // Particle size between 1 and 4
  x: Math.random() * 100, // Random horizontal start position
  // Adjust initial y to be slightly above the visible area, then float
  y: Math.random() * 20 - 10, // Start slightly above/within the viewport
  duration: Math.random() * 10 + 5 // Animation duration between 5 and 15 seconds
}))

// Navigation items with enhanced animation properties
const navItems = [
  { label: 'About', to: 'about-us', color: '#3B82F6' }, // Blue
  { label: 'Projects', to: 'projects', color: '#8B5CF6' }, // Violet
  { label: 'Approach', to: 'tools-approach', color: '#EC4899' }, // Pink
  { label: 'Team', to: 'team', color: '#10B981' }, // Emerald
  { label: 'Awards', to: 'awards', color: '#F59E0B' }, // Amber
  { label: 'Reports', to: 'reports', color: '#6366F1' }, // Indigo
  { label: 'Contact', to: 'contact-us', color: '#EF4444' } // Red
]

// Enhanced scroll function with animation
function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    window.scrollTo({
      top: el.offsetTop,
      behavior: 'smooth'
    })
  }
}

// 3D Card Component for Nav Items
const NavCard3D = ({ children, color, className = '', onClick }) => { // Added onClick prop
  const cardRef = useRef(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    // Reduced tilt intensity for smoother effect
    setRotate({
      x: (y - centerY) / 15, // Adjusted divisor
      y: (centerX - x) / 15  // Adjusted divisor
    })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`transform-gpu perspective-1000 ${className} cursor-pointer`} // Added cursor-pointer
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      onClick={onClick} // Applied onClick here
      style={{
        transformStyle: 'preserve-3d',
        rotateX: `${rotate.x}deg`,
        rotateY: `${rotate.y}deg`
      }}
      whileHover={{
        scale: 1.05,
        zIndex: 10,
        boxShadow: `0 15px 30px -5px ${color}60` // Enhanced shadow on hover
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="relative h-full w-full rounded-xl overflow-hidden" // Ensure rounded corners apply
        style={{
          transformStyle: 'preserve-3d'
        }}
      >
        {children}
        {/* Front face of the 3D card */}
        <motion.div
          className="absolute inset-0 rounded-xl "
          style={{
            background: `linear-gradient(135deg, ${color}30 0%, ${color}10 100%)`, // Subtle gradient for the face
            backdropFilter: 'blur(5px)', // Subtle blur for glass effect
            WebkitBackdropFilter: 'blur(5px)', // For Safari support
            transform: 'translateZ(20px)', // Pushes this layer forward
            border: `1px solid ${color}30`, // Subtle border matching the color
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

// Animated Text Component
const AnimatedText = ({ text, delay = 0, className = '' }) => {
  const letters = text.split('')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay }
    })
  }

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
  }

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
            background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)', // Gradient on hover
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transition: { duration: 0.3 }
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const observerRef = useRef(null)
  const isDesktop = useMediaQuery('(min-width:1024px)')
  const navRef = useRef(null)

  // Waterfall animation for nav items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    observerRef.current = new IntersectionObserver(callback, options)
    const sections = ['hero', ...navItems.map(item => item.to)]
      .map(id => document.getElementById(id))
      .filter(Boolean)

    sections.forEach(sec => observerRef.current?.observe(sec))

    return () => {
      sections.forEach(sec => observerRef.current?.unobserve(sec))
      observerRef.current?.disconnect()
    }
  }, [])

  const drawerVariants = {
    hidden: { x: '100vw', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 0.5
      }
    },
    exit: {
      x: '100vw',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 0.5
      }
    }
  }

  return (
    <>
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-600"
            style={{
              width: `${particle.size}em`, // Use em for better scaling
              height: `${particle.size}em`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 0.3,
              filter: 'blur(1px)' // Subtle blur for depth
            }}
            animate={{
              y: [particle.y, particle.y - 20, particle.y], // Float vertically
              x: [particle.x, particle.x + 10 * (particle.id % 2 === 0 ? 1 : -1), particle.x], // Float horizontally
              opacity: [0.3, 0.6, 0.3], // Vary opacity
              scale: [1, 1.2, 1] // Vary scale
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Navigation Bar */}
      <motion.nav
        ref={navRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          delay: 0.2
        }}
        className="fixed top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 shadow-xl"
      >
        <div className="mx-auto flex items-center justify-between px-6 py-4 max-w-7xl">
          {/* Logo with Animated Text */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('hero')}
            className="cursor-pointer"
          >
            <AnimatedText
              text="CHAINWORKS"
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
              delay={0.1}
            />
            {activeSection === 'hero' && (
              <motion.div
                layoutId="nav-underline"
                className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-1 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
            )}
          </motion.div>

          {/* Desktop Navigation with 3D Cards */}
          {isDesktop && (
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex gap-2"
            >
              {navItems.map(({ label, to, color }) => (
                <motion.li
                  key={to}
                  variants={itemVariants}
                  // whileHover and whileTap moved to NavCard3D for consistent interaction
                >
                  <NavCard3D
                    color={color}
                    onClick={() => scrollToSection(to)} // Click handler passed to NavCard3D
                  >
                    <motion.button
                      // Remove onClick from here, as NavCard3D handles it
                      className={`relative px-4 py-2 text-sm font-medium rounded-lg z-20 ${ // Z-index for text on top of 3D face
                        activeSection === to
                          ? 'text-white' // Active text color on gradient background
                          : 'text-gray-800 dark:text-gray-200' // Inactive text color
                      } transition-colors duration-200`}
                      style={{
                        // Apply active background and shadow directly here
                        background: activeSection === to
                          ? `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`
                          : 'transparent',
                        boxShadow: activeSection === to
                          ? `0 5px 15px -5px ${color}40`
                          : 'none'
                      }}
                    >
                      {label}
                      {activeSection === to && (
                        <motion.div
                          layoutId="nav-underline"
                          className="h-0.5 bg-white mt-1 rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        />
                      )}
                    </motion.button>
                  </NavCard3D>
                </motion.li>
              ))}
            </motion.ul>
          )}

          {/* Mobile Menu Button */}
          {!isDesktop && (
            <motion.button
              onClick={() => setIsDrawerOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-500"
              aria-label="Open navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          )}
        </div>
      </motion.nav>

      {/* Mobile Drawer with Animated Entrance */}
      <AnimatePresence>
        {isDrawerOpen && !isDesktop && (
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[100] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <motion.button
              onClick={() => setIsDrawerOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 p-2 text-gray-600 dark:text-gray-300 hover:text-purple-500"
              aria-label="Close navigation menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-4 text-center"
            >
              {navItems.map(({ label, to, color }) => (
                <motion.li
                  key={to}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.button
                    onClick={() => {
                      scrollToSection(to)
                      setIsDrawerOpen(false)
                    }}
                    className={`px-8 py-4 text-xl font-medium rounded-xl ${
                      activeSection === to
                        ? 'text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:text-white'
                    }`}
                    style={{
                      background: activeSection === to
                        ? `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`
                        : 'transparent',
                      boxShadow: activeSection === to
                        ? `0 10px 20px -5px ${color}40`
                        : 'none'
                    }}
                  >
                    {label}
                  </motion.button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}