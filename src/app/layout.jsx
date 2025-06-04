// app/layout.jsx
   import Footer from "@/components/Footer"; // optional, your site footer

export const metadata = {
  title: "Chainworks Projects",
  description: "Explore our blockchain projects and request demos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
           <main>{children}</main> 
          <Footer />
       </body>
    </html>
  );
}
