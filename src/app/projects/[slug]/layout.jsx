// src/app/projects/[slug]/layout.jsx
// No "use client"; directive here, this file remains a Server Component
import SideNav from "@/components/SideNav";
import DemoForm from "@/components/DemoForm";
import GoBackButton from "./GoBackButton"; // Import the new Client Component
import { projects } from "../../../../data/projects";
import { notFound } from "next/navigation";
 import Footer from "@/components/Footer"; // Import Footer component


export const dynamicParams = false;
export function generateStaticParams() {
  // This function runs on the server during build time
  return projects.map((proj) => ({ slug: proj.slug }));
}

// MAKE THE COMPONENT ASYNC AND AWAIT PARAMS (Layouts can be async in App Router)
export default async function ProjectLayout({ children, params }) {
  const awaitedParams = await params;
  const { slug } = awaitedParams;

  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return notFound();
  }

  return (
    <>
       {/* Main container with responsive padding and a subtle gradient background */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4 py-8 md:px-8 lg:px-16 lg:py-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10">
          
          {/* SideNav component - handles its own mobile/desktop responsiveness */}
          <div className="lg:w-1/4 xl:w-1/5 flex-shrink-0">
            <SideNav slug={slug} sections={project.sections} />
          </div>

          {/* Main content area */}
          <div className="flex-1 flex flex-col gap-8">
            
            {/* Project Header - Enhanced styling with responsive padding */}
            <header className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border-t-4 border-blue-500 dark:border-blue-700">
              {/* Flex container to align title/client info and the "Go Back" button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-2">
                <div>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-1 leading-tight">
                    {project.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Client: <span className="font-semibold text-blue-600 dark:text-blue-400">{project.client}</span>
                  </p>
                </div>
                {/* Use the new GoBackButton client component */}
                <GoBackButton /> 
              </div>
            </header>

            {/* Render child pages - Enhanced styling with responsive padding */}
            <main className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg flex-1">
              {children}
            </main>

            {/* DemoForm section - Only shows if not on a specific section page, with responsive styling */}
            {!awaitedParams.section && (
              <section className="mt-6 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border-b-4 border-purple-500 dark:border-purple-700">
                <DemoForm projectName={project.name} />
              </section>
            )}
          </div>
        </div>
      </div>
      <Footer /> {/* Add Footer here */}
    </>
  );
}