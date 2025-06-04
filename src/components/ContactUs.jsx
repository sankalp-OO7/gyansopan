"use client";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <motion.section
      id="contact-us"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="py-24 px-6 md:px-20 text-center"      style={{height: "100vh"}}

    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Let’s connect! Reach out to start a project, collaborate, or just say hello—we’d love to hear from you.
      </p>
    </motion.section>
  );
}
