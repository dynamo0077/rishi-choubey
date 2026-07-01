import { profile } from "@/lib/resume-data";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-border/40 py-20 sm:py-24"
    >
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-1">
            <h2
              id="about-heading"
              className="font-mono text-sm font-semibold uppercase tracking-wider text-primary"
            >
              About
            </h2>
            <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              The short version.
            </p>
          </div>

          <div className="md:col-span-2 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              I'm a frontend engineer from Jabalpur who's spent {profile.yearsOfExperience}+ years
              shipping React and Next.js products that real people depend on. I started writing
              HTML when I was curious how a website worked, and I never really stopped.
            </p>
            <p>
              I like the parts most engineers skim past: keyboard focus rings, screen-reader
              announcements, the 50ms you can shave off LCP. It's the same instinct that makes
              a code review comment land well — noticing the thing that almost slipped through.
            </p>
            <p>
              These days I'm exploring how LLMs fit into real product UX — not as a gimmick, but
              as a tool that makes interfaces more useful for the people using them. The chat
              widget you see on this site is one of those experiments.
            </p>
            <p>
              Outside of work: chai, long walks, and arguing about font-rendering with anyone
              who'll listen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}