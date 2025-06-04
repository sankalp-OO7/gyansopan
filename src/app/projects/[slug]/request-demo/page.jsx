// src/app/projects/[slug]/request-demo/page.jsx
import DemoForm from "@/components/DemoForm";
import { projects } from "../../../../..//data/projects";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return projects.map((proj) => ({ slug: proj.slug }));
}

export default function RequestDemoPage({ params }) {
  const { slug } = params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Request a Demo for {project.name}
        </h1>
        <DemoForm projectName={project.name} />
      </div>
    </div>
  );
}
