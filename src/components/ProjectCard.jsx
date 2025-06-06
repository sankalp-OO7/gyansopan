// components/ProjectCard.jsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  const { slug, name, client, image, excerpt, demoUrl } = project;

  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
    >
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 md:p-6 flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Client: <span className="font-medium">{client}</span>
        </p>
        <p className="text-gray-700 dark:text-gray-200 text-sm line-clamp-2">
          {excerpt}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3"> {/* MODIFIED THIS LINE */}
          <Link
            href={`/projects/${slug}/request-demo`}
            className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition text-center" // Added text-center
          >
            Request Demo
          </Link>
          <Link
            href={`/projects/${slug}/details`}
            className="px-4 py-2 border border-green-500 text-green-500 rounded-lg text-sm font-medium hover:bg-green-50 dark:hover:bg-gray-800 transition text-center" // Added text-center
          >
            Know More
          </Link>
        </div>
      </div>
    </motion.div>
  );
}