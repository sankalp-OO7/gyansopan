"use client";
import { motion } from "framer-motion";

export default function Career() {
  return (
    <motion.section
      id="career"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}      style={{height: "100vh"}}

      className="py-24 px-6 md:px-20 text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Reports</h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Data-driven insights and transparency: review our detailed reports and see how we track progress and drive continuous improvement.
      </p>
    </motion.section>
  );
}
