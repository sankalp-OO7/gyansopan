// app/layout.jsx
import "./globals.css"; // Tailwind base, components, utilities
 
export const metadata = {
  title: "Chainworks Projects",
  description: "Explore our blockchain projects and request demos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
           <main>{children}</main> 
     
      </body>
    </html>
  );
}
