// src/app/projects/[slug]/[section]/page.jsx
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { projects } from "../../../../data/projects";

export async function generateStaticParams() {
  // Build { slug, section } combos so Next can statically render them
  const allParams = [];
  projects.forEach((proj) => {
    proj.sections.forEach((sec) => {
      allParams.push({ slug: proj.slug, section: sec });
    });
  });
  return allParams;
}

export default function SectionPage({ params }) {
  const { slug, section } = params;
  // Ensure that this slug actually exists in data/projects
  const project = projects.find((p) => p.slug === slug);
  if (!project || !project.sections.includes(section)) {
    return notFound();
  }

  // Build the absolute path to content/projects/slug/section.md
  const mdPath = path.join(
    process.cwd(),
    "content",
    "projects",
    slug,
    `${section}.md`
  );
  if (!fs.existsSync(mdPath)) {
    return notFound();
  }

  const fileContents = fs.readFileSync(mdPath, "utf-8");
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {fileContents}
      </ReactMarkdown>
    </article>
  );
}
