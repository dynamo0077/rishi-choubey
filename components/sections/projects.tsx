import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/resume-data";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-b border-border/40 py-20 sm:py-24"
    >
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <h2
              id="projects-heading"
              className="font-mono text-sm font-semibold uppercase tracking-wider text-primary"
            >
              Featured projects
            </h2>
            <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              A few things I've built and broken.
            </p>
          </div>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <li key={p.slug}>
              <article className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-ring">
                <header className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold tracking-tight">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <Link
                    href={p.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${p.title} — GitHub`}
                    className="relative z-10 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowUpRight className="size-4" aria-hidden />
                  </Link>
                </header>
                <p className="text-sm text-muted-foreground">{p.blurb}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded border border-border bg-background px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <ul className="mt-4 space-y-1 text-sm">
                  {p.impact.map((i) => (
                    <li key={i} className="text-muted-foreground">
                      <span className="text-foreground">▸</span> {i}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}