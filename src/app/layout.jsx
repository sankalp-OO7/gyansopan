// app/layout.jsx
import "@/styles/globals.css"; // Tailwind base, components, utilities
import Providers from "@/providers/ThemeProvider"; // sets up dark/light mode
import Header from "@/components/Header"; // optional, your site header/nav
import Footer from "@/components/Footer"; // optional, your site footer

export const metadata = {
  title: "Chainworks Projects",
  description: "Explore our blockchain projects and request demos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Providers>
          <Header />
          <main>{children}</main> 
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
