'use client'; // This component uses useState, useEffect, and other client-side hooks

import React, { useState, useEffect } from "react";
// Import all necessary icons from react-feather
import { Phone, Mail, Send, MapPin, MessageCircle } from 'react-feather';
import { motion, AnimatePresence } from 'framer-motion';

// --- Framer Motion Variants for general sections/items ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.1, // Stagger children animations for direct children
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)" },
  tap: { scale: 0.95 },
};

// --- Framer Motion Variants for Success Modal (existing) ---
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: "-100vh", opacity: 0, scale: 0.5 },
  visible: {
    y: "0",
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
    transition: { duration: 0.3 }
  },
};

// --- Framer Motion Variants for the custom animated checkmark (existing) ---
const checkmarkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      delay: 0.3, // Delay after modal appears
      duration: 0.7, // How long the checkmark draws
      ease: "easeOut",
    },
  },
};

// --- New Sub-components for better animation and structure ---

const ContactInfoCard = ({ icon: Icon, title, content, href, type = 'text' }) => (
  <motion.li
    className="flex items-center bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-shadow duration-300"
    variants={itemVariants}
    whileHover={{ y: -5, scale: 1.02 }}
  >
    <div className="flex-shrink-0 text-blue-600 dark:text-blue-400 mr-4">
      <Icon size={24} />
    </div>
    <div>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h4>
      {type === 'text' ? (
        <p className="text-gray-700 dark:text-gray-300 text-base">{content}</p>
      ) : (
        <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline text-base break-words">
          {content}
        </a>
      )}
    </div>
  </motion.li>
);

const SocialLink = ({ icon: Icon, label, href, colorClass }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm hover:shadow-md"
    variants={itemVariants}
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon size={36} className={colorClass} />
    <span className="text-sm text-gray-700 dark:text-gray-300 mt-2 font-medium">{label}</span>
  </motion.a>
);

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSending, setIsSending] = useState(false); // To disable button during submission

  const GETFORM_ENDPOINT = "https://getform.io/f/cd6330ca-c449-4ae2-8982-2bb955ae030e"; // Your Getform.io endpoint

  const submitForm = async (formData) => {
    try {
      const rawResponse = await fetch(GETFORM_ENDPOINT, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("ContactUs Form: Data sent to Getform.io:", formData);
      console.log("ContactUs Form: Getform.io response status:", rawResponse.status, rawResponse.statusText);
      return rawResponse.ok;
    } catch (err) {
      console.error("ContactUs Form: Network or submission error:", err);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true); // Disable button

    const success = await submitForm({ email, name, message });
    setIsSending(false); // Re-enable button

    if (success) {
      setName("");
      setEmail("");
      setMessage("");
      setShowSuccessModal(true); // Open the success modal
    } else {
      // Using a custom modal/message box is preferable over alert()
      // For now, keeping alert() as per the original component's behavior.
      alert("Failed to send message. Please try again.");
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen font-sans">
      {/* Hero-like Section for Contact Us Title */}
      <motion.section
        className="relative h-[40vh] md:h-[50vh] flex items-center justify-center text-center bg-gradient-to-br from-blue-700 to-purple-800 dark:from-blue-900 dark:to-purple-950 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background animation elements */}
        <motion.div
          className="absolute inset-0 z-0 opacity-20"
          initial={{ scale: 1.2, rotate: 0 }}
          animate={{ scale: 1, rotate: 10 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: 'url("https://placehold.co/1200x800/2563eb/ffffff?text=Abstract+Pattern")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <motion.div
          className="absolute inset-0 z-10 bg-black opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        <div className="relative z-20 p-6 max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            Get in Touch with Chainworks
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
          >
            We're here to answer your questions, discuss your projects, and explore how blockchain can transform your business.
          </motion.p>
        </div>
      </motion.section>

      {/* Main Contact Content Section */}
      <motion.section
        className="py-20 px-6 md:px-20 bg-white dark:bg-gray-800"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column: Intro Text & Form */}
          <motion.div variants={itemVariants}>
            <p className="mb-8 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Ready to transform your business with blockchain? Partner with Chainworks.io for innovative, secure, and scalable solutions that redefine the way you operate. Let’s build the future, together.
              <span role="img" aria-label="Wave" className="ml-1">
                👋
              </span>
            </p>

            {/* --- Contact Form --- */}
            <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg shadow-xl dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Send Us a Message</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 sr-only">Name</label>
                  <motion.input
                    type="text"
                    id="contactName"
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-300"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    whileFocus={{ scale: 1.01, boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.25)" }}
                  />
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 sr-only">Email</label>
                  <motion.input
                    type="email"
                    id="contactEmail"
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-300"
                    placeholder="Your Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    whileFocus={{ scale: 1.01, boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.25)" }}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="contactMessage" className="block text-sm font-medium text-gray-700 sr-only">Message</label>
                <motion.textarea
                  id="contactMessage"
                  rows={6}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-300"
                  placeholder="Your Message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  whileFocus={{ scale: 1.01, boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.25)" }}
                />
              </div>
              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  disabled={isSending}
                  className={`inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white ${
                    isSending
                      ? "bg-blue-300 cursor-wait"
                      : "bg-blue-600 hover:bg-blue-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out`}
                  whileHover={!isSending ? { scale: 1.05 } : {}}
                  whileTap={!isSending ? { scale: 0.95 } : {}}
                >
                  {isSending ? "Sending..." : "Send"}
                  <Send className="ml-2 h-5 w-5" />
                </motion.button>
              </div>
            </form>
            {/* --- End Contact Form --- */}
          </motion.div>

          {/* Right Column: Contact Info & Social Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center md:text-left">Reach Out to Us</h3>
            <ul className="space-y-6">
              <ContactInfoCard
                icon={Mail}
                title="Email Us"
                content="hi@chainworks.io"
                href="mailto:hi@chainworks.io"
                type="link"
              />
              <ContactInfoCard
                icon={Phone}
                title="Call Us"
                content="+91 99679 76846"
                href="tel:+919967976846"
                type="link"
              />
              <ContactInfoCard
                icon={MapPin}
                title="Our Location"
                content={
                  <>
                    M10, SINE,<br />
                    IIT Bombay,<br />
                    Mumbai
                  </>
                }
                href="https://goo.gl/maps/3cnez2CgvuEYBQW27"
                type="link"
              />
            </ul>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-6 text-center md:text-left">Connect with Us</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
              <SocialLink icon={MessageCircle} label="WhatsApp" href="https://wa.link/zrgiok" colorClass="text-green-500" />
              <SocialLink icon={Phone} label="Call Us" href="tel:+919967976846" colorClass="text-blue-500" />
              <SocialLink icon={Mail} label="Email" href="mailto:hi@chainworks.io" colorClass="text-red-500" />
              <SocialLink icon={MapPin} label="Location" href="https://goo.gl/maps/3cnez2CgvuEYBQW27" colorClass="text-purple-600" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- Success Modal (existing) --- */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000] p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeSuccessModal}
          >
            <motion.div
              className="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full text-center relative
                         transform transition-all duration-300 ease-out
                         dark:bg-gray-800 dark:text-gray-100"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeSuccessModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Custom animated checkmark using SVG and Framer Motion */}
              <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 rounded-full bg-green-500 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    className="w-16 h-16"
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      variants={checkmarkVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </svg>
                </motion.div>
              </div>

              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">Message Sent!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your message has been successfully delivered. We'll be in touch soon!
              </p>
              <button
                onClick={closeSuccessModal}
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md"
              >
                Got It!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* --- End Success Modal --- */}
    </div>
  );
};

export default ContactUs;