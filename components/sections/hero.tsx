import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/resume-data";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-border/40"
    >
      <div className="container mx-auto max-w-5xl px-4 py-20 sm:py-28">
        <div className="flex flex-col gap-6">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
            Open to senior frontend roles · Remote / India
          </p>

          <h1
            id="hero-heading"
            className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
          >
            Hi, I'm {profile.name.split(" ")[0]} — a{" "}
            <span className="gradient-text">{profile.title}</span>
            <br className="hidden sm:block" />
            building fast, accessible web apps.
          </h1>

          <p className="max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
            {profile.summary}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/chat">
                <Sparkles className="size-4" aria-hidden />
                Ask my AI stand-in
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#projects">See my work</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href={`mailto:${profile.email}`}>Email me</Link>
            </Button>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-border/40 pt-6 text-sm sm:max-w-md">
            <div>
              <dt className="text-muted-foreground">Experience</dt>
              <dd className="text-xl font-semibold">{profile.yearsOfExperience}+ yrs</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Based in</dt>
              <dd className="text-xl font-semibold">Jabalpur, IN</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Focus</dt>
              <dd className="text-xl font-semibold">A11y · Perf</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}