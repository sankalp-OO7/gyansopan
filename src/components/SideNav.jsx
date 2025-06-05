// components/SideNav.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav({ slug, sections }) {
  const pathname = usePathname();

  return (
    // Responsive navigation container:
    // Mobile: Full width, horizontal scrollable, with background and shadow.
    // Desktop (lg and up): Fixed width, sticky, vertical, transparent background, no shadow.
    <nav className="w-full lg:w-48 lg:sticky lg:top-20 bg-white dark:bg-gray-800 lg:bg-transparent lg:dark:bg-transparent rounded-lg lg:rounded-none shadow-md lg:shadow-none p-2 lg:p-0">
      <ul className="flex flex-row overflow-x-auto whitespace-nowrap lg:flex-col lg:space-x-0 lg:space-y-4 space-x-2 py-1"> {/* Mobile: Horizontal flex, Desktop: Vertical flex, space-x for mobile, space-y for desktop */}
        {sections.map((section) => {
          const href = `/projects/${slug}/${section}`;
          const isActive = pathname === href;
          return (
            <li key={section} className="flex-shrink-0"> {/* Prevents list items from shrinking on mobile */}
              <Link
                href={href}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${isActive
                      ? "bg-blue-600 text-white shadow-md" // Enhanced active state for visibility
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" // Subtle hover effect
                    }`}
              >
                {/* Text content directly inside Link, preventing unwanted shrinking on mobile */}
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}