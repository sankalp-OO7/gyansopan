// components/SideNav.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav({ slug, sections }) {
  const pathname = usePathname();
  // e.g. "/projects/supply-chain-dapp/overview"
  return (
    <nav className="sticky top-20 w-48 hidden lg:block">
      <ul className="space-y-4">
        {sections.map((section) => {
          const href = `/projects/${slug}/${section}`;
          const isActive = pathname === href;
          return (
            <li key={section}>
              {/* Fix: Remove the <a> tag and move its props to <Link> */}
              <Link
                href={href}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition
                    ${isActive
                      ? "bg-green-500 text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
              >
                {/* Fix: The text content goes directly inside <Link> */}
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}