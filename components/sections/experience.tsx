import { experiences } from "@/lib/resume-data";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-b border-border/40 bg-card/30 py-20 sm:py-24"
    >
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-12 max-w-2xl">
          <h2
            id="experience-heading"
            className="font-mono text-sm font-semibold uppercase tracking-wider text-primary"
          >
            Experience
          </h2>
          <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            What I've shipped, in roughly reverse chronological order.
          </p>
        </div>

        <ol className="relative space-y-10 border-l border-border pl-6">
          {experiences.map((e) => (
            <li key={`${e.company}-${e.period}`} className="relative">
              <span
                aria-hidden
                className="absolute -left-[27px] top-1.5 size-3 rounded-full bg-primary ring-4 ring-background"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold">
                  {e.role} · <span className="text-muted-foreground">{e.company}</span>
                </h3>
                <p className="font-mono text-xs text-muted-foreground">{e.period}</p>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {e.bullets.map((b) => (
                  <li key={b} className="leading-relaxed">
                    <span className="text-foreground">▸</span> {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}