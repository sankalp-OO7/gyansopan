// src/components/GoBackButton.jsx
"use client"; // Mark this file as a Client Component

import { useRouter } from "next/navigation"; // useRouter can only be used in Client Components

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()} // Calls router.back() to go to the previous page in history
      className="mt-4 sm:mt-0 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
    >
      Go Back
    </button>
  );
}