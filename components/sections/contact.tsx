import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { profile } from "@/lib/resume-data";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 sm:py-24"
    >
      <div className="container mx-auto max-w-5xl px-4 text-center">
        <h2
          id="contact-heading"
          className="font-mono text-sm font-semibold uppercase tracking-wider text-primary"
        >
          Let's talk
        </h2>
        <p className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Got a role that needs a senior frontend? I'm listening.
        </p>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          I'm open to remote roles and India-based hybrid roles. Drop me a line and I'll
          reply within a business day — usually faster.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href={`mailto:${profile.email}`}>
              <Mail className="size-4" aria-hidden /> {profile.email}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/chat">Ask my AI first</Link>
          </Button>
        </div>

        <p className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4" aria-hidden /> {profile.location}
        </p>
      </div>
    </section>
  );
}