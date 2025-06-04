// src/app/projects/[slug]/page.jsx
import { projects } from "../../../data/projects";
import { redirect } from "next/navigation";

export function generateStaticParams() {
  return projects.map((proj) => ({ slug: proj.slug }));
}

export default function RedirectToFirstSection({ params }) {
  const { slug } = params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return null; // Next.js will render 404 if not found
  }
  const firstSection = project.sections[0];
  redirect(`/projects/${slug}/${firstSection}`);
}
