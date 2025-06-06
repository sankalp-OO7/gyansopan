// src/components/GoBackButton.jsx
"use client";

import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  const handleGoBack = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push("/#projects");
    }
  };

  return (
    <button
      onClick={handleGoBack}
      className="mt-4 sm:mt-0 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
    >
      Go Back
    </button>
  );
}
