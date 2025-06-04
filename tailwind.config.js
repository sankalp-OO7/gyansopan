// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Use the 'dark' class on <html> to toggle dark mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // if you still have a pages/ directory
    "./data/**/*.{js,ts}",          // if you reference classes in data-generated content
  ],
  theme: {
    extend: {
      screens: {
        "desktop-nav": "940px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Optional: add any brand colors if needed
        green: {
          400: "#34d399",
          500: "#10b981",
        },
        lime: {
          400: "#84cc16",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // For styling <article class="prose"> Markdown
    require("@tailwindcss/line-clamp"),  // Provides `line-clamp-{n}` utilities
  ],
};