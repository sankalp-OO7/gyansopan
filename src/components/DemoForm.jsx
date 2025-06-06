// src/components/DemoForm.jsx
'use client'; // This component uses useState and client-side hooks

import React, { useState } from "react";
import { Send } from 'react-feather'; // Only Send icon needed for the button
import { motion, AnimatePresence } from 'framer-motion';

// --- Framer Motion Variants for Success Modal (Copied from ContactUs) ---
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

// --- Framer Motion Variants for the custom animated checkmark (Copied from ContactUs) ---
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

export default function DemoForm({ projectName }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "", // This is the user's custom message for the demo
  });
  const [isSending, setIsSending] = useState(false); // To manage button disabled state
  const [showSuccessModal, setShowSuccessModal] = useState(false); // For the modal popup

  // --- IMPORTANT: Update this to your Next.js API route ---
  const API_ENDPOINT = "/api/send-email";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitToApi = async (data) => {
    try {
      const rawResponse = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await rawResponse.json(); // Parse the JSON response
      console.log("DemoForm: Data sent to API:", data);
      console.log("DemoForm: API response status:", rawResponse.status, rawResponse.statusText);
      console.log("DemoForm: API response body:", responseData); // Log the response body

      return rawResponse.ok; // Returns true for success (2xx status), false otherwise
    } catch (err) {
      console.error("DemoForm: Network or submission error:", err);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true); // Disable button during submission

    // Construct the combined message from mobile, project name, and user's message
    // This will be sent as the 'message' field to your API route
    const combinedMessage = `
--- Demo Request Details ---
Project: ${projectName || 'N/A'}
Mobile: ${formData.mobile}
--- User Message ---
${formData.message}
`.trim();

    // Prepare the payload for your API route (expecting name, email, message)
    const payloadForApi = {
      name: formData.name,
      email: formData.email,
      message: combinedMessage, // This sends the combined information
    };

    const success = await submitToApi(payloadForApi);
    setIsSending(false); // Re-enable button

    if (success) {
      // Clear form fields on success
      setFormData({ name: "", email: "", mobile: "", message: "" });
      setShowSuccessModal(true); // Show the success modal popup
    } else {
      alert("Failed to send demo request. Please try again."); // Simple alert for error
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-md"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Request a Demo
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          required
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="tel"
          name="mobile"
          required
          placeholder="Your Mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {/* Display project name but make it read-only and not directly submitted */}
        <input
          type="text"
          value={projectName}
          readOnly
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-not-allowed"
        />
      </div>
      <textarea
        name="message"
        required
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        className="w-full mt-4 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        rows={4}
      />
      <motion.button
        type="submit"
        disabled={isSending}
        className={`mt-4 w-full px-6 py-3 rounded-lg font-medium text-white ${
          isSending
            ? "bg-green-300 cursor-wait"
            : "bg-green-500 hover:bg-green-600"
        } transition-all duration-200 ease-in-out inline-flex items-center justify-center`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSending ? "Sending..." : "Submit Request"}
        {!isSending && <Send className="ml-2 h-5 w-5" />}
      </motion.button>

      {/* --- Success Modal (Copied from ContactUs) --- */}
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
              onClick={(e) => e.stopPropagation()} // Prevent modal from closing if background clicked
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

              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">Request Sent!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your demo request has been successfully delivered. We'll be in touch soon!
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
    </form>
  );
}