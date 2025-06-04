// src/app/projects/[slug]/[section]/page.jsx

import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; // <--- Import rehypeRaw
import { notFound } from "next/navigation";

// Assuming you already imported your projects metadata (from previous steps)
import { projects } from "../../../../../data/projects";

export async function generateStaticParams() {
  return projects.flatMap((proj) =>
    proj.sections.map((sec) => ({ slug: proj.slug, section: sec }))
  );
}

export default async function SectionPage({ params }) { // Ensure it's async
  const awaitedParams = await params; // Ensure params are awaited
  const { slug, section } = awaitedParams;

  // Build the absolute path to the .md file:
  const mdPath = path.join(process.cwd(), "content", "projects", slug, `${section}.md`);
  if (!fs.existsSync(mdPath)) {
    return notFound();
  }
  const fileContents = fs.readFileSync(mdPath, "utf-8");

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]} // <--- Add rehypeRaw here
      >
        {fileContents}
      </ReactMarkdown>
    </article>
  );
}