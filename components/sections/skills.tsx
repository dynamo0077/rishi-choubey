import { skills } from "@/lib/resume-data";

const sections = [
  { key: "core", label: "Core" },
  { key: "frontend", label: "Frontend" },
  { key: "state", label: "State & Data" },
  { key: "accessibility", label: "Accessibility" },
  { key: "performance", label: "Performance" },
  { key: "tooling", label: "Tooling & Testing" },
  { key: "ai", label: "AI & LLMs" },
] as const;

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-b border-border/40 bg-card/30 py-20 sm:py-24"
    >
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-12 max-w-2xl">
          <h2
            id="skills-heading"
            className="font-mono text-sm font-semibold uppercase tracking-wider text-primary"
          >
            Skills
          </h2>
          <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            What I reach for, day to day.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ key, label }) => (
            <div
              key={key}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {label}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {(skills[key] as readonly string[]).map((s) => (
                  <li
                    key={s}
                    className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}