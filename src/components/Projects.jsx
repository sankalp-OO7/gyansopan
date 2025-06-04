"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";   // Adjust path if needed
import { projects } from "../../data/projects";           // Adjust path if needed
 export default function Projects() {
  return (
    <section id="projects" className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Intro (100vh) */}
      <motion.div
        style={{ height: "40vh" }}                   // Full viewport height
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col items-center justify-center text-center px-6 md:px-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore our portfolio of successful, impactful projects in web, mobile, AI, and more—each crafted with innovation and excellence.
        </p>
      </motion.div>

      {/* Card Grid (below the hero intro) */}
      <motion.div
        className="max-w-6xl mx-auto py-12 px-6 md:px-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <ProjectCard key={proj.slug} project={proj} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
