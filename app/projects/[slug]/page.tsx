import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/resume-data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case study`,
    description: project.blurb,
  };
}

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="container mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden /> All projects
      </Link>

      <header className="mt-6">
        <p className="font-mono text-xs uppercase tracking-wider text-primary">
          Case study
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">{project.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{project.blurb}</p>
      </header>

      <section className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
        <h2>The problem</h2>
        <p>
          [Replace with the actual problem you set out to solve. Use a real constraint —
          a deadline, a11y audit finding, performance regression, or customer feedback.]
        </p>

        <h2>My role & approach</h2>
        <p>
          [Describe what you owned: architecture, design, implementation, code review,
          stakeholder communication. Include the specific decisions you made and why.]
        </p>

        <h2>Implementation highlights</h2>
        <ul>
          {project.impact.map((i) => <li key={i}>{i}</li>)}
        </ul>

        <h2>Outcome</h2>
        <p>
          [Replace with concrete numbers — Lighthouse scores, conversion, error rate, time saved,
          team adoption. Recruiters skim these first.]
        </p>

        <h2>What I'd do next</h2>
        <p>
          [One honest paragraph on what you learned, what you'd change, and where you'd take it
          next if you owned the project longer.]
        </p>
      </section>

      <footer className="mt-12 border-t border-border pt-6 text-sm">
        <Link
          href={project.link}
          target="_blank"
          rel="noreferrer noopener"
          className="text-primary underline-offset-4 hover:underline"
        >
          View source on GitHub →
        </Link>
      </footer>
    </article>
  );
}