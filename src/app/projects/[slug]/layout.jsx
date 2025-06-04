  // src/app/projects/[slug]/layout.jsx
  import SideNav from "@/components/SideNav";
  import DemoForm from "@/components/DemoForm";
  import { projects } from "../../../../data/projects";
  import { notFound } from "next/navigation";

  export const dynamicParams = false;
  export function generateStaticParams() {
    return projects.map((proj) => ({ slug: proj.slug }));
  }

  // MAKE THE COMPONENT ASYNC AND AWAIT PARAMS
  export default async function ProjectLayout({ children, params }) { // <--- ADD 'async' here
    const awaitedParams = await params; // <--- ADD this line
    const { slug } = awaitedParams; // <--- Destructure from awaitedParams

    const project = projects.find((p) => p.slug === slug);
    if (!project) {
      return notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 md:px-8 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* SideNav only on large screens */}
          <div className="hidden lg:block">
            <SideNav slug={slug} sections={project.sections} />
          </div>

          <div className="flex-1 flex flex-col gap-8">
            {/* Project Header */}
            <header>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                {project.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Client: <span className="font-medium">{project.client}</span>
              </p>
            </header>

            {/* Render child pages (/projects/[slug]/[section]/page.jsx or /projects/[slug]/request-demo/page.jsx) */}
            <div>{children}</div>

            {/* Only show DemoForm if we’re not already on /request-demo */}
            { !awaitedParams.section && ( // <--- Use awaitedParams here too
              <section className="mt-12">
                <DemoForm projectName={project.name} />
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }